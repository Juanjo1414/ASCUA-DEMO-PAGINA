import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

const LINK_IDS = ['menu', 'voces', 'contacto']

export default function Nav() {
  const { lang, setLang, t } = useLanguage()
  const [abierto, setAbierto] = useState(false)

  const enlaces = LINK_IDS.map((id) => ({
    id,
    href: `#${id}`,
    label: t.nav[id as keyof typeof t.nav],
  }))

  useEffect(() => {
    if (!abierto) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previo
      document.removeEventListener('keydown', onKey)
    }
  }, [abierto])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cream-canvas border-b border-deep-forest/10">
      <nav className="mx-auto flex h-[72px] max-w-page items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Left Nav */}
        <div className="flex-1 flex items-center justify-start">
          <ul className="hidden items-center gap-8 lg:flex">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  className="font-body text-[14px] font-bold uppercase tracking-[0.05em] text-forest-shadow hover:text-deep-forest transition-colors"
                >
                  {enlace.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            className="-ml-2 grid h-11 w-11 place-items-center lg:hidden text-deep-forest"
          >
            {abierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <a
            href="#top"
            aria-label="Ascua, inicio"
            className="font-body text-[24px] sm:text-[28px] font-bold text-deep-forest tracking-tight"
          >
            ascua
          </a>
        </div>

        {/* Right Nav */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <button
            type="button"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Switch language"
            className="font-body text-[14px] font-bold uppercase tracking-[0.05em] text-forest-shadow hover:text-deep-forest transition-colors hidden sm:block"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          <a
            href="#reservar"
            className="btn-secondary hidden sm:inline-flex px-[20px] py-[8px]"
          >
            {t.nav.reservar}
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {abierto && (
        <div
          id="menu-movil"
          className="fixed inset-x-0 bottom-0 top-[72px] flex flex-col justify-between overflow-y-auto bg-sage-mist-band px-5 pb-8 pt-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {enlaces.map((enlace) => (
              <li key={enlace.href} className="border-b border-deep-forest/10">
                <a
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className="flex items-center justify-between py-6 font-display text-[40px] leading-none text-forest-shadow"
                >
                  {enlace.label}
                  <ArrowRight size={32} />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-6">
            <button
              type="button"
              onClick={() => {
                setLang(lang === 'es' ? 'en' : 'es')
                setAbierto(false)
              }}
              className="font-body text-[14px] font-bold uppercase tracking-[0.05em] text-forest-shadow"
            >
              {lang === 'es' ? 'SWITCH TO ENGLISH' : 'CAMBIAR A ESPAÑOL'}
            </button>
            <a
              href="#reservar"
              onClick={() => setAbierto(false)}
              className="btn-primary w-full flex justify-center"
            >
              {t.nav.reservar}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
