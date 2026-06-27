import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Hébergement à la RACINE du domaine (Vercel / Netlify) : base absolue '/'.
  // Indispensable avec un SPA + fallback : sur un lien profond rafraîchi
  // (ex. /gestion/messages), les assets doivent rester en '/assets/...'.
  // Déploiement en SOUS-CHEMIN (GitHub Pages /repo/) : remplacer par '/repo/'.
  base: '/',
})
