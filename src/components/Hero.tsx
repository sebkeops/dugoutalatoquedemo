import type { ReactNode } from 'react'
import { Container } from './Container'

type Tone = 'brand' | 'event'

/**
 * Section héros pleine bande — photos en grand, titre généreux.
 * Mobile-first : colonne étroite à 375px, élargie à partir de md.
 *
 * Identité à deux couches :
 *  - `brand` (défaut) : fond brun — structure, restaurant, navigation ;
 *  - `event` : accent terracotta — événementiel / traiteur (rappel des affiches menus).
 *
 * `image` pose une photo de fond ; un voile garantit la lisibilité du texte.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  tone = 'brand',
  className = '',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  image?: string
  tone?: Tone
  className?: string
}) {
  const solid = tone === 'event' ? 'bg-accent-strong' : 'bg-primary-dark'
  const veil = tone === 'event' ? 'bg-accent-strong/70' : 'bg-primary-dark/65'

  return (
    <section
      className={`relative overflow-hidden text-on-primary ${solid} ${className}`}
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 ${veil}`} />
        </>
      )}

      <Container width="wide" className="relative py-12 md:py-20">
        <div className="max-w-2xl space-y-4">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-label text-on-primary/80">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-3xl leading-tight text-on-primary md:text-display">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-on-primary/90 md:text-lg">{subtitle}</p>
          )}
          {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
        </div>
      </Container>
    </section>
  )
}
