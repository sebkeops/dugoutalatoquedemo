import type { Tier } from '../tiers/types'

/**
 * Registre des écrans de back-office (mockups). Sert d'index pour la page
 * « Espace gestion (aperçu) » et de source unique des libellés / formules.
 */
export interface MockupScreen {
  id: string
  title: string
  description: string
  /** Chemin de la route. */
  to: string
  minTier: Tier
}

export const MOCKUP_SCREENS: MockupScreen[] = [
  {
    id: 'messages',
    title: 'Modération des messages',
    description:
      'Toutes les demandes de devis centralisées, filtrables par univers, avec vue détail.',
    to: '/gestion/messages',
    minTier: 2,
  },
  {
    id: 'mailing',
    title: 'Outil de mailing',
    description:
      'Votre liste de diffusion et un e-mail aux couleurs de l’enseigne, envoyé en un clic.',
    to: '/gestion/mailing',
    minTier: 2,
  },
  {
    id: 'contenu',
    title: 'Gestion de contenu',
    description:
      'Mettez à jour la soirée du mois et les visuels d’univers en toute autonomie.',
    to: '/gestion/contenu',
    minTier: 2,
  },
  {
    id: 'commandes',
    title: 'Commande en ligne — événements',
    description:
      'Activez un événement, suivez les commandes par statut et réglez les créneaux de retrait.',
    to: '/gestion/commandes',
    minTier: 3,
  },
]
