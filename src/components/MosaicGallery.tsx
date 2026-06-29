import type { Photo as PhotoData } from '../data/types'
import { Photo } from './Photo'
import { Reveal } from './Reveal'

/**
 * Galerie « magazine » : grille asymétrique où certaines tuiles sont mises en
 * avant (grand format 2×2) au milieu de tuiles carrées. Coins rounded-2xl,
 * ombre chaude, léger zoom au survol. Empilement propre en mobile (2 colonnes).
 *
 * Les tuiles carrées définissent la trame ; les tuiles « featured » (2 colonnes
 * × 2 rangées) restent alignées car elles aussi en ratio carré.
 */
export function MosaicGallery({
  photos,
  featuredEvery = 5,
  className = '',
}: {
  photos: PhotoData[]
  featuredEvery?: number
  className?: string
}) {
  if (photos.length === 0) return null

  return (
    <div
      className={`grid grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 ${className}`}
    >
      {photos.map((p, i) => {
        const featured = i % featuredEvery === 0
        return (
          <Reveal
            key={p.file}
            delay={(i % 6) * 50}
            className={featured ? 'col-span-2 row-span-2' : ''}
          >
            <figure className="group aspect-square h-full overflow-hidden rounded-2xl bg-surface shadow-card">
              <Photo
                file={p.file}
                alt={p.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          </Reveal>
        )
      })}
    </div>
  )
}
