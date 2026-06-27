import { Link } from 'react-router-dom'
import { buttonClasses, Card, Container, Hero, Photo } from '../components'
import { SITE, SOIREE_DU_MOIS } from '../data'

/** Visuels d'ambiance — fichiers non encore fournis : <Photo> affiche le fallback. */
const AMBIANCE = [
  { file: 'restaurant-salle.jpg', alt: 'Salle du restaurant' },
  { file: 'restaurant-assiette.jpg', alt: 'Assiette du menu du midi' },
  { file: 'restaurant-terrasse.jpg', alt: 'Terrasse du restaurant' },
]

/**
 * Page Restaurant — identité première de l'établissement (service du midi).
 * On DÉCRIT la formule du jour sans publier le menu, on met en avant les soirées
 * à thème et l'ambiance. Visuels en placeholder propre tant que non fournis.
 */
export function RestaurantPage() {
  return (
    <>
      <Hero
        eyebrow={SITE.restaurant.label}
        title="À midi, la cuisine du jour"
        subtitle="Une cuisine faite maison, au rythme du marché et des saisons."
      />

      <Container className="space-y-8 py-8">
        {/* La formule du midi — décrite, sans afficher le menu. */}
        <section className="space-y-3">
          <h2 className="text-2xl">La formule du midi</h2>
          <Card>
            <p className="text-sm text-ink/80">
              PLACEHOLDER_RESTAURANT — chaque jour, une formule courte et faite maison
              (entrée, plat, dessert), qui change au gré du marché. Le menu du jour est
              annoncé sur place et sur nos réseaux ; il n’est pas figé ici.
            </p>
            <dl className="mt-4 space-y-1 text-sm">
              <dt className="font-semibold text-primary-dark">{SITE.restaurant.label}</dt>
              <dd className="text-ink/80">{SITE.restaurant.hours}</dd>
              <dd className="text-ink/80">{SITE.restaurant.closed}</dd>
            </dl>
            <a href={SITE.phoneHref} className={`${buttonClasses('primary', 'sm')} mt-4`}>
              Réserver une table · {SITE.phone}
            </a>
          </Card>
        </section>

        {/* Soirées à thème. */}
        <section className="space-y-3">
          <h2 className="text-2xl">Nos soirées à thème</h2>
          <Card accent>
            <p className="text-xs font-semibold uppercase tracking-label text-accent-strong">
              Soirée du mois · {SOIREE_DU_MOIS.date}
            </p>
            <h3 className="mt-1 font-heading text-xl text-primary-dark">
              {SOIREE_DU_MOIS.theme}
            </h3>
            <p className="mt-1 text-sm text-ink/80">{SOIREE_DU_MOIS.description}</p>
            <a href={SITE.phoneHref} className={`${buttonClasses('accent', 'sm')} mt-4`}>
              Réserver · {SITE.phone}
            </a>
          </Card>
        </section>

        {/* Ambiance — visuels placeholder. */}
        <section className="space-y-3">
          <h2 className="text-2xl">L’ambiance</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AMBIANCE.map((p) => (
              <figure
                key={p.file}
                className="aspect-square overflow-hidden rounded-card bg-surface shadow-soft"
              >
                <Photo file={p.file} alt={p.alt} />
              </figure>
            ))}
          </div>
          <p className="text-xs italic text-secondary">
            Visuels de salle et d’assiettes à fournir par le client.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link to="/traiteur" className={buttonClasses('outline', 'md')}>
            Découvrir aussi le traiteur
          </Link>
          <Link to="/a-emporter" className={buttonClasses('ghost', 'md')}>
            Nos événements à emporter
          </Link>
        </div>
      </Container>
    </>
  )
}
