import { Link } from 'react-router-dom'
import { TIERS, type Tier } from './types'
import { useTier } from './TierContext'

const ORDER: Tier[] = [1, 2, 3]

/**
 * Barre "Mode présentation" pour basculer la formule en direct.
 * OUTIL DE VENTE pour la démo : on l'affiche en présentation, et on peut la
 * masquer (bouton ×) pour partager une version figée sur la formule par défaut.
 *
 * Implémentée en FLUX (sticky bottom, dernier enfant de la colonne du shell) :
 * pas de position:fixed, donc aucun chevauchement du contenu à 375px.
 * Elle reste visible au scroll tout en réservant sa propre hauteur.
 */
export function PresentationBar({ onClose }: { onClose?: () => void }) {
  const { tier, setTier } = useTier()

  return (
    <div className="sticky bottom-0 z-30 border-t border-secondary/40 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-sm items-center justify-between gap-2 px-4 py-2">
        <Link
          to="/formules"
          className="text-xs font-medium uppercase tracking-label text-secondary hover:text-primary-dark"
        >
          Mode présentation
          <span className="ml-1 hidden normal-case text-primary underline sm:inline">
            · comparer
          </span>
        </Link>
        <div className="flex items-center gap-2">
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
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Masquer le mode présentation"
              title="Masquer"
              className="flex h-7 w-7 items-center justify-center rounded-full text-secondary hover:bg-cream hover:text-primary-dark"
            >
              <span aria-hidden="true">✕</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
