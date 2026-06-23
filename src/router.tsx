import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { HomePage } from './pages/HomePage'
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
      { path: 'styleguide', element: <StyleguidePage /> },
    ],
  },
])
