import { useState } from 'react'
import { Button, Card, FormField, Photo } from '../components'
import { SOIREE_DU_MOIS, UNIVERS } from '../data'
import { MockupFrame } from './MockupFrame'

export function ContentManager() {
  const [theme, setTheme] = useState(SOIREE_DU_MOIS.theme)
  const [date, setDate] = useState(SOIREE_DU_MOIS.date)
  const [description, setDescription] = useState(SOIREE_DU_MOIS.description)
  const [saved, setSaved] = useState(false)

  const touch =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v)
      setSaved(false)
    }

  return (
    <MockupFrame
      title="Gestion de contenu"
      subtitle="Mettez à jour votre site vous-même, sans dépendre de personne."
      minTier={2}
    >
      {/* Soirée du mois */}
      <section className="space-y-4">
        <h2 className="text-xl">Soirée à thème du mois</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <div className="space-y-4">
              <FormField label="Thème" name="theme" value={theme} onChange={touch(setTheme)} />
              <FormField label="Date" name="date" value={date} onChange={touch(setDate)} />
              <FormField
                label="Descriptif"
                name="description"
                multiline
                value={description}
                onChange={touch(setDescription)}
              />
              <div className="flex items-center gap-3">
                <Button variant="accent" onClick={() => setSaved(true)}>
                  Enregistrer
                </Button>
                {saved && (
                  <span className="text-sm font-medium text-primary-dark">
                    Modifications enregistrées ✓
                  </span>
                )}
              </div>
              <p className="text-xs italic text-secondary">
                Démonstration — aucune donnée n’est réellement enregistrée.
              </p>
            </div>
          </Card>

          {/* Aperçu en direct */}
          <Card accent>
            <p className="text-xs font-semibold uppercase tracking-label text-accent-strong">
              Aperçu · {date}
            </p>
            <h3 className="mt-1 font-heading text-xl text-primary-dark">{theme}</h3>
            <p className="mt-1 text-sm text-ink/80">{description}</p>
          </Card>
        </div>
      </section>

      {/* Visuels d'univers */}
      <section className="space-y-4">
        <h2 className="text-xl">Visuels des univers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {UNIVERS.map((u) => (
            <Card key={u.slug} className="space-y-3">
              <div className="aspect-[4/3] overflow-hidden rounded-card bg-cream">
                {u.photos[0] ? (
                  <Photo file={u.photos[0].file} alt={u.photos[0].alt} />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-secondary">
                    Aucun visuel
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-primary-dark">{u.name}</p>
              <Button size="sm" variant="outline" className="w-full">
                Remplacer le visuel
              </Button>
            </Card>
          ))}
        </div>
        <p className="text-xs italic text-secondary">
          Démonstration — l’envoi d’images n’est pas actif dans cet aperçu.
        </p>
      </section>
    </MockupFrame>
  )
}
