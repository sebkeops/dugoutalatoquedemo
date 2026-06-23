import { Link } from 'react-router-dom'
import { buttonClasses, Card, Container, Hero, Photo } from '../components'
import { EVENEMENTS, REVIEWS, SITE, UNIVERS } from '../data'

function Stars({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="text-accent-strong">
      {'★'.repeat(Math.round(n))}
      <span className="text-secondary/50">{'★'.repeat(5 - Math.round(n))}</span>
    </span>
  )
}

export function HomePage() {
  const mariage = UNIVERS.find((u) => u.slug === 'mariage')!

  return (
    <>
      <Hero
        eyebrow={`${SITE.baseline} · Léguevin`}
        title="La cuisine d’ici, faite maison"
        subtitle="Le restaurant à midi, le traiteur pour vos plus beaux événements."
        actions={
          <>
            <Link to="/traiteur" className={buttonClasses('accent', 'lg')}>
              Découvrir le traiteur
            </Link>
            <Link to="/a-emporter" className={buttonClasses('outline', 'lg', 'bg-cream/95')}>
              Nos événements à emporter
            </Link>
          </>
        }
      />

      {/* Le restaurant — identité première. */}
      <Container className="space-y-4 py-8">
        <h2 className="text-2xl">Le restaurant</h2>
        <Card>
          <p className="text-sm text-ink/80">
            PLACEHOLDER_RESTAURANT — quelques mots sur le restaurant et le menu du midi
            (photos de salle et d’assiettes à fournir par le client).
          </p>
          <dl className="mt-4 space-y-1 text-sm">
            <dt className="font-semibold text-primary-dark">{SITE.restaurant.label}</dt>
            <dd className="text-ink/80">{SITE.restaurant.hours}</dd>
            <dd className="text-ink/80">{SITE.restaurant.closed}</dd>
          </dl>
          <a
            href={SITE.phoneHref}
            className={`${buttonClasses('outline', 'sm')} mt-4`}
          >
            Réserver une table · {SITE.phone}
          </a>
        </Card>
      </Container>

      {/* Le traiteur — priorité commerciale en ligne. */}
      <Container width="wide" className="space-y-4 py-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl">Le traiteur</h2>
          <Link to="/traiteur" className="text-sm font-semibold text-primary underline">
            Tous les univers
          </Link>
        </div>
        <Link
          to={`/traiteur/${mariage.slug}`}
          className="group block overflow-hidden rounded-card border border-secondary/25 shadow-card"
        >
          <div className="aspect-[16/9] overflow-hidden">
            <Photo
              file={mariage.photos[0].file}
              alt={mariage.photos[0].alt}
              loading="eager"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-1 bg-surface p-4">
            <h3 className="font-heading text-lg text-primary-dark">{mariage.name}</h3>
            <p className="text-sm text-ink/80">{mariage.tagline}</p>
          </div>
        </Link>
      </Container>

      {/* À emporter — 4 événements. */}
      <Container width="wide" className="space-y-4 py-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl">À emporter</h2>
          <Link to="/a-emporter" className="text-sm font-semibold text-primary underline">
            Voir les événements
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {EVENEMENTS.map((e) => (
            <Link
              key={e.slug}
              to="/a-emporter"
              className="group overflow-hidden rounded-card border border-secondary/25 bg-surface shadow-soft"
            >
              <div className="aspect-square overflow-hidden">
                <Photo
                  file={e.cover.file}
                  alt={e.cover.alt}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="p-2 text-center text-sm font-medium text-primary-dark">
                {e.name}
              </p>
            </Link>
          ))}
        </div>
      </Container>

      {/* Avis Google — note réelle, exemples reformulés. */}
      <Container className="space-y-4 py-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl">Ils nous recommandent</h2>
        </div>
        <p className="text-sm text-ink/80">
          <Stars n={REVIEWS.rating} />{' '}
          <strong className="text-primary-dark">{REVIEWS.rating.toFixed(1)}/5</strong> ·{' '}
          {REVIEWS.count} avis Google
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {REVIEWS.samples.map((r) => (
            <Card key={r.author}>
              <p className="text-sm text-ink/90">« {r.text} »</p>
              <p className="mt-2 text-xs text-secondary">
                <Stars n={r.stars} /> · {r.author}
              </p>
            </Card>
          ))}
        </div>
        <p className="text-xs italic text-secondary">
          Exemples représentatifs (reformulés) — à remplacer en production par les avis
          Google en direct.
        </p>
      </Container>
    </>
  )
}
