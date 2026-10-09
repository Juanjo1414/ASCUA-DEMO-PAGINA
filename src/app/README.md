# `app/`

El único lugar donde se conectan todas las capas.

- `compositionRoot.ts` — instancia los adaptadores reales de
  `infrastructure/` y arma el objeto `AppDependencies` que
  `DependenciesProvider` inyecta en toda la app (`src/main.tsx`). Si vas a
  agregar un adaptador nuevo, este es el único archivo donde debe
  aparecer un `new Algo()` de `infrastructure/`.
- `router.tsx` — mapa de rutas (`/`, `/r/:slug`, `/r/:slug/qr`,
  `/expirado`, `*`). Cada restaurante va envuelto en `LanguageProvider`.

`src/main.tsx` (en la raíz de `src/`, no dentro de esta carpeta, por
convención de Vite) es quien realmente arranca React, con
`DependenciesProvider dependencies={compositionRoot}` envolviendo el
`router`.
