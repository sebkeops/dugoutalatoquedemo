import { Link } from 'react-router-dom'
import {
  buttonClasses,
  Card,
  Container,
  Hero,
  MailingSignup,
  Photo,
} from '../components'
import { EVENEMENTS, REVIEWS, SITE, SOIREE_DU_MOIS, UNIVERS } from '../data'

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
      {/* Hero — deux entrées distinctes et équivalentes : Restaurant / Traiteur. */}
      <Hero
        eyebrow={`${SITE.baseline} · Léguevin`}
        title="La cuisine d’ici, faite maison"
        subtitle="Le restaurant à midi, le traiteur pour vos plus beaux événements."
        actions={
          <>
            <Link to="/restaurant" className={buttonClasses('outline', 'lg', 'bg-cream/95')}>
              Le restaurant
            </Link>
            <Link to="/traiteur" className={buttonClasses('accent', 'lg')}>
              Le traiteur
            </Link>
            <Link
              to="/a-emporter"
              className="basis-full text-sm font-medium text-on-primary/90 underline underline-offset-4 hover:text-on-primary"
            >
              Voir aussi : nos événements à emporter →
            </Link>
          </>
        }
      />

      {/* Le restaurant — identité première : teaser vers /restaurant. */}
      <Container className="space-y-4 py-8">
        <h2 className="text-2xl">Le restaurant</h2>
        <Card>
          <p className="text-sm text-ink/80">
            À midi, une cuisine faite maison au rythme du marché, et des soirées à thème
            tout au long de l’année.
          </p>
          <Link to="/restaurant" className={`${buttonClasses('primary', 'sm')} mt-4`}>
            Découvrir le restaurant
          </Link>
        </Card>
      </Container>

      {/* Soirée à thème du mois. */}
      <Container className="space-y-4 py-8">
        <h2 className="text-2xl">Soirée à thème du mois</h2>
        <Card accent>
          <p className="text-xs font-semibold uppercase tracking-label text-accent-strong">
            {SOIREE_DU_MOIS.date}
          </p>
          <h3 className="mt-1 font-heading text-xl text-primary-dark">
            {SOIREE_DU_MOIS.theme}
          </h3>
          <p className="mt-1 text-sm text-ink/80">{SOIREE_DU_MOIS.description}</p>
          <Link to="/restaurant" className={`${buttonClasses('accent', 'sm')} mt-4`}>
            En savoir plus
          </Link>
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

      {/* Coordonnées & horaires — adresse incluse. */}
      <Container className="space-y-4 py-8">
        <h2 className="text-2xl">Nous trouver</h2>
        <Card>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-semibold text-primary-dark">Adresse</dt>
              <dd className="text-ink/80">{SITE.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-primary-dark">Téléphone</dt>
              <dd>
                <a href={SITE.phoneHref} className="text-primary underline">
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-primary-dark">{SITE.restaurant.label}</dt>
              <dd className="text-ink/80">{SITE.restaurant.hours}</dd>
              <dd className="text-ink/80">{SITE.restaurant.closed}</dd>
            </div>
          </dl>
        </Card>
      </Container>

      {/* Inscription liste de diffusion (F1) — succès simulé. */}
      <Container className="py-8">
        <MailingSignup />
      </Container>

      {/* Avis Google — note réelle, exemples reformulés (inchangé). */}
      <Container className="space-y-4 py-8">
        <h2 className="text-2xl">Ils nous recommandent</h2>
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
