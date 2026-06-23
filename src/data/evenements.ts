import type { Evenement } from './types'

/**
 * Les 4 événements « à emporter » fixes du client. Photos réelles
 * (sources/a-emporter -> src/assets/photos). Les périodes sont indicatives
 * tant que le client ne les a pas confirmées.
 */
export const EVENEMENTS: Evenement[] = [
  {
    slug: 'noel',
    name: 'Noël',
    periode: 'Commandes en décembre',
    tagline: 'Vos plats de fête à emporter pour le réveillon de Noël.',
    cover: {
      file: 'a-emporter-01.jpg',
      alt: 'Bûche de Noël au chocolat et feuille d’or',
    },
    minTier: 1,
  },
  {
    slug: 'nouvel-an',
    name: 'Nouvel An',
    periode: 'Commandes fin décembre',
    tagline: 'Un réveillon gourmand sans cuisiner : bûches et bouchées festives.',
    cover: {
      file: 'a-emporter-03.jpg',
      alt: 'Bûche festive aux agrumes et fruit de la passion',
    },
    minTier: 1,
  },
  {
    slug: 'saint-valentin',
    name: 'Saint-Valentin',
    periode: 'Autour du 14 février',
    tagline: 'Un dîner en amoureux, finement préparé à emporter.',
    cover: {
      file: 'a-emporter-04.jpg',
      alt: 'Assortiment de madeleines et de macarons',
    },
    minTier: 1,
  },
  {
    slug: 'fete-des-meres',
    name: 'Fête des mères',
    periode: 'Fin mai',
    tagline: 'Faites-lui plaisir avec un repas raffiné, prêt à emporter.',
    cover: {
      file: 'a-emporter-07.jpg',
      alt: 'Verrines apéritives garnies de jeunes pousses',
    },
    minTier: 1,
  },
]
