import { Link } from 'react-router-dom'
import { Button, Container, Hero } from '../components'

/**
 * Page d'accueil — stub de structure (la vitrine réelle arrive aux Briefs suivants).
 * Montre le shell, un héros pleine bande et la couche d'accent.
 */
export function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Restaurant & traiteur"
        title="PLACEHOLDER_ACCROCHE — la cuisine d’ici, faite maison"
        subtitle="PLACEHOLDER_SOUS_TITRE — le restaurant à midi, le traiteur pour vos événements."
        actions={
          <Button variant="accent" size="lg">
            Découvrir le traiteur
          </Button>
        }
      />

      <Container className="space-y-4 py-8">
        <h2 className="text-2xl">Fondation en place</h2>
        <p className="max-w-prose text-ink/80">
          Design system, shell mobile-first et mécanique des formules sont posés.
          Parcourez le{' '}
          <Link to="/styleguide" className="font-semibold text-primary underline">
            styleguide
          </Link>{' '}
          pour voir les composants et basculer le mode présentation.
        </p>
      </Container>
    </>
  )
}
