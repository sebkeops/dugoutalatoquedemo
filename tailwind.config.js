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
      },
      fontFamily: {
        heading: ['Georgia', 'Times New Roman', 'serif'],
        body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '0.75rem',
        button: '0.5rem',
      },
    },
  },
  plugins: [],
}
