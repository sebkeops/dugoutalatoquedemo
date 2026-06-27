import type { Tier } from '../tiers/types'

/**
 * Soirées à thème du restaurant (mise en avant « soirée du mois » — feature F1).
 * Contenu d'exemple : intitulés évocateurs, AUCUN prix. Le visuel pointe vers un
 * fichier non encore fourni → fallback « Visuel à venir » géré par <Photo>.
 */
export interface Soiree {
  slug: string
  theme: string
  /** Date lisible (placeholder tant que non confirmée par le client). */
  date: string
  description: string
  /** Nom de fichier du visuel (placeholder pour l'instant). */
  visuel: string
  minTier: Tier
}

/** La soirée mise en avant ce mois-ci sur la Home. */
export const SOIREE_DU_MOIS: Soiree = {
  slug: 'soiree-tapas-ete',
  theme: 'PLACEHOLDER — Soirée tapas d’été',
  date: 'Vendredi 17 juillet 2026, à partir de 19h30',
  description:
    'Une soirée conviviale autour de petites assiettes à partager, dans l’ambiance du restaurant. Places limitées, sur réservation.',
  visuel: 'soiree-du-mois.jpg',
  minTier: 1,
}

/** Prochaines soirées (placeholder — à compléter par le client). */
export const SOIREES: Soiree[] = [SOIREE_DU_MOIS]
