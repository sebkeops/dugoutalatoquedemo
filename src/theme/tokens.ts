// @ts-expect-error — module JS partagé sans déclarations de types (source unique de la palette).
import { palette as rawPalette } from './palette.js'

/** Couleurs de marque (voir src/theme/palette.js). */
export const colors = rawPalette as {
  primary: string
  primaryDark: string
  secondary: string
  cream: string
  surface: string
  ink: string
  onPrimary: string
  accent: string
  accentStrong: string
  onAccent: string
}

/** Familles typographiques centralisées (self-hostées via @fontsource-variable). */
export const fonts = {
  // Titres — Fraunces (display serif chaleureux, ambiance artisanale).
  heading: "'Fraunces Variable', Fraunces, Georgia, serif",
  // Corps — Inter (humaniste, lisible).
  body: "'Inter Variable', Inter, system-ui, sans-serif",
}

/**
 * Échelle typographique (taille / interligne / graisse conseillée).
 * Ambiance artisanale : titres généreux et aérés, corps lisible.
 */
export const typeScale = {
  display: { size: '2.5rem', leading: '1.1', weight: '700' }, // héros
  h1: { size: '2rem', leading: '1.15', weight: '700' },
  h2: { size: '1.5rem', leading: '1.2', weight: '600' },
  h3: { size: '1.25rem', leading: '1.3', weight: '600' },
  body: { size: '1rem', leading: '1.6', weight: '400' },
  small: { size: '0.875rem', leading: '1.5', weight: '400' },
}

/** Rayons de référence. */
export const radii = {
  button: '0.5rem',
  card: '0.75rem',
  lg: '1rem',
  pill: '9999px',
}

/** Ombres discrètes (teintées brun plutôt que noir pur). */
export const shadows = {
  soft: '0 1px 2px rgba(58, 44, 35, 0.06)',
  card: '0 4px 16px -6px rgba(58, 44, 35, 0.12)',
  lifted: '0 12px 32px -10px rgba(58, 44, 35, 0.20)',
}

export const theme = { colors, fonts, typeScale, radii, shadows }
export type Theme = typeof theme
