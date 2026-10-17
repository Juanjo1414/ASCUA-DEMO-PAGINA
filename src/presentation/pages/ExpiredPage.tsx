/**
 * Página que ve el comensal cuando la demo comercial de un restaurante ya
 * pasó su fecha `expira`. `useRestaurant` redirige aquí en vez de mostrar
 * la carta vencida. Está fuera de `RestaurantPage`, así que usa el mantel por
 * defecto de Ascua y textos fijos en español.
 */
export const ExpiredPage = () => (
  <main
    data-superficie="mantel"
    className="tema flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-mantel px-6 text-center text-on-mantel"
  >
    <h1 className="text-h2">Demo finalizada</h1>
    <p className="max-w-[36ch] text-lead text-on-mantel-soft">
      Esta carta ya no está disponible. Si quieres verla de nuevo, pídele el
      enlace al restaurante.
    </p>
  </main>
)
