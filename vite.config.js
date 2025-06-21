import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

console.log('viteee')
export default defineConfig({
  plugins: [react(), tailwindcss()]
})
