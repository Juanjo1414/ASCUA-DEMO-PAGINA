import { useLanguage } from '../i18n/useLanguage'

export default function Manifiesto() {
  const { t } = useLanguage()

  return (
    <section className="split-section">
      <div className="mx-auto max-w-page px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[80px] items-center">
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-display leading-display text-forest-shadow">
              {t.manifiesto.title}{' '}
              <span className="italic">{t.manifiesto.titleEm}</span>
            </h2>
            <div className="mt-[24px] flex flex-col gap-[16px]">
              <p className="font-body font-bold text-[18px] text-forest-shadow">
                Our philosophy
              </p>
              <p className="font-body text-body text-forest-shadow">
                {t.manifiesto.body}
              </p>
            </div>
          </div>

          <div className="w-full h-full min-h-[400px]">
            <img
              src="/images/carta/vieiras.jpg"
              alt="Philosophy"
              className="w-full h-full object-cover rounded-images"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
