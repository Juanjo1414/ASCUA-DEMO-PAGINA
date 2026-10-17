/**
 * Página raíz (`/`): presenta Ascua a quien llega sin un enlace de
 * restaurante (normalmente, el dueño de un local al que PITS le comparte la
 * dirección) y lo lleva a la demo genérica.
 *
 * A propósito no lista restaurantes (regla de CLAUDE.md: "nunca listes
 * restaurantes en /"); solo enlaza la demo propia de PITS
 * (`DEMO_RESTAURANT_SLUG`). Sus textos están en español fijo porque la
 * audiencia son dueños de restaurantes de Colombia y esta ruta no está
 * dentro de `LanguageProvider`. No inventa cifras, clientes ni precios.
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DEMO_RESTAURANT_SLUG } from '@/shared/config'

const PASOS = [
  {
    titulo: 'Escanea el QR de la mesa',
    detalle:
      'La carta se abre en el navegador del celular. No hay nada que instalar.',
  },
  {
    titulo: 'Toca "Ver en mi mesa"',
    detalle: 'Una guía de tres pasos explica cómo abrir la cámara.',
  },
  {
    titulo: 'Mueve el celular despacio',
    detalle:
      'El plato aparece sobre tu mesa, en su tamaño real, para verlo desde todos los lados.',
  },
]

export const LandingPage = () => (
  <div
    data-font-pair="editorial"
    className="tema min-h-[100dvh] bg-porcelana text-tinta"
  >
    <header data-superficie="mantel" className="bg-mantel text-on-mantel">
      <div className="pagina flex h-16 items-center">
        <span className="font-display text-h3 font-bold">Ascua</span>
      </div>
    </header>

    <main>
      <section
        data-superficie="mantel"
        className="bg-mantel pb-16 text-on-mantel md:pb-24"
      >
        <div className="pagina grid items-center gap-12 md:grid-cols-12">
          <div className="pt-6 md:col-span-7 md:pt-12">
            <h1 className="text-display">
              Mira el plato sobre tu mesa antes de pedirlo.
            </h1>
            <p className="mt-8 max-w-[46ch] text-lead text-on-mantel-soft">
              Ascua convierte la carta de tu restaurante en platos en 3D y
              realidad aumentada. El comensal escanea un QR y ve cada plato en
              su tamaño real, desde su propio celular.
            </p>
            <Link
              to={`/r/${DEMO_RESTAURANT_SLUG}`}
              className="btn-porcelana mt-10"
            >
              Ver la demo
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <div className="md:col-span-5">
            <img
              src="/landing/plato.webp"
              alt="Plato de filete con puré, espárragos y zanahorias, visto desde arriba"
              width={720}
              height={720}
              className="mx-auto aspect-square w-full max-w-[420px] rounded-full object-cover shadow-plato"
            />
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="pagina">
          <h2 className="max-w-[18ch] text-h2">
            Así lo vive quien se sienta a comer.
          </h2>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {PASOS.map((paso, indice) => (
              <li key={paso.titulo} className="border-t-2 border-tinta pt-6">
                <span
                  className="cifras font-display text-h2"
                  aria-hidden="true"
                >
                  {indice + 1}
                </span>
                <h3 className="mt-4 text-h3">{paso.titulo}</h3>
                <p className="mt-3 max-w-[34ch] text-tinta-soft">
                  {paso.detalle}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>

    <footer data-superficie="mantel" className="bg-mantel py-10 text-on-mantel">
      <div className="pagina flex flex-col gap-2 text-small md:flex-row md:justify-between">
        <p>Hecho por PITS · Ascua</p>
        <p className="text-on-mantel-soft">
          Sin cookies de rastreo ni datos personales de quienes ven la carta.
        </p>
      </div>
    </footer>
  </div>
)
