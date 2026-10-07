import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { FEEDBACK_URL } from '@/shared/config'

export default function Pie() {
  const { t } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)
  const anio = new Date().getFullYear()

  const feedbackLink = restaurant
    ? `${FEEDBACK_URL}?slug=${restaurant.slug}`
    : FEEDBACK_URL

  return (
    <footer className="bg-deep-forest text-cream-canvas py-16">
      <div className="mx-auto max-w-page px-5 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-6">
              {restaurant?.tema?.logo ? (
                <img
                  src={restaurant.tema.logo}
                  alt={restaurant.nombre}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="font-body text-[24px] font-bold tracking-tight text-cream-canvas">
                  {restaurant?.nombre || 'ascua'}
                </span>
              )}
            </div>
            <p className="max-w-[28ch] font-display text-display-sm">
              {t.footer.tagline}
            </p>
          </div>

          <div className="md:col-span-4 font-body text-body-sm opacity-80">
            <p>Calle 10 #45-20, local 3, Medellín</p>
            <p className="mt-1">{t.contact.hours}</p>
          </div>

          <div className="flex items-start justify-between gap-6 md:col-span-3 md:flex-col md:items-end">
            <a
              href={feedbackLink}
              target="_blank"
              rel="noreferrer"
              className="font-body font-bold uppercase tracking-[0.05em] text-[14px] hover:text-sage-mist transition-colors underline underline-offset-4"
            >
              {t.footer.feedback}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="font-body font-bold uppercase tracking-[0.05em] text-[14px] hover:text-sage-mist transition-colors"
            >
              Instagram
            </a>
            <a
              href="#top"
              className="font-body font-bold uppercase tracking-[0.05em] text-[14px] hover:text-sage-mist transition-colors flex items-center gap-2 mt-2"
            >
              {t.backToTop}
              <ArrowUp size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 md:flex-row font-body text-body-sm opacity-60">
          <p>
            © {anio} {restaurant?.nombre || 'Ascua'}. {t.footer.rights}{' '}
            {t.footer.privacy}
          </p>
          <p>{t.footer.madeBy}</p>
        </div>
      </div>
    </footer>
  )
}
