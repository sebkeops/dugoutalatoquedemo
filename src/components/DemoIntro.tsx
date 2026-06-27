import { useState } from 'react'

const KEY = 'dgt-demo-intro'

/**
 * Bandeau d'introduction de la démo, affiché en haut de l'app.
 * Explique en une phrase qu'il s'agit d'une simulation. Désactivable : la
 * fermeture est mémorisée (localStorage) pour ne pas réapparaître.
 */
export function DemoIntro() {
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(KEY) === 'off'
    } catch {
      return false
    }
  })

  if (hidden) return null

  function dismiss() {
    setHidden(true)
    try {
      localStorage.setItem(KEY, 'off')
    } catch {
      /* stockage indisponible : on masque juste pour la session */
    }
  }

  return (
    <div className="bg-primary-dark text-on-primary">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-2 text-sm">
        <span className="flex-1">
          <strong className="font-semibold">Simulation de démonstration</strong> — explorez
          librement : rien n’est réel (ni commande, ni e-mail).
        </span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer le bandeau de démonstration"
          className="shrink-0 rounded-full px-2 py-0.5 text-on-primary/80 hover:bg-cream/15 hover:text-on-primary"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>
  )
}
