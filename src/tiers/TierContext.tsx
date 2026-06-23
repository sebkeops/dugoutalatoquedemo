import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { isUnlocked, TIERS, type Tier, type TierInfo } from './types'

/**
 * "Mode présentation" : la formule sélectionnée irrigue toute l'app.
 * Les garde-fous (TierGate) et badges (TierBadge) s'y abonnent pour réagir
 * en direct quand on bascule F1 / F2 / F3.
 */
interface TierContextValue {
  /** Formule actuellement présentée. */
  tier: Tier
  /** Métadonnées de la formule courante (code, nom, recommandée). */
  info: TierInfo
  /** Bascule la formule présentée. */
  setTier: (tier: Tier) => void
  /** Un `minTier` est-il débloqué par la formule courante ? */
  unlocked: (minTier: Tier) => boolean
}

const TierContext = createContext<TierContextValue | null>(null)

export function TierProvider({
  children,
  initialTier = 2,
}: {
  children: ReactNode
  /** Formule affichée au démarrage (défaut : F2, la recommandée). */
  initialTier?: Tier
}) {
  const [tier, setTier] = useState<Tier>(initialTier)

  const value = useMemo<TierContextValue>(
    () => ({
      tier,
      info: TIERS[tier],
      setTier,
      unlocked: (minTier: Tier) => isUnlocked(minTier, tier),
    }),
    [tier],
  )

  return <TierContext.Provider value={value}>{children}</TierContext.Provider>
}

/** Accès au mode présentation. Doit être appelé sous <TierProvider>. */
export function useTier(): TierContextValue {
  const ctx = useContext(TierContext)
  if (!ctx) {
    throw new Error('useTier() doit être utilisé à l’intérieur de <TierProvider>.')
  }
  return ctx
}
