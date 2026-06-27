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
        // Titres : Fraunces (display serif chaleureux). Corps : Inter (humaniste).
        heading: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        body: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Échelle éditoriale (voir src/theme/tokens.ts → typeScale).
        display: ['2.75rem', { lineHeight: '1.04', fontWeight: '600' }],
        'display-lg': ['3.75rem', { lineHeight: '1.0', fontWeight: '600' }],
      },
      borderRadius: {
        button: '0.625rem',
        card: '1rem',
        pill: '9999px',
      },
      boxShadow: {
        // Ombres chaudes (teintées brun), plus de profondeur.
        soft: '0 1px 2px rgba(58, 44, 35, 0.06)',
        card: '0 8px 24px -8px rgba(58, 44, 35, 0.18)',
        lifted: '0 18px 40px -12px rgba(58, 44, 35, 0.28)',
      },
      letterSpacing: {
        label: '0.08em',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        // Ken-burns lent sur les photos de hero (atténué si reduced-motion).
        kenburns: 'kenburns 22s ease-out forwards',
      },
    },
  },
  plugins: [],
}
