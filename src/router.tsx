import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { HomePage } from './pages/HomePage'
import { RestaurantPage } from './pages/RestaurantPage'
import { TraiteurPage } from './pages/TraiteurPage'
import { UniversPage } from './pages/UniversPage'
import { AEmporterPage } from './pages/AEmporterPage'
import { ContactPage } from './pages/ContactPage'
import { FormulesPage } from './pages/FormulesPage'
import { StyleguidePage } from './pages/StyleguidePage'
import { GestionPage } from './mockups/GestionPage'
import { ModerationMessages } from './mockups/ModerationMessages'
import { MailingTool } from './mockups/MailingTool'
import { ContentManager } from './mockups/ContentManager'
import { OrdersManager } from './mockups/OrdersManager'

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
      { path: 'formules', element: <FormulesPage /> },
      { path: 'gestion', element: <GestionPage /> },
      { path: 'gestion/messages', element: <ModerationMessages /> },
      { path: 'gestion/mailing', element: <MailingTool /> },
      { path: 'gestion/contenu', element: <ContentManager /> },
      { path: 'gestion/commandes', element: <OrdersManager /> },
      { path: 'styleguide', element: <StyleguidePage /> },
    ],
  },
])
