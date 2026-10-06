import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../i18n/useLanguage'

// Dónde queda cada etiqueta sobre la mesa (escritorio): columna (fracción del
// ancho), fila (fracción de 730 px) y giro. Se tocan apenas, como dejadas a mano.
const REPOSO = [
  { x: 0, y: 0, r: -4 },
  { x: 0.53, y: 0.03, r: 3 },
  { x: 0.02, y: 0.5, r: 2 },
  { x: 0.55, y: 0.52, r: -3 },
]

/*
  Segundo tramo: la llama (de 700 a 950 °C). Lo que arde.

  Antes de la carta, el combustible: las tres maderas y el carbón con que
  cocina Ascua. Cada uno es una etiqueta de saco en papel kraft, impresa como
  la ticketera de las comandas (la misma familia de objetos: papel, tinta,
  sello), con su origen, su humo, para qué se usa y a cuántos grados arde.

  En escritorio la sección se fija y, a medida que se baja, las etiquetas caen
  sobre la mesa una por una, de la más fría a la más caliente, mientras el
  fuego se aviva y la fogata crece detrás. En el celular es una pila: cada
  etiqueta cae al entrar en pantalla.
*/
export default function LoQueArde() {
  const { t } = useLanguage()
  const raiz = useRef(null)
  const { etiquetas: rotulos, maderas } = t.fuego

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducido) return

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(min-width: 1024px)', () => {
        const mesa = el.querySelector('[data-mesa]')
        const etiquetas = [...mesa.querySelectorAll('[data-etiqueta]')]
        const ajustar = () => {
          // Lo que miden de verdad las dos filas (la letra y el ancho cambian
          // el alto de cada etiqueta), y lo que deja libre la pantalla.
          const alto = Math.max(
            ...etiquetas.map((e) => e.offsetTop + e.offsetHeight)
          )
          mesa.style.height = alto + 'px'
          const disponible = window.innerHeight - 72 - 40
          const escala = Math.min(1, disponible / alto)
          // Se achica desde arriba y además deja de ocupar el alto que ahorra:
          // si no, el centrado de la fila la sigue midiendo entera y la corre.
          gsap.set(mesa, { scale: escala, transformOrigin: '50% 0%' })
          mesa.style.marginBottom = -alto * (1 - escala) + 'px'
        }
        ajustar()
        window.addEventListener('resize', ajustar)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.6,
          },
        })
        el.querySelectorAll('[data-etiqueta]').forEach((etiqueta, i) => {
          tl.fromTo(
            etiqueta,
            { yPercent: 160, rotate: REPOSO[i].r * 5, opacity: 0 },
            {
              yPercent: 0,
              rotate: REPOSO[i].r,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
            },
            i * 0.8
          ).fromTo(
            etiqueta.querySelector('[data-sello]'),
            { scale: 1.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' },
            i * 0.8 + 0.7
          )
        })
        tl.to({}, { duration: 0.5 })
        return () => window.removeEventListener('resize', ajustar)
      })

      mm.add('(max-width: 1023px)', () => {
        el.querySelectorAll('[data-etiqueta]').forEach((etiqueta, i) => {
          // En la pila también van un poco giradas, como dejadas a mano.
          gsap.set(etiqueta, { rotate: REPOSO[i].r * 0.6 })
          gsap
            .timeline({
              scrollTrigger: {
                trigger: etiqueta,
                start: 'top 85%',
                once: true,
              },
            })
            .from(
              etiqueta,
              {
                y: 80,
                rotate: REPOSO[i].r * 4,
                opacity: 0,
                duration: 1,
                ease: 'expo.out',
              },
              0
            )
            .from(
              etiqueta.querySelector('[data-sello]'),
              { scale: 1.6, opacity: 0, duration: 0.3, ease: 'power4.in' },
              0.5
            )
        })
      })
    }, el)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [t])

  return (
    <section
      id="fuego"
      ref={raiz}
      data-calor="700,950"
      data-llama="1"
      className="relative text-crema lg:h-[100svh] lg:overflow-hidden"
    >
      <div className="mx-auto grid h-full max-w-content gap-14 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-10 lg:pb-0 lg:pt-[72px]">
        <div
          className="lg:col-span-4"
          style={{ textShadow: '0 2px 18px rgb(0 0 0 / 0.8)' }}
        >
          <h2 className="font-display text-[clamp(2.8rem,5vw,4.8rem)] font-medium">
            {t.fuego.title}
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-crema/85">
            {t.fuego.body}
          </p>
        </div>

        {/* La mesa: en escritorio las etiquetas quedan sueltas, un poco
            giradas; en el celular, una debajo de otra. */}
        <ul
          data-mesa
          className="relative flex flex-col gap-8 lg:col-span-8 lg:block lg:h-[730px]"
        >
          {maderas.map((m, i) => (
            <li
              key={m.nombre}
              data-etiqueta
              className="etiqueta-sombra mx-auto w-full max-w-[340px] lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:mx-0 lg:w-[46%] lg:max-w-[360px]"
              style={{
                '--x': `${REPOSO[i].x * 100}%`,
                '--y': `${REPOSO[i].y * 730}px`,
              }}
            >
              <article className="etiqueta relative text-tinta">
                <header className="flex items-baseline justify-between">
                  <span className="comanda-impresa">Ascua</span>
                  <span className="comanda-impresa tabular-nums">
                    {rotulos.lote} {m.lote}
                  </span>
                </header>
                <h3 className="etiqueta-nombre mt-4">{m.nombre}</h3>
                <dl className="mt-5 space-y-2 border-t border-dashed border-tinta/40 pt-4">
                  <div className="flex justify-between gap-4">
                    <dt className="comanda-impresa text-tinta/70">
                      {rotulos.origen}
                    </dt>
                    <dd className="text-right text-sm">{m.origen}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="comanda-impresa text-tinta/70">
                      {rotulos.humo}
                    </dt>
                    <dd className="text-right text-sm">{m.humo}</dd>
                  </div>
                </dl>
                <p className="mt-4 border-t border-dashed border-tinta/40 pt-4 font-display text-lg italic leading-snug">
                  {m.uso}
                </p>
                <footer className="mt-5 flex items-end justify-between">
                  <span className="comanda-impresa text-tinta/70">
                    {rotulos.temperatura}
                  </span>
                  <span className="text-4xl font-light tabular-nums leading-none">
                    {m.t}
                    <span className="text-lg"> °C</span>
                  </span>
                </footer>
                {/* El sello de tinta, estampado al final, en el hueco de abajo:
                    no tapa el nombre. */}
                <span
                  data-sello
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-6 flex justify-center pr-[12%]"
                >
                  <span className="sello">{rotulos.sello}</span>
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
