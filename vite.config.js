import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        generator: resolve(__dirname, 'generator.html'),
        about: resolve(__dirname, 'about.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
      }
    }
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: true
  }
})
