import { useState } from 'react'
import { Badge, Button, Card, Photo } from '../components'
import { COMMANDES, EVENEMENTS, type Commande, type CommandeStatut } from '../data'
import { MockupFrame } from './MockupFrame'

const STATUT_ORDER: CommandeStatut[] = ['nouvelle', 'confirmée', 'préparée']
const STATUT_TONE: Record<CommandeStatut, 'neutral' | 'primary' | 'accent'> = {
  nouvelle: 'accent',
  confirmée: 'primary',
  préparée: 'neutral',
}
function nextStatut(s: CommandeStatut): CommandeStatut {
  return STATUT_ORDER[(STATUT_ORDER.indexOf(s) + 1) % STATUT_ORDER.length]
}

const toMin = (s: string) => {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + m
}
const toStr = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

/** Petit interrupteur on/off (réaliste, non persistant). */
function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={[
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill transition-colors',
        on ? 'bg-primary' : 'bg-secondary/50',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-5 w-5 transform rounded-full bg-cream transition-transform',
          on ? 'translate-x-5' : 'translate-x-0.5',
        ].join(' ')}
      />
    </button>
  )
}

export function OrdersManager() {
  const [actifs, setActifs] = useState<Record<string, boolean>>({
    noel: true,
    'nouvel-an': false,
    'saint-valentin': false,
    'fete-des-meres': false,
  })
  const [commandes, setCommandes] = useState<Commande[]>(COMMANDES)
  const [printed, setPrinted] = useState(false)
  const [debut, setDebut] = useState('10:00')
  const [fin, setFin] = useState('11:30')
  const [maxParCreneau, setMaxParCreneau] = useState(2)

  const advance = (id: string) =>
    setCommandes((list) =>
      list.map((c) => (c.id === id ? { ...c, statut: nextStatut(c.statut) } : c)),
    )

  const counts = STATUT_ORDER.map(
    (s) => [s, commandes.filter((c) => c.statut === s).length] as const,
  )

  // Créneaux générés au quart d'heure.
  const slots: string[] = []
  if (toMin(fin) > toMin(debut)) {
    for (let t = toMin(debut); t < toMin(fin); t += 15) slots.push(toStr(t))
  }
  const parCreneau = (slot: string) => commandes.filter((c) => c.creneau === slot).length

  return (
    <MockupFrame
      title="Commande en ligne — événements"
      subtitle="Activez un événement, suivez chaque commande et imprimez votre journée."
      minTier={3}
    >
      {/* 1. Activation des événements — les deux états visibles. */}
      <section className="space-y-3">
        <h2 className="text-xl">Événements à la commande</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {EVENEMENTS.map((e) => {
            const on = !!actifs[e.slug]
            return (
              <div
                key={e.slug}
                className={[
                  'flex items-center gap-3 rounded-card border p-3 transition-colors',
                  on ? 'border-primary/40 bg-surface' : 'border-secondary/25 bg-surface/50',
                ].join(' ')}
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-card">
                  <Photo file={e.cover.file} alt={e.cover.alt} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-primary-dark">{e.name}</p>
                  <Badge tone={on ? 'primary' : 'neutral'}>
                    {on ? 'Commandes ouvertes' : 'Hors ligne'}
                  </Badge>
                </div>
                <Switch
                  on={on}
                  onClick={() => setActifs((a) => ({ ...a, [e.slug]: !a[e.slug] }))}
                />
              </div>
            )
          })}
        </div>
        <p className="text-xs text-secondary">
          Exemple : « Noël » est activé (commandes ouvertes), les autres sont hors ligne.
          Cliquez un interrupteur pour basculer.
        </p>
      </section>

      {/* 2. Gestion des commandes. */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl">Commandes — Noël</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-secondary">
              {counts.map(([s, n]) => `${n} ${s}`).join(' · ')}
            </span>
            <Button size="sm" variant="primary" onClick={() => setPrinted(true)}>
              Imprimer tout
            </Button>
          </div>
        </div>
        {printed && (
          <p className="rounded-card border border-primary/30 bg-cream p-2 text-sm text-primary-dark">
            Impression de {commandes.length} bons de commande envoyée… (démonstration)
          </p>
        )}
        <div className="space-y-2">
          {commandes
            .slice()
            .sort((a, b) => a.creneau.localeCompare(b.creneau))
            .map((c) => (
              <Card key={c.id} className="!p-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono text-xs text-secondary">{c.id}</span>
                  <span className="font-medium text-primary-dark">{c.client}</span>
                  <span className="rounded-pill bg-cream px-2 py-0.5 text-xs text-ink/80">
                    Retrait {c.creneau}
                  </span>
                  <Badge tone={STATUT_TONE[c.statut]}>{c.statut}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-auto"
                    onClick={() => advance(c.id)}
                  >
                    → {nextStatut(c.statut)}
                  </Button>
                </div>
                <p className="mt-1 text-xs text-ink/70">
                  {c.articles.map((a) => `${a.qte}× ${a.libelle}`).join(' · ')}
                </p>
              </Card>
            ))}
        </div>
      </section>

      {/* 3. Réglage des créneaux de retrait. */}
      <section className="space-y-3">
        <h2 className="text-xl">Créneaux de retrait</h2>
        <Card>
          <div className="flex flex-wrap items-end gap-4">
            <label className="text-sm">
              <span className="block font-medium text-primary-dark">Début</span>
              <input
                type="time"
                step={900}
                value={debut}
                onChange={(e) => setDebut(e.target.value)}
                className="mt-1 rounded-button border border-secondary/50 bg-cream px-2 py-1"
              />
            </label>
            <label className="text-sm">
              <span className="block font-medium text-primary-dark">Fin</span>
              <input
                type="time"
                step={900}
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                className="mt-1 rounded-button border border-secondary/50 bg-cream px-2 py-1"
              />
            </label>
            <label className="text-sm">
              <span className="block font-medium text-primary-dark">
                Max / créneau
              </span>
              <input
                type="number"
                min={1}
                value={maxParCreneau}
                onChange={(e) => setMaxParCreneau(Math.max(1, Number(e.target.value)))}
                className="mt-1 w-20 rounded-button border border-secondary/50 bg-cream px-2 py-1"
              />
            </label>
            <span className="text-xs text-secondary">
              Créneaux au quart d’heure · limite par créneau
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {slots.map((slot) => {
              const n = parCreneau(slot)
              const full = n >= maxParCreneau
              return (
                <div
                  key={slot}
                  className={[
                    'rounded-card border p-2 text-center',
                    full
                      ? 'border-accent-strong/40 bg-accent/15'
                      : 'border-secondary/25 bg-surface',
                  ].join(' ')}
                >
                  <p className="font-medium text-primary-dark">{slot}</p>
                  <p className={`text-xs ${full ? 'text-accent-strong' : 'text-secondary'}`}>
                    {n}/{maxParCreneau}
                    {full ? ' · complet' : ''}
                  </p>
                </div>
              )
            })}
            {slots.length === 0 && (
              <p className="col-span-full text-sm text-secondary">
                Renseignez une plage horaire valide (fin après début).
              </p>
            )}
          </div>
        </Card>
      </section>
    </MockupFrame>
  )
}
