/**
 * Página de respaldo (`*`) para cualquier ruta no reconocida por el router.
 * Le dice al comensal qué hacer en palabras simples (revisar el enlace o
 * volver a escanear el QR), sin códigos técnicos.
 */
export const NotFoundPage = () => (
  <main
    data-superficie="mantel"
    className="tema flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-mantel px-6 text-center text-on-mantel"
  >
    <h1 className="text-h2">Página no encontrada</h1>
    <p className="max-w-[36ch] text-lead text-on-mantel-soft">
      Revisa el enlace o escanea de nuevo el QR de tu mesa.
    </p>
  </main>
)
