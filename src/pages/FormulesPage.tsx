import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses, Container, Hero, Reveal } from '../components'
import { FORMULE_AUTONOMIE, FORMULE_CATEGORIES } from '../data'
import { useTier } from '../tiers'
import { isUnlocked, TIERS, type Tier } from '../tiers/types'

const COLS: Tier[] = [1, 2, 3]

/** Cellule d'inclusion accessible (✓ inclus / — non inclus). */
function Mark({ included }: { included: boolean }) {
  return included ? (
    <span className="font-semibold text-accent-strong" aria-hidden="true">
      ✓
      <span className="sr-only">Inclus</span>
    </span>
  ) : (
    <span className="text-secondary/50" aria-hidden="true">
      —<span className="sr-only">Non inclus</span>
    </span>
  )
}

export function FormulesPage() {
  const { tier: current, setTier } = useTier()

  // Classe de mise en avant : colonne recommandée (F2) + colonne présentée.
  const colClass = (t: Tier) =>
    [
      t === 2 ? 'bg-accent/10' : '',
      t === current ? 'ring-2 ring-inset ring-primary/50' : '',
    ].join(' ')

  return (
    <>
      <Hero
        eyebrow="Nos formules"
        tone="event"
        title="Trois formules, une seule simulation"
        subtitle="Comparez ce qui est inclus à chaque niveau. Vous pourrez monter d’un cran à tout moment."
      />

      <Container width="wide" className="space-y-10 py-12 md:py-16">
        <Reveal>
          <div className="overflow-hidden rounded-card border border-secondary/35 shadow-card">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface">
                <th className="p-3 text-left align-bottom font-heading text-base text-primary-dark">
                  Fonctionnalités
                </th>
                {COLS.map((t) => (
                  <th
                    key={t}
                    className={`w-12 p-2 text-center align-bottom sm:w-28 sm:p-3 ${colClass(t)}`}
                  >
                    <div className="font-heading text-lg text-primary-dark">
                      {TIERS[t].code}
                    </div>
                    <div className="hidden text-xs font-medium text-ink/80 sm:block">
                      {TIERS[t].name}
                    </div>
                    {TIERS[t].recommended && (
                      <div className="mt-1 inline-block rounded-pill bg-accent-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-label text-on-accent">
                        Recommandée
                      </div>
                    )}
                    {t === current && (
                      <div className="mt-1 text-[10px] font-medium uppercase tracking-label text-primary">
                        Présentée
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {FORMULE_CATEGORIES.map((cat) => (
                <Fragment key={cat.title}>
                  <tr>
                    <th
                      colSpan={4}
                      className="border-t border-secondary/30 bg-cream p-2 px-3 text-left text-xs font-semibold uppercase tracking-label text-secondary"
                    >
                      {cat.title}
                    </th>
                  </tr>
                  {cat.features.map((f) => (
                    <tr key={f.label} className="border-t border-secondary/15">
                      <td className="p-3 text-ink/90">{f.label}</td>
                      {COLS.map((t) => (
                        <td key={t} className={`p-3 text-center ${colClass(t)}`}>
                          <Mark included={isUnlocked(f.minTier, t)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}

              {/* Synthèse autonomie */}
              <tr className="border-t border-secondary/30">
                <td className="p-3 font-medium text-primary-dark">Autonomie au quotidien</td>
                {COLS.map((t) => (
                  <td
                    key={t}
                    className={`p-3 text-center text-xs text-ink/80 ${colClass(t)}`}
                  >
                    {FORMULE_AUTONOMIE[t]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          </div>
        </Reveal>

        {/* CTA par formule */}
        <div className="grid gap-4 sm:grid-cols-3">
          {COLS.map((t, i) => {
            const info = TIERS[t]
            return (
              <Reveal key={t} delay={i * 70} className="h-full">
                <div
                  className={[
                    'flex h-full flex-col rounded-card border bg-surface p-6 shadow-card',
                    info.recommended ? 'border-accent-strong' : 'border-secondary/35',
                  ].join(' ')}
                >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-heading text-lg text-primary-dark">
                    {info.code} · {info.name}
                  </h2>
                  {info.recommended && (
                    <span className="rounded-pill bg-accent-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-label text-on-accent">
                      Conseillée
                    </span>
                  )}
                </div>
                <p className="mt-1 flex-1 text-sm text-ink/80">{FORMULE_AUTONOMIE[t]}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to="/contact"
                    state={{ event: `Formule ${info.code} — ${info.name}` }}
                    className={buttonClasses(info.recommended ? 'accent' : 'primary', 'md')}
                  >
                    Demander cette formule
                  </Link>
                  <button
                    type="button"
                    onClick={() => setTier(t)}
                    className="text-xs font-medium text-secondary hover:text-primary-dark"
                  >
                    Prévisualiser {info.code} dans la démo
                  </button>
                </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="text-center text-xs italic text-secondary">
          Tarifs des formules communiqués sur demande — chaque projet est étudié au cas par cas.
        </p>
      </Container>
    </>
  )
}
