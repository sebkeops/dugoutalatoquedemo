/**
 * Résolution des images optimisées (src/assets/photos) en URLs servies par Vite.
 *
 * On passe par import.meta.glob plutôt que par des chemins en dur : les URLs sont
 * hachées et résolues selon la `base` Vite, donc robustes en déploiement. Les
 * données (univers, événements) ne stockent que des noms de fichiers ;
 * `photoUrl()` fait la correspondance.
 *
 * Les fichiers proviennent du pipeline `scripts/optimize-assets.mjs`
 * (sources/ -> src/assets/photos/), jamais de `sources/` directement.
 */
import logo from '../assets/logo.jpg'

const modules = import.meta.glob('../assets/photos/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

// Index par nom de fichier seul (ex. "mariage-01.jpg" -> URL hachée).
const byName: Record<string, string> = {}
for (const [filePath, url] of Object.entries(modules)) {
  const name = filePath.split('/').pop()!
  byName[name] = url
}

/** URL servie d'une photo par son nom de fichier, ou `undefined` si absente. */
export function photoUrl(name: string): string | undefined {
  return byName[name]
}

/** URL du logo optimisé (src/assets/logo.jpg). */
export const logoUrl = logo

/**
 * URL de la photo de fond du hero HomePage, servie en statique depuis
 * public/assets (générée par le pipeline, pas depuis sources/). Résolue via
 * `BASE_URL` pour rester correcte quelle que soit la base de déploiement.
 */
export const heroUrl = `${import.meta.env.BASE_URL}assets/hero.jpg`

/** Tous les noms de photos disponibles (utile pour debug / galeries auto). */
export const photoNames = Object.keys(byName).sort()
