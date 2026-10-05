import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const LINK_IDS = ['fuego', 'menu', 'voces', 'contacto']

/*
  La barra.

  Sobre el hero no tiene fondo y baja la voz: los enlaces en ceniza y sin la
  palabra ASCUA, porque el nombre gigante del hero ya es la marca y no tiene
  que competir consigo mismo. Pasado el hero aparece el carbón y la palabra. La marca es sólo la palabra, en Bodoni espaciada: el fuego ya está
  en toda la página y no necesita un dibujo más.
*/
export default function Nav() {
  const { lang, setLang, t } = useLanguage()
  const [enHero, setEnHero] = useState(true)
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(null)

  const enlaces = LINK_IDS.map((id) => ({ id, href: `#${id}`, label: t.nav[id] }))

  // Se mide en cada scroll y no con IntersectionObserver: el pin del hero
  // mueve el marcador sin que cruce el borde, y un salto largo (un ancla, el
  // botón de volver arriba) no dispara el observador.
  useEffect(() => {
    const marcador = document.getElementById('hero-end')
    if (!marcador) return
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      setEnHero(marcador.getBoundingClientRect().top > 72)
    }
    const onScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(cuadro)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const objetivos = LINK_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!objetivos.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActivo(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    objetivos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Con el menú abierto la página de atrás no se mueve.
  useEffect(() => {
    if (!abierto) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setAbierto(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previo
      document.removeEventListener('keydown', onKey)
    }
  }, [abierto])

  const control = 'rotulo py-2 transition-colors hover:text-acento'
  const sobreFoto = enHero && !abierto

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        sobreFoto ? 'bg-transparent text-ceniza' : 'bg-carbon text-loza'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-content items-center justify-between gap-6 px-5 sm:px-6 lg:px-10">
        <a
          href="#top"
          aria-label="Ascua, inicio"
          className={`flex items-center gap-3 transition-opacity duration-500 ${
            sobreFoto ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <span className="font-display text-[1.2rem] font-semibold uppercase tracking-[0.42em]">
            Ascua
          </span>
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {enlaces.map((enlace) => {
            const esActivo = activo === enlace.id
            return (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  aria-current={esActivo ? 'true' : undefined}
                  className={`rotulo relative py-2 transition-colors hover:text-acento ${
                    esActivo ? 'text-acento' : ''
                  }`}
                >
                  {enlace.label}
                  {/* La banderita doblada: marca dónde estás parado. */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-brasa transition-transform duration-500 ${
                      esActivo ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Cambiar idioma / Switch language"
            className={control}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          <a href="#reservar" className="boton hidden px-5 py-3 lg:inline-flex">
            {t.nav.reservar}
          </a>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
          >
            {abierto ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
          </button>
        </div>
      </nav>

      {abierto && (
        <div
          id="menu-movil"
          className="campo-brasa fixed inset-x-0 bottom-0 top-[72px] flex flex-col justify-between overflow-y-auto px-5 pb-8 pt-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {enlaces.map((enlace) => (
              <li key={enlace.href} className="border-b border-tinta/20">
                <a
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className="flex items-baseline justify-between py-4 font-display text-[2.6rem] font-medium italic leading-none"
                >
                  {enlace.label}
                  <ArrowRight size={22} strokeWidth={1.6} />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-6">
            <a href="#reservar" onClick={() => setAbierto(false)} className="boton boton--tinta w-full">
              {t.nav.reservar}
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
