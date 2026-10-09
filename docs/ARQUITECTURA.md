# Arquitectura — recorrido de "Ver en mi mesa"

> Este documento explica, archivo por archivo, qué pasa cuando un comensal
> toca el botón "Ver en mi mesa" en la carta. Es el caso de uso que más
> capas atraviesa, así que sirve como mapa general de cómo se comunican
> `domain/`, `application/`, `infrastructure/` y `presentation/`. Para una
> vista estática de qué vive en cada capa, lee primero el `README.md` de
> cada una (`src/domain/README.md`, `src/application/README.md`,
> `src/infrastructure/README.md`, `src/presentation/README.md`,
> `src/app/README.md`).

## Mapa de capas (regla de dependencias que vigila `arch:check`)

```
presentation/  →  application/  →  domain/
      ↑                               ↑
infrastructure/ ───────────────────────┘
      ↑
   app/ (compositionRoot.ts instancia infrastructure/ y lo inyecta en presentation/)
```

`domain/` no depende de nada. `application/` solo de `domain/`.
`infrastructure/` implementa los puertos de `application/`.
`presentation/` solo conoce `application/` y `domain/` — nunca importa
`infrastructure/` directo; recibe los adaptadores reales a través de
`useDependencies()`.

## Paso a paso

### 1. El comensal toca "Ver en mi mesa"

**Archivo:** `src/presentation/components/menu/DishCard.tsx`

El botón solo existe si `dish.modelo && dish.modelo.aprobado` es `true`
(un modelo sin aprobar no tiene botón, no un error). Al tocarlo, llama a
`onArClick(dish)`, una prop que le pasó `Menu.tsx`.

### 2. ¿Ya vio la guía en este dispositivo?

**Archivo:** `src/presentation/components/Menu.tsx` → `handleArClick`

Lee `uiPreferencesStore.get('ascua:ar-guide-seen')` (el puerto
`UiPreferencesStore`, inyectado vía `useDependencies()`). Si no lo ha
visto (o si es un "replay" desde el botón fijo "¿Cómo funciona?"), abre
`ArGuideModal` con ese plato. Si ya lo vio, salta directo al paso 4
(`abrirAr(dish)`).

### 3. La guía de 3 pasos

**Archivo:** `src/presentation/components/ArGuideModal.tsx`

Muestra "Apunta a tu mesa" → "Mueve el celular despacio" → "Acércate o
camina alrededor" (el texto exacto que exige `CLAUDE.md`). El botón
"Entendido, abrir cámara" es el gesto que:

1. Si no es un replay, marca `uiPreferencesStore.set('ascua:ar-guide-seen', '1')`
   — así la próxima vez no vuelve a aparecer.
2. Llama a `onContinue()`, que en `Menu.tsx` ejecuta `abrirAr(dish)`.

Importante: este `click` es el **único** gesto táctil del usuario antes de
intentar abrir AR nativo. Todo lo que sigue tiene que pasar sin ningún
`await` de por medio, o iOS/Android bloquean el lanzamiento por no venir
"directo" de un toque.

### 4. Orquestar el lanzamiento (el primer cruce de capas)

**Archivo:** `src/presentation/components/Menu.tsx` → `abrirAr`

Llama al caso de uso `launchDishAr` (de `application/`), pasándole el
plato, el slug del restaurante y tres puertos ya resueltos por
`useDependencies()`: `environmentDetector`, `arLauncher`,
`analyticsTracker`. `Menu.tsx` no sabe qué dispositivo es ni qué
lanzador se va a usar — eso es trabajo de la capa de abajo.

### 5. Caso de uso: decidir y lanzar

**Archivo:** `src/application/use-cases/launchDishAr.ts`

1. `detector.getCapabilities()` — pide las capacidades del dispositivo
   al puerto `EnvironmentDetector`.
2. `selectArLaunchMode(capabilities, dish.modelo)` — **aquí se cruza a
   `domain/`**: es una función pura (`src/domain/ar.ts`) que, con esas
   capacidades y los archivos que tiene el plato, decide uno de cuatro
   modos: `unsupported`, `quick-look`, `scene-viewer` o
   `model-viewer-modal`. No toca el DOM ni nada externo; es 100 %
   testeable sin mocks de navegador.
