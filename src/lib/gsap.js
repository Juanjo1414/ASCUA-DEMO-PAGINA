import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // En el celular la barra de direcciones aparece y desaparece al hacer
  // scroll y cambia el alto de la ventana. Sin esto, cada cambio recalcula
  // todos los pines y la página da un salto.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger }
