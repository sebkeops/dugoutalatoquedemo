import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Container } from '../components'
import { PresentationBar, TierProvider } from '../tiers'

const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/styleguide', label: 'Styleguide', end: false },
]

function NavBar() {
  return (
    <nav className="flex items-center gap-1" aria-label="Navigation principale">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [
              'rounded-button px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-on-primary'
                : 'text-primary-dark hover:bg-cream',
            ].join(' ')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

/** Emplacement du logo. Le vrai logo (sources/logo.jpg) sera câblé au Brief 1.5. */
function LogoSlot() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5" aria-label="Du Goût à la Toque — accueil">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary-dark font-heading text-sm font-bold text-primary-dark"
        aria-hidden="true"
      >
        DGT
      </span>
      <span className="hidden font-heading text-lg leading-tight text-primary-dark sm:inline">
        Du Goût à la Toque
      </span>
    </NavLink>
  )
}

/**
 * Shell applicatif — mobile-first.
 * En-tête (logo + nav) et pied de page partagés alignés sur la colonne de contenu.
 * <main> est pleine largeur : chaque page gère sa largeur via <Container>, ce qui
 * autorise des héros / galeries élargis sur md+ tout en restant net à ~375px.
 *
 * Le <TierProvider> enveloppe tout le shell : le mode présentation irrigue l'app,
 * et la <PresentationBar> (en flux, sticky bas) permet de basculer F1/F2/F3.
 */
export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <TierProvider>
      <div className="flex min-h-screen flex-col bg-cream">
        <header className="border-b border-secondary/40 bg-surface">
          <Container className="flex items-center justify-between gap-3 py-3">
            <LogoSlot />
            <NavBar />
          </Container>
        </header>

        <main className="flex-1">{children ?? <Outlet />}</main>

        <footer className="border-t border-secondary/40 bg-surface">
          <Container className="py-5 text-sm text-secondary">
            <p className="font-heading text-base text-primary-dark">
              Du Goût à la Toque
            </p>
            <p className="mt-1">
              PLACEHOLDER_ADRESSE · PLACEHOLDER_TEL · PLACEHOLDER_EMAIL
            </p>
            <p className="mt-2 text-xs">
              Simulation de démonstration — aucune commande réelle n'est traitée.
            </p>
          </Container>
        </footer>

        <PresentationBar />
      </div>
    </TierProvider>
  )
}
