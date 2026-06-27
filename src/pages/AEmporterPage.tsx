import { Link } from 'react-router-dom'
import { buttonClasses, Hero, Photo, Reveal, Section } from '../components'
import { EVENEMENTS, photoUrl } from '../data'

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
        image={photoUrl('a-emporter-01.jpg')}
        title="Nos événements à emporter"
        subtitle="Quatre rendez-vous gourmands dans l’année : commandez, on prépare, vous emportez."
      />

      <Section kicker="Le calendrier" title="Quatre rendez-vous gourmands" tone="cream">
        <div className="grid gap-5 sm:grid-cols-2">
          {EVENEMENTS.map((e, i) => (
            <Reveal key={e.slug} delay={i * 70} className="h-full">
              <article className="group h-full overflow-hidden rounded-card border border-secondary/35 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
                <div className="aspect-[16/10] overflow-hidden">
                  <Photo
                    file={e.cover.file}
                    alt={e.cover.alt}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl text-primary-dark">{e.name}</h3>
                    <span className="text-xs font-medium uppercase tracking-label text-accent-strong">
                      {e.periode}
                    </span>
                  </div>
                  <p className="text-ink/80">{e.tagline}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-secondary">
              La commande en ligne (créneaux de retrait au quart d’heure) est incluse dans
              la formule Complète.
            </p>
            <Link to="/contact" className={buttonClasses('accent', 'lg')}>
              Être prévenu des prochaines dates →
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
