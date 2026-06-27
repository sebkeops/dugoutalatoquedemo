import { useState } from 'react'
import { Button, Card, FormField } from '../components'
import { CONTACTS, CONTACTS_TOTAL, logoUrl, SITE } from '../data'
import { MockupFrame } from './MockupFrame'

const PER_PAGE = 8
const BATCHES = Math.ceil(CONTACTS_TOTAL / 20) // envois manuels « 20 par 20 » aujourd'hui

export function MailingTool() {
  const [subject, setSubject] = useState('Notre soirée tapas d’été — vendredi 17 juillet')
  const [body, setBody] = useState(
    'Bonjour,\n\nNous vous attendons pour une soirée conviviale autour de petites assiettes à partager. Places limitées, sur réservation.\n\nÀ très vite,\nL’équipe Du Goût à la Toque',
  )
  const [sent, setSent] = useState(false)
  const [page, setPage] = useState(0)

  const pages = Math.ceil(CONTACTS.length / PER_PAGE)
  const slice = CONTACTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <MockupFrame
      title="Outil de mailing"
      subtitle="Toute votre liste, un e-mail à votre image, envoyé en un seul clic."
      minTier={2}
    >
      {/* Gain de temps */}
      <Card accent>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div>
            <p className="font-heading text-2xl text-primary-dark">{CONTACTS_TOTAL}</p>
            <p className="text-xs text-secondary">contacts dans votre liste</p>
          </div>
          <div className="text-sm text-ink/80">
            <p>
              Aujourd’hui : <strong>{BATCHES} envois</strong> manuels de 20 destinataires.
            </p>
            <p>
              Avec votre outil : <strong>1 seul clic</strong> pour tout le monde.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Composer */}
        <section className="space-y-4">
          <h2 className="text-xl">Composer l’e-mail</h2>
          <Card>
            <div className="space-y-4">
              <FormField
                label="Objet"
                name="objet"
                value={subject}
                onChange={(v) => {
                  setSubject(v)
                  setSent(false)
                }}
              />
              <FormField
                label="Message"
                name="message"
                multiline
                value={body}
                onChange={(v) => {
                  setBody(v)
                  setSent(false)
                }}
              />
              {sent ? (
                <div className="rounded-card border border-primary/30 bg-cream p-3 text-sm">
                  <p className="font-semibold text-primary-dark">
                    Envoyé à {CONTACTS_TOTAL} contacts en 1 clic ✓
                  </p>
                  <p className="text-xs italic text-secondary">
                    Démonstration — aucun e-mail n’est réellement envoyé.
                  </p>
                </div>
              ) : (
                <Button variant="accent" onClick={() => setSent(true)}>
                  Envoyer en un clic à {CONTACTS_TOTAL} contacts
                </Button>
              )}
            </div>
          </Card>

          {/* Aperçu « aux couleurs de l'enseigne » */}
          <div className="overflow-hidden rounded-card border border-secondary/25 shadow-card">
            <div className="flex items-center gap-3 bg-primary-dark p-4">
              <img
                src={logoUrl}
                alt={SITE.name}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-cream/30"
              />
              <span className="font-heading text-lg text-cream">{SITE.name}</span>
            </div>
            <div className="space-y-2 bg-cream p-4">
              <p className="font-heading text-base text-primary-dark">
                {subject || 'Objet de l’e-mail'}
              </p>
              <p className="whitespace-pre-line text-sm text-ink/90">{body}</p>
              <p className="border-t border-secondary/30 pt-2 text-xs text-secondary">
                {SITE.address} · {SITE.phone}
              </p>
            </div>
          </div>
        </section>

        {/* Liste de diffusion */}
        <section className="space-y-4">
          <h2 className="text-xl">Liste de diffusion</h2>
          <Card>
            <ul className="divide-y divide-secondary/20">
              {slice.map((c) => (
                <li key={c.email} className="flex items-center justify-between gap-2 py-2">
                  <div>
                    <p className="text-sm font-medium text-primary-dark">{c.nom}</p>
                    <p className="text-xs text-secondary">{c.email}</p>
                  </div>
                  <span className="text-xs text-secondary">{c.inscritLe}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between text-sm">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Précédent
              </Button>
              <span className="text-xs text-secondary">
                Aperçu {page + 1}/{pages} · {CONTACTS_TOTAL} contacts au total
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= pages - 1}
                onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              >
                Suivant
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </MockupFrame>
  )
}
