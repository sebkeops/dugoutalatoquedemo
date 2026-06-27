import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'

type SectionTone = 'cream' | 'surface' | 'dark'

const TONES: Record<SectionTone, string> = {
  cream: 'bg-cream text-ink',
  surface: 'bg-surface text-ink',
  dark: 'bg-primary-dark text-on-primary',
}

/**
 * Section de page éditoriale : fond pleine bande alternable (crème / surface /
 * brun sombre), en-tête optionnel (kicker terracotta + grand titre), espacement
 * généreux en desktop et resserré en mobile. L'en-tête se révèle au scroll.
 *
 * Sert à homogénéiser le rythme sans dupliquer le balisage d'une page à l'autre.
 */
export function Section({
  kicker,
  title,
  tone = 'cream',
  width = 'wide',
  headerCta,
  className = '',
  children,
}: {
  kicker?: ReactNode
  title?: ReactNode
  tone?: SectionTone
  width?: 'content' | 'wide'
  /** Élément aligné à droite du titre (ex. lien « Tout voir »). */
  headerCta?: ReactNode
  className?: string
  children: ReactNode
}) {
  const dark = tone === 'dark'

  return (
    <section className={`${TONES[tone]} py-10 md:py-16`}>
      <Container width={width} className={className}>
        {(kicker || title) && (
          <Reveal className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                {kicker && (
                  <p
                    className={`text-xs font-semibold uppercase tracking-label ${
                      dark ? 'text-accent' : 'text-accent-strong'
                    }`}
                  >
                    {kicker}
                  </p>
                )}
                {title && (
                  <h2
                    className={`mt-1.5 font-heading text-3xl md:text-4xl ${
                      dark ? 'text-on-primary' : 'text-primary-dark'
                    }`}
                  >
                    {title}
                  </h2>
                )}
              </div>
              {headerCta}
            </div>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  )
}
