import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, DemoBanner } from '../components'
import { TierBadge, TierGate } from '../tiers'
import { tierLockedLabel, type Tier } from '../tiers/types'

/**
 * Cadre commun des écrans de back-office (mockups).
 * - bandeau « Aperçu — démonstration » ;
 * - en-tête : retour à l'espace gestion, titre, TierBadge ;
 * - contenu encapsulé dans <TierGate> : si la formule courante < minTier, on
 *   présente un écran verrouillé (réactif au mode présentation).
 */
export function MockupFrame({
  title,
  subtitle,
  minTier,
  children,
}: {
  title: string
  subtitle?: string
  minTier: Tier
  children: ReactNode
}) {
  return (
    <div className="min-h-[60vh] bg-cream">
      <DemoBanner />
      <Container width="wide" className="space-y-6 py-6">
        <header className="space-y-2">
          <Link
            to="/gestion"
            className="text-xs font-medium text-secondary hover:text-primary-dark"
          >
            ← Espace gestion
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl">{title}</h1>
            <TierBadge minTier={minTier} />
          </div>
          {subtitle && <p className="text-sm text-ink/80">{subtitle}</p>}
        </header>

        <TierGate minTier={minTier} fallback={<LockedScreen minTier={minTier} />}>
          {children}
        </TierGate>
      </Container>
    </div>
  )
}

/** Écran verrouillé : visible quand la formule courante ne débloque pas l'écran. */
function LockedScreen({ minTier }: { minTier: Tier }) {
  return (
    <Card accent>
      <h2 className="font-heading text-lg text-primary-dark">
        {tierLockedLabel(minTier)}
      </h2>
      <p className="mt-1 text-sm text-ink/80">
        Cet écran de back-office fait partie d’une formule supérieure. Basculez le
        « mode présentation » (en bas de l’écran) sur la formule concernée pour le
        découvrir.
      </p>
    </Card>
  )
}
