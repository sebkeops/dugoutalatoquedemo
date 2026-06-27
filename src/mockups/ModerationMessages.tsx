import { useMemo, useState, type ReactNode } from 'react'
import { Badge, Button, Card } from '../components'
import { MESSAGES, universBySlug, type MessageDevis, type MessageStatut } from '../data'
import { MockupFrame } from './MockupFrame'

const STATUT_TONE: Record<MessageStatut, 'neutral' | 'primary' | 'accent'> = {
  nouveau: 'accent',
  traité: 'primary',
  archivé: 'neutral',
}

const NEXT_STATUT: Record<MessageStatut, MessageStatut> = {
  nouveau: 'traité',
  traité: 'archivé',
  archivé: 'nouveau',
}

function universName(slug: string) {
  return universBySlug(slug)?.name ?? slug
}

export function ModerationMessages() {
  const [messages, setMessages] = useState<MessageDevis[]>(MESSAGES)
  const [filter, setFilter] = useState<string>('all')
  const [selectedId, setSelectedId] = useState<string | null>(MESSAGES[0]?.id ?? null)

  // Univers présents dans les messages (pour les onglets de filtre).
  const universSlugs = useMemo(
    () => Array.from(new Set(MESSAGES.map((m) => m.universSlug))),
    [],
  )

  const visible = messages.filter((m) => filter === 'all' || m.universSlug === filter)
  const selected = messages.find((m) => m.id === selectedId) ?? null
  const nouveaux = messages.filter((m) => m.statut === 'nouveau').length

  function cycleStatut(id: string) {
    setMessages((list) =>
      list.map((m) => (m.id === id ? { ...m, statut: NEXT_STATUT[m.statut] } : m)),
    )
  }

  return (
    <MockupFrame
      title="Modération des messages"
      subtitle="Toutes vos demandes de devis au même endroit — fini les e-mails éparpillés."
      minTier={2}
    >
      {/* Filtres par univers */}
      <div className="flex flex-wrap gap-2">
        <FilterTab active={filter === 'all'} onClick={() => setFilter('all')}>
          Tous ({messages.length})
        </FilterTab>
        {universSlugs.map((slug) => (
          <FilterTab key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
            {universName(slug)}
          </FilterTab>
        ))}
        <span className="ml-auto self-center text-xs text-secondary">
          {nouveaux} nouveau{nouveaux > 1 ? 'x' : ''} à traiter
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-[1.1fr_1fr]">
        {/* Liste */}
        <ul className="space-y-2">
          {visible.map((m) => {
            const active = m.id === selectedId
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  className={[
                    'w-full rounded-card border p-3 text-left transition-colors',
                    active
                      ? 'border-primary bg-surface'
                      : 'border-secondary/25 bg-surface/60 hover:bg-surface',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-primary-dark">{m.nom}</span>
                    <Badge tone={STATUT_TONE[m.statut]}>{m.statut}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-secondary">
                    {universName(m.universSlug)} · {m.personnes} pers. · reçu le{' '}
                    {m.recuLe}
                  </p>
                </button>
              </li>
            )
          })}
          {visible.length === 0 && (
            <li className="rounded-card border border-secondary/25 p-4 text-sm text-secondary">
              Aucun message pour ce filtre.
            </li>
          )}
        </ul>

        {/* Détail */}
        <div>
          {selected ? (
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg text-primary-dark">{selected.nom}</h2>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-primary underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <Badge tone={STATUT_TONE[selected.statut]}>{selected.statut}</Badge>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <Field label="Univers" value={universName(selected.universSlug)} />
                <Field label="Date souhaitée" value={selected.dateEvenement} />
                <Field label="Convives" value={`${selected.personnes} personnes`} />
                <Field label="Budget" value={selected.budget} />
              </dl>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-label text-secondary">
                  Commentaire
                </p>
                <p className="mt-1 text-sm text-ink/90">{selected.commentaire}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="accent" onClick={() => cycleStatut(selected.id)}>
                  Marquer « {NEXT_STATUT[selected.statut]} »
                </Button>
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center rounded-button border border-primary px-3 py-1.5 text-sm font-semibold text-primary-dark hover:bg-surface"
                >
                  Répondre
                </a>
              </div>
            </Card>
          ) : (
            <Card>
              <p className="text-sm text-secondary">Sélectionnez un message à gauche.</p>
            </Card>
          )}
        </div>
      </div>
    </MockupFrame>
  )
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-pill border px-3 py-1 text-sm font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-on-primary'
          : 'border-secondary/50 bg-surface text-primary-dark hover:bg-cream',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-label text-secondary">
        {label}
      </dt>
      <dd className="text-ink/90">{value}</dd>
    </div>
  )
}
