import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/caos-api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/caos-api/, '')
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'src/test/**',
        'dist/**',
        'coverage/**',
        'vite.config.js',
        'src/main.jsx'
      ]
    }
  }
})
