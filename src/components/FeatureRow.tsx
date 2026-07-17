import type { ReactNode } from 'react'
import { MotifPanel } from './BrandMotif'
import { Reveal } from './Reveal'

/**
 * Section éditoriale asymétrique : grande image d'un côté (~58 %), texte de
 * l'autre (~42 %), alternable gauche/droite via `flip`. Empilement propre en
 * mobile (image puis texte). Si `image` est absente, un panneau motif de marque
 * remplace la photo (jamais de vide) — passer une vraie URL plus tard suffit.
 *
 * À placer dans une <Section> (pour le fond + l'espacement).
 */
export function FeatureRow({
  image,
  alt = '',
  kicker,
  title,
  children,
  cta,
  flip = false,
  ratio = 'aspect-[4/3]',
  motifTone = 'brand',
  motifLabel,
  eager = false,
}: {
  image?: string
  alt?: string
  kicker?: ReactNode
  title: ReactNode
  children?: ReactNode
  cta?: ReactNode
  /** Image à droite (alterne le rythme d'une section à l'autre). */
  flip?: boolean
  ratio?: string
  motifTone?: 'brand' | 'event'
  motifLabel?: string
  eager?: boolean
}) {
  return (
    <Reveal>
      <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
        {/* Image */}
        <div className={flip ? 'md:order-2 md:col-span-7' : 'md:col-span-7'}>
          <div
            className={`group ${ratio} overflow-hidden rounded-2xl bg-surface shadow-card`}
          >
            {image ? (
              <img
                src={image}
                alt={alt}
                loading={eager ? 'eager' : 'lazy'}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <MotifPanel tone={motifTone} label={motifLabel} />
            )}
          </div>
        </div>

        {/* Texte */}
        <div className={flip ? 'md:order-1 md:col-span-5' : 'md:col-span-5'}>
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-label text-accent-strong">
              {kicker}
            </p>
          )}
          <h2 className="mt-1.5 font-heading text-3xl text-primary-dark md:text-4xl">
            {title}
          </h2>
          {children && <div className="mt-3 max-w-prose text-ink/80">{children}</div>}
          {cta && <div className="mt-5 flex flex-wrap gap-3">{cta}</div>}
        </div>
      </div>
    </Reveal>
  )
}
