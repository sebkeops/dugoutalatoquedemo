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
}

/** Familles typographiques centralisées. */
export const fonts = {
  // Titres — à remplacer par la police définitive en phase identité.
  heading: "'Georgia', 'Times New Roman', serif",
  // Corps de texte.
  body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
}

/** Rayons et espacements de référence (extensibles par phase). */
export const radii = {
  card: '0.75rem',
  button: '0.5rem',
}

export const theme = { colors, fonts, radii }
export type Theme = typeof theme
