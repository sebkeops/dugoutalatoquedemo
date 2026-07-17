import { Link } from 'react-router-dom'
import {
  Banner,
  buttonClasses,
  Card,
  FeatureRow,
  Hero,
  MailingSignup,
  Photo,
  Reveal,
  Section,
} from '../components'
import {
  EVENEMENTS,
  heroUrl,
  photoUrl,
  REVIEWS,
  SITE,
  SOIREE_DU_MOIS,
  UNIVERS,
} from '../data'

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

      {/* Le restaurant — asymétrie, image à gauche.
          Reprend volontairement la photo du héros : c'est la seule vraie photo de
          restaurant disponible, et sur la section qui présente le restaurant elle
          vaut mieux qu'un motif décoratif. Le héros la sert en fond plein-cadre,
          ici elle est cadrée dans une carte : la répétition passe inaperçue.
          À remplacer dès que les photos du midi (plats / ambiance) arriveront. */}
      <Section tone="cream">
        <FeatureRow
          image={heroUrl}
          alt="Salle du restaurant Du Goût à la Toque"
          eager
          kicker="Le midi"
          title="Le restaurant"
          cta={
            <Link to="/restaurant" className={buttonClasses('primary', 'md')}>
              Découvrir le restaurant →
            </Link>
          }
        >
          <p>
            À midi, une cuisine faite maison au rythme du marché, et des soirées à thème
            tout au long de l’année.
          </p>
        </FeatureRow>
      </Section>

      {/* Moment plein-cadre. */}
      <Banner
        image={photoUrl('mariage-01.jpg')}
        alt="Table de réception dressée à l’heure dorée"
        tone="event"
        kicker="Traiteur"
        title="Pour vos plus belles tables"
        subtitle="Du cocktail au repas assis, une cuisine de fête généreuse et soignée."
        cta={
          /* Bande terracotta : un bouton accent serait terracotta sur terracotta. */
          <Link to="/traiteur" className={buttonClasses('outline', 'lg', 'bg-cream/95')}>
            Découvrir le traiteur →
          </Link>
        }
      />

      {/* Le traiteur — asymétrie, image à droite. */}
      <Section tone="cream">
        <FeatureRow
          flip
          image={photoUrl('mariage-02.jpg')}
          alt="Assortiment de verrines et bouchées fleuries"
          kicker="Sur mesure"
          title="Un traiteur pour chaque occasion"
          motifTone="event"
          cta={
            <Link to="/traiteur" className={buttonClasses('accent', 'md')}>
              Tous les univers →
            </Link>
          }
        >
          <p>{mariage.tagline}</p>
        </FeatureRow>
      </Section>

      {/* Plat signature — point focal appétissant. */}
      <Section tone="surface">
        <FeatureRow
          image={photoUrl('mariage-11.jpg')}
          alt="Part de fraisier, crème vanille et fraises fraîches"
          ratio="aspect-[4/5]"
          kicker="Plat signature"
          title="Le soin du détail, jusqu’à la dernière bouchée"
          motifTone="event"
          cta={
            <Link to="/traiteur" className={buttonClasses('primary', 'md')}>
              Voir nos univers →
            </Link>
          }
        >
          <p>
            Des pièces dressées avec soin, des desserts qui font l’effet : chaque assiette
            raconte le goût du fait-maison.
          </p>
        </FeatureRow>
      </Section>

      {/* À emporter — 4 événements. */}
      <Section
        kicker="Les fêtes"
        title="À emporter"
        tone="cream"
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
                className="group block h-full overflow-hidden rounded-card border border-secondary/35 bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
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

      {/* Avis Google — bande sombre éditoriale. */}
      <Section kicker="On en parle" title="Ils nous recommandent" tone="dark">
        <Reveal>
          <p className="text-on-primary/90">
            <Stars n={REVIEWS.rating} />{' '}
            <strong className="text-on-primary">{REVIEWS.rating.toFixed(1)}/5</strong> ·{' '}
            {REVIEWS.count} avis Google
          </p>
        </Reveal>
        {/*
         * Note agrégée réelle (fiche Google). Les cartes ci-dessous sont des exemples
         * REFORMULÉS, pas des verbatims — à brancher en production sur l'API Google
         * Places pour afficher les avis authentiques. Voir REVIEWS dans data/site.ts.
         */}
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
      </Section>

      {/* Coordonnées & horaires. */}
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
    </>
  )
}
