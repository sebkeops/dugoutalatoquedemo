/**
 * Informations réelles de l'établissement (fiche Google).
 * ⚠️ À faire confirmer au client avant mise en ligne.
 *
 * Les horaires concernent le RESTAURANT (service du midi). Le traiteur fonctionne
 * sur réservation / devis — ne jamais présenter ces horaires comme ceux du traiteur.
 */
export const SITE = {
  name: 'Du Goût à la Toque',
  baseline: 'Restaurant & traiteur',
  address: '78 Av. de Gascogne, 31490 Léguevin',
  phone: '09 83 62 60 01',
  phoneHref: 'tel:+33983626001',
  email: 'PLACEHOLDER_EMAIL@dugoutalatoque.fr',
  restaurant: {
    label: 'Restaurant — service du midi',
    hours: 'Du lundi au vendredi, 12h – 14h',
    closed: 'Samedi et dimanche : fermé',
  },
  traiteur: {
    label: 'Traiteur',
    note: 'Sur réservation et devis — pas d’horaire d’ouverture.',
  },
}

/**
 * Avis Google. La note agrégée est RÉELLE. Les cartes sont des exemples
 * REPRÉSENTATIFS (reformulés, non verbatim) à remplacer en production par les
 * vrais avis via l'API Google Places.
 */
export const REVIEWS = {
  rating: 4.7,
  count: 481,
  /** Exemples reformulés — NE PAS présenter comme des avis authentiques. */
  samples: [
    { author: 'Marie L.', stars: 5, text: 'Menu du midi d’un excellent rapport qualité-prix.' },
    { author: 'Thomas R.', stars: 5, text: 'Accueil aimable et service agréable.' },
    { author: 'Sophie D.', stars: 4, text: 'Cuisine savoureuse et joli choix de vins.' },
    { author: 'Julien M.', stars: 5, text: 'Très bon restaurant, on se régale à chaque fois.' },
  ],
}
