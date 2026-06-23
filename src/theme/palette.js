/**
 * Palette de marque — SOURCE UNIQUE de vérité des couleurs.
 *
 * Importée à la fois par `tailwind.config.js` (génération des classes utilitaires)
 * et par `src/theme/tokens.ts` (usage typé côté application).
 * Rebrander = modifier ce seul fichier.
 *
 * Identité confirmée, extraite du logo "Du Goût à la Toque"
 * (ambiance artisanale chaleureuse).
 */
export const palette = {
  // Brun primaire — boutons, liens, accents.
  primary: '#7C5840',
  // Brun foncé — titres, survols, état actif (le "DGT" du logo).
  primaryDark: '#5C3E2E',
  // Caramel clair — secondaire, bordures, étiquettes.
  secondary: '#A78975',
  // Fond crème — fond de page.
  cream: '#F4EDE7',
  // Surface — cartes, blocs, champs.
  surface: '#EAE0D8',
  // Texte courant — corps de texte.
  ink: '#3A2C23',
  // Texte sur boutons bruns.
  onPrimary: '#F4EDE7',
}
