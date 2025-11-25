import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',          // custom domain = root, so this is fine
  build: {
    outDir: 'docs',   // <— IMPORTANT: GitHub Pages will serve from /docs
  },
})
