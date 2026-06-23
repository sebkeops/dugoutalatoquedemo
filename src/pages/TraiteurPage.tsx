import { Link } from 'react-router-dom'
import { Badge, Container, Hero, Photo } from '../components'
import { UNIVERS } from '../data'

/** Index des univers traiteur — cartes cliquables (mobile-first). */
export function TraiteurPage() {
  return (
    <>
      <Hero
        eyebrow="Notre traiteur"
        tone="event"
        title="Un traiteur pour chaque occasion"
        subtitle="Du mariage au séminaire d’entreprise, une cuisine de fête faite maison."
      />

      <Container width="wide" className="space-y-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {UNIVERS.map((u) => (
            <Link
              key={u.slug}
              to={`/traiteur/${u.slug}`}
              className="group overflow-hidden rounded-card border border-secondary/25 bg-surface shadow-card transition-shadow hover:shadow-lifted"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface">
                {u.presentation === 'gallery' ? (
                  <Photo
                    file={u.photos[0].file}
                    alt={u.photos[0].alt}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-accent-strong/90 p-4 text-center">
                    <span className="font-heading text-xl text-cream">{u.name}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-heading text-lg text-primary-dark">{u.name}</h2>
                  {!u.hasRealPhotos && u.presentation === 'placeholder' && (
                    <Badge tone="neutral">Bientôt</Badge>
                  )}
                </div>
                <p className="text-sm text-ink/80">{u.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
