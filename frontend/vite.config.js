import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
     react(),
     tailwindcss(),
  ],
  corePlugins: {
    // optional: to reduce default CSS
    scrollbar: false,
  },
  server: {
    host: true, // or use "0.0.0.0"
  },
})
