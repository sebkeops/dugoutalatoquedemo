// Point d'entrée unique des données fictives/réelles de la démo.
export * from './types'
export {
  UNIVERS,
  PUBLISHED_UNIVERS,
  universBySlug,
  publishedUniversBySlug,
} from './univers'
export { EVENEMENTS } from './evenements'
export { SOIREE_DU_MOIS, SOIREES, type Soiree } from './soirees'
export { SITE, REVIEWS } from './site'
export { MESSAGES } from './messages'
export { COMMANDES } from './commandes'
export { CONTACTS, CONTACTS_TOTAL } from './diffusion'
export {
  FORMULE_CATEGORIES,
  FORMULE_AUTONOMIE,
  type FormuleFeature,
  type FormuleCategory,
} from './formules'
export { photoUrl, logoUrl, heroUrl, photoNames } from './images'
