import { Link } from 'react-router-dom'
import { Badge, BrandMotif, Hero, Photo, Reveal, Section } from '../components'
import { photoUrl, PUBLISHED_UNIVERS } from '../data'

/** Index des univers traiteur — cartes cliquables (mobile-first). */
export function TraiteurPage() {
  return (
    <>
      <Hero
        eyebrow="Notre traiteur"
        tone="event"
        image={photoUrl('mariage-01.jpg')}
        title="Un traiteur pour chaque occasion"
        subtitle="Du mariage au séminaire d’entreprise, une cuisine de fête faite maison."
      />

      <Section kicker="Nos univers" title="Pour chaque occasion" tone="cream">
        <div className="grid gap-5 sm:grid-cols-2">
          {PUBLISHED_UNIVERS.map((u, i) => (
            <Reveal key={u.slug} delay={i * 70} className="h-full">
              <Link
                to={`/traiteur/${u.slug}`}
                className="group block h-full overflow-hidden rounded-card border border-secondary/35 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
              >
                <div className="aspect-[16/10] overflow-hidden bg-surface">
                  {u.presentation === 'gallery' ? (
                    <Photo
                      file={u.photos[0].file}
                      alt={u.photos[0].alt}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Pas encore de photo : motif de marque seul — le nom de
                       l'univers est déjà porté par le titre de la carte. */
                    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-accent-strong to-accent">
                      <BrandMotif className="pointer-events-none absolute -right-4 -top-6 h-40 w-40 text-cream/15" />
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-xl text-primary-dark">{u.name}</h3>
                    {!u.hasRealPhotos && u.presentation === 'placeholder' && (
                      <Badge tone="neutral">Bientôt</Badge>
                    )}
                  </div>
                  <p className="text-ink/80">{u.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
