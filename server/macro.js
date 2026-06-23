const COINGECKO_SIMPLE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
const COINGECKO_BTC_HISTORY_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily'
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations'

const FALLBACK_PAYLOAD = {
  metricCards: [
    {
      name: 'Inflation',
      value: 3.2,
      valueType: 'percent',
      change: 0.2,
      label: 'Core CPI pressure index',
      sparkline: [0.28, 0.3, 0.37, 0.35, 0.43, 0.48, 0.54, 0.57, 0.61, 0.64],
      lineClass: 'stroke-[#9EE7FF]',
      areaClass: 'text-[#9EE7FF]',
    },
    {
      name: 'Interest Rates',
      value: 4.75,
      valueType: 'percent',
      change: -0.25,
      label: 'Policy benchmark rate',
      sparkline: [0.7, 0.68, 0.65, 0.61, 0.58, 0.53, 0.49, 0.45, 0.42, 0.39],
      lineClass: 'stroke-[#C6B8FF]',
      areaClass: 'text-[#C6B8FF]',
    },
    {
      name: 'Gold',
      value: 3395,
      valueType: 'currency',
      change: 1.4,
      label: 'Safe-haven momentum',
      sparkline: [0.36, 0.38, 0.4, 0.44, 0.5, 0.55, 0.52, 0.6, 0.66, 0.72],
      lineClass: 'stroke-[#E9F8FF]',
      areaClass: 'text-[#E9F8FF]',
    },
    {
      name: 'Bitcoin',
      value: 104382,
      valueType: 'currency',
      change: 2.8,
      label: 'Digital risk appetite',
      sparkline: [0.3, 0.33, 0.28, 0.38, 0.49, 0.45, 0.58, 0.61, 0.7, 0.76],
      lineClass: 'stroke-[#7EE4FF]',
      areaClass: 'text-[#7EE4FF]',
    },
    {
      name: 'S&P 500',
      value: 6125,
      valueType: 'number',
      change: 0.8,
      label: 'Broad equity benchmark',
      sparkline: [0.4, 0.44, 0.47, 0.46, 0.5, 0.53, 0.56, 0.58, 0.6, 0.64],
      lineClass: 'stroke-[#B7D6FF]',
      areaClass: 'text-[#B7D6FF]',
    },
  ],
  lineSeries: [
    { label: 'Gold', color: '#F4F7FB', points: [52, 54, 53, 57, 61, 63, 66, 68, 71, 74, 77, 79] },
    { label: 'Bitcoin', color: '#7EE4FF', points: [34, 36, 35, 42, 47, 45, 52, 58, 60, 63, 68, 72] },
    { label: 'S&P 500', color: '#C084FC', points: [46, 47, 49, 48, 51, 53, 55, 56, 58, 60, 61, 63] },
  ],
}

function sanitize(value) {
  return String(value ?? '').trim()
}

function toNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function normalizeSparkline(values, maxPoints = 10) {
  if (!Array.isArray(values) || values.length === 0) return Array.from({ length: maxPoints }, () => 0.5)

  const sliced = values.slice(-maxPoints)
  const min = Math.min(...sliced)
  const max = Math.max(...sliced)
  if (max === min) return sliced.map(() => 0.5)
  return sliced.map((value) => (value - min) / (max - min))
}

function normalizeLineSeries(values, maxPoints = 12) {
  const normalized = normalizeSparkline(values, maxPoints)
  return normalized.map((value) => 35 + value * 45)
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
  }
  return response.json()
}

async function fetchFredSeries(seriesId, apiKey, limit = 40) {
  if (!sanitize(apiKey)) {
    throw new Error(`Missing FRED API key for ${seriesId}`)
  }

  const url = `${FRED_BASE_URL}?series_id=${encodeURIComponent(seriesId)}&api_key=${encodeURIComponent(apiKey)}&file_type=json&sort_order=asc&limit=${limit}`
  const data = await fetchJson(url)
  const values = (data?.observations || [])
    .map((row) => ({ date: row.date, value: toNumber(row.value) }))
    .filter((row) => row.value !== null)

  if (values.length < 2) {
    throw new Error(`Not enough observations for ${seriesId}`)
  }

  return values
}

