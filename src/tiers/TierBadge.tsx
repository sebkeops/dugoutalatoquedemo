import { TIERS, tierInclusionLabel, type Tier } from './types'

/**
 * Étiquette d'inclusion d'une fonctionnalité selon sa formule minimale.
 * Ex. <TierBadge minTier={2} /> → "Dès la formule Intermédiaire".
 *
 * Variante `compact` : n'affiche que le code (F1/F2/F3), utile dans les listes.
 */
export function TierBadge({
  minTier,
  compact = false,
  className = '',
}: {
  minTier: Tier
  compact?: boolean
  className?: string
}) {
  const info = TIERS[minTier]
  const base =
    'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 text-xs font-medium'
  // F1 = ton neutre ; F2/F3 = accent terracotta (montée en gamme).
  const tone =
    minTier === 1
      ? 'border-secondary/50 bg-surface text-primary-dark'
      : 'border-accent-strong/30 bg-accent/20 text-accent-strong'

  return (
    <span className={`${base} ${tone} ${className}`} title={tierInclusionLabel(minTier)}>
      <span className="font-semibold tracking-label">{info.code}</span>
      {!compact && <span>{tierInclusionLabel(minTier)}</span>}
    </span>
  )
}
