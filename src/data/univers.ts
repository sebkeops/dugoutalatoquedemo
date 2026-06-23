import type { Univers } from './types'

/**
 * Univers traiteur. Contenu RÉEL pour « Mariage » et « Entreprise »
 * (source : contenus-univers-reels.md). AUCUN PRIX n'est exposé : chaque univers
 * mène au formulaire de devis. Les univers sans visuels client restent en
 * placeholder explicite (`hasRealPhotos: false`, intitulés `PLACEHOLDER_`).
 */
export const UNIVERS: Univers[] = [
  {
    slug: 'mariage',
    name: 'Mariage & cérémonie',
    tagline:
      'Pour le plus beau jour, une cuisine de fête, généreuse et soignée, adaptable à votre saison et à vos envies.',
    groups: [
      {
        title: 'Le cocktail — pièces froides',
        note: 'Exemples',
        items: [
          "Tartelette au caviar d'aubergine et gravlax de canard",
          'Sablé parmesan, panna cotta à la tomate, billes de balsamique',
          'Mini-chou à la truite fumée et yuzu',
          'Panna cotta au basilic, chorizo et crumble parmesan',
          "Cheesecake aux poivrons, tapenade d'olives",
          'Blinis, gambas en papillon, tartare de piquillos',
          'Sablé parmesan, gel de tomate et jambon Serrano',
          'Pressé de porc confit, mayonnaise au curry',
          '« Saucisson » de bœuf confit, sauce gribiche',
          'Roulé de jambon speck, ricotta aux olives et parmesan',
          'Blinis, saumon mariné et crème montée au citron vert',
          "Sablé au piment d'Espelette, Ossau-Iraty, confit de cerises noires",
        ],
      },
      {
        title: 'Le cocktail — pièces chaudes',
        note: 'Exemples',
        items: [
          'Mini-nem de confit de canard au saté',
          'Tatin de boudin noir aux pommes',
          'Samossa aux légumes',
          'Tartelette aux escargots persillés',
          "Brioche à la saucisse fumée, comté et moutarde à l'ancienne",
          'Clafoutis aux tomates confites et fromage de chèvre',
        ],
      },
      {
        title: 'Ateliers & animations',
        note: 'Pour compléter le cocktail',
        items: [
          'Mozzarella, stracciatella et burrata, focaccia, pesto, olives et huile d’olive',
          'Dégustation de 3 huîtres ouvertes minute, citron et vinaigre à l’échalote',
          'Saumon mariné en gravlax tranché devant les convives, pain nordique, yaourt aux herbes',
          'Plancha minute : brochettes de poulet au citron confit, mini-burgers bœuf-cheddar',
          'Atelier maki minute : thon frais, gravlax de saumon, avocat, wasabi',
          'Tartares au couteau dressés minute : bœuf, espadon, saumon citron-aneth',
          'Découpe de jambon Serrano sur griffe, pain, beurre demi-sel, pimientos del padrón',
          "Foie gras mi-cuit, pain toasté et chutney de saison",
        ],
      },
      {
        title: 'Les menus à table',
        note: 'Deux niveaux de menu, déclinables (entrée / plat / fromage / dessert)',
        items: [
          'Tartelette feuilletée champignons & foie gras poêlé',
          'Déclinaison de saumon : gravlax, tartare, œufs de saumon, maki',
          'Tataki de thon au sésame, crémeux d’avocat',
          '« Tournedos » de bœuf confit façon Rossini',
          'Magret de canard rôti, siphon de foie gras',
          'Dos de cabillaud en viennoise de noisettes, risotto de fregola',
          'Assortiment de 5 fromages affinés de nos régions',
          'Royal chocolat · L’exotique (mangue, passion, coco) · Tatin caramel beurre salé',
        ],
      },
    ],
    footnote:
      'Menus hors boissons et location de vaisselle. Service, pain, eau et café inclus. Aucun droit de bouchon.',
    ctaLabel: 'Construisons votre menu',
    hasRealPhotos: true,
    presentation: 'gallery',
    tone: 'brand',
    minTier: 1,
    photos: [
      { file: 'mariage-01.jpg', alt: 'Table de réception dressée en extérieur à l’heure dorée, bougies flottantes et fleurs' },
      { file: 'mariage-02.jpg', alt: 'Assortiment de verrines et bouchées garnies de fleurs comestibles' },
      { file: 'mariage-03.jpg', alt: 'Bouchées salées décorées de fleurs comestibles' },
      { file: 'mariage-04.jpg', alt: 'Salade composée aux fleurs comestibles et jeunes pousses' },
      { file: 'mariage-05.jpg', alt: 'Plateau de charcuterie et antipasti fleuri' },
      { file: 'mariage-06.jpg', alt: 'Roulés de jambon et de saumon décorés de fleurs' },
      { file: 'mariage-07.jpg', alt: 'Canapés et bouchées fines aux fleurs comestibles' },
      { file: 'mariage-08.jpg', alt: 'Blinis au saumon mariné et crème citronnée' },
      { file: 'mariage-09.jpg', alt: 'Verrines apéritives colorées en présentation buffet' },
      { file: 'mariage-10.jpg', alt: 'Pavlova meringuée aux fruits rouges' },
      { file: 'mariage-11.jpg', alt: 'Part de fraisier, crème vanille et fraises fraîches' },
      { file: 'mariage-12.jpg', alt: 'Tartelettes salées garnies et fleuries' },
    ],
  },

  {
    slug: 'entreprise',
    name: 'Repas pro & séminaire',
    tagline:
      'Pour vos événements d’entreprise, séminaires et réceptions : un buffet soigné, avec ou sans service, livré ou sur place.',
    groups: [
      {
        title: 'Pièces salées',
        items: [
          'Club sandwich, tomates confites, jambon rôti aux herbes et tapenade',
          'Wraps de truite fumée, ricotta au raifort et ciboulette',
          'Tartelette chèvre frais, courgette, basilic',
          'Focaccia à la burrata, mortadelle et roquette',
          'Bun’s brioché au guacamole, œuf dur et piquillos',
          'Sélection de charcuteries',
        ],
      },
      {
        title: 'Bar à gaspacho',
        note: 'Toppings : croûtons, parmesan, jambon Serrano',
        items: ['Tomate, piment d’Espelette', 'Courgette, menthe', 'Melon, porto'],
      },
      {
        title: 'Salades',
        items: [
          'Légumes d’été façon ratatouille, encornets marinés aux citrons confits',
          'Houmous et salade de pois chiches, gravlax de canard',
          'Roquette, tomates cerises, parmesan, croûtons',
        ],
      },
      {
        title: 'Ardoises de fromages affinés',
        items: ['Sélection de fromages affinés de nos régions'],
      },
      {
        title: 'Pièces sucrées',
        items: [
          'Moelleux pistache-abricot',
          'Panna cotta fraise-verveine',
          'Tartelette chocolat, fève de Tonka',
        ],
      },
      {
        title: 'Boissons',
        items: [
          'Vin UBY sans alcool, blanc et rosé',
          'Eaux minérales plates et pétillantes Abatilles',
          'Softs : coca, jus de fruits',
        ],
      },
    ],
    ctaLabel: 'Organisons votre réception',
    // Photos d'ambiance entreprise encore manquantes : on présente le buffet
    // réel sous forme d'affiche menu terracotta (voir AfficheMenu / page univers).
    hasRealPhotos: false,
    presentation: 'affiche',
    tone: 'event',
    minTier: 1,
    photos: [],
  },

  {
    slug: 'cocktail-buffet',
    name: 'Cocktail & buffet',
    tagline: 'PLACEHOLDER_ACCROCHE — formules cocktail et buffet pour tous vos moments.',
    groups: [
      {
        title: 'PLACEHOLDER_SECTION',
        items: ['PLACEHOLDER_PLAT 1', 'PLACEHOLDER_PLAT 2', 'PLACEHOLDER_PLAT 3'],
      },
    ],
    ctaLabel: 'Demander un devis',
    hasRealPhotos: false,
    presentation: 'placeholder',
    tone: 'brand',
    minTier: 1,
    photos: [],
  },

  {
    slug: 'plateaux',
    name: 'Plateaux-repas & apéritifs',
    tagline: 'PLACEHOLDER_ACCROCHE — plateaux individuels et planches à partager.',
    groups: [
      {
        title: 'PLACEHOLDER_SECTION',
        items: ['PLACEHOLDER_PLAT 1', 'PLACEHOLDER_PLAT 2', 'PLACEHOLDER_PLAT 3'],
      },
    ],
    ctaLabel: 'Demander un devis',
    hasRealPhotos: false,
    presentation: 'placeholder',
    tone: 'brand',
    minTier: 1,
    photos: [],
  },
]

export function universBySlug(slug: string): Univers | undefined {
  return UNIVERS.find((u) => u.slug === slug)
}
