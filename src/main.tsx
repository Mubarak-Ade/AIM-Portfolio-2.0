import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/inter'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home').then(({ Home }) => ({ Component: Home })),
      },
      {
        path: 'work',
        lazy: () => import('./pages/Work').then(({ Work }) => ({ Component: Work })),
      },
      {
        path: 'work/:slug',
        lazy: () => import('./pages/CaseStudy').then(({ CaseStudy }) => ({ Component: CaseStudy })),
      },
      {
        path: 'notes',
        lazy: () => import('./pages/Notes').then(({ Notes }) => ({ Component: Notes })),
      },
      {
        path: 'about',
        lazy: () => import('./pages/About').then(({ About }) => ({ Component: About })),
      },
      {
        path: 'contact',
        lazy: () => import('./pages/Contact').then(({ Contact }) => ({ Component: Contact })),
      },
      {
        path: '*',
        lazy: () => import('./pages/NotFound').then(({ NotFound }) => ({ Component: NotFound })),
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
