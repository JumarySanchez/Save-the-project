const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM_EMAIL = 'Calo Capital <onboarding@resend.dev>'
const DEFAULT_RECIPIENTS = ['protection@calocapital.io', 'marc@calocapital.io']
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

const requestLog = new Map()

function trimValue(value) {
  return String(value ?? '').trim()
}

function getClientIp(headers = {}) {
  const forwardedFor = trimValue(headers['x-forwarded-for'] || headers['X-Forwarded-For'])
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  return trimValue(
    headers['x-real-ip'] ||
      headers['X-Real-IP'] ||
      headers['cf-connecting-ip'] ||
      headers['CF-Connecting-IP'] ||
      headers['true-client-ip'] ||
      headers['True-Client-IP'] ||
      'unknown'
  )
}

function pruneRateLimitEntries(now = Date.now()) {
  for (const [key, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)
    if (recent.length === 0) {
      requestLog.delete(key)
      continue
    }

    requestLog.set(key, recent)
  }
}

function checkRateLimit(ip) {
  const now = Date.now()
  pruneRateLimitEntries(now)

  const timestamps = requestLog.get(ip) || []
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return true
}

function sanitizeText(value) {
  return trimValue(value).replace(/\r\n/g, '\n')
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimValue(value))
}

function escapeHtml(value) {
  return sanitizeText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function parseJsonBody(event) {
  if (!event?.body) return {}

  if (typeof event.body === 'object') return event.body

  try {
    return JSON.parse(event.body)
  } catch {
    return null
  }
}

function validatePayload(payload) {
  const name = sanitizeText(payload?.name)
  const email = sanitizeText(payload?.email)
  const serviceType = sanitizeText(payload?.serviceType)
  const message = sanitizeText(payload?.message)
  const honeypot = sanitizeText(payload?.honeypot)

  if (honeypot) {
    return { ok: false, statusCode: 200, body: { success: true } }
  }

  if (!name || !email || !serviceType || !message) {
    return { ok: false, statusCode: 400, body: { success: false, message: 'Please fill out all required fields.' } }
  }

  if (!isValidEmail(email)) {
    return { ok: false, statusCode: 400, body: { success: false, message: 'Please enter a valid email address.' } }
  }

  if (!message.trim()) {
    return { ok: false, statusCode: 400, body: { success: false, message: 'Message cannot be empty.' } }
  }

  return {
    ok: true,
    value: {
      name,
      email,
      phone: sanitizeText(payload?.phone),
      serviceType,
      message,
    },
  }
}

function buildSubject(kind, payload) {
  return kind === 'waitlist'
    ? `New Crypto Services Waitlist Signup: ${payload.name}`
    : `Calo Capital Contact Request from ${payload.name}`
}

function buildText(kind, payload) {
  const base = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Service Type: ${payload.serviceType}`,
    '',
    'Message:',
    payload.message,
  ]

  if (kind === 'waitlist') {
    base.splice(4, 0, '', 'Crypto Services waitlist signup from calocapital.io.')
  }

  return base.join('\n')
}

function buildHtml(kind, payload) {
  const intro = kind === 'waitlist' ? 'Crypto Services waitlist signup from calocapital.io.' : 'Contact request from calocapital.io.'

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <p>${escapeHtml(intro)}</p>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone || 'Not provided')}</p>
      <p><strong>Service Type:</strong> ${escapeHtml(payload.serviceType)}</p>
      <p><strong>Message:</strong><br />${escapeHtml(payload.message).replace(/\n/g, '<br />')}</p>
    </div>
  `
}

async function sendEmail(kind, payload) {
  if (process.env.RESEND_MOCK_DELIVERY === '1' && process.env.NODE_ENV !== 'production') {
    return { statusCode: 200, body: { success: true, id: `mock_${kind}` } }
  }

  const apiKey = trimValue(process.env.RESEND_API_KEY)
  if (!apiKey) {
    return { statusCode: 500, body: { success: false, message: 'Missing RESEND_API_KEY environment variable.' } }
  }

  const from = trimValue(process.env.RESEND_FROM_EMAIL) || DEFAULT_FROM_EMAIL
  const recipients = trimValue(process.env.RESEND_TO_EMAILS)
    ? trimValue(process.env.RESEND_TO_EMAILS)
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean)
    : DEFAULT_RECIPIENTS

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: payload.email,
      subject: buildSubject(kind, payload),
      text: buildText(kind, payload),
      html: buildHtml(kind, payload),
    }),
  })

  let responseBody = {}
  try {
    responseBody = await response.json()
  } catch {
    responseBody = {}
  }

  if (!response.ok) {
    console.error('Resend delivery failed:', response.status)
    return {
      statusCode: response.status,
      body: {
        success: false,
        message: 'Email delivery failed. Please try again later.',
      },
    }
  }

  return { statusCode: 200, body: { success: true, id: responseBody.id || null } }
}

function createHandler(kind) {
  return async function handler(event) {
    if ((event?.httpMethod || '').toUpperCase() !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method not allowed.' }) }
    }

    const payload = parseJsonBody(event)
    if (!payload) {
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid JSON payload.' }) }
    }

    const ip = getClientIp(event?.headers)
    if (!checkRateLimit(ip)) {
      return { statusCode: 429, body: JSON.stringify({ success: false, message: 'Too many submissions. Please try again later.' }) }
    }

    const validation = validatePayload(payload)
    if (!validation.ok) {
      return { statusCode: validation.statusCode, body: JSON.stringify(validation.body) }
    }

    const result = await sendEmail(kind, validation.value)
    return { statusCode: result.statusCode, body: JSON.stringify(result.body) }
  }
}

export const createContactHandler = () => createHandler('contact')
export const createWaitlistHandler = () => createHandler('waitlist')
