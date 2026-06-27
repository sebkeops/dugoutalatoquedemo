import { Link } from 'react-router-dom'
import { Card, Container, DemoBanner } from '../components'
import { TierBadge, TierGate, useTier } from '../tiers'
import { MOCKUP_SCREENS } from './screens'

/**
 * Espace gestion (aperçu) — hub listant les écrans de back-office.
 * Les écrans d'une formule supérieure à la formule courante apparaissent
 * estompés et étiquetés (via <TierGate> en mode « dim »), réactifs au mode
 * présentation. Tout est une démonstration : aucun écran n'est fonctionnel.
 */
export function GestionPage() {
  const { tier } = useTier()

  return (
    <div className="min-h-[60vh] bg-cream">
      <DemoBanner />
      <Container width="wide" className="space-y-6 py-8">
        <header className="space-y-2">
          <h1 className="text-3xl">Espace gestion (aperçu)</h1>
          <p className="max-w-prose text-ink/80">
            Voici la « valeur cachée » de votre site : les outils qui vous font gagner du
            temps au quotidien. Les écrans estompés relèvent d’une formule supérieure —
            basculez le mode présentation (en bas) pour les comparer.
          </p>
        </header>

        {tier === 1 && (
          <Card accent>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg text-primary-dark">
                Espace gestion non inclus en formule Vitrine
              </h2>
              <TierBadge minTier={2} compact />
            </div>
            <p className="mt-1 text-sm text-ink/80">
              En formule Vitrine (F1), votre site reste autonome côté présentation, mais
              les outils de gestion (modération, mailing, contenu, commandes) sont inclus à
              partir de la formule Intermédiaire. Découvrez-les en basculant le mode
              présentation sur F2 ou F3.
            </p>
            <Link
              to="/formules"
              className="mt-3 inline-block text-sm font-semibold text-primary underline"
            >
              Comparer les formules →
            </Link>
          </Card>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {MOCKUP_SCREENS.map((s) => (
            <TierGate key={s.id} minTier={s.minTier}>
              <Link
                to={s.to}
                className="group flex h-full flex-col rounded-card border border-secondary/25 bg-surface p-5 shadow-card transition-shadow hover:shadow-lifted"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-lg text-primary-dark">{s.title}</h2>
                  <TierBadge minTier={s.minTier} compact />
                </div>
                <p className="mt-2 flex-1 text-sm text-ink/80">{s.description}</p>
                <span className="mt-3 text-sm font-semibold text-primary group-hover:underline">
                  Ouvrir l’aperçu →
                </span>
              </Link>
            </TierGate>
          ))}
        </div>
      </Container>
    </div>
  )
}
