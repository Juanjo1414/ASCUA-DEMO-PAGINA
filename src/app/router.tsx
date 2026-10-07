/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import { LanguageProvider } from '@/presentation/i18n/LanguageProvider'

// Componentes placeholder para las rutas auxiliares
const LandingPage = () => (
  <div className="p-8 text-center">
    <h1>Ascua Menu AR</h1>
    <p>Selecciona un restaurante.</p>
  </div>
)
const QrPage = () => (
  <div className="p-8 text-center">
    <h1>Código QR del Restaurante</h1>
  </div>
)
const NotFoundPage = () => (
  <div className="p-8 text-center text-red-500">
    <h1>404 - No Encontrado</h1>
  </div>
)
const ExpiredPage = () => (
  <div className="p-8 text-center text-orange-500">
    <h1>La demo comercial ha expirado</h1>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/r/:slug',
    element: (
      <LanguageProvider>
        <App />
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
