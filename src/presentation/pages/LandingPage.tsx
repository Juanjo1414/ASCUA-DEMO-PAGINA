/**
 * Página raíz (`/`). A propósito no lista ningún restaurante (regla de
 * CLAUDE.md: "nunca listes restaurantes en /"); cada restaurante solo es
 * accesible por su enlace directo `/r/<slug>`.
 */
export const LandingPage = () => (
  <div className="p-8 text-center">
    <h1>Ascua Menu AR</h1>
    <p>Selecciona un restaurante.</p>
  </div>
)
