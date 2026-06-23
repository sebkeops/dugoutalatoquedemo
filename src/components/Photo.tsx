import { useState } from 'react'
import { photoUrl } from '../data/images'

/**
 * Photo optimisée servie depuis src/assets (via images.ts).
 * Remplit son conteneur en `object-cover`. Si le fichier est absent ou échoue
 * au chargement, affiche un fallback discret au lieu d'une image cassée.
 *
 * Le conteneur parent impose le ratio (ex. `aspect-square`).
 */
export function Photo({
  file,
  alt,
  className = '',
  loading = 'lazy',
}: {
  file: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const url = photoUrl(file)
  const [failed, setFailed] = useState(false)

  if (!url || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-surface text-secondary ${className}`}
      >
        <span className="px-3 text-center text-xs">Visuel à venir</span>
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
