import { useParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { restaurantAtom } from '@/app/store'
import { useRestaurant } from '@/hooks/useRestaurant'
import Nav from './components/Nav'
import Escena from './components/Escena'
import FranjaReserva from './components/FranjaReserva'
import HeroFuego from './components/HeroFuego'
import Manifiesto from './components/Manifiesto'
import LoQueArde from './components/LoQueArde'
import Menu from './components/Menu'
import Voces from './components/Voces'
import Reserva from './components/Reserva'
import Contacto from './components/Contacto'
import Pie from './components/Pie'
import LoadingScreen from './components/LoadingScreen'
import { LanguageProvider } from './i18n/LanguageProvider'

export default function App() {
  const { slug } = useParams()
  const { isLoading, error } = useRestaurant(slug)
  const restaurant = useAtomValue(restaurantAtom)
  const isReady = !isLoading && !error

  useEffect(() => {
    if (restaurant) {
      document.title = restaurant.nombre
    }
  }, [restaurant])

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-tinta text-crema">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <LoadingScreen isReady={isReady} />
      {isReady && (
        <>
          <Escena />
          <div className="relative z-10 min-h-[100dvh] pb-14 lg:pb-0">
            <Nav />
            <main>
              <HeroFuego />
              <div id="hero-end" aria-hidden="true" className="h-px w-full" />
              <Manifiesto />
              <LoQueArde />
              <Menu />
              <Voces />
              <Reserva />
              <Contacto />
            </main>
            <Pie />
          </div>
          <FranjaReserva />
        </>
      )}
    </LanguageProvider>
  )
}
