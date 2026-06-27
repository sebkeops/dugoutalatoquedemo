import type { ReactNode } from 'react'

/**
 * Carte de contenu — surface artisanale, coins arrondis, ombre chaude.
 * `accent` ajoute un liseré terracotta (mise en avant événementielle).
 * `interactive` ajoute un léger lift au survol (pour les cartes cliquables).
 */
export function Card({
  accent = false,
  interactive = false,
  className = '',
  children,
}: {
  accent?: boolean
  interactive?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={[
        'rounded-card bg-surface p-6 shadow-card',
        accent ? 'border-l-4 border-accent-strong' : 'border border-secondary/35',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
