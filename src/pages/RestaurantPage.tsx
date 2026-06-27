import { Link } from 'react-router-dom'
import { buttonClasses, Card, Hero, Reveal, Section } from '../components'
import { heroUrl, SITE, SOIREE_DU_MOIS } from '../data'

export function RestaurantPage() {
  return (
    <>
      <Hero
        image={heroUrl}
        imagePosition="center"
        eyebrow={SITE.restaurant.label}
        title="À midi, la cuisine du jour"
        subtitle="Une cuisine faite maison, au rythme du marché et des saisons."
      />

      {/* La formule du midi — décrite, sans afficher le menu. */}
      <Section kicker="Le déjeuner" title="La formule du midi" tone="cream">
        <Reveal>
          <Card>
            <p className="max-w-prose text-ink/80">
              PLACEHOLDER_RESTAURANT — chaque jour, une formule courte et faite maison
              (entrée, plat, dessert), qui change au gré du marché. Le menu du jour est
              annoncé sur place et sur nos réseaux ; il n’est pas figé ici.
            </p>
            <dl className="mt-5 space-y-1">
              <dt className="font-semibold text-primary-dark">{SITE.restaurant.label}</dt>
              <dd className="text-ink/80">{SITE.restaurant.hours}</dd>
              <dd className="text-ink/80">{SITE.restaurant.closed}</dd>
            </dl>
            <a href={SITE.phoneHref} className={`${buttonClasses('primary', 'md')} mt-5`}>
              Réserver une table · {SITE.phone}
            </a>
          </Card>
        </Reveal>
      </Section>

      {/* Soirées à thème — bande sombre, atmosphère du soir. */}
      <Section kicker="En soirée" title="Nos soirées à thème" tone="dark">
        <Reveal>
          <Card accent>
            <p className="text-xs font-semibold uppercase tracking-label text-accent-strong">
              Soirée du mois · {SOIREE_DU_MOIS.date}
            </p>
            <h3 className="mt-1.5 font-heading text-2xl text-primary-dark">
              {SOIREE_DU_MOIS.theme}
            </h3>
            <p className="mt-1.5 max-w-prose text-ink/80">{SOIREE_DU_MOIS.description}</p>
            <a href={SITE.phoneHref} className={`${buttonClasses('accent', 'md')} mt-5`}>
              Réserver · {SITE.phone}
            </a>
          </Card>
        </Reveal>
      </Section>

      {/* Ambiance — un seul bloc éditorial « reportage à venir » (pas de grands vides). */}
      <Section kicker="L’ambiance" title="Bientôt en images" tone="surface">
        <Reveal>
          <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-secondary/50 bg-cream/60 px-6 py-12 text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-10 w-10 text-accent-strong"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
              <circle cx="12" cy="13" r="3.2" />
            </svg>
            <p className="max-w-md text-ink/80">
              Le reportage photo de la salle et des assiettes est en préparation. Les
              visuels du restaurant arriveront ici très prochainement.
            </p>
            <span className="text-xs italic text-secondary">
              Visuels à fournir par le client.
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-3">
            <Link to="/traiteur" className={buttonClasses('outline', 'md')}>
              Découvrir aussi le traiteur →
            </Link>
            <Link to="/a-emporter" className={buttonClasses('ghost', 'md')}>
              Nos événements à emporter
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
