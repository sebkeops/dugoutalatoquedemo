import { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Button, Card, Container, FormField, Hero } from '../components'
import { TierBadge, TierGate } from '../tiers'
import { SITE } from '../data'

/** Téléphone + e-mail — affichés en complément quel que soit le tier. */
function ContactInfo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'text-sm' : 'space-y-1 text-sm'}>
      <p>
        <span className="font-semibold text-primary-dark">Téléphone : </span>
        <a href={SITE.phoneHref} className="text-primary underline">
          {SITE.phone}
        </a>
      </p>
      <p>
        <span className="font-semibold text-primary-dark">E-mail : </span>
        <a href={`mailto:${SITE.email}`} className="text-primary underline">
          {SITE.email}
        </a>
      </p>
    </div>
  )
}

/** Fallback formule F1 : le formulaire en ligne n'est pas inclus → contact direct. */
function DevisFallback() {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <h2 className="font-heading text-xl text-primary-dark">Contactez-nous</h2>
        <TierBadge minTier={2} compact />
      </div>
      <p className="mt-2 text-sm text-ink/80">
        Le formulaire de devis en ligne est inclus à partir de la formule Intermédiaire.
        En attendant, parlons de votre projet directement :
      </p>
      <div className="mt-3">
        <ContactInfo />
      </div>
    </Card>
  )
}

interface DevisForm {
  event: string
  date: string
  personnes: string
  budget: string
  commentaire: string
}

const LABELS: Record<keyof DevisForm, string> = {
  event: 'Type d’événement',
  date: 'Date de l’événement',
  personnes: 'Nombre de personnes',
  budget: 'Budget indicatif',
  commentaire: 'Votre projet',
}

/**
 * Page « Demande de devis ».
 * Le formulaire (date / nb de personnes / budget / commentaire) est une feature
 * F2 : encapsulé dans <TierGate minTier={2}> avec un fallback contact en F1.
 * Téléphone + e-mail restent visibles en complément quel que soit le tier.
 * DÉMONSTRATION : aucun envoi réel — la validation affiche une confirmation.
 */
export function ContactPage() {
  const location = useLocation()
  const [params] = useSearchParams()
  const prefill =
    (location.state as { event?: string } | null)?.event ?? params.get('event') ?? ''

  const [form, setForm] = useState<DevisForm>({
    event: prefill,
    date: '',
    personnes: '',
    budget: '',
    commentaire: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const set = (k: keyof DevisForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }))

  const canSubmit = form.date.trim() !== '' && form.personnes.trim() !== ''

  return (
    <>
      <Hero
        eyebrow="Contact"
        tone="brand"
        title="Demande de devis"
        subtitle="Parlez-nous de votre événement : nous revenons vers vous avec une proposition sur mesure. Aucun tarif n’est affiché en ligne — chaque devis est personnalisé."
      />

      <Container className="space-y-6 py-10">
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge minTier={2} />
        </div>

        <TierGate minTier={2} fallback={<DevisFallback />}>
          {submitted ? (
            <Card accent>
              <h2 className="font-heading text-xl text-primary-dark">Demande reçue !</h2>
              <p className="mt-1 text-sm text-ink/80">
                Merci, nous vous recontactons rapidement pour affiner votre devis.
              </p>
              <dl className="mt-4 space-y-1.5 text-sm">
                {(Object.keys(LABELS) as (keyof DevisForm)[])
                  .filter((k) => form[k].trim() !== '')
                  .map((k) => (
                    <div key={k} className="flex gap-2">
                      <dt className="font-semibold text-primary-dark">{LABELS[k]} :</dt>
                      <dd className="text-ink/80">{form[k]}</dd>
                    </div>
                  ))}
              </dl>
              <p className="mt-3 text-xs italic text-secondary">
                Démonstration — aucune demande n’est réellement envoyée.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => setSubmitted(false)}
              >
                Modifier ma demande
              </Button>
            </Card>
          ) : (
            <Card>
              <div className="space-y-4">
                <FormField
                  label={LABELS.event}
                  name="event"
                  placeholder="Mariage, séminaire, anniversaire…"
                  value={form.event}
                  onChange={set('event')}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={LABELS.date}
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={set('date')}
                  />
                  <FormField
                    label={LABELS.personnes}
                    type="number"
                    name="personnes"
                    required
                    placeholder="Ex. 80"
                    value={form.personnes}
                    onChange={set('personnes')}
                  />
                </div>
                <FormField
                  label={LABELS.budget}
                  name="budget"
                  placeholder="Ex. à définir ensemble"
                  hint="Optionnel — pour calibrer notre proposition."
                  value={form.budget}
                  onChange={set('budget')}
                />
                <FormField
                  label={LABELS.commentaire}
                  multiline
                  name="commentaire"
                  placeholder="Lieu, envies, contraintes, formule souhaitée…"
                  value={form.commentaire}
                  onChange={set('commentaire')}
                />
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="accent"
                    disabled={!canSubmit}
                    onClick={() => setSubmitted(true)}
                  >
                    Envoyer ma demande
                  </Button>
                  <span className="text-xs text-secondary">Date et nombre de personnes requis.</span>
                </div>
              </div>
            </Card>
          )}
        </TierGate>

        {/* Complément — toujours visible, quel que soit le tier. */}
        <Card>
          <h2 className="font-heading text-lg text-primary-dark">Préférez-vous nous parler ?</h2>
          <p className="mt-1 text-sm text-ink/80">
            Joignez-nous directement, nous serons ravis d’échanger sur votre projet.
          </p>
          <div className="mt-3">
            <ContactInfo />
          </div>
          <p className="mt-3 text-xs text-secondary">
            {SITE.traiteur.label} — {SITE.traiteur.note}
          </p>
        </Card>
      </Container>
    </>
  )
}
