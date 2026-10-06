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

/*
  Una sola experiencia de principio a fin: la vida de una brasa.

  Escena (el canvas fijo del fondo) dibuja el fuego, que se aviva a medida
  que se baja. Cada sección declara su tramo de temperatura con data-calor:
  rescoldo en el hero (420 °C), se aviva en el manifiesto (hasta 700), la
  llama en lo que arde (hasta 950), al pase en la carta, brasa viva en las voces,
  rojo blanco en la reserva (1100) y la sobremesa, que se enfría hasta 180.
*/
export default function App() {
  return (
    <LanguageProvider>
      <LoadingScreen />
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
    </LanguageProvider>
  )
}
