import { Link, useParams } from 'react-router-dom'
import {
  AfficheMenu,
  Banner,
  buttonClasses,
  Card,
  Container,
  FeatureRow,
  Hero,
  MosaicGallery,
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

  const isGallery = u.presentation === 'gallery'
  const heroImage = isGallery ? photoUrl(u.photos[0].file) : undefined
  const head = MENU_HEAD[u.presentation]
  // Photos secondaires (si dispo) pour l'asymétrie et la bande plein-cadre.
  const photoAt = (n: number) =>
    isGallery ? photoUrl(u.photos[Math.min(n, u.photos.length - 1)].file) : undefined

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

      {/* Galerie magazine d'abord : on mène par l'image (food). */}
      {isGallery && (
        <Section kicker="En images" title="L’univers en photos" tone="cream">
          <MosaicGallery photos={u.photos.slice(1)} />
        </Section>
      )}

      {/* Asymétrie photo / texte (sur-mesure). */}
      <Section tone="surface">
        <FeatureRow
          flip
          image={photoAt(2)}
          alt={isGallery ? u.photos[2]?.alt : ''}
          motifTone="event"
          motifLabel="Photo à venir"
          kicker="Sur mesure"
          title="Composons votre événement"
          cta={
            <Link
              to="/contact"
              state={{ event: u.name }}
              className={buttonClasses('accent', 'md')}
            >
              {u.ctaLabel} →
            </Link>
          }
        >
          <p>{u.tagline}</p>
        </FeatureRow>
      </Section>

      {/* Contenu : suggestions / affiche / placeholder. */}
      <Section kicker={head.kicker} title={head.title} tone="cream">
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

      {/* Closing — bande plein-cadre + CTA. */}
      <Banner
        image={photoAt(4)}
        alt={isGallery ? u.photos[4]?.alt : ''}
        tone={u.tone}
        kicker="Devis"
        title="Parlons de votre événement"
        subtitle="Chaque prestation est sur mesure — dites-nous tout, on construit votre proposition."
        cta={
          <Link
            to="/contact"
            state={{ event: u.name }}
            className={buttonClasses('accent', 'lg')}
          >
            {u.ctaLabel} →
          </Link>
        }
      />
    </>
  )
}
