/**
 * Pie de la landing, sobre el mantel: invitación a la encuesta de opinión,
 * dirección y horario, y un crédito discreto de Ascua/PITS (regla de marca de
 * CLAUDE.md: el protagonista es el restaurante, no el producto).
 *
 * Lo usa `RestaurantPage`. El enlace de opinión es el Google Form propio del
 * restaurante (`feedbackFormUrl`), cuyas respuestas ve su dueño; si todavía no
 * tiene uno, cae al formulario genérico de PITS con el slug como parámetro
 * para saber quién lo probó.
 */
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { FEEDBACK_URL } from '@/shared/config'

export default function Pie() {
  const { t } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)
  const anio = new Date().getFullYear()

  const feedbackLink =
    restaurant?.feedbackFormUrl ??
    (restaurant ? `${FEEDBACK_URL}?slug=${restaurant.slug}` : FEEDBACK_URL)

  return (
    <footer
      data-superficie="mantel"
      className="bg-mantel pb-24 pt-14 text-on-mantel md:pb-14"
    >
      <div className="pagina flex flex-col gap-12">
        <div className="flex flex-col gap-5 rounded-card bg-porcelana p-6 text-tinta sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-xl">
            <p className="font-display text-h3 font-bold">{t.survey.heading}</p>
            <p className="mt-1 text-tinta-soft">{t.survey.body}</p>
          </div>
          <a
            href={feedbackLink}
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0"
          >
            {t.footer.feedback}
            <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-h3 font-bold">
              {restaurant?.nombre ?? 'Ascua'}
            </p>
          </div>

          {(restaurant?.contacto?.direccion ||
            restaurant?.contacto?.horario?.length) && (
            <div className="text-on-mantel-soft md:col-span-4">
              {restaurant.contacto?.direccion && (
                <p>{restaurant.contacto.direccion}</p>
              )}
              {restaurant.contacto?.horario?.map((linea, index) => (
                <p key={index} className="cifras mt-1">
                  {linea}
                </p>
              ))}
            </div>
          )}

          <a
            href="#top"
            className="inline-flex min-h-12 items-center gap-2 font-bold underline decoration-2 underline-offset-4 md:col-span-3 md:justify-self-end"
          >
            {t.backToTop}
            <ArrowUp size={16} strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col gap-2 border-t border-on-mantel/20 pt-6 text-small text-on-mantel-soft md:flex-row md:justify-between">
          <p>
            © {anio} {restaurant?.nombre ?? 'Ascua'}. {t.footer.rights}{' '}
            {t.footer.privacy}
          </p>
          <p>{t.footer.madeBy}</p>
        </div>
      </div>
    </footer>
  )
}
