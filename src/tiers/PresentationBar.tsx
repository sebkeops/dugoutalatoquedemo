import { TIERS, type Tier } from './types'
import { useTier } from './TierContext'

const ORDER: Tier[] = [1, 2, 3]

/**
 * Barre "Mode présentation" pour basculer la formule en direct.
 *
 * Implémentée en FLUX (sticky bottom, dernier enfant de la colonne du shell) :
 * pas de position:fixed, donc aucun chevauchement du contenu à 375px.
 * Elle reste visible au scroll tout en réservant sa propre hauteur.
 */
export function PresentationBar() {
  const { tier, setTier } = useTier()

  return (
    <div className="sticky bottom-0 z-30 border-t border-secondary/40 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-sm items-center justify-between gap-3 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-label text-secondary">
          Mode présentation
        </span>
        <div
          className="inline-flex rounded-pill border border-secondary/50 bg-cream p-0.5"
          role="group"
          aria-label="Choix de la formule présentée"
        >
          {ORDER.map((t) => {
            const active = t === tier
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                aria-pressed={active}
                title={TIERS[t].name}
                className={[
                  'rounded-pill px-3 py-1 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-primary text-on-primary shadow-soft'
                    : 'text-primary-dark hover:bg-surface',
                ].join(' ')}
              >
                {TIERS[t].code}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
