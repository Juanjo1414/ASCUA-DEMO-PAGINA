/**
 * Sección de contacto y "reserva" de la landing, sobre hoja de porcelana:
 * datos reales del restaurante (dirección, horario, cómo llegar) y un
 * formulario que no envía nada a ningún backend, sino que arma un enlace de
 * WhatsApp prellenado (`buildReservationLink`).
 *
 * Lo usa `RestaurantPage`. Al tocar "Reservar" en `Reserva.tsx` se dispara
 * el evento `ascua:reservar`, que este componente escucha para precargar el
 * mensaje y enfocar el primer campo.
 */
import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { buildReservationLink } from '@/application/use-cases/buildReservationLink'

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
    `min-h-12 w-full rounded-xl border-2 bg-white px-4 py-3 text-body text-tinta placeholder:text-tinta-soft/70 transition-colors focus:border-tinta focus:outline-none ${
      errors[field] ? 'border-error' : 'border-linea'
    }`

  const FILAS = [{ id: 'name', type: 'text', autoComplete: 'name' }]

  return (
    <section id="contacto" className="seccion bg-porcelana text-tinta">
      <div className="pagina grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 className="mb-5 text-h2">{t.contact.title}</h2>
          <p className="mb-10 max-w-[40ch] text-lead text-tinta-soft">
            {t.contact.body}
          </p>

          <dl className="grid gap-8 border-t-2 border-linea pt-8 sm:grid-cols-2 lg:grid-cols-1">
            {restaurant?.contacto?.direccion && (
              <div>
                <dt className="mb-1 font-bold">{t.contact.addressTitle}</dt>
                <dd className="text-lead text-tinta-soft">
                  {restaurant.contacto.direccion}
                </dd>
              </div>
            )}
            {restaurant?.contacto?.horario &&
              restaurant.contacto.horario.length > 0 && (
                <div>
                  <dt className="mb-1 font-bold">{t.contact.hoursTitle}</dt>
                  {restaurant.contacto.horario.map((linea, index) => (
                    <dd
                      key={index}
                      className="cifras text-lead text-tinta-soft"
                    >
                      {linea}
                    </dd>
                  ))}
                </div>
              )}
          </dl>

          {restaurant?.contacto?.mapsUrl && (
            <a
              href={restaurant.contacto.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8 w-full sm:w-auto"
            >
              {t.contact.directions}
            </a>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6 rounded-card bg-porcelana-dim p-6 sm:p-8 lg:col-span-6 lg:col-start-7"
        >
          {FILAS.map(({ id, type, autoComplete }) => {
            const typedId = id as 'name'
            return (
              <div key={id}>
                <label htmlFor={id} className="mb-2 block font-bold">
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
                  <p
                    id={`${id}-error`}
                    className="mt-2 text-small font-bold text-error"
                  >
                    {errors[id]}
                  </p>
                )}
              </div>
            )
          })}

          <div>
            <label htmlFor="message" className="mb-2 block font-bold">
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
              <p
                id="message-error"
                className="mt-2 text-small font-bold text-error"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button type="submit" className="btn-primary w-full">
              {t.contact.send}
              <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>

            <div aria-live="polite" className="text-small">
              {Object.keys(errors).length > 0 && (
                <p className="flex items-center gap-2 font-bold text-error">
                  <AlertCircle
                    size={18}
                    strokeWidth={2.25}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  {t.contact.error}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
