/**
 * Sección "llamado a la acción" que invita a reservar, sobre el mantel. Su
 * botón no reserva nada por sí mismo: dispara el evento `ascua:reservar` que
 * escucha `Contacto.tsx` para precargar y enfocar el formulario real, que a su
 * vez abre un WhatsApp prellenado (no se simula ningún envío).
 *
 * Lo usa `RestaurantPage`. Los dos círculos concéntricos son la mesa puesta
 * para quien reserva: el mismo lenguaje de plato de toda la página.
 */
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/presentation/i18n/useLanguage'

export default function Reserva() {
  const { t } = useLanguage()

  return (
    <section
      id="reservar"
      data-superficie="mantel"
      className="seccion relative overflow-hidden bg-mantel text-on-mantel"
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 top-1/2 hidden h-[140%] -translate-y-1/2 text-on-mantel/25 md:block"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          strokeDasharray="0.6 1.6"
        />
      </svg>
      <div className="pagina relative flex flex-col items-start gap-6">
        <h2 className="max-w-[14ch] text-display">{t.cta.title}</h2>
        <p className="max-w-[34ch] text-lead text-on-mantel-soft">
          {t.cta.body}
        </p>
        <a
          href="#contacto"
          onClick={() =>
            window.dispatchEvent(new CustomEvent('ascua:reservar'))
          }
          className="btn-porcelana mt-2 w-full sm:w-auto"
        >
          {t.cta.button}
          <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
