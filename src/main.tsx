import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
// Polices de marque self-hostées (variable, font-display: swap).
import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
