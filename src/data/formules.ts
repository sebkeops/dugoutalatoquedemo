import type { Tier } from '../tiers/types'

/**
 * Matrice comparative des 3 formules (reprise du CLAUDE.md), pour la page
 * /formules. Chaque ligne porte le `minTier` qui la débloque : une formule
 * `t` inclut la ligne si `t >= minTier`. Aucun prix (devis sur demande).
 */
export interface FormuleFeature {
  label: string
  minTier: Tier
}

export interface FormuleCategory {
  title: string
  features: FormuleFeature[]
}

export const FORMULE_CATEGORIES: FormuleCategory[] = [
  {
    title: 'Vitrine & présence en ligne',
    features: [
      { label: 'Site vitrine : univers, restaurant, à emporter', minTier: 1 },
      { label: 'Soirée à thème du mois', minTier: 1 },
      { label: 'Inscription à la liste de diffusion', minTier: 1 },
      { label: 'Contact par téléphone & e-mail', minTier: 1 },
    ],
  },
  {
    title: 'Relation client & autonomie',
    features: [
      { label: 'Formulaire de devis en ligne', minTier: 2 },
      { label: 'Back-office : modération des messages', minTier: 2 },
      { label: 'Outil de mailing — envoi en un clic', minTier: 2 },
      { label: 'Gestion de contenu en autonomie', minTier: 2 },
    ],
  },
  {
    title: 'Commande en ligne — événements',
    features: [
      { label: 'Commande des événements à emporter', minTier: 3 },
      { label: 'Créneaux de retrait au quart d’heure', minTier: 3 },
      { label: 'Statuts de commande & impression', minTier: 3 },
    ],
  },
]

/** Niveau d'autonomie résumé par formule (ligne de synthèse). */
export const FORMULE_AUTONOMIE: Record<Tier, string> = {
  1: 'Autonomie minimale',
  2: 'Autonomie sur le contenu courant',
  3: 'Autonomie totale',
}
