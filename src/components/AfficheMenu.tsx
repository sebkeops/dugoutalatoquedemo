import type { MenuGroup } from '../data/types'

/** Petit motif floral (line-art) rappelant l'affiche du client. */
function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M32 60V20M32 30c-6 0-12-4-14-12 8 0 14 4 14 12zM32 34c6 0 12-4 14-12-8 0-14 4-14 12zM32 22c-4-2-7-7-6-14 6 3 8 9 6 14z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Affiche menu « terracotta » — reconstitue l'affiche que le client remet déjà
 * à ses clients (bloc terracotta + motif floral). Sert de visuel pour les
 * univers dont les photos d'ambiance ne sont pas encore fournies (entreprise).
 * Le contenu est posé sur un panneau crème pour rester parfaitement lisible.
 */
export function AfficheMenu({
  eyebrow,
  title,
  date,
  groups,
  footnote,
}: {
  eyebrow?: string
  title: string
  date?: string
  groups: MenuGroup[]
  footnote?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-card bg-accent-strong p-4 text-on-accent shadow-card sm:p-6">
      <Sprig className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 text-cream/25" />
      <Sprig className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rotate-180 text-cream/20" />

      <header className="relative px-2 py-3 text-center">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-label text-cream/80">
            {eyebrow}
          </p>
        )}
        <h3 className="font-heading text-2xl text-cream">{title}</h3>
        {date && <p className="mt-1 text-sm text-cream/80">{date}</p>}
      </header>

      <div className="relative mt-3 grid gap-x-6 gap-y-4 rounded-card bg-cream p-4 text-ink sm:grid-cols-2 sm:p-6">
        {groups.map((g) => (
          <section key={g.title} className="break-inside-avoid">
            <h4 className="font-heading text-base text-primary-dark">{g.title}</h4>
            {g.note && <p className="text-xs italic text-secondary">{g.note}</p>}
            <ul className="mt-1.5 space-y-1">
              {g.items.map((item) => (
                <li key={item} className="text-sm leading-snug text-ink/90">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {footnote && (
        <p className="relative mt-3 px-2 text-center text-xs text-cream/80">{footnote}</p>
      )}
    </div>
  )
}
