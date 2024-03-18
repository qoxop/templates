import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "providers":  path.resolve(__dirname, "./providers"),
      "i18n":  path.resolve(__dirname, "./i18n"),
    },
  },
})
