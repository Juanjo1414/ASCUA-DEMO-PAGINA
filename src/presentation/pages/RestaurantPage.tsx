/**
 * Página principal de un restaurante (`/r/:slug`): compone toda la carta
 * (nav, hero, menú, reserva, contacto, pie) a partir del restaurante que
 * carga `useRestaurant`.
 *
 * No se muestra nada hasta que el restaurante termina de cargar
 * (`LoadingScreen` cubre esa espera); si el slug no existe o expiró,
 * `useRestaurant` ya redirige antes de que este componente intente pintar
 * la carta. `?demo=1` en la URL activa `DemoPanel` (herramienta de Juan
 * para presentaciones en vivo, no para comensales).
 */
import { useParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { pickReadableTextColor } from '@/domain/theme'
import { useRestaurant } from '@/presentation/hooks/useRestaurant'
import Nav from '@/presentation/components/Nav'
import FranjaReserva from '@/presentation/components/FranjaReserva'
import Hero from '@/presentation/components/Hero'
import Menu from '@/presentation/components/Menu'
import Reserva from '@/presentation/components/Reserva'
import Contacto from '@/presentation/components/Contacto'
import Pie from '@/presentation/components/Pie'
import LoadingScreen from '@/presentation/components/LoadingScreen'
import DemoPanel from '@/presentation/components/DemoPanel'
import FloatingHelp from '@/presentation/components/FloatingHelp'
import { useLanguage } from '@/presentation/i18n/useLanguage'

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
