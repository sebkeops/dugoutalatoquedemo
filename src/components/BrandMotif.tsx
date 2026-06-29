/**
 * Motif de marque : anneau « tache de café » du logo + sprig botanique.
 * Décoratif (aria-hidden). Hérite de la couleur via `currentColor` — moduler
 * l'opacité avec une classe `text-*`. Réutilisé par les héros, les panneaux
 * éditoriaux et les fallbacks quand une vraie photo manque encore.
 */
export function BrandMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={className}
      fill="none"
    >
      <circle cx="120" cy="80" r="64" stroke="currentColor" strokeWidth="10" />
      <circle cx="120" cy="80" r="48" stroke="currentColor" strokeWidth="3" />
      <path
        d="M70 170V120M70 138c-9 0-18-6-21-18 12 0 21 6 21 18zM70 144c9 0 18-6 21-18-12 0-21 6-21 18z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Panneau éditorial de remplacement quand une photo n'est pas encore fournie :
 * fond de marque (brun ou terracotta) + motif. Jamais un grand vide.
 * Remplir plus tard = passer une vraie `image` au composant parent.
 */
export function MotifPanel({
  tone = 'brand',
  label = 'Visuel à venir',
  className = '',
}: {
  tone?: 'brand' | 'event'
  label?: string
  className?: string
}) {
  const bg =
    tone === 'event'
      ? 'bg-gradient-to-br from-accent-strong to-accent'
      : 'bg-gradient-to-br from-primary-dark to-primary'
  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden ${bg} ${className}`}
      role="img"
      aria-label={label}
    >
      <BrandMotif className="pointer-events-none absolute -right-6 -top-8 h-56 w-56 text-cream/15" />
      <span className="relative m-4 text-xs font-medium uppercase tracking-label text-cream/70">
        {label}
      </span>
    </div>
  )
}
