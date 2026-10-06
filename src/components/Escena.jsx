import { useEffect, useRef } from 'react'
import {
  actualizarCalor,
  calor,
  colorDeCalor,
  entre,
  iniciarCalor,
} from '../lib/calor'
import { azar, generarBrasa, lienzo } from '../lib/brasa'

/*
  La escena: el fuego detrás de toda la página.

  Un solo canvas fijo, a pantalla completa, que dibuja tres cosas según el
  calor (ver lib/calor.js):

  1. El hero: el horizonte de fuego. Una línea fina de fuego vivo cruza la
     pantalla bajo el nombre; al bajar, desciende hasta el carbón y lo prende.
  2. La cama de brasas y las llamas. Una franja de carbón al pie de la pantalla
     que se enciende a medida que sube la temperatura; por encima, lenguas de
     fuego que crecen con el calor.
  3. Las chispas. Estallan cuando el carbón prende y después suben de la
     fogata; salen más cuanto más caliente está todo.

  Rendimiento:
  - El canvas trabaja a una fracción de la resolución de pantalla y el CSS lo
    estira. El fuego es blando por naturaleza: la resolución baja no se nota y
    sale casi gratis el desenfoque de las llamas.
  - La textura del carbón (un diagrama de Voronoi: cada celda es un trozo, los
    bordes entre celdas son las grietas) se calcula una sola vez por tamaño de
    pantalla. Cada frame sólo copia imágenes y dibuja unas pocas curvas.
  - En pantallas táctiles se dibuja un frame sí y uno no (30 fps): el fuego no
    necesita más y la batería lo agradece.
  - Con la pestaña oculta no dibuja. Con movimiento reducido no hay tiempo:
    sólo redibuja al hacer scroll, sin chispas ni vaivén.
*/

// La cama de brasas: el borde de abajo de la textura, fundido hacia arriba.
function generarCama(brasa, W, alto) {
  const hacer = (fuente) => {
    const c = lienzo(W, alto)
    const ctx = c.getContext('2d')
    ctx.drawImage(fuente, 0, fuente.height - alto, W, alto, 0, 0, W, alto)
    ctx.globalCompositeOperation = 'destination-in'
    const grad = ctx.createLinearGradient(0, 0, 0, alto)
    grad.addColorStop(0, 'rgba(0,0,0,0)')
    grad.addColorStop(0.5, 'rgba(0,0,0,0.85)')
    grad.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, alto)
    return c
  }
  return { base: hacer(brasa.base), grietas: hacer(brasa.grietas) }
}

