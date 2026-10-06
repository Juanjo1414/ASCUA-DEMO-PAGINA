import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../i18n/useLanguage'

/*
  El clímax: la mesa al rojo.

  Es el punto más caliente de la página. El campo entra rojo brasa y, a medida
  que se baja, pasa por el amarillo de la llama hasta el blanco caliente de los
  1100 °C. La frase crece con él.
  Los campos son planos: el clímax es el cambio de color, no un brillo encima.

  El cambio de color no anima el fondo (eso repinta toda la sección en cada
  frame): hay tres capas quietas (brasa, llama, blanco) y lo único que se mueve
  es la opacidad de las de arriba.
*/
export default function Reserva() {
  const { t } = useLanguage()
  const raiz = useRef(null)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducido) {
      gsap.set(el.querySelectorAll('[data-capa-llama], [data-blanco]'), {
        opacity: 1,
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'center 45%',
          scrub: 0.5,
        },
      })
      tl.fromTo(
        '[data-capa-llama]',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0
      )
        .fromTo(
          '[data-blanco]',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0.6
        )
        .fromTo(
          '[data-frase]',
          { scale: 0.86, yPercent: 10 },
          { scale: 1, yPercent: 0 },
          0
        )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="reservar"
      ref={raiz}
      data-calor="1000,1100"
      data-llama="0.4"
      className="relative isolate overflow-hidden text-tinta"
    >
      {/* El campo de color no empieza con un borde recto: sale del fuego de
          arriba y se apaga hacia el contacto, así la reserva es el punto más
          caliente del mismo recorrido y no un bloque pegado encima. */}
      <div aria-hidden="true" className="reserva-campo absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-brasa" />
        <div data-capa-llama className="absolute inset-0 bg-llama opacity-0" />
        <div data-blanco className="absolute inset-0 bg-blanco opacity-0" />
      </div>

      <div className="mx-auto flex min-h-[90svh] max-w-content flex-col justify-center gap-16 px-5 py-36 sm:px-6 md:min-h-[110svh] md:py-48 lg:px-10">
        <h2
          data-frase
          className="origin-left font-display text-[clamp(3.6rem,17vw,13.5rem)] font-medium leading-[0.86] tracking-[-0.03em]"
        >
          {t.cta.title}
        </h2>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[40ch] text-lg leading-relaxed md:text-xl">
            {t.cta.body}
          </p>
          <a
            href="#contacto"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('ascua:reservar'))
            }
            className="boton boton--tinta w-full md:w-auto md:px-10 md:py-5"
          >
            {t.cta.button}
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}
