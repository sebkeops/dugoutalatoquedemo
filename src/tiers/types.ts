/**
 * Logique des formules tarifaires (F1 / F2 / F3).
 *
 * Chaque fonctionnalité/section du projet porte un `minTier` : la formule
 * minimale qui la débloque. Le "mode présentation" (à venir) sélectionnera une
 * formule et grisera ce qui n'est pas inclus.
 *
 * Phase 0 : types seulement, aucune logique métier branchée.
 */

/** Niveau de formule. 1 = Vitrine, 2 = Intermédiaire, 3 = Complète. */
export type Tier = 1 | 2 | 3

export interface TierInfo {
  tier: Tier
  /** Identifiant court, ex. "F1". */
  code: string
  /** Nom commercial, ex. "Vitrine essentielle". */
  name: string
  /** Formule mise en avant auprès du client. */
  recommended?: boolean
}

export const TIERS: Record<Tier, TierInfo> = {
  1: { tier: 1, code: 'F1', name: 'Vitrine essentielle' },
  2: { tier: 2, code: 'F2', name: 'Intermédiaire', recommended: true },
  3: { tier: 3, code: 'F3', name: 'Complète' },
}

/** Une formule `current` débloque-t-elle un élément de `minTier` requis ? */
export function isUnlocked(minTier: Tier, current: Tier): boolean {
  return current >= minTier
}