export default function Escena() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const tactil = window.matchMedia('(pointer: coarse)').matches
    const detenerCalor = iniciarCalor()

    let W = 0
    let H = 0
    let q = 1
    let brasa = null
    let cama = null
    let altoCama = 0
    let llamas = []
    let fuego = null
    let fctx = null
    const chispas = []
    let estallo = false
    // Dónde va la línea del hero, en px de pantalla: a mitad de camino entre
    // el nombre y la frase de abajo, medido en la página real. Un porcentaje
    // fijo fallaba en celulares, donde la barra del navegador cambia el alto.
    let lineaCss = null

    const preparar = () => {
      const cssW = canvas.clientWidth
      const cssH = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, tactil ? 2 : 1.5)
      q = dpr * (tactil ? 0.5 : 0.7)
      const nW = Math.round(cssW * q)
      const nH = Math.round(cssH * q)
      // La barra del navegador del celular cambia el alto al hacer scroll:
      // cambios chicos no merecen recalcular la textura.
      if (brasa && nW === W && Math.abs(nH - H) < H * 0.15) return
      W = nW
      H = nH
      canvas.width = W
      canvas.height = H
      brasa = generarBrasa(W, H)
      altoCama = Math.round(H * 0.3)
      cama = generarCama(brasa, W, altoCama)

      // Las llamas se dibujan en un lienzo a un cuarto de resolución y se
      // estiran encima: sale un fuego blando, sin bordes de dibujo, y barato.
      fuego = lienzo(W / 4, H / 4)
      fctx = fuego.getContext('2d')

      // Una fogata al centro: las lenguas del medio son las más altas.
      const rnd = azar(42)
      const n = tactil ? 7 : 11
      const abre = tactil ? 0.6 : 0.42
      llamas = Array.from({ length: n }, (_, i) => {
        const u = (i + 0.5) / n
        const centro = 1 - Math.abs(u - 0.5) * 2
        return {
          x: 0.5 + (u - 0.5) * abre + (rnd() - 0.5) * 0.03,
          ancho: (tactil ? 0.16 : 0.09) + rnd() * 0.05,
          alto: 0.35 + 0.65 * centro * (0.75 + rnd() * 0.25),
          fase: rnd() * 10,
          fase2: rnd() * 10,
        }
      })
    }

    const lanzarChispa = (x, y, fuerza) => {
      if (chispas.length > (tactil ? 90 : 180)) return
      chispas.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6 * q,
        vy: -(0.7 + Math.random() * 1.6 * fuerza) * q,
        vida: 1,
        paso: 0.004 + Math.random() * 0.01,
        tam: (0.9 + Math.random() * 1.6) * q,
        fase: Math.random() * 6,
      })
    }

    let tiempo = 0
    let previo = performance.now()
    let cuadro = 0
    let impar = false
    let cuadroScroll = 0

    const dibujar = (ahora) => {
      const dt = Math.min((ahora - previo) / 16.67, 3)
      previo = ahora
      if (!reducido) tiempo += dt / 60

      actualizarCalor()
      const t = calor.t
      const portal = calor.portal
      const salida = calor.salida
      const pulso = reducido
        ? 0.85
        : 0.78 + 0.12 * Math.sin(tiempo * 1.4) + 0.08 * Math.sin(tiempo * 3.7)

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgb(15,12,11)'
      ctx.fillRect(0, 0, W, H)

      // Resplandor de fondo: el color de la temperatura, desde abajo.
      const fuerza = entre(t, 420, 1100) * salida
      if (fuerza > 0.01) {
        const [r, g, b] = colorDeCalor(t)
        const grad = ctx.createRadialGradient(
          W / 2,
          H * 1.05,
          0,
          W / 2,
          H * 1.05,
          H * (0.55 + 0.6 * fuerza)
        )
        grad.addColorStop(0, `rgba(${r},${g},${b},${0.55 * fuerza})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, H * 0.25, W, H * 0.75)
      }

      // 1. El hero: el horizonte de fuego. Una sola línea fina de fuego vivo
      // cruza la pantalla, como un horizonte al atardecer; ASCUA está arriba,
      // en HTML. Al bajar, la línea desciende hasta el pie y crece hasta
      // volverse la fogata.
      const cssW = W / q
      const enHero = 1 - salida
      const encendido = enHero * entre(portal, 0.35, 0.9)
      if (enHero > 0.01 && calor.linea > 0.001) {
        const baja = entre(portal, 0.02, 0.55)
        // Se mide sólo con el hero quieto: al bajar, las letras y la frase se
        // mueven y la línea tiene que salir de su lugar de siempre.
        if (portal < 0.02 || lineaCss === null) {
          const letras = document.querySelector('#top h1')
          const pie = document.querySelector('[data-pie-hero]')
          if (letras && pie) {
            const abajo = letras.getBoundingClientRect().bottom
            const arriba = pie.firstElementChild.getBoundingClientRect().top
            lineaCss = abajo + (arriba - abajo) * 0.5
          }
        }
        const yBase =
          lineaCss !== null ? lineaCss * q : (cssW < 768 ? 0.6 : 0.64) * H
        const y = yBase + (H * 0.985 - yBase) * baja
        const vida = calor.linea * enHero * (1 - encendido * 0.85)
        // La línea se enciende desde el centro hacia los lados, como una mecha.
        const medio = (W / 2) * Math.min(1, calor.linea * 1.05)
        const x0 = W / 2 - medio
        const ancho = medio * 2
        const late = reducido
          ? 1
          : 0.9 + 0.06 * Math.sin(tiempo * 2.3) + 0.04 * Math.sin(tiempo * 7.1)

        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = 1

        // El resplandor que la línea echa hacia arriba, como un cielo que se
        // calienta sobre el horizonte.
        const cielo = ctx.createLinearGradient(0, y, 0, y - H * 0.45)
        cielo.addColorStop(0, `rgba(238,80,28,${0.2 * vida * late})`)
        cielo.addColorStop(0.35, `rgba(160,30,12,${0.08 * vida})`)
        cielo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = cielo
        ctx.fillRect(x0, y - H * 0.45, ancho, H * 0.45)

        // El halo pegado a la línea, arriba y abajo.
        const alto = (26 + 60 * baja) * q
        const halo = ctx.createLinearGradient(0, y - alto, 0, y + alto)
        halo.addColorStop(0, 'rgba(0,0,0,0)')
        halo.addColorStop(0.5, `rgba(255,140,50,${0.45 * vida * late})`)
        halo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = halo
        ctx.fillRect(x0, y - alto, ancho, alto * 2)

        // El núcleo: casi blanco al centro, se apaga hacia las puntas.
        const nucleo = ctx.createLinearGradient(x0, 0, x0 + ancho, 0)
        nucleo.addColorStop(0, 'rgba(255,120,40,0)')
        nucleo.addColorStop(0.18, `rgba(255,170,70,${0.8 * vida})`)
        nucleo.addColorStop(0.5, `rgba(255,236,200,${vida})`)
        nucleo.addColorStop(0.82, `rgba(255,170,70,${0.8 * vida})`)
        nucleo.addColorStop(1, 'rgba(255,120,40,0)')
        ctx.fillStyle = nucleo
        const grosor = (1.6 + 3 * baja) * q
        ctx.fillRect(x0, y - grosor / 2, ancho, grosor)

        // Lenguas diminutas a lo largo de la línea: lo que la hace fuego y no
        // un neón. Crecen a medida que la línea baja hacia el carbón.
        const paso = 5 * q
        for (let x = x0 + paso / 2; x < x0 + ancho; x += paso) {
          const u = (x - x0) / Math.max(ancho, 1)
          const borde = Math.sin(Math.PI * u)
          const ruido = reducido
            ? 0.6
            : 0.5 +
              0.3 * Math.sin(x * 0.043 + tiempo * 3.2) +
              0.2 * Math.sin(x * 0.117 - tiempo * 5.7)
          // Cada lengua con su propio tamaño fijo, para que no se lea como un peine.
          const azarLengua = Math.sin(x * 12.9898) * 43758.5453
          const propia = 0.35 + 0.95 * (azarLengua - Math.floor(azarLengua))
          const h = (2 + 9 * ruido) * q * borde * propia * (1 + baja * 5)
          if (h < 0.6) continue
          const w = paso * 0.55
          const lengua = ctx.createLinearGradient(0, y, 0, y - h)
          lengua.addColorStop(0, `rgba(255,200,110,${0.7 * vida})`)
          lengua.addColorStop(1, 'rgba(238,64,28,0)')
          ctx.fillStyle = lengua
          ctx.beginPath()
          ctx.moveTo(x - w, y)
          ctx.quadraticCurveTo(
            x - w * 0.2,
            y - h * 0.5,
            x + (reducido ? 0 : Math.sin(tiempo * 4 + x) * w * 0.4),
            y - h
          )
          ctx.quadraticCurveTo(x + w * 0.2, y - h * 0.5, x + w, y)
          ctx.fill()
        }

        // Alguna chispa suelta que sube desde la línea.
        if (!reducido && vida > 0.5 && Math.random() < 0.12) {
          lanzarChispa(x0 + Math.random() * ancho, y - 2 * q, 0.5)
        }
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }

      // Cuando la línea toca el carbón, prende: un estallido de chispas.
      if (!reducido && enHero > 0.01) {
        if (encendido > 0.08 && !estallo) {
          estallo = true
          for (let i = 0; i < (tactil ? 40 : 90); i++) {
            lanzarChispa(
              W * (0.5 + (Math.random() - 0.5) * 0.6),
              H - altoCama * 0.4,
              1.8
            )
          }
        }
        if (encendido < 0.02) estallo = false
      }

      // 2. La cama de carbón y las llamas. En el hero no se ve: es sólo negro y
      // la línea (20 °C: todavía no hay fuego) y prende cuando la línea de fuego baja y lo toca.
      // La cama se nota más donde la sección deja ver el fuego (data-llama) y
      // se queda en un resplandor bajo detrás de la carta o del contacto.
      const cama01 = Math.max(
        salida * (0.25 + 0.75 * entre(t, 300, 800)) * (0.3 + 0.7 * calor.llama),
        enHero * encendido
      )
      if (cama01 > 0.01) {
        const y0 = H - altoCama
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = cama01
        ctx.drawImage(cama.base, 0, y0)
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha =
          cama01 *
          pulso *
          Math.max(salida * (0.35 + 0.65 * entre(t, 300, 900)), encendido * 0.9)
        ctx.drawImage(cama.grietas, 0, y0)
      }

      // data-llama="0" deja sólo la cama de brasas; en pantallas angostas el
      // texto ocupa todo el ancho, así que la fogata es más baja. En el hero la
      // fogata crece desde que el carbón prende.
      const intensidad = Math.max(
        salida * entre(t, 560, 1050) * calor.llama * (cssW < 768 ? 0.6 : 1),
        encendido
      )
      if (intensidad > 0.01) {
        const fw = fuego.width
        const fh = fuego.height
        fctx.globalCompositeOperation = 'source-over'
        fctx.clearRect(0, 0, fw, fh)
        fctx.globalCompositeOperation = 'lighter'
        const a = Math.min(1, 0.35 + 0.8 * intensidad)
        const pie = fh * 1.02
        // Dos pasadas: la lengua roja de afuera y el núcleo amarillo, más
        // angosto y más bajo.
        for (const nucleo of [false, true]) {
          for (const l of llamas) {
            const oscila = reducido
              ? 0
              : Math.sin(tiempo * 1.7 + l.fase) * 0.5 +
                Math.sin(tiempo * 4.1 + l.fase2) * 0.22
            const vive = reducido
              ? 1
              : 0.8 + 0.2 * Math.sin(tiempo * 4.7 + l.fase * 2)
            const alto =
              fh *
              (0.08 + 0.52 * intensidad) *
              l.alto *
              vive *
              (nucleo ? 0.55 : 1)
            const ancho =
              fw * l.ancho * (nucleo ? 0.5 : 1) * (0.75 + 0.25 * intensidad)
            const x = fw * l.x
            const puntaX = x + oscila * ancho * (nucleo ? 0.5 : 0.9)
            const puntaY = pie - alto
            const grad = fctx.createLinearGradient(0, pie, 0, puntaY)
            if (nucleo) {
              grad.addColorStop(0, `rgba(255,246,220,${0.9 * a})`)
              grad.addColorStop(0.5, `rgba(255,196,90,${0.5 * a})`)
              grad.addColorStop(1, 'rgba(255,120,30,0)')
            } else {
              grad.addColorStop(0, `rgba(255,150,40,${0.85 * a})`)
              grad.addColorStop(0.4, `rgba(232,66,20,${0.55 * a})`)
              grad.addColorStop(1, 'rgba(110,12,6,0)')
            }
            fctx.fillStyle = grad
            fctx.beginPath()
            fctx.moveTo(x - ancho / 2, pie)
            fctx.bezierCurveTo(
              x - ancho / 2,
              pie - alto * 0.45,
              puntaX - ancho * 0.3,
              pie - alto * 0.7,
              puntaX,
              puntaY
            )
            fctx.bezierCurveTo(
              puntaX + ancho * 0.3,
              pie - alto * 0.7,
              x + ancho / 2,
              pie - alto * 0.45,
              x + ancho / 2,
              pie
            )
            fctx.closePath()
            fctx.fill()
          }
        }
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = 1
        ctx.drawImage(fuego, 0, 0, W, H)

        // El resplandor que la fogata echa sobre todo lo de alrededor.
        const brillo = ctx.createRadialGradient(
          W / 2,
          H,
          0,
          W / 2,
          H,
          Math.max(W, H) * 0.5
        )
        brillo.addColorStop(0, `rgba(255,140,40,${0.28 * intensidad})`)
        brillo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = brillo
        ctx.fillRect(0, H * 0.3, W, H * 0.7)
      }

      // 3. Chispas.
      if (!reducido) {
        const tasa = salida * entre(t, 380, 1100) * (tactil ? 0.6 : 1.1)
        if (Math.random() < tasa)
          lanzarChispa(
            W * (0.5 + (Math.random() - 0.5) * 0.55),
            H - altoCama * 0.4,
            0.6 + tasa
          )
        ctx.globalCompositeOperation = 'lighter'
        for (let i = chispas.length - 1; i >= 0; i--) {
          const c = chispas[i]
          c.vida -= c.paso * dt
          if (c.vida <= 0 || c.y < -10) {
            chispas.splice(i, 1)
            continue
          }
          c.vx += Math.sin(tiempo * 3 + c.fase) * 0.02 * q * dt
          c.vy -= 0.004 * q * dt
          c.x += c.vx * dt
          c.y += c.vy * dt
          ctx.globalAlpha = Math.min(1, c.vida * 1.4)
          ctx.fillStyle = c.vida > 0.6 ? 'rgb(255,226,160)' : 'rgb(255,140,50)'
          ctx.fillRect(c.x, c.y, c.tam, c.tam)
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
    }

    const bucle = (ahora) => {
      cuadro = requestAnimationFrame(bucle)
      if (document.hidden) return
      impar = !impar
      if (tactil && impar) return
      dibujar(ahora)
    }

    preparar()
    const alCambiar = () => {
      preparar()
      if (reducido) dibujar(performance.now())
    }
    window.addEventListener('resize', alCambiar)

    if (reducido) {
      dibujar(performance.now())
      const onScroll = () => {
        if (!cuadroScroll) {
          cuadroScroll = requestAnimationFrame(() => {
            cuadroScroll = 0
            dibujar(performance.now())
          })
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        detenerCalor()
        window.removeEventListener('resize', alCambiar)
        window.removeEventListener('scroll', onScroll)
        cancelAnimationFrame(cuadroScroll)
      }
    }

    cuadro = requestAnimationFrame(bucle)
    return () => {
      detenerCalor()
      cancelAnimationFrame(cuadro)
      window.removeEventListener('resize', alCambiar)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[100lvh] w-screen"
    />
  )
}
