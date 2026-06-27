import { Link, useParams } from 'react-router-dom'
import {
  AfficheMenu,
  buttonClasses,
  Card,
  Container,
  Gallery,
  Hero,
  Reveal,
  Section,
} from '../components'
import { universBySlug, photoUrl, type MenuGroup } from '../data'

function MenuGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {groups.map((g, i) => (
        <Reveal key={g.title} delay={i * 60} className="h-full">
          <Card className="h-full">
            <h3 className="font-heading text-xl text-primary-dark">{g.title}</h3>
            {g.note && <p className="text-xs italic text-secondary">{g.note}</p>}
            <ul className="mt-2.5 space-y-1.5">
              {g.items.map((item) => (
                <li key={item} className="flex gap-2 text-ink/90">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}

const MENU_HEAD: Record<string, { kicker: string; title: string }> = {
  gallery: { kicker: 'À la carte', title: 'Quelques suggestions' },
  affiche: { kicker: 'Exemple', title: 'Un buffet type' },
  placeholder: { kicker: 'Bientôt', title: 'Contenu à venir' },
}

/** Page d'un univers traiteur, pilotée par le slug de l'URL. */
export function UniversPage() {
  const { slug } = useParams()
  const u = slug ? universBySlug(slug) : undefined

  if (!u) {
    return (
      <Container className="space-y-4 py-16 text-center">
        <h1 className="text-2xl">Univers introuvable</h1>
        <Link to="/traiteur" className="link-underline font-semibold text-primary">
          Revenir aux univers traiteur
        </Link>
      </Container>
    )
  }

  const heroImage =
    u.presentation === 'gallery' ? photoUrl(u.photos[0].file) : undefined
  const head = MENU_HEAD[u.presentation]

  return (
    <>
      <Hero
        eyebrow="Traiteur"
        tone={u.tone}
        image={heroImage}
        title={u.name}
        subtitle={u.tagline}
        actions={
          <Link
            to="/contact"
            state={{ event: u.name }}
            className={buttonClasses('accent', 'lg')}
          >
            {u.ctaLabel}
          </Link>
        }
      />

      {/* Galerie d'abord : on mène par l'image (food). */}
      {u.presentation === 'gallery' && (
        <Section kicker="En images" title="L’univers en photos" tone="cream">
          <Reveal>
            <Gallery photos={u.photos.slice(1)} />
          </Reveal>
        </Section>
      )}

      {/* Contenu : suggestions / affiche / placeholder. */}
      <Section
        kicker={head.kicker}
        title={head.title}
        tone={u.presentation === 'gallery' ? 'surface' : 'cream'}
      >
        {u.presentation === 'affiche' ? (
          <Reveal>
            <AfficheMenu
              eyebrow="Buffet — exemple"
              title={u.name}
              date="Exemple de réception"
              groups={u.groups}
            />
          </Reveal>
        ) : u.presentation === 'placeholder' ? (
          <Reveal>
            <Card accent>
              <p className="text-ink/80">
                <strong>PLACEHOLDER</strong> — contenu et photos de cet univers à fournir
                par le client. La structure est prête à les accueillir.
              </p>
            </Card>
          </Reveal>
        ) : (
          <MenuGroups groups={u.groups} />
        )}

        {u.footnote && (
          <p className="mt-6 text-center text-xs italic text-secondary">{u.footnote}</p>
        )}
      </Section>

      {/* Closing — bande sombre + CTA. */}
      <Section tone="dark">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-heading text-2xl text-on-primary md:text-3xl">
              Parlons de votre événement
            </h2>
            <p className="max-w-prose text-on-primary/80">
              Chaque prestation est sur mesure — dites-nous tout, on construit votre
              proposition.
            </p>
            <Link
              to="/contact"
              state={{ event: u.name }}
              className={buttonClasses('accent', 'lg')}
            >
              {u.ctaLabel} →
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
