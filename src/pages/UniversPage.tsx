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
import { publishedUniversBySlug, photoUrl, type MenuGroup } from '../data'

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
}

/**
 * Page d'un univers traiteur, pilotée par le slug de l'URL.
 * Seuls les univers publiés sont accessibles : un univers en préparation
 * (`published: false`) tombe sur le même écran « introuvable » qu'un slug inconnu.
 */
export function UniversPage() {
  const { slug } = useParams()
  const u = slug ? publishedUniversBySlug(slug) : undefined

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
  // Sur une surface terracotta (tone « event »), un bouton accent est terracotta
  // sur terracotta : on passe alors en crème pour garder le contraste.
  const heroCta = u.tone === 'event' ? buttonClasses('outline', 'lg', 'bg-cream/95') : buttonClasses('accent', 'lg')
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
          <Link to="/contact" state={{ event: u.name }} className={heroCta}>
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

      {/* Asymétrie photo / texte (sur-mesure). L'accroche n'est PAS reprise ici :
          elle est déjà le sous-titre du héros, quelques centaines de pixels plus haut. */}
      <Section tone="surface">
        <FeatureRow
          flip
          image={photoAt(2)}
          alt={isGallery ? u.photos[2]?.alt : ''}
          motifTone="event"
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
          <p>
            Dites-nous le lieu, la date et le nombre de convives : nous construisons
            une proposition à votre mesure.
          </p>
        </FeatureRow>
      </Section>

      {/* Contenu : suggestions (galerie) ou affiche menu. */}
      {head && (
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
          ) : (
            <MenuGroups groups={u.groups} />
          )}

          {u.footnote && (
            <p className="mt-6 text-center text-xs italic text-secondary">{u.footnote}</p>
          )}
        </Section>
      )}

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
            className={buttonClasses('outline', 'lg', 'bg-cream/95')}
          >
            {u.ctaLabel} →
          </Link>
        }
      />
    </>
  )
}
