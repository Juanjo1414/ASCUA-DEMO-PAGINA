import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/LanguageContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/*
  Después del fuego, la calma: carbón, un formulario de libreta y el mapa.

  Los campos no son cajas redondeadas: son una línea sobre la que se escribe,
  como la comanda. La línea se enciende en brasa al escribir y en el acento si
  hay un error. La lógica del envío es la de siempre: valida y simula la respuesta.
*/
export default function Contacto() {
  const { t } = useLanguage()
  const scope = useReveal({ y: 20 })
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const primerCampo = useRef(null)

  // El botón de la reserva no manda a un formulario en blanco: deja escrito el
  // pedido de mesa para completar y pone el cursor en el nombre.
  useEffect(() => {
    const alReservar = () => {
      setValues((v) => (v.message ? v : { ...v, message: t.contact.reservaPrefill }))
      window.setTimeout(() => primerCampo.current?.focus({ preventScroll: true }), 700)
    }
    window.addEventListener('ascua:reservar', alReservar)
    return () => window.removeEventListener('ascua:reservar', alReservar)
  }, [t])

  const validate = (v) => {
    const next = {}
    if (!v.name.trim()) next.name = t.contact.errors.name
    if (!EMAIL_RE.test(v.email.trim())) next.email = t.contact.errors.email
    if (v.message.trim().length < 10) next.message = t.contact.errors.message
    return next
  }

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }
    setStatus('sending')
    window.setTimeout(() => {
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    }, 900)
  }

  const campo = (field) =>
    `w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-loza placeholder:text-ceniza/70 transition-colors focus:outline-none focus:ring-0 ${
      errors[field] ? 'border-acento' : 'border-loza/25 focus:border-brasa'
    }`

  const FILAS = [
    { id: 'name', type: 'text', autoComplete: 'name' },
    { id: 'email', type: 'email', autoComplete: 'email' },
  ]

  return (
    <section
      id="contacto"
      ref={scope}
      data-calor="1100,300"
      data-llama="0"
      className="relative py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-content gap-16 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="reveal-item lg:col-span-5">
          <h2 className="font-display text-[clamp(2.6rem,5vw,4.6rem)] font-medium">{t.contact.title}</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ceniza">{t.contact.body}</p>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="rotulo text-ceniza">{t.contact.addressTitle}</dt>
              <dd className="mt-2 font-display text-2xl">Calle 10 #45-20, local 3</dd>
              <dd className="text-ceniza">Medellín</dd>
            </div>
            <div>
              <dt className="rotulo text-ceniza">{t.contact.hoursTitle}</dt>
              <dd className="mt-2 font-display text-2xl">{t.contact.hours}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} noValidate className="reveal-item lg:col-span-6 lg:col-start-7">
          <div className="space-y-9">
            {FILAS.map(({ id, type, autoComplete }) => (
              <div key={id}>
                <label htmlFor={id} className="rotulo block text-ceniza">
                  {t.contact[id]}
                </label>
                <input
                  ref={id === 'name' ? primerCampo : undefined}
                  id={id}
                  type={type}
                  autoComplete={autoComplete}
                  value={values[id]}
                  onChange={handleChange(id)}
                  placeholder={t.contact[`${id}Placeholder`]}
                  className={campo(id)}
                  aria-invalid={Boolean(errors[id])}
                  aria-describedby={errors[id] ? `${id}-error` : undefined}
                />
                {errors[id] && (
                  <p id={`${id}-error`} className="mt-2 text-sm text-acento">
                    {errors[id]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="rotulo block text-ceniza">
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
                <p id="message-error" className="mt-2 text-sm text-acento">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={status === 'sending'} className="boton w-full sm:w-auto">
              {status === 'sending' ? t.contact.sending : t.contact.send}
              {status !== 'sending' && <ArrowRight size={16} strokeWidth={2} />}
            </button>

            <div aria-live="polite" className="text-sm">
              {status === 'success' && (
                <p className="flex items-center gap-2 text-acento">
                  <CheckCircle2 size={16} strokeWidth={2} className="shrink-0" />
                  {t.contact.success}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-acento">
                  <AlertCircle size={16} strokeWidth={2} className="shrink-0" />
                  {t.contact.error}
                </p>
              )}
            </div>
          </div>
        </form>

        <div className="reveal-item lg:col-span-12">
          <div className="aspect-[4/3] overflow-hidden sm:aspect-[21/8]">
            <iframe
              title="Ubicación de Ascua"
              src="https://www.google.com/maps?q=Calle%2010%20%2345-20%2C%20Medell%C3%ADn&output=embed"
              className="mapa h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
