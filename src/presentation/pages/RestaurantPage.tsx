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
import { hasArDishes } from '@/domain/dish'
import { useRestaurant } from '@/presentation/hooks/useRestaurant'
import Nav from '@/presentation/components/Nav'
import Hero from '@/presentation/components/Hero'
import Menu from '@/presentation/components/Menu'
import ComoFunciona from '@/presentation/components/ComoFunciona'
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

  // La barra del navegador del celular toma el color del mantel del restaurante.
  useEffect(() => {
    const primario = restaurant?.tema.primario
    if (!primario) return
    const meta = document.querySelector('meta[name="theme-color"]')
    const previo = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', primario)
    return () => {
      if (previo !== null) meta?.setAttribute('content', previo)
    }
  }, [restaurant?.tema.primario])

  // Color del restaurante: el contenedor `.tema` recalcula toda la paleta
  // derivada (mantel, porcelana, tinta…) a partir de este primario.
  const themeVars = restaurant
    ? ({
        '--color-primary': restaurant.tema.primario,
        '--color-on-primary': pickReadableTextColor(restaurant.tema.primario)
          .color,
      } as React.CSSProperties)
    : {}

  if (error) {
    return (
      <div
        data-superficie="mantel"
        className="tema flex min-h-[100dvh] w-full flex-col items-center justify-center bg-mantel px-6 text-center text-on-mantel"
      >
        <h1 className="text-h2">{t.error.title}</h1>
        <p className="mt-4 max-w-[40ch] text-lead text-on-mantel-soft">
          {t.error.body}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-porcelana mt-8"
        >
          {t.error.retry}
        </button>
      </div>
    )
  }

  return (
    <div
      className="tema relative min-h-[100dvh] bg-mantel"
      style={themeVars}
      data-font-pair={restaurant?.tema.parTipografico}
    >
      <LoadingScreen isReady={isReady} />
      {isReady && (
        <>
          <Nav />
          <main>
            <Hero />
            <Menu>
              <ComoFunciona />
            </Menu>
            <Reserva />
            <Contacto />
          </main>
          <Pie />
          {restaurant && hasArDishes(restaurant.categorias) && <FloatingHelp />}
          {isDemo && <DemoPanel />}
        </>
      )}
    </div>
  )
}
