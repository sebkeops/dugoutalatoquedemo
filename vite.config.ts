import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base relative pour un déploiement statique flexible (GitHub Pages, sous-chemin…).
  base: './',
})
