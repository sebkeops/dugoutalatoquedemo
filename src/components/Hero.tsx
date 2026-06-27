import type { CSSProperties, ReactNode } from 'react'
import { Container } from './Container'

type Tone = 'brand' | 'event'

/** Motif décoratif (anneau « tache de café » du logo + sprig botanique). */
function HeroMotif() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -right-6 -top-8 h-64 w-64 text-cream/10 md:h-80 md:w-80"
      fill="none"
    >
      <circle cx="120" cy="80" r="64" stroke="currentColor" strokeWidth="10" />
      <circle cx="120" cy="80" r="48" stroke="currentColor" strokeWidth="3" />
      <path
        d="M70 170V120M70 138c-9 0-18-6-21-18 12 0 21 6 21 18zM70 144c9 0 18-6 21-18-12 0-21 6-21 18z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Section héros pleine bande — photos en grand, titre généreux.
 * Mobile-first : colonne étroite à 375px, élargie à partir de md.
 *
 * Identité à deux couches : `brand` (brun) / `event` (terracotta).
 * `image` pose une photo de fond (léger ken-burns) ; deux calques en dégradé
 * (couleur de marque, plus denses à gauche/bas) garantissent la lisibilité.
 * Sans `image`, un motif discret (tache de café + botanique) évite le demi-hero vide.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  imagePosition,
  tone = 'brand',
  className = '',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  image?: string
  imagePosition?: string
  tone?: Tone
  className?: string
}) {
  const solid = tone === 'event' ? 'bg-accent-strong' : 'bg-primary-dark'
  const veilSide =
    tone === 'event'
      ? 'bg-gradient-to-r from-accent-strong/90 via-accent-strong/65 to-accent-strong/30'
      : 'bg-gradient-to-r from-primary-dark/90 via-primary-dark/65 to-primary-dark/30'
  const veilBottom =
    tone === 'event'
      ? 'bg-gradient-to-t from-accent-strong/55 to-transparent'
      : 'bg-gradient-to-t from-primary-dark/55 to-transparent'

  const imgStyle: CSSProperties | undefined = imagePosition
    ? { objectPosition: imagePosition }
    : undefined

  return (
    <section
      className={`relative overflow-hidden text-on-primary ${solid} ${className}`}
    >
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            style={imgStyle}
            className="absolute inset-0 h-full w-full animate-kenburns object-cover motion-reduce:animate-none"
          />
          <div className={`absolute inset-0 ${veilSide}`} />
          <div className={`absolute inset-0 ${veilBottom}`} />
        </>
      ) : (
        <HeroMotif />
      )}

      <Container width="wide" className="relative py-16 md:py-24">
        <div className="max-w-2xl space-y-4">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-label text-on-primary/85">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-4xl text-on-primary md:text-display-lg">
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
