/*
  El calor de la página.

  Toda la experiencia cuelga de un solo número: la temperatura, en grados
  Celsius, que sube de la brasa en reposo del hero al rojo blanco de la reserva
  y baja otra vez en la sobremesa. La escena del fondo lee de aquí; sólo
  escriben el hero (la línea de fuego y su bajada) y este mismo módulo (la
  temperatura según el scroll).

  Cada sección declara su tramo con `data-calor="desde,hasta"` y, si quiere,
  `data-llama` (cuánto dejan ver las llamas detrás del texto).
  La temperatura es la interpolación del tramo de la sección que ocupa el
  centro de la pantalla. Las posiciones se miden una vez por refresco de
  ScrollTrigger (los pines cambian el alto de la página), no en cada frame.
*/
import { ScrollTrigger } from './gsap'

export const calor = {
  // Temperatura actual en °C.
  t: 420,
  // Cuánto protagonismo tienen las llamas en la sección actual (0 a 1). En
  // el tramo del fuego son enormes; detrás de textos largos, bajas.
  llama: 0.3,
  // Hero: cuánto avanzó el scroll del hero (0 a 1). La línea de fuego baja
  // y el carbón prende a partir de un tercio.
  portal: 0,
  // Hero: cuánto se encendió la línea del horizonte (0 = apagada, 1 = de
  // lado a lado).
  linea: 0,
  // Hero: 0 = todavía en el hero, 1 = el fuego ya quedó al pie de la página.
  salida: 0,
}

let tramos = []

function medir() {
  tramos = [...document.querySelectorAll('[data-calor]')].map((el) => {
    // Si la sección está fijada, la que ocupa el espacio real es su envoltorio.
    const caja = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el
    const r = caja.getBoundingClientRect()
    const [desde, hasta] = el.dataset.calor.split(',').map(Number)
    const llama = el.dataset.llama === undefined ? 0.3 : Number(el.dataset.llama)
    return { top: r.top + window.scrollY, alto: r.height, desde, hasta, llama }
  })
}

const suave = (x) => x * x * (3 - 2 * x)

export function actualizarCalor() {
  if (!tramos.length) return
  const centro = window.scrollY + window.innerHeight * 0.5
  let tramo = tramos[0]
  for (const candidato of tramos) {
    if (centro >= candidato.top) tramo = candidato
  }
  // El último tramo (el pie) es más bajo que media pantalla: el centro nunca
  // lo recorre entero. Ahí el avance se mide contra el scroll que queda, para
  // que al tocar fondo la sobremesa llegue a su temperatura final.
  let recorrido = tramo.alto
  let desde = tramo.top
  if (tramo === tramos[0]) {
    // El primero (el hero) arranca con el centro de la pantalla ya adentro:
    // se mide desde el scroll 0 para que la página empiece en su temperatura
    // inicial y no a mitad de camino.
    desde = tramo.top + window.innerHeight * 0.5
    recorrido = Math.max(tramo.alto - window.innerHeight * 0.5, 1)
  } else if (tramo === tramos[tramos.length - 1]) {
    const fondo = document.documentElement.scrollHeight - window.innerHeight + window.innerHeight * 0.5
    recorrido = Math.max(fondo - tramo.top, 1)
  }
  let p = Math.min(Math.max((centro - desde) / Math.max(recorrido, 1), 0), 1)
  // Tocando fondo, la página termina en el final del último tramo aunque el
  // centro de la pantalla no haya llegado a él (pasa en pantallas altas).
  if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 2) {
    tramo = tramos[tramos.length - 1]
    p = 1
  }
  calor.t = tramo.desde + (tramo.hasta - tramo.desde) * suave(p)
  // Las llamas no saltan de una sección a otra: se acercan de a poco.
  calor.llama += (tramo.llama - calor.llama) * 0.06
}

export function iniciarCalor() {
  medir()
  actualizarCalor()
  ScrollTrigger.addEventListener('refresh', medir)
  window.addEventListener('load', medir)
  return () => {
    ScrollTrigger.removeEventListener('refresh', medir)
    window.removeEventListener('load', medir)
  }
}

/*
  Color de cuerpo negro, a ojo de parrillero: lo que se ve en un metal o un
  carbón a cada temperatura. Por debajo de ~450 °C no se ve luz; a 600 es rojo
  cereza oscuro, a 900 naranja, a 1100 amarillo y por encima casi blanco.
*/
const RAMPA = [
  [300, [40, 6, 4]],
  [450, [96, 14, 8]],
  [600, [168, 28, 10]],
  [750, [220, 58, 16]],
  [900, [255, 110, 28]],
  [1000, [255, 160, 50]],
  [1100, [255, 206, 110]],
  [1250, [255, 240, 210]],
]

export function colorDeCalor(t) {
  if (t <= RAMPA[0][0]) return RAMPA[0][1]
  for (let i = 1; i < RAMPA.length; i++) {
    const [t1, c1] = RAMPA[i]
    if (t <= t1) {
      const [t0, c0] = RAMPA[i - 1]
      const k = (t - t0) / (t1 - t0)
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k))
    }
  }
  return RAMPA[RAMPA.length - 1][1]
}

export const entre = (t, a, b) => {
  const x = Math.min(Math.max((t - a) / (b - a), 0), 1)
  return suave(x)
}
