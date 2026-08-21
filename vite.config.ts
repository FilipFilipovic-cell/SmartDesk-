import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base mora da odgovara imenu GitHub repozitorijuma za Pages deploy
// (https://<user>.github.io/<repo>/)
export default defineConfig({
  base: '/SmartDesk-/',
  plugins: [react(), tailwindcss()],
})
