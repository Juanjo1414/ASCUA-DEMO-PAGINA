# `presentation/`

Todo lo que es React: páginas, componentes, hooks, estado de UI, idioma y
tema. Importa `application/` y `domain/`; **nunca** `infrastructure/`
directamente (`arch:check` lo bloquea) — las implementaciones concretas
llegan vía `useDependencies()`, inyectadas desde
`app/compositionRoot.ts`.

## Carpetas

- `pages/` — una por ruta del router: `RestaurantPage` (la carta),
  `LandingPage` (`/`, nunca lista restaurantes), `QrPage`, `NotFoundPage`,
  `ExpiredPage`.
- `components/` — secciones de la carta (`Hero`, `Nav`, `Menu`, `Reserva`,
  `Contacto`, `Pie`, `FranjaReserva`, `DemoPanel`, `FloatingHelp`,
  `LoadingScreen`) y el flujo de AR (`ArGuideModal`, `ArDishModal`,
  `ArViewer`, `components/ar/InAppBrowserNotice`,
  `components/menu/DishCard`).
- `hooks/` — `useRestaurant` (carga el restaurante activo según el slug
  de la URL y redirige a 404/expirado si aplica).
- `i18n/` — `LanguageProvider`/`useLanguage`/`translations.ts` (es/en).
- `state/` — `DependenciesContext` (inyección de dependencias vía React
  Context) y `restaurantStore.ts` (átomo de jotai con el restaurante
  activo, el único punto de verdad en la UI para esos datos).
- `theme/` — `tokens.css`: los tokens de diseño (colores, tipografías)
  que traduce `docs/DESIGN.md`. Prohibido un color o fuente "quemada" en
  un componente: todo sale de aquí.
- `effects/` — configuración única de GSAP/ScrollTrigger para toda la
  app.

## Cómo llegan las dependencias

Ningún componente crea un `new QuickLookLauncher()` ni llama
`window.localStorage` directo. Todo pasa por
`const { algo } = useDependencies()`, que lee del contexto que llena
`main.tsx` con `compositionRoot` (real) o que llenan las pruebas con
dobles en memoria (`tests/unit/presentation/renderWithProviders.tsx`).

## Ver el recorrido completo de un caso real

`docs/ARQUITECTURA.md` explica, archivo por archivo, qué pasa cuando el
comensal toca "Ver en mi mesa".
