import { useEffect, useRef } from 'react'
import { calor } from '../lib/calor'
import { useLanguage } from '../i18n/LanguageContext'

/*
  Sólo en el celular: una franja fina al pie de la pantalla con el horario y
  la reserva, para que reservar esté siempre a un toque. No aparece en el hero
  (ahí el botón ya está a la vista) ni en el pie de página. main deja libre
  ese alto al final para que no tape nada.
*/
export default function FranjaReserva() {
  const { t } = useLanguage()
  const franja = useRef(null)

  useEffect(() => {
    const el = franja.current
    if (!el) return
    const pie = document.querySelector('[data-pie-pagina]')
    let cuadro = 0
    let visible = null
    const paso = () => {
      cuadro = requestAnimationFrame(paso)
      const enPie = pie ? pie.getBoundingClientRect().top < window.innerHeight * 0.8 : false
      const ver = (calor.salida > 0.5 || calor.portal > 0.45) && !enPie
      if (ver === visible) return
      visible = ver
      el.style.opacity = ver ? '1' : '0'
      el.style.transform = ver ? 'translateY(0)' : 'translateY(100%)'
      el.style.pointerEvents = ver ? '' : 'none'
    }
    cuadro = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(cuadro)
  }, [])

  return (
    <div
      ref={franja}
      className="fixed inset-x-0 bottom-0 z-40 flex h-14 translate-y-full items-center justify-between gap-3 border-t border-crema/10 bg-tinta/95 px-2 text-crema min-[440px]:pl-5 opacity-0 transition-[opacity,transform] duration-500 lg:hidden"
    >
      {/* El horario sólo si cabe al lado del botón; en pantallas angostas el
          botón ocupa la franja entera y no se corta. */}
      <p className="rotulo hidden whitespace-nowrap text-ceniza min-[440px]:block">{t.contact.hoursCorto}</p>
      <a href="#reservar" className="boton flex-1 px-4 py-2.5 min-[440px]:flex-none">
        {t.nav.reservar}
      </a>
    </div>
  )
}
