import type { Contact } from './types'

/**
 * Liste de diffusion (fictive) pour le mockup de l'outil de mailing.
 * Le client gère aujourd'hui ~600 contacts à la main (envois 20 par 20).
 * On expose un total réaliste + un extrait paginable.
 */
export const CONTACTS_TOTAL = 612

export const CONTACTS: Contact[] = [
  { nom: 'Camille Besson', email: 'camille.besson@exemple.fr', inscritLe: '2026-06-21' },
  { nom: 'Sébastien Pujol', email: 's.pujol@exemple.fr', inscritLe: '2026-06-20' },
  { nom: 'Aurélie Marty', email: 'aurelie.marty@exemple.fr', inscritLe: '2026-06-18' },
  { nom: 'Nicolas Fabre', email: 'n.fabre@exemple.fr', inscritLe: '2026-06-16' },
  { nom: 'Hélène Roca', email: 'helene.roca@exemple.fr', inscritLe: '2026-06-15' },
  { nom: 'Damien Lacombe', email: 'd.lacombe@exemple.fr', inscritLe: '2026-06-13' },
  { nom: 'Sophie Vidal', email: 'sophie.vidal@exemple.fr', inscritLe: '2026-06-11' },
  { nom: 'Karim Benali', email: 'k.benali@exemple.fr', inscritLe: '2026-06-09' },
  { nom: 'Laure Teyssier', email: 'laure.teyssier@exemple.fr', inscritLe: '2026-06-07' },
  { nom: 'Olivier Cazes', email: 'o.cazes@exemple.fr', inscritLe: '2026-06-05' },
  { nom: 'Manon Rivière', email: 'manon.riviere@exemple.fr', inscritLe: '2026-06-03' },
  { nom: 'Julien Marchand', email: 'j.marchand@exemple.fr', inscritLe: '2026-06-01' },
  { nom: 'Claire Fontaine', email: 'claire.fontaine@exemple.fr', inscritLe: '2026-05-29' },
  { nom: 'Antoine Sabatier', email: 'a.sabatier@exemple.fr', inscritLe: '2026-05-27' },
  { nom: 'Émilie Garrigues', email: 'emilie.garrigues@exemple.fr', inscritLe: '2026-05-25' },
  { nom: 'Paul Cabanne', email: 'p.cabanne@exemple.fr', inscritLe: '2026-05-23' },
]
