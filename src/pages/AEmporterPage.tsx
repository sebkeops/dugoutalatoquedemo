import { Link } from 'react-router-dom'
import { buttonClasses, Container, Hero, Photo } from '../components'
import { EVENEMENTS } from '../data'

/**
 * Événements « à emporter » — les 4 dates fixes du client.
 * Photos réelles (sources/a-emporter). La commande en ligne par créneaux
 * arrive en formule Complète (F3, mockups au Brief 3).
 */
export function AEmporterPage() {
  return (
    <>
      <Hero
        eyebrow="À emporter"
        tone="event"
        title="Nos événements à emporter"
        subtitle="Quatre rendez-vous gourmands dans l’année : commandez, on prépare, vous emportez."
      />

      <Container width="wide" className="space-y-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {EVENEMENTS.map((e) => (
            <article
              key={e.slug}
              className="overflow-hidden rounded-card border border-secondary/25 bg-surface shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Photo file={e.cover.file} alt={e.cover.alt} />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-heading text-xl text-primary-dark">{e.name}</h2>
                  <span className="text-xs font-medium uppercase tracking-label text-accent-strong">
                    {e.periode}
                  </span>
                </div>
                <p className="text-sm text-ink/80">{e.tagline}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-secondary">
          La commande en ligne (créneaux de retrait au quart d’heure) est incluse dans la
          formule Complète.
        </p>

        <div className="flex justify-center">
          <Link to="/contact" className={buttonClasses('accent', 'lg')}>
            Être prévenu des prochaines dates
          </Link>
        </div>
      </Container>
    </>
  )
}
