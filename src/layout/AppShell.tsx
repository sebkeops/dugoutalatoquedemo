import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Container, DemoIntro } from '../components'
import { PresentationBar, TierProvider } from '../tiers'
import type { Tier } from '../tiers/types'
import { logoUrl, SITE } from '../data'

/**
 * Paramètres de partage lus UNE fois au chargement (persistants sur la session,
 * même si la query est perdue lors d'une navigation interne) :
 *  - `?demo=1` : affiche la barre de mode présentation (outil de vente).
 *               Sans ce paramètre, l'URL est « propre », figée sur la formule
 *               par défaut (F2), sans barre.
 *  - `?tier=1|2|3` : formule présentée au démarrage (défaut 2 = recommandée).
 */
function readShareParams(): { demo: boolean; tier: Tier } {
  try {
    const p = new URLSearchParams(window.location.search)
    const t = Number(p.get('tier'))
    const tier: Tier = t === 1 || t === 2 || t === 3 ? (t as Tier) : 2
    return { demo: p.get('demo') === '1', tier }
  } catch {
    return { demo: false, tier: 2 }
  }
}

/**
 * Navigation publique. `/styleguide` en est volontairement absent : c'est un
 * outil interne (inventaire des composants, champs de démo), pas une page que
 * le visiteur doit découvrir. La route reste servie par le routeur : on y accède
 * en tapant l'URL directement.
 */
const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/restaurant', label: 'Restaurant', end: false },
  { to: '/traiteur', label: 'Traiteur', end: false },
  { to: '/a-emporter', label: 'À emporter', end: false },
  { to: '/formules', label: 'Formules', end: false },
  { to: '/gestion', label: 'Gestion', end: false },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'rounded-button px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'bg-primary text-on-primary' : 'text-primary-dark hover:bg-cream',
  ].join(' ')
}

/**
 * Logo réel : pastille ronde (masque le fond crème carré du JPG) + nom.
 * Sous lg, la pastille est nettement agrandie et centrée dans le header : c'est
 * l'identité de la marque, et à 40px le monogramme devenait illisible. Elle
 * reprend sa taille compacte sur lg+, où la nav en ligne occupe la droite.
 * Source 512×512 : nette jusqu'à 64px même en DPR 3.
 */
function LogoSlot() {
  return (
    <NavLink
      to="/"
      className="flex items-center justify-center gap-2.5 lg:justify-start"
      aria-label={`${SITE.name} — accueil`}
    >
      <img
        src={logoUrl}
        alt={SITE.name}
        className="h-14 w-14 rounded-full object-cover ring-1 ring-secondary/30 lg:h-10 lg:w-10"
      />
      <span className="hidden whitespace-nowrap font-heading text-lg leading-tight text-primary-dark sm:inline">
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
      {/* lg+ : liens en ligne */}
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* mobile / tablette : bouton + panneau déroulant */}
      <div className="relative lg:hidden">
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
  const [{ demo, tier: initialTier }] = useState(readShareParams)
  const [presenter, setPresenter] = useState(demo)

  return (
    <TierProvider initialTier={initialTier}>
      <div className="flex min-h-screen flex-col bg-cream">
        <DemoIntro />
        <header className="sticky top-0 z-30 border-b border-secondary/40 bg-surface/95 backdrop-blur">
          {/*
           * Sous lg : grille 3 colonnes [cale | logo | menu]. Les deux colonnes
           * extrêmes font exactement la largeur du bouton menu (2.5rem = h-10/w-10),
           * si bien que le logo tombe optiquement au centre et non décalé de la
           * moitié du hamburger. Sur lg+, on repasse au flex logo-à-gauche /
           * nav-à-droite : le header desktop est inchangé.
           */}
          <Container
            width="wide"
            className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 py-2.5 lg:flex lg:justify-between lg:gap-3 lg:py-3"
          >
            <div aria-hidden="true" className="lg:hidden" />
            <LogoSlot />
            <NavBar />
          </Container>
        </header>

        <main className="flex-1">{children ?? <Outlet />}</main>

        <footer className="border-t border-secondary/40 bg-surface">
          <Container width="wide" className="flex flex-col gap-4 py-6 text-sm text-secondary sm:flex-row sm:items-start sm:justify-between">
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
          <Container width="wide" className="flex flex-wrap items-center justify-between gap-2 pb-5">
            <p className="text-xs text-secondary">
              Simulation de démonstration — aucune commande réelle n'est traitée.
            </p>
            {!presenter && (
              <button
                type="button"
                onClick={() => setPresenter(true)}
                className="text-xs font-medium text-secondary underline hover:text-primary-dark"
              >
                Activer le mode présentation
              </button>
            )}
          </Container>
        </footer>

        {presenter && <PresentationBar onClose={() => setPresenter(false)} />}
      </div>
    </TierProvider>
  )
}
