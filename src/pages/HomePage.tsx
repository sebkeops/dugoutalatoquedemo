import { Link } from 'react-router-dom'
import {
  buttonClasses,
  Card,
  Hero,
  MailingSignup,
  Photo,
  Reveal,
  Section,
} from '../components'
import { EVENEMENTS, heroUrl, REVIEWS, SITE, SOIREE_DU_MOIS, UNIVERS } from '../data'

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
        image={heroUrl}
        imagePosition="center"
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
      <Section kicker="Le midi" title="Le restaurant" tone="cream">
        <Reveal>
          <Card>
            <p className="max-w-prose text-ink/80">
              À midi, une cuisine faite maison au rythme du marché, et des soirées à thème
              tout au long de l’année.
            </p>
            <Link to="/restaurant" className={`${buttonClasses('primary', 'md')} mt-5`}>
              Découvrir le restaurant →
            </Link>
          </Card>
        </Reveal>
      </Section>

      {/* Soirée à thème du mois. */}
      <Section kicker="Rendez-vous" title="Soirée à thème du mois" tone="surface">
        <Reveal>
          <Card accent>
            <p className="text-xs font-semibold uppercase tracking-label text-accent-strong">
              {SOIREE_DU_MOIS.date}
            </p>
            <h3 className="mt-1.5 font-heading text-2xl text-primary-dark">
              {SOIREE_DU_MOIS.theme}
            </h3>
            <p className="mt-1.5 max-w-prose text-ink/80">{SOIREE_DU_MOIS.description}</p>
            <Link to="/restaurant" className={`${buttonClasses('accent', 'md')} mt-5`}>
              En savoir plus →
            </Link>
          </Card>
        </Reveal>
      </Section>

      {/* Le traiteur — priorité commerciale en ligne. */}
      <Section
        kicker="Sur mesure"
        title="Le traiteur"
        tone="cream"
        headerCta={
          <Link
            to="/traiteur"
            className="link-underline text-sm font-semibold text-primary"
          >
            Tous les univers
          </Link>
        }
      >
        <Reveal>
          <Link
            to={`/traiteur/${mariage.slug}`}
            className="group block overflow-hidden rounded-card border border-secondary/35 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <Photo
                file={mariage.photos[0].file}
                alt={mariage.photos[0].alt}
                loading="eager"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-1 bg-surface p-6">
              <h3 className="font-heading text-xl text-primary-dark">{mariage.name}</h3>
              <p className="text-ink/80">{mariage.tagline}</p>
            </div>
          </Link>
        </Reveal>
      </Section>

      {/* À emporter — 4 événements. */}
      <Section
        kicker="Les fêtes"
        title="À emporter"
        tone="surface"
        headerCta={
          <Link
            to="/a-emporter"
            className="link-underline text-sm font-semibold text-primary"
          >
            Voir les événements
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {EVENEMENTS.map((e, i) => (
            <Reveal key={e.slug} delay={i * 70} className="h-full">
              <Link
                to="/a-emporter"
                className="group block h-full overflow-hidden rounded-card border border-secondary/35 bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="aspect-square overflow-hidden">
                  <Photo
                    file={e.cover.file}
                    alt={e.cover.alt}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="p-3 text-center font-medium text-primary-dark">{e.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Coordonnées & horaires — adresse incluse. */}
      <Section kicker="Infos pratiques" title="Nous trouver" tone="cream">
        <Reveal>
          <Card>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-label text-secondary">
                  Adresse
                </dt>
                <dd className="mt-1 text-ink/90">{SITE.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-label text-secondary">
                  Téléphone
                </dt>
                <dd className="mt-1">
                  <a href={SITE.phoneHref} className="link-underline text-primary">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-label text-secondary">
                  {SITE.restaurant.label}
                </dt>
                <dd className="mt-1 text-ink/90">{SITE.restaurant.hours}</dd>
                <dd className="text-ink/80">{SITE.restaurant.closed}</dd>
              </div>
            </dl>
          </Card>
        </Reveal>
      </Section>

      {/* Inscription liste de diffusion (F1) — succès simulé. */}
      <Section kicker="Newsletter" title="Restez informé·e" tone="surface">
        <Reveal>
          <MailingSignup />
        </Reveal>
      </Section>

      {/* Avis Google — bande sombre éditoriale (note réelle, exemples reformulés). */}
      <Section kicker="On en parle" title="Ils nous recommandent" tone="dark">
        <Reveal>
          <p className="text-on-primary/90">
            <Stars n={REVIEWS.rating} />{' '}
            <strong className="text-on-primary">{REVIEWS.rating.toFixed(1)}/5</strong> ·{' '}
            {REVIEWS.count} avis Google
          </p>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {REVIEWS.samples.map((r, i) => (
            <Reveal key={r.author} delay={i * 70} className="h-full">
              <Card className="h-full">
                <p className="text-ink/90">« {r.text} »</p>
                <p className="mt-3 text-xs text-secondary">
                  <Stars n={r.stars} /> · {r.author}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-xs italic text-on-primary/60">
          Exemples représentatifs (reformulés) — à remplacer en production par les avis
          Google en direct.
        </p>
      </Section>
    </>
  )
}
