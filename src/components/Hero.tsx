import type { CSSProperties, ReactNode } from 'react'
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
 * `image` pose une photo de fond ; deux calques en dégradé (couleur de marque)
 * garantissent la lisibilité du texte clair — plus denses à GAUCHE et en BAS, là
 * où se trouvent l'eyebrow, le titre et les boutons. `imagePosition` ajuste le
 * cadrage (object-position) pour garder le sujet visible. Sans `image`, le
 * comportement actuel (fond plein) est inchangé.
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
  /** object-position de la photo (ex. "center", "center 40%"). Défaut : centré. */
  imagePosition?: string
  tone?: Tone
  className?: string
}) {
  const solid = tone === 'event' ? 'bg-accent-strong' : 'bg-primary-dark'
  // Calque horizontal : dense à gauche (texte), photo visible à droite.
  const veilSide =
    tone === 'event'
      ? 'bg-gradient-to-r from-accent-strong/90 via-accent-strong/65 to-accent-strong/30'
      : 'bg-gradient-to-r from-primary-dark/90 via-primary-dark/65 to-primary-dark/30'
  // Calque vertical : densité supplémentaire en bas (boutons / sous-titre).
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
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            style={imgStyle}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 ${veilSide}`} />
          <div className={`absolute inset-0 ${veilBottom}`} />
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
