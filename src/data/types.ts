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
   * `false` => univers masqué du site public : absent de /traiteur et accès direct
   * renvoyé en 404. Tant que le client n'a pas fourni contenu et photos, mieux vaut
   * ne pas l'exposer. Les données restent en place : repasser à `true` suffit à le
   * publier. Le back-office (gestion de contenu, modération) continue de les lister.
   */
  published: boolean
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

// --- Données back-office (mockups) — tout est fictif/simulé ---

/** Statut d'un message de devis dans la modération. */
export type MessageStatut = 'nouveau' | 'traité' | 'archivé'

/**
 * Message de devis reçu — reflète les champs du formulaire devis réel
 * (univers, date, nb de personnes, budget, commentaire) pour la cohérence démo.
 */
export interface MessageDevis {
  id: string
  nom: string
  email: string
  /** Slug d'univers (réf. UNIVERS). */
  universSlug: string
  /** Date de l'événement souhaitée. */
  dateEvenement: string
  /** Date de réception du message. */
  recuLe: string
  personnes: number
  budget: string
  commentaire: string
  statut: MessageStatut
}

/** Statut d'une commande événement à emporter. */
export type CommandeStatut = 'nouvelle' | 'confirmée' | 'préparée'

export interface CommandeArticle {
  libelle: string
  qte: number
}

/** Commande d'un événement à emporter, avec créneau de retrait. */
export interface Commande {
  id: string
  client: string
  /** Slug d'événement (réf. EVENEMENTS). */
  evenementSlug: string
  /** Créneau de retrait au quart d'heure, ex. "10:15". */
  creneau: string
  articles: CommandeArticle[]
  statut: CommandeStatut
}

/** Contact de la liste de diffusion. */
export interface Contact {
  nom: string
  email: string
  inscritLe: string
}
