import type { Tier } from '../tiers/types'

/**
 * Soirées à thème du restaurant (mise en avant « soirée du mois » — feature F1).
 * Le client organise une soirée à thème environ une fois par mois. L'intitulé et
 * la date ci-dessous sont un exemple plausible à faire confirmer avant mise en
 * ligne — AUCUN prix. Le visuel pointe vers un fichier non encore fourni →
 * fallback « Visuel à venir » géré par <Photo>.
 */
export interface Soiree {
  slug: string
  theme: string
  /** Date lisible (à confirmer par le client). */
  date: string
  description: string
  /** Nom de fichier du visuel (non encore fourni). */
  visuel: string
  minTier: Tier
}

/** La soirée mise en avant ce mois-ci sur la Home. */
export const SOIREE_DU_MOIS: Soiree = {
  slug: 'soiree-tapas-ete',
  theme: 'Soirée tapas d’été',
  date: 'Vendredi 17 juillet 2026, à partir de 19h30',
  description:
    'Une soirée conviviale autour de petites assiettes à partager, dans l’ambiance du restaurant. Places limitées, sur réservation.',
  visuel: 'soiree-du-mois.jpg',
  minTier: 1,
}

/** Prochaines soirées (à compléter par le client). */
export const SOIREES: Soiree[] = [SOIREE_DU_MOIS]
