import { defineConfig } from "vite"

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true
            }
        },
        headers: {
            'Content-Security-Policy': "default-src 'self'; connect-src 'self' http://localhost:3001 ws://localhost:* ws://127.0.0.1:*; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: blob:"
        }
    }
})