3. Registra el intento en `analyticsTracker` (si existe).
4. Llama a `launcher.launch(dish, mode)` — el puerto `ArLauncher`.

### 6. ¿Qué dispositivo detectó, en realidad?

**Archivo:** `src/infrastructure/browser/BrowserEnvironmentDetector.ts`

Implementa `EnvironmentDetector` leyendo `navigator.userAgent` de verdad:
¿es iOS?, ¿es Android?, ¿está dentro de Instagram/WhatsApp/TikTok? No
decide nada de negocio — solo reporta hechos. La decisión de qué modo
usar ya la tomó `domain/ar.ts` en el paso anterior.

### 7. Elegir el lanzador concreto

**Archivo:** `src/infrastructure/ar/CompositeArLauncher.ts`

Recibe el `mode` ya decidido y busca en su mapa
`{ 'quick-look': ..., 'scene-viewer': ..., 'model-viewer-modal': ... }`
cuál lanzador concreto usar. Deliberadamente **no hace `await`** antes de
llamar al lanzador: así la llamada sigue ocurriendo dentro del mismo tick
del gesto original del comensal.

### 8a. iPhone — Quick Look

**Archivo:** `src/infrastructure/ar/QuickLookLauncher.ts`

Crea un `<a rel="ar" href="modelo.usdz#allowsContentScaling=0">` con una
`<img>` hija (sin ella, Safari descarga el archivo en vez de abrir la
cámara) y lo hace clic por código. iOS abre AR Quick Look con el plato
sobre la mesa, a su tamaño real y sin poder agrandarlo.

### 8b. Android — Scene Viewer

**Archivo:** `src/infrastructure/ar/SceneViewerLauncher.ts`

Construye una URL `intent://` con `resizable=false` (no agrandable, Ley 1480) y `S.browser_fallback_url` (si el teléfono no tiene la app de
Google, vuelve al navegador en vez de quedar en blanco), y navega a ella
con `window.location.href = intent`.

### 8c. Sin AR nativo — el visor en pantalla

**Archivo:** `src/infrastructure/ar/ModelViewerFallbackLauncher.ts`

Solo confirma que el plato tiene `.glb`. Quien realmente dibuja el modelo
es un componente de `presentation/`, no este lanzador:

- **Archivo:** `src/presentation/components/Menu.tsx` — cuando
  `launchDishAr` resuelve con `{ success: true, mode: 'model-viewer-modal' }`,
  hace `setActivo({ dish, mode: 'ar' })`.
- **Archivo:** `src/presentation/components/ArDishModal.tsx` — se abre
  como modal, muestra el disclaimer de Ley 1480 y, si el navegador está
  embebido (Instagram, WhatsApp...), el aviso con botón de copiar enlace
  (`src/presentation/components/ar/InAppBrowserNotice.tsx`).
- **Archivo:** `src/presentation/components/ArViewer.tsx` — carga
  `@google/model-viewer` con `import()` dinámico (es un chunk pesado) y,
  una vez listo, monta el `<model-viewer>` con el `.glb` del plato, a
  ~45° y con rotación lenta automática.

## De vuelta a React (o no)

En los casos 8a/8b, el sistema operativo toma el control por completo:
React no hace nada más hasta que el comensal cierra Quick Look/Scene
Viewer y vuelve al navegador, donde la carta sigue exactamente como
estaba. En el caso 8c, todo el flujo queda dentro de React/`presentation/`.

## Qué prueba cada capa de este flujo

- `domain/ar.ts` (`selectArLaunchMode`): pruebas unitarias puras, sin DOM.
- `application/use-cases/launchDishAr.ts`: pruebas con dobles en memoria
  de los tres puertos.
- `infrastructure/ar/*`: pruebas de contrato que verifican los atributos
  exactos (`rel="ar"`, `resizable=false`, etc. — ver
  `tests/unit/infrastructure/ar/arLaunchers.test.ts`).
- `presentation/components/Menu.tsx` y el resto de la UI: pruebas de
  componente con `tests/unit/presentation/renderWithProviders.tsx`.
- El flujo completo, de punta a punta en un navegador real (sin poder
  verificar el AR nativo en sí, por diseño): `tests/e2e/recorrido-comensal.spec.ts`.
- El AR real en un iPhone y un Android de verdad: QA manual, nunca
  automatizado — `docs/runbooks/qa-dispositivos.md`.
