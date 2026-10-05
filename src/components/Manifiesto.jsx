import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../i18n/LanguageContext'
import { prepararBrasaTexto } from '../lib/brasa'

/*
  Primer tramo: el fuego se aviva (de 420 a 700 °C).

  El manifiesto se enciende palabra por palabra a medida que se baja, como
  brasas que agarran una tras otra; «la técnica» está escrita con la textura
  del carbón encendido. La sección no tiene fondo propio: detrás está la
  fogata que acaba de prender en el hero.
*/
export default function Manifiesto() {
  const { t } = useLanguage()
  const raiz = useRef(null)

  const palabras = `${t.manifiesto.title} ${t.manifiesto.titleEm}.`.split(' ')
  const primeraEnfasis = t.manifiesto.title.split(' ').length

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    prepararBrasaTexto()
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducido) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-palabra]',
        { opacity: 0.12, yPercent: 12 },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-manifiesto]',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.3,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [t])

  return (
    <section ref={raiz} data-calor="420,700" data-llama="0.35" className="relative overflow-hidden">
      <div className="mx-auto max-w-content px-5 pb-[34svh] pt-28 sm:px-6 md:pt-40 lg:px-10">
        <h2
          data-manifiesto
          aria-label={`${t.manifiesto.title} ${t.manifiesto.titleEm}.`}
          className="max-w-[14ch] font-display text-[clamp(3rem,8.6vw,8.2rem)] font-medium leading-[0.95] text-crema"
        >
          {palabras.map((palabra, i) => (
            <span
              key={i}
              data-palabra
              aria-hidden="true"
              className={`inline-block pr-[0.22em] ${i >= primeraEnfasis ? 'en-brasa font-bold italic' : ''}`}
            >
              {palabra}
            </span>
          ))}
        </h2>
        <p className="mt-12 max-w-[42ch] text-lg leading-relaxed text-crema/85 md:ml-[38%] md:text-xl">
          {t.manifiesto.body}
        </p>
      </div>
    </section>
  )
}
