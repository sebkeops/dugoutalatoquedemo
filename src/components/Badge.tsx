import type { ReactNode } from 'react'

type Tone = 'neutral' | 'primary' | 'accent'

const TONES: Record<Tone, string> = {
  neutral: 'border-secondary/50 bg-surface text-primary-dark',
  primary: 'border-primary/30 bg-primary text-on-primary',
  accent: 'border-accent-strong/30 bg-accent/20 text-accent-strong',
}

/**
 * Étiquette générique (catégorie, statut…). Pour l'inclusion par formule,
 * utiliser plutôt <TierBadge /> dans src/tiers.
 */
export function Badge({
  tone = 'neutral',
  className = '',
  children,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5',
        'text-xs font-medium tracking-label',
        TONES[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
