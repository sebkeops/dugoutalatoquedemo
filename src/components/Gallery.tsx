import type { Photo as PhotoData } from '../data/types'
import { Photo } from './Photo'

/**
 * Galerie de photos responsive — mobile-first.
 * 2 colonnes à 375px, 3 sur md. Chaque tuile est en ratio maîtrisé
 * (`aspect`) avec `object-cover` : aucun débordement, pas de déformation.
 */
export function Gallery({
  photos,
  ratio = 'aspect-square',
  className = '',
}: {
  photos: PhotoData[]
  ratio?: string
  className?: string
}) {
  if (photos.length === 0) return null

  return (
    <div className={`grid grid-cols-2 gap-3 md:grid-cols-3 ${className}`}>
      {photos.map((p, i) => (
        <figure
          key={p.file}
          className={`${ratio} overflow-hidden rounded-card bg-surface shadow-soft`}
        >
          <Photo file={p.file} alt={p.alt} loading={i < 4 ? 'eager' : 'lazy'} />
        </figure>
      ))}
    </div>
  )
}
