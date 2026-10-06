import { useLanguage } from '../i18n/useLanguage'

export default function LoQueArde() {
  const { t } = useLanguage()
  const { etiquetas: rotulos, maderas } = t.fuego

  return (
    <section className="split-section--alt">
      <div className="mx-auto max-w-page px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[80px]">
          {/* Left Column: Text Stack */}
          <div className="flex flex-col justify-center">
            <h2 className="font-sweetsans text-display leading-display text-forest-shadow mb-[24px]">
              {t.fuego.title}
            </h2>
            <p className="font-sweetsanstext text-body text-forest-shadow mb-[40px]">
              {t.fuego.body}
            </p>

            <div className="flex flex-col gap-8">
              {maderas.map((m: any) => (
                <div
                  key={m.nombre}
                  className="border-t border-deep-forest/20 pt-6"
                >
                  <h3 className="font-sweetsanstext font-bold text-subheading text-forest-shadow">
                    {m.nombre}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="eyebrow !mb-1 text-deep-forest">
                        {rotulos.origen}
                      </p>
                      <p className="font-sweetsanstext text-body-sm text-forest-shadow">
                        {m.origen}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow !mb-1 text-deep-forest">
                        {rotulos.temperatura}
                      </p>
                      <p className="font-sweetsanstext text-body-sm text-forest-shadow">
                        {m.t} °C
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 font-sweetsanstext text-body text-forest-shadow italic">
                    {m.uso}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Full-bleed Photograph */}
          <div className="w-full h-full min-h-[400px]">
            <img
              src="/images/carta/cerdo.jpg"
              alt="Wood and Fire"
              className="w-full h-full object-cover rounded-images"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
