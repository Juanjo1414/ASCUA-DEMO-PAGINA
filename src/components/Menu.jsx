import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Box, Scan } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../i18n/useLanguage'
import { getAssetForDishIndex } from '../lib/arAssets'
import { FOTOS, TEMPERATURAS } from '../lib/carta'
import ArDishModal from './ArDishModal'
import { launchAr } from '../lib/launchAr'

/*
  La carta: lo que sale del fuego (950 °C, al pase).

  Los platos se ven como se ven de verdad: redondos, desde arriba. Los que
  tienen modelo publicado van primero y en grande, porque son lo único que esta
  carta tiene y ninguna otra: ponerlos sobre tu mesa en realidad aumentada. Su
  plato entra como lo pone la RA: aparece la retícula del visor, el plato baja
  y se asienta en el aro. Después gira despacio con el scroll.
  Los demás van en una rejilla de círculos más chicos, cada uno con la
  temperatura de la zona del fuego donde se termina.

  La lógica de RA es la de siempre: mismo getAssetForDishIndex, mismo
  launchAr, mismo modal. Sólo cambia cómo se ven los botones que la llaman: un
  bloque recto que dice lo que hace («Ponerlo en mi mesa») en vez de un sello
  redondo que había que adivinar.
*/
export default function Menu() {
  const { t } = useLanguage()
  const raiz = useRef(null)
  const [activo, setActivo] = useState(null)

  // El toque en el botón de RA es el gesto de usuario que Quick Look y Scene
  // Viewer exigen, así que la RA se lanza acá mismo. Si el aparato no tiene
  // ninguna de las dos vías (un escritorio, por ejemplo) se cae al modal 3D,
  // que ya explica por qué no hay RA.
  const abrirAr = (plato) => {
    const abierto = launchAr({
      glbUrl: plato.asset.glbUrl,
      usdzUrl: plato.asset.usdzUrl,
      posterUrl: plato.asset.posterUrl,
      title: plato.name,
    })
    if (!abierto) setActivo({ dish: plato, mode: 'ar' })
  }

  const platos = t.menuSection.dishes.map((plato, i) => ({
    ...plato,
    image: FOTOS[i],
    temp: TEMPERATURAS[i],
    asset: getAssetForDishIndex(i),
  }))
  const destacados = platos.filter((p) => p.asset)
  const resto = platos.filter((p) => !p.asset)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducido) {
      // Sin animación, el plato ya está colocado: el visor sólo aparece al
      // pasar por el botón.
      el.querySelectorAll('[data-ar]').forEach((ar) =>
        ar.classList.add('ar-colocado')
      )
      return
    }

    const ctx = gsap.context(() => {
      el.querySelectorAll('[data-giro]').forEach((plato, i) => {
        gsap.fromTo(
          plato,
          { rotate: i % 2 ? 40 : -40 },
          {
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: plato,
              start: 'top bottom',
              end: 'center 40%',
              scrub: 0.6,
            },
          }
        )
      })
      // Los platos con RA entran como los pone la realidad aumentada: aparece
      // la retícula, el plato baja flotando y se asienta en el aro, y el visor
      // se cierra sobre él y queda quieto. Una vez, al entrar en pantalla.
      el.querySelectorAll('[data-ar]').forEach((ar) => {
        gsap
          .timeline({
            defaults: { ease: 'expo.out' },
            scrollTrigger: { trigger: ar, start: 'top 75%', once: true },
          })
          .from(ar.querySelector('[data-reticula]'), {
            scale: 1.25,
            opacity: 0,
            duration: 0.9,
          })
          .from(
            ar.querySelector('[data-plato-ar]'),
            {
              y: -70,
              scale: 1.14,
              opacity: 0,
              duration: 1.3,
              ease: 'back.out(1.3)',
            },
            0.35
          )
          .to(
            ar.querySelector('[data-esquinas]'),
            { scale: 0.94, transformOrigin: '50% 50%', duration: 0.5 },
            1.2
          )
          .to(
            ar.querySelector('[data-aro]'),
            { opacity: 0.25, duration: 0.8 },
            1.3
          )
          // Ya colocado, el visor se va, como en una app de RA. Desde ahí lo
          // maneja el CSS: vuelve tenue al pasar por «Ponerlo en mi mesa».
          .to(
            ar.querySelector('[data-reticula]'),
            { opacity: 0, duration: 0.7, ease: 'power2.out' },
            2
          )
          .add(() => {
            gsap.set(ar.querySelector('[data-reticula]'), {
              clearProps: 'opacity,transform',
            })
            ar.classList.add('ar-colocado')
          })
      })
      el.querySelectorAll('[data-sube]').forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="menu"
      ref={raiz}
      data-calor="950,950"
      data-llama="0"
      className="relative py-24 text-crema md:py-36"
    >
      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-10">
        <div data-sube className="max-w-2xl">
          <h2 className="font-display text-[clamp(2.6rem,5.4vw,5rem)] font-medium">
            {t.menuSection.title}
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-crema/80">
            {t.menuSection.body}
          </p>
        </div>

        {/* Los platos que se pueden poner sobre la mesa. */}
        {destacados.length > 0 && (
          <div className="mt-20 border-t border-crema/15 pt-14 md:mt-28">
            <div data-sube className="max-w-xl">
              <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] italic text-llama">
                {t.menuSection.destacado}
              </h3>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-crema/80">
                {t.menuSection.destacadoBody}
              </p>
            </div>

            <ul className="mt-14 grid gap-20 md:grid-cols-2 md:gap-12">
              {destacados.map((plato) => (
                <li
                  key={plato.name}
                  data-sube
                  className="plato-ar flex flex-col items-center text-center md:items-start md:text-left"
                >
                  <div data-ar className="relative w-[min(84vw,440px)]">
                    {/* La retícula de la realidad aumentada: el aro de dónde se
                        va a apoyar el plato y las cuatro esquinas del visor. */}
                    <svg
                      data-reticula
                      aria-hidden="true"
                      viewBox="0 0 100 100"
                      className="pointer-events-none absolute inset-[-9%] h-[118%] w-[118%] text-llama"
                    >
                      <circle
                        data-aro
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.35"
                        strokeDasharray="1.2 1.6"
                      />
                      <g
                        data-esquinas
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.6"
                        strokeLinecap="square"
                      >
                        <path d="M4 14V4h10" />
                        <path d="M86 4h10v10" />
                        <path d="M96 86v10H86" />
                        <path d="M14 96H4V86" />
                      </g>
                    </svg>
                    <img
                      data-giro
                      data-plato-ar
                      src={plato.image}
                      alt={plato.name}
                      loading="lazy"
                      className="relative aspect-square w-full rounded-full object-cover will-change-transform"
                      style={{
                        boxShadow: '0 40px 70px -30px rgb(0 0 0 / 0.9)',
                      }}
                    />
                    <p className="rotulo absolute right-[4%] top-[6%] bg-tinta px-3 py-2 text-llama">
                      {plato.temp} °C
                    </p>
                  </div>

                  <h4 className="mt-10 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-medium leading-tight">
                    {plato.name}
                  </h4>
                  <p className="mt-3 max-w-[40ch] leading-relaxed text-crema/80">
                    {plato.description}
                  </p>

                  <div className="mt-8 flex w-full flex-col items-center gap-5 sm:w-auto sm:flex-row">
                    <button
                      type="button"
                      data-boton-ar
                      onClick={() => abrirAr(plato)}
                      aria-label={`${t.ar.viewOnTable}: ${plato.name}`}
                      className="boton w-full sm:w-auto"
                    >
                      <Scan size={18} strokeWidth={2} />
                      {t.ar.viewOnTable}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivo({ dish: plato, mode: '3d' })}
                      className="rotulo group/v relative inline-flex items-center gap-2 py-2 transition-colors hover:text-llama"
                    >
                      <Box size={15} strokeWidth={1.9} />
                      {t.ar.view3d}
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className="transition-transform group-hover/v:translate-x-1"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* El resto de la carta. */}
        <ul className="mt-24 grid grid-cols-2 gap-x-6 gap-y-14 border-t border-crema/15 pt-14 md:mt-32 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
          {resto.map((plato) => (
            <li key={plato.name} data-sube className="group">
              <div className="relative">
                <img
                  data-giro
                  src={plato.image}
                  alt={plato.name}
                  loading="lazy"
                  className="aspect-square w-full rounded-full object-cover will-change-transform"
                  style={{ boxShadow: '0 30px 50px -28px rgb(0 0 0 / 0.9)' }}
                />
                <p className="rotulo absolute right-0 top-[4%] bg-tinta px-2.5 py-1.5 text-llama">
                  {plato.temp} °C
                </p>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium leading-snug md:text-2xl">
                {plato.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-crema/75">
                {plato.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {activo && (
        <ArDishModal
          dish={activo.dish}
          asset={activo.dish.asset}
          mode={activo.mode}
          onClose={() => setActivo(null)}
        />
      )}
    </section>
  )
}
