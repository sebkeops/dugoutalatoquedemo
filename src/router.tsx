import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { HomePage } from './pages/HomePage'
import { RestaurantPage } from './pages/RestaurantPage'
import { TraiteurPage } from './pages/TraiteurPage'
import { UniversPage } from './pages/UniversPage'
import { AEmporterPage } from './pages/AEmporterPage'
import { ContactPage } from './pages/ContactPage'
import { StyleguidePage } from './pages/StyleguidePage'

/**
 * Routeur de l'application.
 * Une route par écran du parcours ; à enrichir au fil des phases.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'restaurant', element: <RestaurantPage /> },
      { path: 'traiteur', element: <TraiteurPage /> },
      { path: 'traiteur/:slug', element: <UniversPage /> },
      { path: 'a-emporter', element: <AEmporterPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'styleguide', element: <StyleguidePage /> },
    ],
  },
])
