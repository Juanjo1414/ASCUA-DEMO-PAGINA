/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import RestaurantPage from '@/presentation/pages/RestaurantPage'
import { LanguageProvider } from '@/presentation/i18n/LanguageProvider'
import { LandingPage } from '@/presentation/pages/LandingPage'
import { QrPage } from '@/presentation/pages/QrPage'
import { NotFoundPage } from '@/presentation/pages/NotFoundPage'
import { ExpiredPage } from '@/presentation/pages/ExpiredPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/r/:slug',
    element: (
      <LanguageProvider>
        <RestaurantPage />
      </LanguageProvider>
    ),
  },
  {
    path: '/r/:slug/qr',
    element: <QrPage />,
  },
  {
    path: '/expirado',
    element: <ExpiredPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
