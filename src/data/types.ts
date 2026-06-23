import type { Tier } from '../tiers/types'

/** Photo de galerie : nom de fichier (résolu par images.ts) + alt descriptif. */
export interface Photo {
  file: string
  alt: string
}

/** Groupe de mets d'un univers (ex. « Le cocktail — pièces froides »). SANS PRIX. */
export interface MenuGroup {
  title: string
  /** Intitulés de plats (rendre l'univers vivant ; jamais de tarif). */
  items: string[]
  note?: string
}

/**
 * Un univers traiteur (vitrine de la démo).
 * Le parcours mène toujours au formulaire de devis — jamais à un prix.
 */
export interface Univers {
  slug: string
  name: string
  /** Accroche courte. */
  tagline: string
  intro?: string
  /** Sections de mets (sans prix). */
  groups: MenuGroup[]
  /** Mention de bas de page éventuelle (ex. « hors boissons… »). */
  footnote?: string
  /** Libellé du CTA menant au devis. */
  ctaLabel: string
  /** Galerie de photos (vide si visuels non encore fournis). */
  photos: Photo[]
  /** `false` => univers en attente de vraies photos (placeholder). */
  hasRealPhotos: boolean
  /**
   * Mode de présentation du visuel principal :
   *  - `gallery`     : galerie de vraies photos
   *  - `affiche`     : affiche menu terracotta (contenu réel, photos à venir)
   *  - `placeholder` : univers en attente de contenu et de visuels
   */
  presentation: 'gallery' | 'affiche' | 'placeholder'
  /** Couche visuelle : brun (structure) ou terracotta (événementiel). */
  tone: 'brand' | 'event'
  minTier: Tier
}

/** Événement « à emporter » (4 dates fixes du client). */
export interface Evenement {
  slug: string
  name: string
  /** Période indicative (placeholder de date tant que non confirmée). */
  periode: string
  tagline: string
  /** Photo de couverture (nom de fichier). */
  cover: Photo
  minTier: Tier
}
