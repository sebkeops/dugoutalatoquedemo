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
              Chaque midi, une cuisine faite maison, au rythme du marché : la formule du
              jour, complétée d’une carte de suggestions. Les plats changent au fil des
              arrivages et des saisons — le menu du jour est annoncé sur place.
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

      {/*
       * Clôture — passerelles vers les deux autres activités.
       * (Emplacement naturel d'une future section « ambiance » : le reportage photo
       * de la salle et des assiettes n'a pas encore été fourni par le client.)
       */}
      <Section kicker="Et aussi" title="Découvrir la maison" tone="surface">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Link to="/traiteur" className={buttonClasses('primary', 'md')}>
              Découvrir aussi le traiteur →
            </Link>
            <Link to="/a-emporter" className={buttonClasses('outline', 'md')}>
              Nos événements à emporter
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
