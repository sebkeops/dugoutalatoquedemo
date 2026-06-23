import type { ReactNode } from 'react'

/**
 * Carte de contenu — surface artisanale, coins arrondis, ombre discrète.
 * `accent` ajoute un liseré terracotta (mise en avant événementielle).
 */
export function Card({
  accent = false,
  className = '',
  children,
}: {
  accent?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={[
        'rounded-card bg-surface p-5 shadow-card',
        accent ? 'border-l-4 border-accent-strong' : 'border border-secondary/25',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
