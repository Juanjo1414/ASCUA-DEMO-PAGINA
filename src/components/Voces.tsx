import { useLanguage } from '../i18n/useLanguage'

export default function Voces() {
  const { t } = useLanguage()

  return (
    <section id="voces" className="bg-cream-canvas py-24 md:py-36">
      <div className="mx-auto max-w-page px-5 sm:px-6 lg:px-10">
        <h2 className="font-sweetsans text-display-sm md:text-display text-forest-shadow mb-16 text-center">
          {t.testimonials.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {t.testimonials.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center text-center"
            >
              <blockquote className="flex-1">
                <p className="font-sweetsanstext text-body text-forest-shadow italic mb-6">
                  "{item.quote}"
                </p>
              </blockquote>
              <footer>
                <cite className="font-sweetsanstext font-bold uppercase tracking-[0.05em] text-[14px] text-deep-forest not-italic block">
                  {item.name}
                </cite>
                <p className="mt-1 text-sm text-forest-shadow/70">
                  {item.role}
                </p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
