/**
 * Hace que los elementos marcados con `data-reveal` "se sirvan" (aparezcan
 * subiendo y creciendo un poco) cuando entran en pantalla al hacer scroll.
 *
 * Lo usan las secciones de la landing (`Destacados`, `Menu`…). Solo usa CSS
 * (ver `index.css`) y un `IntersectionObserver`: sin librerías de animación.
 *
 * Por qué es seguro: el contenido es visible por defecto. El hook únicamente
 * "arma" (oculta) lo que todavía está por debajo de la pantalla, y lo muestra
 * al llegar. Si el navegador no tiene `IntersectionObserver`, o el comensal
 * pidió menos movimiento, no oculta nada.
 *
 * No anima nada por sí mismo al montar lo que ya está a la vista.
 */
import { useEffect, type RefObject } from 'react'

/**
 * @param raiz - Contenedor cuyos hijos `[data-reveal]` se animarán.
 * @param clave - Cuando cambia (p. ej. el restaurante o el idioma), se vuelve
 *   a revisar el contenedor por si aparecieron elementos nuevos.
 */
export function useRevealOnScroll(
  raiz: RefObject<HTMLElement | null>,
  clave: string = ''
): void {
  useEffect(() => {
    const el = raiz.current
    if (!el) return
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue
          ;(entrada.target as HTMLElement).dataset.reveal = 'in'
          observador.unobserve(entrada.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )

    el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((nodo, i) => {
      if (nodo.dataset.reveal === 'in') return
      // Lo que ya se ve al cargar no se oculta: evita un parpadeo inicial.
      if (nodo.getBoundingClientRect().top < window.innerHeight * 0.92) {
        nodo.dataset.reveal = 'in'
        return
      }
      nodo.dataset.reveal = 'armed'
      // Pequeño escalón entre hermanos: los platos llegan uno tras otro.
      nodo.style.setProperty('--reveal-delay', `${(i % 4) * 70}ms`)
      observador.observe(nodo)
    })

    return () => observador.disconnect()
  }, [raiz, clave])
}
