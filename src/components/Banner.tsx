import type { CSSProperties, ReactNode } from 'react'
import { BrandMotif } from './BrandMotif'
import { Container } from './Container'

type Tone = 'brand' | 'event'

/**
 * Bande plein-cadre (edge-to-edge) : photo de fond + texte en surimpression
 * avec le dégradé de lisibilité de marque. Hauteur maîtrisée (ne pousse pas
 * tout hors écran en mobile). Sans `image`, un motif discret évite le vide.
 *
 * Se place directement dans la page (hors <Section>), entre deux sections,
 * pour casser la colonne et créer un moment fort.
 */
export function Banner({
  image,
  alt = '',
  imagePosition,
  kicker,
  title,
  subtitle,
  cta,
  tone = 'event',
  className = '',
}: {
  image?: string
  alt?: string
  imagePosition?: string
  kicker?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  cta?: ReactNode
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
      className={`relative flex min-h-[320px] items-center overflow-hidden text-on-primary md:min-h-[440px] ${solid} ${className}`}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={alt}
            loading="lazy"
            sizes="100vw"
            style={imgStyle}
            className="absolute inset-0 h-full w-full animate-kenburns object-cover motion-reduce:animate-none"
          />
          <div className={`absolute inset-0 ${veilSide}`} />
          <div className={`absolute inset-0 ${veilBottom}`} />
        </>
      ) : (
        <BrandMotif className="pointer-events-none absolute -right-6 -top-8 h-64 w-64 text-cream/10 md:h-80 md:w-80" />
      )}

      <Container width="wide" className="relative py-12 md:py-16">
        <div className="max-w-2xl space-y-3">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-label text-on-primary/85">
              {kicker}
            </p>
          )}
          <h2 className="font-heading text-3xl text-on-primary md:text-display">
            {title}
          </h2>
          {subtitle && (
            <p className="max-w-prose text-on-primary/90 md:text-lg">{subtitle}</p>
          )}
          {cta && <div className="flex flex-wrap gap-3 pt-1">{cta}</div>}
        </div>
      </Container>
    </section>
  )
}
