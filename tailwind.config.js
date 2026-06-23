/** @type {import('tailwindcss').Config} */
import { palette } from './src/theme/palette.js'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Couleurs de marque exposées en classes utilitaires (bg-primary, text-ink…).
        primary: palette.primary,
        'primary-dark': palette.primaryDark,
        secondary: palette.secondary,
        cream: palette.cream,
        surface: palette.surface,
        ink: palette.ink,
        'on-primary': palette.onPrimary,
        // Accent terracotta (couche événementielle / traiteur).
        accent: palette.accent,
        'accent-strong': palette.accentStrong,
        'on-accent': palette.onAccent,
      },
      fontFamily: {
        heading: ['Georgia', 'Times New Roman', 'serif'],
        body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Échelle artisanale (voir src/theme/tokens.ts → typeScale).
        display: ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      borderRadius: {
        button: '0.5rem',
        card: '0.75rem',
        pill: '9999px',
      },
      boxShadow: {
        // Ombres discrètes, teintées brun plutôt que noir pur.
        soft: '0 1px 2px rgba(58, 44, 35, 0.06)',
        card: '0 4px 16px -6px rgba(58, 44, 35, 0.12)',
        lifted: '0 12px 32px -10px rgba(58, 44, 35, 0.20)',
      },
      letterSpacing: {
        label: '0.08em',
      },
    },
  },
  plugins: [],
}
