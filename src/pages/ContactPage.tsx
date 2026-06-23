import { Container } from '../components'
import { SITE } from '../data'

/**
 * Page contact / demande de devis — stub.
 * Le formulaire de devis avec back-office de modération arrive en formule
 * Intermédiaire (F2). Ici, on présente les coordonnées réelles.
 */
export function ContactPage() {
  return (
    <Container className="space-y-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl">Contact & devis</h1>
        <p className="text-ink/80">
          PLACEHOLDER — le formulaire de devis en ligne sera présenté en formule
          Intermédiaire. En attendant, voici comment nous joindre.
        </p>
      </header>

      <dl className="space-y-3 text-sm">
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
        <div>
          <dt className="font-semibold text-primary-dark">{SITE.traiteur.label}</dt>
          <dd className="text-ink/80">{SITE.traiteur.note}</dd>
        </div>
      </dl>
    </Container>
  )
}
