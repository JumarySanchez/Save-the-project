import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createContactHandler } from './server/email.js'
import { createMacroHandler } from './server/macro.js'

async function readJsonBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

function formsDevProxy() {
  function handleRequest(handlerFactory, method = 'POST') {
    return async function middleware(req, res, next) {
      if (req.method !== method) {
        next()
        return
      }

      try {
        const handler = handlerFactory()
        const body = method === 'POST' ? await readJsonBody(req) : {}
        const result = await handler({
          httpMethod: method,
          headers: req.headers,
          body: JSON.stringify(body),
        })

        res.statusCode = result.statusCode || 200
        res.setHeader('Content-Type', 'application/json')
        res.end(result.body || JSON.stringify({ success: true }))
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, message: error instanceof Error ? error.message : 'Form submission failed.' }))
      }
    }
  }

  return {
    name: 'forms-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/contact', handleRequest(createContactHandler, 'POST'))
      server.middlewares.use('/api/macro', handleRequest(createMacroHandler, 'GET'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), formsDevProxy()],
})
