# `infrastructure/`

Los adaptadores concretos: cada archivo aquí implementa un puerto de
`application/ports/` usando una tecnología real (DOM, `fetch`,
`localStorage`, `navigator`). Importa `application/` y `domain/`, nunca
`presentation/`.

## `ar/` — zona sensible (CLAUDE.md §0.2)

- `QuickLookLauncher.ts` — abre AR Quick Look en iPhone (`<a rel="ar">`
  con una `<img>` hija obligatoria y `#allowsContentScaling=0` para fijar
  la escala real).
- `SceneViewerLauncher.ts` — abre Scene Viewer en Android vía `intent://`,
  con `resizable=false` y `S.browser_fallback_url` para no dejar al
  comensal en una pantalla en blanco si falta la app de Google.
- `ModelViewerFallbackLauncher.ts` — valida que el plato tenga `.glb` para
  el visor en pantalla (lo dibuja `presentation/components/ArViewer.tsx`,
  no este lanzador).
- `CompositeArLauncher.ts` — elige cuál de los tres usar según el modo que
  ya decidió `domain/ar.ts`. Deliberadamente no hace `await` antes de
  delegar: el lanzamiento tiene que ocurrir dentro del mismo gesto táctil
  del comensal, o iOS/Android lo bloquean.

Cualquier cambio aquí necesita pruebas de contrato (verifican los
atributos exactos, no solo éxito/error) y el QA manual de
`docs/runbooks/qa-dispositivos.md` antes de mergear a `main`.

## `browser/`

- `BrowserEnvironmentDetector.ts` — lee `navigator.userAgent` para
  reportar iOS/Android, Safari/Chrome y si está dentro de un navegador
  embebido (Instagram, WhatsApp, TikTok...). No decide nada: solo reporta
  lo que detecta.

## `content/`

- `StaticJsonRestaurantRepository.ts` — lee `/data/<slug>/restaurant.json`
  (lo publica `scripts/build-content.ts`), valida el slug contra
  `RESTAURANT_SLUG_REGEX` antes de pedir nada, y valida la respuesta con
  zod antes de devolverla.

## `storage/`

- `safeLocalStorage.ts` — envuelve `window.localStorage` en try/catch
  (Safari en modo privado puede lanzar). Nadie debe llamar
  `window.localStorage` directo fuera de aquí.
- `LocalStorageSoldOutStore.ts`, `LocalStorageUiPreferencesStore.ts` —
  implementaciones de sus puertos sobre `safeLocalStorage`.

## `analytics/`

- `CloudflareAnalyticsTracker.ts` — reenvía eventos a Zaraz/Cloudflare
  Web Analytics si ya cargó en la página (ver ADR 0004).
- `NoopAnalyticsTracker.ts` — no hace nada; lo usan las pruebas y
  entornos sin analítica real.
