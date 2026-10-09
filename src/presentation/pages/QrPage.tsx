/**
 * Página pública con el QR imprimible del restaurante (`/r/:slug/qr`), para
 * que Juan o el restaurante lo pongan en la mesa física.
 *
 * No usa `useLanguage` (sus textos están en español fijo a propósito: es
 * material impreso para el restaurante, no la carta que ve el comensal),
 * así que no necesita estar envuelta en `LanguageProvider`.
 */
import { useParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import QRCode from 'react-qr-code'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { useRestaurant } from '@/presentation/hooks/useRestaurant'
import { pickReadableTextColor } from '@/domain/theme'

export const QrPage = () => {
  const { slug } = useParams()
  const { isLoading, error } = useRestaurant(slug)
  const restaurant = useAtomValue(restaurantAtom)

  if (isLoading)
    return <div className="p-8 text-center font-sans">Cargando...</div>
  if (error || !restaurant)
    return (
      <div className="p-8 text-center font-sans text-red-600">
        Error: {error}
      </div>
    )

  const url = `${window.location.origin}/r/${slug}`

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 print:p-0 print:bg-white"
      data-font-pair={restaurant.tema.parTipografico}
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl print:border-none print:shadow-none print:max-w-none">
        {restaurant.tema.logo && (
          <img
            src={restaurant.tema.logo}
            alt={`Logo de ${restaurant.nombre}`}
            className="mx-auto mb-6 h-20 object-contain print:h-24"
          />
        )}
        <h1
          className="font-display mb-2 text-3xl font-bold print:text-4xl"
          style={{ color: restaurant.tema.primario }}
        >
          {restaurant.nombre}
        </h1>
        <p className="mb-8 font-sans text-lg text-gray-600">
          Escanea para ver nuestro menú en 3D
        </p>

        <div className="mx-auto flex aspect-square w-64 items-center justify-center rounded-xl bg-white p-4">
          <QRCode
            value={url}
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            viewBox={`0 0 256 256`}
            fgColor={restaurant.tema.primario}
          />
        </div>

        <div className="mt-8 font-sans text-sm text-gray-500 print:hidden">
          <p>Esta es la página pública para descargar e imprimir tu QR.</p>
          <button
            onClick={() => window.print()}
            className="mt-6 rounded-full px-8 py-3 font-medium transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: restaurant.tema.primario,
              color: pickReadableTextColor(restaurant.tema.primario).color,
            }}
          >
            Imprimir
          </button>
        </div>
      </div>
    </div>
  )
}
