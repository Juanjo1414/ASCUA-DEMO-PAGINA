/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { DependenciesProvider } from '@/app/DependenciesContext'
import { compositionRoot } from '@/app/compositionRoot'

import './fuentes.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DependenciesProvider dependencies={compositionRoot}>
      <RouterProvider router={router} />
    </DependenciesProvider>
  </StrictMode>
)
