import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

export default function HeroFuego() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full bg-cream-canvas"
    >
      {/* Full-Bleed Background Image */}
      <img
        src="/images/carta/filete.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Text Overlay Panel */}
      <div className="absolute bottom-0 left-0 sm:left-10 sm:bottom-10 w-full sm:w-auto sm:max-w-xl bg-cream-canvas/95 p-[40px]">
        <p className="eyebrow">{t.hero.headline[0] || 'SUNSHINE IN A SALAD'}</p>
        <h1 className="font-sweetsans text-display-lg leading-display-lg text-forest-shadow mb-[24px]">
          {t.hero.headline[1] || 'Fresh Food'}
        </h1>

        <a href="#menu" className="btn-primary w-full sm:w-auto">
          {t.hero.cta}
          <ArrowRight size={16} strokeWidth={2} />
        </a>
      </div>
    </section>
  )
}
