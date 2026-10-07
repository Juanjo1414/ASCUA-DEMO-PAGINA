import { useParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { pickReadableTextColor } from '@/domain/theme'
import { useRestaurant } from '@/hooks/useRestaurant'
import Nav from './components/Nav'
import FranjaReserva from './components/FranjaReserva'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Reserva from './components/Reserva'
import Contacto from './components/Contacto'
import Pie from './components/Pie'
import LoadingScreen from './components/LoadingScreen'
import DemoPanel from './components/DemoPanel'
import FloatingHelp from './components/FloatingHelp'
import { useLanguage } from './i18n/useLanguage'

export default function App() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const { isLoading, error } = useRestaurant(slug)
  const restaurant = useAtomValue(restaurantAtom)
  const isReady = !isLoading && !error
  const isDemo = new URLSearchParams(window.location.search).get('demo') === '1'

  useEffect(() => {
    if (restaurant) {
      document.title = restaurant.nombre
    }
  }, [restaurant])

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-cream-canvas px-6 text-center text-forest-shadow">
        <h1 className="font-display text-3xl font-medium text-deep-forest">
          {t.error.title}
        </h1>
        <p className="mt-4 max-w-[40ch] text-forest-shadow/80">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary mt-8"
        >
          {t.error.retry}
        </button>
      </div>
    )
  }

  const themeVars = restaurant
    ? ({
        '--color-primary': restaurant.tema.primario,
        '--color-on-primary': pickReadableTextColor(restaurant.tema.primario)
          .color,
      } as React.CSSProperties)
    : {}

  return (
    <>
      <LoadingScreen isReady={isReady} />
      {isReady && (
        <>
          <div
            className="relative z-10 min-h-[100dvh] pb-14 lg:pb-0 bg-cream-canvas"
            style={themeVars}
            data-font-pair={restaurant?.tema.parTipografico}
          >
            <Nav />
            <main>
              <Hero />
              <div id="hero-end" aria-hidden="true" className="h-px w-full" />
              <Menu />
              <Reserva />
              <Contacto />
            </main>
            <Pie />
          </div>
          <FranjaReserva />
          <FloatingHelp />
          {isDemo && <DemoPanel />}
        </>
      )}
    </>
  )
}
