import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/app/store'
import { buildReservationLink } from '../application/use-cases/buildReservationLink'

export default function Contacto() {
  const { t, lang } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)
  const [values, setValues] = useState({ name: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const primerCampo = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const alReservar = () => {
      setValues((v) =>
        v.message ? v : { ...v, message: t.contact.reservaPrefill }
      )
      window.setTimeout(
        () => primerCampo.current?.focus({ preventScroll: true }),
        700
      )
    }
    window.addEventListener('ascua:reservar', alReservar)
    return () => window.removeEventListener('ascua:reservar', alReservar)
  }, [t])

  const validate = (v: typeof values) => {
    const next: Record<string, string> = {}
    if (!v.name.trim()) next.name = t.contact.errors.name
    if (v.message.trim().length < 10) next.message = t.contact.errors.message
    return next
  }

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    if (restaurant) {
      const comentarios = `Nombre: ${values.name}\n${values.message}`
      const link = buildReservationLink({
        restaurant,
        comentarios,
        lang,
      })
      window.open(link, '_blank', 'noopener,noreferrer')
      setValues({ name: '', message: '' })
    }
  }

  const campo = (field: string) =>
    `w-full border-0 border-b bg-transparent px-0 py-3 font-body text-[18px] text-forest-shadow placeholder:text-forest-shadow/50 transition-colors focus:outline-none focus:ring-0 ${
      errors[field]
        ? 'border-red-500'
        : 'border-deep-forest/20 focus:border-deep-forest'
    }`

  const FILAS = [{ id: 'name', type: 'text', autoComplete: 'name' }]

  return (
    <section id="contacto" className="bg-cream-canvas py-24 md:py-36">
      <div className="mx-auto grid max-w-page gap-16 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <h2 className="font-display text-display-sm md:text-display text-forest-shadow mb-6">
            {t.contact.title}
          </h2>
          <p className="max-w-[40ch] font-body text-body text-forest-shadow/80 mb-12">
            {t.contact.body}
          </p>

          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 border-t border-deep-forest/20 pt-8">
            {restaurant?.contacto?.direccion && (
              <div>
                <dt className="eyebrow text-deep-forest mb-2">
                  {t.contact.addressTitle}
                </dt>
                <dd className="font-body text-[18px] text-forest-shadow">
                  {restaurant.contacto.direccion}
                </dd>
              </div>
            )}
            {restaurant?.contacto?.horario &&
              restaurant.contacto.horario.length > 0 && (
                <div>
                  <dt className="eyebrow text-deep-forest mb-2">
                    {t.contact.hoursTitle}
                  </dt>
                  {restaurant.contacto.horario.map((linea, index) => (
                    <dd
                      key={index}
                      className="font-body text-[18px] text-forest-shadow"
                    >
                      {linea}
                    </dd>
                  ))}
                </div>
              )}
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-6 lg:col-start-7"
        >
          <div className="space-y-9">
            {FILAS.map(({ id, type, autoComplete }) => {
              const typedId = id as 'name'
              return (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="eyebrow block text-deep-forest mb-2"
                  >
                    {t.contact[typedId] as string}
                  </label>
                  <input
                    ref={id === 'name' ? primerCampo : undefined}
                    id={id}
                    type={type}
                    autoComplete={autoComplete}
                    value={values[typedId]}
                    onChange={handleChange(id)}
                    placeholder={
                      t.contact[
                        `${typedId}Placeholder` as keyof typeof t.contact
                      ] as string
                    }
                    className={campo(id)}
                    aria-invalid={Boolean(errors[id])}
                    aria-describedby={errors[id] ? `${id}-error` : undefined}
                  />
                  {errors[id] && (
                    <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
                      {errors[id]}
                    </p>
                  )}
                </div>
              )
            })}

            <div>
              <label
                htmlFor="message"
                className="eyebrow block text-deep-forest mb-2"
              >
                {t.contact.message}
              </label>
              <textarea
                id="message"
                rows={4}
                value={values.message}
                onChange={handleChange('message')}
                placeholder={t.contact.messagePlaceholder}
                className={`${campo('message')} resize-none`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-red-500">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="btn-primary w-full sm:w-auto">
              {t.contact.send}
              <ArrowRight size={16} strokeWidth={2} />
            </button>

            <div aria-live="polite" className="text-sm">
              {Object.keys(errors).length > 0 && (
                <p className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={16} strokeWidth={2} className="shrink-0" />
                  {t.contact.error}
                </p>
              )}
            </div>
          </div>
        </form>

        {restaurant?.contacto?.mapsUrl && (
          <div className="lg:col-span-12 mt-8 flex justify-center lg:justify-start">
            <a
              href={restaurant.contacto.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto text-center"
            >
              Cómo llegar
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
