import type { ReactNode } from 'react'
import {
  Badge,
  Button,
  Card,
  Container,
  DemoBanner,
  FormField,
  Hero,
} from '../components'
import { TierBadge, TierGate, useTier, type Tier } from '../tiers'
import { colors } from '../theme/tokens'

const TIER_LEVELS: Tier[] = [1, 2, 3]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 border-t border-secondary/30 pt-8 first:border-0 first:pt-0">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="space-y-1">
      <div
        className="h-14 w-full rounded-card border border-secondary/30 shadow-soft"
        style={{ backgroundColor: value }}
      />
      <p className="text-xs font-medium text-primary-dark">{name}</p>
      <p className="text-xs uppercase text-secondary">{value}</p>
    </div>
  )
}

/**
 * Styleguide — vitrine vivante du design system.
 * Présente couleurs, typo et tous les composants partagés, ainsi que les
 * 3 états de TierBadge / TierGate (réactifs au mode présentation).
 */
export function StyleguidePage() {
  const { info } = useTier()

  return (
    <Container className="space-y-10 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl">Design system</h1>
        <p className="text-ink/80">
          Composants partagés et mécanique des formules. Formule présentée :{' '}
          <strong className="text-primary-dark">
            {info.code} — {info.name}
          </strong>
          . Basculez-la dans la barre en bas pour voir réagir les blocs ci-dessous.
        </p>
      </header>

      <Section title="Couleurs">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <Swatch name="primary" value={colors.primary} />
          <Swatch name="primary-dark" value={colors.primaryDark} />
          <Swatch name="secondary" value={colors.secondary} />
          <Swatch name="accent" value={colors.accent} />
          <Swatch name="accent-strong" value={colors.accentStrong} />
          <Swatch name="cream" value={colors.cream} />
          <Swatch name="surface" value={colors.surface} />
          <Swatch name="ink" value={colors.ink} />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-card bg-cream p-4 ring-1 ring-secondary/30">
            <p className="text-ink">Texte courant sur fond crème</p>
            <p className="mt-1 text-xs text-secondary">ink #3A2C23 / cream — contraste excellent</p>
          </div>
          <div className="rounded-card bg-primary p-4">
            <p className="text-on-primary">Texte crème sur bouton brun</p>
            <p className="mt-1 text-xs text-on-primary/70">on-primary / primary #7C5840</p>
          </div>
          <div className="rounded-card bg-accent-strong p-4">
            <p className="text-on-accent">Texte blanc sur terracotta</p>
            <p className="mt-1 text-xs text-on-accent/80">on-accent / accent-strong #BE7D64</p>
          </div>
        </div>
      </Section>

      <Section title="Typographie">
        <div className="space-y-2">
          <p className="font-heading text-display text-primary-dark">Display</p>
          <h1 className="text-3xl">Titre H1 — restaurant & traiteur</h1>
          <h2 className="text-2xl">Titre H2 — nos formules</h2>
          <h3 className="text-xl">Titre H3 — soirée du mois</h3>
          <p className="max-w-prose text-ink/80">
            Corps de texte. La cuisine est faite maison, avec des produits choisis.
            L'identité repose sur deux couches : le brun structure, le terracotta
            ponctue l'événementiel.
          </p>
          <p className="text-sm text-secondary">Petit texte / légende.</p>
        </div>
      </Section>

      <Section title="Boutons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primaire</Button>
          <Button variant="accent">Accent traiteur</Button>
          <Button variant="outline">Contour</Button>
          <Button variant="ghost">Discret</Button>
          <Button variant="primary" disabled>
            Désactivé
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Petit</Button>
          <Button size="md">Moyen</Button>
          <Button size="lg">Grand</Button>
        </div>
      </Section>

      <Section title="Cartes">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-primary-dark">Carte standard</h3>
            <p className="mt-1 text-sm text-ink/80">
              Surface artisanale, ombre discrète.
            </p>
          </Card>
          <Card accent>
            <h3 className="text-lg font-semibold text-primary-dark">Carte accent</h3>
            <p className="mt-1 text-sm text-ink/80">
              Liseré terracotta pour une mise en avant événementielle.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Étiquettes">
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Neutre</Badge>
          <Badge tone="primary">Primaire</Badge>
          <Badge tone="accent">Accent</Badge>
        </div>
      </Section>

      <Section title="Champs de formulaire">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Nom" placeholder="PLACEHOLDER_NOM" required />
          <FormField
            label="E-mail"
            type="email"
            placeholder="prenom@exemple.fr"
            hint="Nous ne partageons jamais votre adresse."
          />
          <div className="md:col-span-2">
            <FormField
              label="Votre message"
              multiline
              placeholder="PLACEHOLDER_MESSAGE"
            />
          </div>
        </div>
      </Section>

      <Section title="Bandeau démonstration">
        <div className="overflow-hidden rounded-card border border-secondary/30">
          <DemoBanner />
          <div className="bg-cream p-4 text-sm text-ink/80">
            Exemple d'écran back-office (mockup). Le bandeau signale la démonstration.
          </div>
        </div>
      </Section>

      <Section title="Héros (couche événementielle)">
        <div className="overflow-hidden rounded-card">
          <Hero
            tone="event"
            eyebrow="À emporter"
            title="PLACEHOLDER — Menu de Noël"
            subtitle="Commandez vos plats de fête (démonstration)."
            actions={<Button variant="accent">Voir le menu</Button>}
          />
        </div>
      </Section>

      <Section title="TierBadge — 3 états">
        <div className="flex flex-wrap gap-2">
          {TIER_LEVELS.map((t) => (
            <TierBadge key={t} minTier={t} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {TIER_LEVELS.map((t) => (
            <TierBadge key={t} minTier={t} compact />
          ))}
        </div>
      </Section>

      <Section title="TierGate — 3 états (réactifs au mode présentation)">
        <p className="text-sm text-secondary">
          Mode « dim » : les blocs non inclus dans <strong>{info.code}</strong> sont
          estompés avec leur étiquette. Basculez la formule pour les voir s'activer.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {TIER_LEVELS.map((t) => (
            <TierGate key={t} minTier={t}>
              <Card>
                <TierBadge minTier={t} compact className="mb-2" />
                <h3 className="text-lg font-semibold text-primary-dark">
                  Fonctionnalité {t}
                </h3>
                <p className="mt-1 text-sm text-ink/80">
                  Bloc débloqué dès la formule {t}.
                </p>
              </Card>
            </TierGate>
          ))}
        </div>

        <p className="pt-2 text-sm text-secondary">
          Mode « hide » : le bloc F3 ci-dessous disparaît tant que la formule
          Complète n'est pas sélectionnée.
        </p>
        <TierGate minTier={3} mode="hide">
          <Card accent>
            <h3 className="text-lg font-semibold text-primary-dark">
              Commande en ligne (F3, masquée hors formule)
            </h3>
            <p className="mt-1 text-sm text-ink/80">
              Visible uniquement en formule Complète.
            </p>
          </Card>
        </TierGate>
      </Section>
    </Container>
  )
}
