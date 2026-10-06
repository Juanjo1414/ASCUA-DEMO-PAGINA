import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/app/store'

/*
  El pie cierra con el nombre a todo lo ancho, cortado por el borde de abajo
  como una brasa que queda bajo la ceniza: se ve la mitad de arriba, encendida.
*/
export default function Pie() {
  const { t } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)
  const anio = new Date().getFullYear()

  const feedbackLink = restaurant
    ? `https://tally.so/r/n0q1L7?slug=${restaurant.slug}`
    : 'https://tally.so/r/n0q1L7'

  return (
    <footer
      data-pie-pagina
      data-calor="300,180"
      data-llama="0"
      className="relative overflow-hidden border-t border-loza/10 pt-16"
    >
      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-[28ch] font-display text-2xl italic">
              {t.footer.tagline}
            </p>
          </div>
          <div className="text-ceniza md:col-span-4">
            <p className="text-loza">Calle 10 #45-20, local 3, Medellín</p>
            <p className="mt-1">{t.contact.hours}</p>
          </div>
          <div className="flex items-start justify-between gap-6 md:col-span-3 md:flex-col md:items-end">
            <a
              href={feedbackLink}
              target="_blank"
              rel="noreferrer"
              className="rotulo underline decoration-brasa decoration-2 underline-offset-[6px] transition-colors hover:text-acento"
            >
              {t.footer.feedback}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rotulo transition-colors hover:text-acento"
            >
              Instagram
            </a>
            <a
              href="#top"
              className="rotulo inline-flex items-center gap-2 transition-colors hover:text-acento mt-2"
            >
              {t.backToTop}
              <ArrowUp size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-ceniza">
          <p>
            © {anio} {restaurant?.nombre || 'Ascua'}. {t.footer.rights}{' '}
            {t.footer.privacy}
          </p>
          <p>{t.footer.madeBy}</p>
        </div>
      </div>

      <div aria-hidden="true" className="mt-10 h-[13vw] overflow-hidden">
        <p className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[25vw] font-medium uppercase leading-[1] tracking-[0.06em] text-brasa">
          Ascua
        </p>
      </div>
    </footer>
  )
}
