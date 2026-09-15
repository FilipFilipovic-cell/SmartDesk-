import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: /SmartDesk-/ za GitHub Pages, / za Vercel
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/SmartDesk-/',
  plugins: [react(), tailwindcss()],
})
