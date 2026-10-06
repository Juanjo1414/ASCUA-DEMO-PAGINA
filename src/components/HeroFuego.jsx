import { useEffect, useRef } from 'react'
import { ArrowRight, Scan } from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { calor } from '../lib/calor'
import { useLanguage } from '../i18n/useLanguage'

const LETRAS = ['A', 'S', 'C', 'U', 'A']

/*
  El hero: el horizonte de fuego.

  Negro y mucho aire. A S C U A arriba, grande y quieto, en Bodoni fina; más
  abajo, una sola línea delgada de fuego vivo cruza la pantalla de lado a
  lado, como un horizonte al atardecer. No hay más: un nombre y un gesto.

  Al entrar, la línea se enciende desde el centro hacia los lados, como una
  mecha, y el nombre sube despacio con su luz. Al hacer scroll las letras se
  van, la línea baja hasta el pie de la pantalla y, al tocar el carbón, crece
  hasta volverse la fogata que sigue el resto de la página.

  La línea, su resplandor y la fogata los pinta Escena.jsx; aquí sólo se
  marca el ritmo (calor.linea y calor.portal) y se muestran las letras.
*/
export default function HeroFuego() {
  const { t } = useLanguage()
  const escena = useRef(null)

  useEffect(() => {
    const raiz = escena.current
    if (!raiz) return
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // La salida: cuando el hero se va, el fuego baja a ser la cama de carbón
    // del resto de la página. Se crea después del pin (y con prioridad baja)
    // para que mida la página con el espacio que agrega el pin.
    const crearSalida = () =>
      ScrollTrigger.create({
        // El elemento, no el selector: dentro de gsap.context los selectores se
        // buscan sólo adentro del hero, y el marcador está afuera.
        trigger: document.getElementById('hero-end'),
        start: 'top bottom',
        end: 'top 20%',
        refreshPriority: -1,
        onUpdate: (self) => {
          calor.salida = self.progress
        },
        onRefresh: (self) => {
          calor.salida = self.progress
        },
      })

    const ctx = gsap.context(() => {
      if (reducido) {
        calor.linea = 1
        ScrollTrigger.create({
          trigger: raiz,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            calor.portal = self.progress
          },
        })
        crearSalida()
        return
      }

      // Entrada: la línea se enciende desde el centro y el nombre sube con su luz.
      const linea = { v: 0 }
      gsap
        .timeline({ delay: 0.95 })
        .to(linea, {
          v: 1,
          duration: 1.9,
          ease: 'power3.inOut',
          onUpdate: () => {
            calor.linea = linea.v
          },
        })
        .from(
          '[data-letra-dentro]',
          {
            yPercent: 40,
            opacity: 0,
            duration: 1.8,
            stagger: 0.09,
            ease: 'expo.out',
          },
          0.9
        )
        .from(
          '[data-pie]',
          { y: 20, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' },
          1.5
        )

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: raiz,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      })

      const avance = { p: 0 }
      tl.to(
        avance,
        {
          p: 1,
          duration: 1,
          onUpdate: () => {
            calor.portal = avance.p
          },
        },
        0
      )

      // Las letras suben y se apagan mientras la línea baja hacia el carbón.
      raiz.querySelectorAll('[data-letra]').forEach((letra, i) => {
        tl.to(
          letra,
          { y: -30 - i * 6, opacity: 0, duration: 0.3, ease: 'power1.in' },
          0.02 + i * 0.015
        )
      })

      // El pie del hero se va antes de que la línea baje por él: el fuego
      // no pasa por encima del texto. La reserva sigue en la barra (y en la
      // franja del celular, que aparece justo después).
      tl.to(
        '[data-pie-hero]',
        { opacity: 0, y: 24, duration: 0.2, ease: 'power1.in' },
        0.12
      )

      crearSalida()
    }, raiz)

    return () => {
      ctx.revert()
      calor.linea = 0
    }
  }, [])

  return (
    <section
      id="top"
      ref={escena}
      data-calor="20,420"
      data-llama="0"
      className="relative h-[100svh] min-h-[560px] overflow-hidden text-crema"
    >
      {/* A S C U A, grande y quieto: lo más claro de la pantalla. Todo lo
          demás del hero va en ceniza para no competir con él; sólo la línea
          de fuego y el botón de reserva tienen color. La sombra cálida de
          abajo es la luz de la línea que le llega. */}
      <h1
        aria-label="Ascua"
        className="pointer-events-none absolute inset-x-0 top-[36%] flex -translate-y-1/2 justify-between px-[4vw] md:top-[40%] md:px-[5vw]"
      >
        {LETRAS.map((letra, i) => (
          <span
            key={i}
            data-letra
            aria-hidden="true"
            className="block font-display text-[clamp(4.6rem,23vw,19rem)] font-normal leading-[0.9] md:text-[clamp(4.6rem,20vw,18rem)]"
            style={{ textShadow: '0 24px 70px rgb(238 64 28 / 0.28)' }}
          >
            <span data-letra-dentro className="block">
              {letra}
            </span>
          </span>
        ))}
      </h1>

      {/* El pie: la frase, la temperatura, el horario y la reserva. */}
      <div
        data-pie-hero
        className="absolute inset-x-0 bottom-0 px-5 pb-7 sm:px-6 md:pb-10 lg:px-10"
        style={{ textShadow: '0 2px 18px rgb(0 0 0 / 0.85)' }}
      >
        <div className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              data-pie
              className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-normal italic leading-[1.02]"
            >
              <span className="text-ceniza">{t.hero.headline[0]}</span>
              <br />
              <span className="not-italic text-llama">
                {t.hero.headline[1]}
              </span>
            </p>
            {/* Lo que Ascua tiene y nadie más: la carta en realidad aumentada. */}
            <a
              data-pie
              href="#menu"
              className="rotulo group mt-6 inline-flex items-center gap-2.5 text-ceniza transition-colors hover:text-llama"
            >
              <Scan size={15} strokeWidth={2} className="text-llama" />
              <span className="underline decoration-crema/25 underline-offset-[6px] transition-colors group-hover:decoration-llama">
                {t.hero.ar}
              </span>
            </a>
          </div>

          <div data-pie className="flex flex-col gap-3 md:items-end">
            <p className="rotulo flex flex-wrap items-center gap-x-3 gap-y-2 text-ceniza">
              <span className="sm:whitespace-nowrap">{t.contact.hours}</span>
            </p>
            <a href="#reservar" className="boton w-full md:w-auto">
              {t.hero.cta}
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
