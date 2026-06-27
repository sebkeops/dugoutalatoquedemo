import type { Commande } from './types'

/**
 * Commandes (fictives) de l'événement à emporter « Noël », pour le mockup de
 * gestion des commandes (F3). `evenementSlug` référence src/data/evenements.ts.
 */
export const COMMANDES: Commande[] = [
  {
    id: 'C-118',
    client: 'Famille Ortega',
    evenementSlug: 'noel',
    creneau: '10:00',
    articles: [
      { libelle: 'Bûche chocolat & feuille d’or', qte: 1 },
      { libelle: 'Plateau 12 bouchées festives', qte: 2 },
    ],
    statut: 'nouvelle',
  },
  {
    id: 'C-117',
    client: 'M. Delmas',
    evenementSlug: 'noel',
    creneau: '10:15',
    articles: [
      { libelle: 'Bûche aux agrumes', qte: 1 },
      { libelle: 'Foie gras mi-cuit (200 g)', qte: 1 },
    ],
    statut: 'confirmée',
  },
  {
    id: 'C-116',
    client: 'Mme Aubert',
    evenementSlug: 'noel',
    creneau: '10:15',
    articles: [{ libelle: 'Plateau 24 pièces cocktail', qte: 1 }],
    statut: 'confirmée',
  },
  {
    id: 'C-115',
    client: 'Famille Nguyen',
    evenementSlug: 'noel',
    creneau: '10:30',
    articles: [
      { libelle: 'Bûche chocolat & feuille d’or', qte: 1 },
      { libelle: 'Verrines de saumon (x6)', qte: 2 },
    ],
    statut: 'préparée',
  },
  {
    id: 'C-114',
    client: 'M. Roussel',
    evenementSlug: 'noel',
    creneau: '11:00',
    articles: [{ libelle: 'Assortiment madeleines & macarons', qte: 3 }],
    statut: 'nouvelle',
  },
]
