import type { ReactNode } from 'react'
import { useTier } from './TierContext'
import { tierLockedLabel, type Tier } from './types'

/**
 * Garde-fou de formule. Si la formule courante < `minTier` :
 *  - `fallback` fourni : affiche ce contenu de remplacement (ex. « Contactez-nous ») ;
 *  - sinon mode "dim" (défaut) : estompe le bloc + étiquette "Disponible en formule X" ;
 *  - sinon mode "hide" : masque complètement le bloc.
 * Si la formule courante débloque `minTier`, le contenu s'affiche normalement.
 */
export function TierGate({
  minTier,
  mode = 'dim',
  fallback,
  children,
}: {
  minTier: Tier
  mode?: 'dim' | 'hide'
  fallback?: ReactNode
  children: ReactNode
}) {
  const { unlocked } = useTier()

  if (unlocked(minTier)) return <>{children}</>
  if (fallback !== undefined) return <>{fallback}</>
  if (mode === 'hide') return null

  return (
    <div className="relative overflow-hidden rounded-card" aria-disabled="true">
      {/* Contenu réel, estompé et neutralisé aux interactions. */}
      <div className="pointer-events-none select-none opacity-40 grayscale">
        {children}
      </div>
      {/* Voile + étiquette d'indisponibilité. */}
      <div className="absolute inset-0 flex items-center justify-center bg-cream/40 p-4">
        <span className="rounded-pill border border-accent-strong/30 bg-cream/90 px-3 py-1 text-xs font-medium text-accent-strong shadow-soft">
          {tierLockedLabel(minTier)}
        </span>
      </div>
    </div>
  )
}
