import { Link, useParams } from 'react-router-dom'
import {
  AfficheMenu,
  buttonClasses,
  Card,
  Container,
  Gallery,
  Hero,
} from '../components'
import { universBySlug, photoUrl, type MenuGroup } from '../data'

function MenuGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {groups.map((g) => (
        <Card key={g.title}>
          <h3 className="font-heading text-lg text-primary-dark">{g.title}</h3>
          {g.note && <p className="text-xs italic text-secondary">{g.note}</p>}
          <ul className="mt-2 space-y-1.5">
            {g.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink/90">
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-strong" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}

/** Page d'un univers traiteur, pilotée par le slug de l'URL. */
export function UniversPage() {
  const { slug } = useParams()
  const u = slug ? universBySlug(slug) : undefined

  if (!u) {
    return (
      <Container className="space-y-4 py-12 text-center">
        <h1 className="text-2xl">Univers introuvable</h1>
        <Link to="/traiteur" className="font-semibold text-primary underline">
          Revenir aux univers traiteur
        </Link>
      </Container>
    )
  }

  const heroImage =
    u.presentation === 'gallery' ? photoUrl(u.photos[0].file) : undefined

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

      <Container width="wide" className="space-y-8 py-8">
        {u.presentation === 'affiche' ? (
          <AfficheMenu
            eyebrow="Buffet — exemple"
            title={u.name}
            date="Exemple de réception"
            groups={u.groups}
          />
        ) : u.presentation === 'placeholder' ? (
          <Card accent>
            <p className="text-sm text-ink/80">
              <strong>PLACEHOLDER</strong> — contenu et photos de cet univers à fournir
              par le client. La structure est prête à les accueillir.
            </p>
          </Card>
        ) : (
          <MenuGroups groups={u.groups} />
        )}

        {u.presentation === 'gallery' && (
          <section className="space-y-4">
            <h2 className="text-2xl">En images</h2>
            <Gallery photos={u.photos.slice(1)} />
          </section>
        )}

        {u.presentation === 'gallery' && <MenuGroups groups={u.groups} />}

        {u.footnote && (
          <p className="text-center text-xs italic text-secondary">{u.footnote}</p>
        )}

        <div className="flex justify-center pt-2">
          <Link
            to="/contact"
            state={{ event: u.name }}
            className={buttonClasses('primary', 'lg')}
          >
            {u.ctaLabel}
          </Link>
        </div>
      </Container>
    </>
  )
}
