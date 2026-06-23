import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Shell applicatif — mobile-first.
 * Conteneur centré, largeur contenue, en-tête et pied de page partagés.
 * Les écrans du parcours s'affichent dans <Outlet />.
 */
export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="border-b border-secondary/40 bg-surface">
        <div className="mx-auto w-full max-w-screen-sm px-4 py-3">
          <span className="font-heading text-lg text-primary-dark">
            Du Goût à la Toque
          </span>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
          {children ?? <Outlet />}
        </div>
      </main>

      <footer className="border-t border-secondary/40 bg-surface">
        <div className="mx-auto w-full max-w-screen-sm px-4 py-3 text-xs text-secondary">
          PLACEHOLDER_FOOTER — Simulation de démonstration · Du Goût à la Toque
        </div>
      </footer>
    </div>
  )
}