function withFallbackMetric(metricName, transform, errors) {
  const fallback = FALLBACK_PAYLOAD.metricCards.find((card) => card.name === metricName)
  try {
    return transform()
  } catch (error) {
    errors.push(`${metricName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return fallback
  }
}

async function buildMacroPayload() {
  const errors = []
  const fredApiKey = sanitize(process.env.FRED_API_KEY)

  let coingeckoSimple = null
  let bitcoinHistory = []

  try {
    coingeckoSimple = await fetchJson(COINGECKO_SIMPLE_URL)
  } catch (error) {
    errors.push(`CoinGecko quote: ${error instanceof Error ? error.message : 'Unavailable'}`)
  }

  try {
    const history = await fetchJson(COINGECKO_BTC_HISTORY_URL)
    bitcoinHistory = (history?.prices || []).map((row) => toNumber(row[1])).filter((value) => value !== null)
  } catch (error) {
    errors.push(`CoinGecko history: ${error instanceof Error ? error.message : 'Unavailable'}`)
  }

  let sp500Series = []
  let goldSeries = []
  let rateSeries = []
  let cpiSeries = []

  try {
    sp500Series = await fetchFredSeries('SP500', fredApiKey, 80)
  } catch (error) {
    errors.push(`FRED SP500: ${error instanceof Error ? error.message : 'Unavailable'}`)
  }

  try {
    goldSeries = await fetchFredSeries('GOLDAMGBD228NLBM', fredApiKey, 80)
  } catch (error) {
    errors.push(`FRED Gold: ${error instanceof Error ? error.message : 'Unavailable'}`)
  }

  try {
    rateSeries = await fetchFredSeries('FEDFUNDS', fredApiKey, 48)
  } catch (error) {
    errors.push(`FRED Rates: ${error instanceof Error ? error.message : 'Unavailable'}`)
  }

  try {
    cpiSeries = await fetchFredSeries('CPIAUCSL', fredApiKey, 72)
  } catch (error) {
    errors.push(`FRED Inflation: ${error instanceof Error ? error.message : 'Unavailable'}`)
  }

  const inflationCard = withFallbackMetric('Inflation', () => {
    if (cpiSeries.length < 14) throw new Error('Insufficient CPI history')
    const latest = cpiSeries[cpiSeries.length - 1].value
    const prevMonth = cpiSeries[cpiSeries.length - 2].value
    const prevYear = cpiSeries[cpiSeries.length - 13].value
    const yoy = ((latest / prevYear) - 1) * 100
    const mom = ((latest / prevMonth) - 1) * 100
    return {
      ...FALLBACK_PAYLOAD.metricCards[0],
      value: Number(yoy.toFixed(1)),
      change: Number(mom.toFixed(2)),
      sparkline: normalizeSparkline(cpiSeries.map((item) => item.value)),
    }
  }, errors)

  const ratesCard = withFallbackMetric('Interest Rates', () => {
    const latest = rateSeries[rateSeries.length - 1].value
    const prev = rateSeries[rateSeries.length - 2].value
    return {
      ...FALLBACK_PAYLOAD.metricCards[1],
      value: Number(latest.toFixed(2)),
      change: Number((latest - prev).toFixed(2)),
      sparkline: normalizeSparkline(rateSeries.map((item) => item.value)),
    }
  }, errors)

  const goldCard = withFallbackMetric('Gold', () => {
    const latest = goldSeries[goldSeries.length - 1].value
    const prev = goldSeries[goldSeries.length - 2].value
    const pct = ((latest - prev) / prev) * 100
    return {
      ...FALLBACK_PAYLOAD.metricCards[2],
      value: Math.round(latest),
      change: Number(pct.toFixed(2)),
      sparkline: normalizeSparkline(goldSeries.map((item) => item.value)),
    }
  }, errors)

  const bitcoinCard = withFallbackMetric('Bitcoin', () => {
    const btc = coingeckoSimple?.bitcoin
    if (!btc || !toNumber(btc.usd)) throw new Error('BTC quote unavailable')

    const change = toNumber(btc.usd_24h_change) || 0
    return {
      ...FALLBACK_PAYLOAD.metricCards[3],
      value: Math.round(btc.usd),
      change: Number(change.toFixed(2)),
      sparkline: bitcoinHistory.length ? normalizeSparkline(bitcoinHistory) : FALLBACK_PAYLOAD.metricCards[3].sparkline,
    }
  }, errors)

  const spxCard = withFallbackMetric('S&P 500', () => {
    const latest = sp500Series[sp500Series.length - 1].value
    const prev = sp500Series[sp500Series.length - 2].value
    const pct = ((latest - prev) / prev) * 100
    return {
      ...FALLBACK_PAYLOAD.metricCards[4],
      value: Math.round(latest),
      change: Number(pct.toFixed(2)),
      sparkline: normalizeSparkline(sp500Series.map((item) => item.value)),
    }
  }, errors)

  const lineSeries = [
    {
      label: 'Gold',
      color: '#F4F7FB',
      points: goldSeries.length
        ? normalizeLineSeries(goldSeries.map((item) => item.value))
        : FALLBACK_PAYLOAD.lineSeries[0].points,
    },
    {
      label: 'Bitcoin',
      color: '#7EE4FF',
      points: bitcoinHistory.length
        ? normalizeLineSeries(bitcoinHistory)
        : FALLBACK_PAYLOAD.lineSeries[1].points,
    },
    {
      label: 'S&P 500',
      color: '#C084FC',
      points: sp500Series.length
        ? normalizeLineSeries(sp500Series.map((item) => item.value))
        : FALLBACK_PAYLOAD.lineSeries[2].points,
    },
  ]

  return {
    metricCards: [inflationCard, ratesCard, goldCard, bitcoinCard, spxCard],
    lineSeries,
    warnings: errors,
    dataSources: {
      coingecko: Boolean(coingeckoSimple),
      fred: Boolean(fredApiKey),
    },
  }
}

export const createMacroHandler = () => {
  return async function handler(event) {
    if ((event?.httpMethod || 'GET').toUpperCase() !== 'GET') {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: 'Method not allowed.' }),
      }
    }

    try {
      const payload = await buildMacroPayload()
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          lastUpdated: new Date().toISOString(),
          payload,
        }),
      }
    } catch (error) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          lastUpdated: new Date().toISOString(),
          payload: {
            ...FALLBACK_PAYLOAD,
            warnings: [error instanceof Error ? error.message : 'Macro data unavailable.'],
            dataSources: { coingecko: false, fred: false },
          },
        }),
      }
    }
  }
}
