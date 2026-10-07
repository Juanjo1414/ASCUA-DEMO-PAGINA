import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'

export default function Reserva() {
  const { t } = useLanguage()

  return (
    <section
      id="reservar"
      className="bg-[#EFE8DD] text-forest-shadow py-24 md:py-48"
    >
      <div className="mx-auto max-w-page px-5 sm:px-6 lg:px-10 flex flex-col items-center text-center">
        <h2 className="font-display text-[clamp(3.6rem,12vw,10rem)] leading-[0.86] tracking-[-0.03em] mb-12">
          {t.cta.title}
        </h2>
        <p className="max-w-[40ch] text-lg leading-relaxed md:text-xl mb-12">
          {t.cta.body}
        </p>
        <a
          href="#contacto"
          onClick={() =>
            window.dispatchEvent(new CustomEvent('ascua:reservar'))
          }
          className="btn-primary w-full md:w-auto"
        >
          {t.cta.button}
          <ArrowRight size={16} strokeWidth={2} />
        </a>
      </div>
    </section>
  )
}
