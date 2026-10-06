import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../i18n/useLanguage'

/*
  Tercer tramo: brasa viva (de 950 a 1000 °C).

  Las opiniones son comandas: tickets de papel colgados del riel de la cocina,
  como los que el pase va sacando durante el servicio. Cada uno con su mesa,
  su hora y, donde iría el pedido, la nota del cliente. Es el único papel de
  la página: contra tanto fuego, un blanco que se lee de lejos.

  Al entrar, los tickets llegan corriendo por el riel y se balancean hasta
  quedar quietos; después se mecen apenas, colgados. En el celular el riel se
  recorre de lado con el dedo.
*/
export default function Voces() {
  const { t, lang } = useLanguage()
  const raiz = useRef(null)
  const [abre, cierra] = lang === 'es' ? ['«', '»'] : ['“', '”']

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducido) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '[data-riel]',
            start: 'top 78%',
            once: true,
          },
        })
        .from('[data-riel-barra]', { scaleX: 0, duration: 1, ease: 'expo.out' })
        .from(
          '[data-ticket]',
          {
            x: () => window.innerWidth * 0.6,
            rotate: 16,
            opacity: 0,
            duration: 1.6,
            stagger: 0.16,
            ease: 'elastic.out(1, 0.45)',
          },
          0.2
        )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="voces"
      ref={raiz}
      data-calor="950,1000"
      data-llama="0.12"
      className="relative py-24 text-crema md:py-36"
    >
      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-10">
        <h2 className="max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium">
          {t.testimonials.heading}
        </h2>
      </div>

      {/* El riel. En el celular se desliza de lado; en escritorio entran los tres. */}
      <div
        data-riel
        className="no-scrollbar relative mx-auto mt-14 max-w-content snap-x snap-mandatory overflow-x-auto px-5 pb-10 pt-4 sm:px-6 md:mt-20 lg:overflow-visible lg:px-10"
      >
        <div className="relative w-max pt-3 lg:w-full">
          <span
            data-riel-barra
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left"
            style={{
              background:
                'linear-gradient(180deg, rgb(var(--c-crema) / 0.55), rgb(var(--c-crema) / 0.15))',
            }}
          />
          <ul className="flex gap-6 lg:gap-8">
            {t.testimonials.items.map((item, i) => (
              <li
                key={item.name}
                data-ticket
                className="w-[78vw] max-w-[340px] shrink-0 snap-center origin-top lg:w-auto lg:max-w-none lg:flex-1"
              >
                {/* Se mece apenas, colgado; cada uno a su ritmo. */}
                <div
                  className="comanda-colgada relative origin-top"
                  style={{ animationDelay: `-${i * 1.3}s` }}
                >
                  {/* La pinza que lo sostiene del riel. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[-14px] z-10 h-5 w-10 -translate-x-1/2 bg-carbon-700 ring-1 ring-crema/25"
                  />
                  <article className="comanda relative bg-crema px-6 pb-12 pt-8 text-tinta">
                    <header className="comanda-impresa flex items-baseline justify-between">
                      <span>Ascua · {t.testimonials.comanda}</span>
                      <span className="tabular-nums">{item.hora}</span>
                    </header>
                    <p className="comanda-impresa mt-2 text-tinta/70">
                      {t.testimonials.mesa}{' '}
                      <span className="tabular-nums">{item.mesa}</span>
                    </p>
                    <hr className="my-5 border-0 border-t border-dashed border-tinta/40" />
                    <p className="comanda-impresa text-tinta/70">
                      {t.testimonials.nota}:
                    </p>
                    <blockquote className="mt-3">
                      <p className="font-display text-2xl italic leading-[1.15]">
                        <span aria-hidden="true">{abre}</span>
                        {item.quote}
                        <span aria-hidden="true">{cierra}</span>
                      </p>
                    </blockquote>
                    <hr className="my-5 border-0 border-t border-dashed border-tinta/40" />
                    <footer>
                      <cite className="comanda-impresa not-italic">
                        {item.name}
                      </cite>
                      <p className="mt-1 text-sm text-tinta/70">{item.role}</p>
                    </footer>
                  </article>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
