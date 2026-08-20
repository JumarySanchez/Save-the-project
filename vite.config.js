import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createMacroHandler } from './server/macro.js'

function formsDevProxy() {
  function handleRequest(handlerFactory, method = 'POST') {
    return async function middleware(req, res, next) {
      if (req.method !== method) {
        next()
        return
      }

      try {
        const handler = handlerFactory()
        const result = await handler({
          httpMethod: method,
          headers: req.headers,
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
      server.middlewares.use('/api/macro', handleRequest(createMacroHandler, 'GET'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), formsDevProxy()],
})
