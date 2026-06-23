import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Container } from '../components'
import { PresentationBar, TierProvider } from '../tiers'
import { logoUrl, SITE } from '../data'

const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/traiteur', label: 'Traiteur', end: false },
  { to: '/a-emporter', label: 'À emporter', end: false },
  { to: '/styleguide', label: 'Styleguide', end: false },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'rounded-button px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'bg-primary text-on-primary' : 'text-primary-dark hover:bg-cream',
  ].join(' ')
}

/** Logo réel : pastille ronde (masque le fond crème carré du JPG) + nom. */
function LogoSlot() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} — accueil`}>
      <img
        src={logoUrl}
        alt={SITE.name}
        className="h-10 w-10 rounded-full object-cover ring-1 ring-secondary/30"
      />
      <span className="hidden font-heading text-lg leading-tight text-primary-dark sm:inline">
        {SITE.name}
      </span>
    </NavLink>
  )
}

/**
 * Navigation responsive : liens en ligne sur md+, menu déroulant sur mobile.
 * Le menu mobile se referme à chaque changement de route.
 */
function NavBar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* md+ : liens en ligne */}
      <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* mobile : bouton + panneau déroulant */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-button text-primary-dark hover:bg-cream"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {open ? '✕' : '☰'}
          </span>
        </button>
        {open && (
          <nav
            className="absolute right-0 top-12 z-40 w-48 rounded-card border border-secondary/30 bg-surface p-2 shadow-lifted"
            aria-label="Navigation principale"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'block rounded-button px-3 py-2 text-sm font-medium transition-colors',
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
        )}
      </div>
    </>
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
        <header className="sticky top-0 z-30 border-b border-secondary/40 bg-surface/95 backdrop-blur">
          <Container className="flex items-center justify-between gap-3 py-3">
            <LogoSlot />
            <NavBar />
          </Container>
        </header>

        <main className="flex-1">{children ?? <Outlet />}</main>

        <footer className="border-t border-secondary/40 bg-surface">
          <Container className="flex flex-col gap-4 py-6 text-sm text-secondary sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt={SITE.name}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-secondary/30"
              />
              <div>
                <p className="font-heading text-base text-primary-dark">{SITE.name}</p>
                <p className="text-xs">{SITE.baseline}</p>
              </div>
            </div>
            <div className="space-y-0.5">
              <p>{SITE.address}</p>
              <p>
                <a href={SITE.phoneHref} className="hover:text-primary-dark">
                  {SITE.phone}
                </a>
              </p>
              <p className="text-xs">{SITE.restaurant.label} : {SITE.restaurant.hours}</p>
            </div>
          </Container>
          <Container className="pb-5">
            <p className="text-xs text-secondary">
              Simulation de démonstration — aucune commande réelle n'est traitée.
            </p>
          </Container>
        </footer>

        <PresentationBar />
      </div>
    </TierProvider>
  )
}
