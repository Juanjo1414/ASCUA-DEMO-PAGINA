# Correcciones antes de continuar — ASCUA-DEMO-PAGINA

> **Revisión 2 · 6 de octubre de 2026** (rama `dev/Juanjo`, 34 commits, hasta `1f60754`). **Reemplaza por completo** a la revisión 1.
> **Para quién:** el agente que implemente las correcciones (Antigravity con Sonnet 5.5, o Claude Code) y Juan.
> **Cómo usarlo:** un **lote por sesión**, en orden. Cada tarea `C-xx` trae pasos y criterios de aceptación. Al terminar los 7 lotes, el proyecto queda listo para seguir con el QR imprimible (P-205), el contenido de la demo (P-601) y el lanzamiento (P-7xx).

---

## 1. Qué encontró la revisión

### ✅ Lo que está bien (no tocar)

- `npm run verify` **pasa completo**: lint sin errores, tipos, **77 pruebas**, reglas de capas (65 módulos, 0 violaciones), validación de contenido y build.
- La arquitectura por capas (`domain` / `application` / `infrastructure`), el validador de contenido, las pruebas de aislamiento y los flujos de `ci.yml` / `deploy.yml` están bien hechos.
- **Ya corregido desde la revisión 1:** Tailwind ahora escanea `.ts` y `.tsx` (las clases de los componentes nuevos ya salen en el CSS), el README profesional quedó instalado, y hay tokens de diseño y validación de contraste AA.
- `model-viewer` (1 MB) se carga **diferido**, solo al abrir el visor: bien para móvil. El JavaScript principal pesa 173 KB comprimido.
- La reserva por WhatsApp es real (`wa.me` con mensaje prellenado).

### 🔴 Problemas que impiden mostrarle esto a un restaurante real

**Evidencia:** rendericé la aplicación con un restaurante de prueba distinto, "Pizzería Test", con su propio logo, dirección, horario, color y plato. Resultado:

| Se esperaba                     | Lo que muestra hoy                                                                                  |
| :------------------------------ | :-------------------------------------------------------------------------------------------------- |
| Su nombre, logo y color         | Texto y marca de **Ascua** (el restaurante ficticio); el logo y el color del JSON **no se usan**    |
| Su dirección y horario          | "**Calle 10 #45-20, local 3, Medellín**" fija y su horario original; los del restaurante se ignoran |
| Su mapa                         | Un mapa de Google incrustado **con la dirección de Ascua**                                          |
| Su foto de portada y sus platos | Fotos de **platos de Ascua** (`/images/carta/filete.jpg`, vieiras, cerdo)                           |
| Su foto de plato                | Ruta **rota**: `assets/platos/p/foto.webp` (relativa, el navegador la busca en `/r/assets/…`)       |
| Su historia                     | Las secciones "El fuego", "Lo que arde" y "Voces" cuentan la historia inventada de Ascua            |

Es decir: **la demo todavía no es multi-restaurante en lo visible**. El esquema de datos sí lo es, pero la interfaz solo lee `nombre`, `slug` y `categorias`.

Además, `CLAUDE.md` prohíbe "inventar datos de restaurantes reales", y mostrar la dirección y la historia de otro restaurante en la página de un cliente real incumple esa regla.

### 🟠 Importantes

1. **El AR nuevo sigue sin conectarse:** `Menu.tsx` llama a `lib/launchAr.js` y `ArDishModal.tsx` a `lib/browserEnv.js`. Los adaptadores nuevos están probados pero no se usan. Para conectarlos faltan tres piezas: un lanzador compuesto (hoy hay una **lista** de lanzadores y el caso de uso espera **uno**), el visor de respaldo despacha un evento `open-model-viewer` que **nadie escucha**, y Scene Viewer necesita una URL **absoluta**.
2. **Marca y tipografías de un tercero:** `docs/DESIGN.md` es el estilo de _Sweetgreen_; el código usa `'SUNSHINE IN A SALAD'` y `'Fresh Food'` como textos de reserva (`HeroFuego.tsx`), tokens llamados `--font-sweetsans` / `grenette`, y esas fuentes propietarias **no están incluidas**, así que el sitio se ve con la fuente del sistema. Mientras tanto se cargan (y se precargan) las fuentes del diseño anterior, **Bodoni Moda y Archivo, que ya nadie usa**.
3. **El mapa de Google incrustado** es un `<iframe>` de un tercero: puede dejar cookies y rastreo, lo que contradice la promesa de "sin cookies" del README, y obligaría a abrir la política de contenido (CSP).
4. **Código muerto:** `Escena.jsx` (491 líneas), `lib/brasa.js`, `lib/calor.js`, `lib/carta.js` (con su prueba) y `hooks/useReveal.js` no los importa nadie.
5. **Tipado:** hay unos 19 `any` en los componentes (10 solo en `Menu.tsx`), contra la regla "prohibido `any`" de `CLAUDE.md`.
6. **La capa `presentation` no existe:** los componentes siguen en `src/components`, así que la regla de capas de la interfaz no vigila nada.
7. **Móvil:** falta `viewport-fit=cover` y `safe-area-inset` (la barra fija inferior de reservas queda tapada por el indicador de inicio del iPhone), los textos `alt` están en inglés y no describen ("Hero background", "Philosophy"), y casi no hay estilos de `:focus-visible`.
8. **Higiene:** `playwright-report/` y `test-results/` están versionados; `index.html` conserva el título, la descripción, el `theme-color` oscuro y el comentario del diseño anterior; 3 avisos de lint; la cobertura no mide `application` ni `infrastructure` y no tiene umbrales; `ESTADO.md` y el README tienen estados desactualizados; falta registrar jotai y el cambio de diseño en un ADR.
9. **Pruebas:** no hay pruebas de componentes y la suite E2E solo cubre el aislamiento (3 pruebas × 3 perfiles).

---

## 0. Reglas para el agente (léelas siempre)

1. Lee `CLAUDE.md`, `docs/ESTADO.md` y este documento. Confirma la rama: `git branch --show-current` debe ser `dev/Juanjo`; si no, **detente**.
2. **Un lote por sesión, una tarea `C-xx` a la vez.** Antes de editar escribe el plan de la tarea (archivos y cómo la verificarás) y **espera la aprobación de Juan**.
3. **Un commit por tarea:** `fix(C-12): descripción en español`.
4. Corre `npm run verify` después de **cada** tarea. Si falla dos veces seguidas, **detente y cuéntale a Juan qué viste**.
5. **No instales dependencias.** Si crees que hace falta una, pregunta.
6. **No hagas `git push`, no abras PR, no toques `main`.**
7. **No cambies nada fuera de la tarea.** Lo que descubras va a `docs/ESTADO.md` → "Pendientes detectados".
8. **No borres ni desactives pruebas** para que `verify` pase; no uses `.skip` ni bajes umbrales sin permiso.
9. **No inventes** rutas ni nombres: confírmalos con `grep` o `graphify query "<tema>"`.
10. Código nuevo: encabezado de archivo, explicación en español de cada función exportada y comentarios del _porqué_ (`CLAUDE.md` §4.1).
11. Cierra cada sesión con `npm run verify` en verde (y `npm run test:e2e` si tocaste la interfaz), `docs/ESTADO.md` al día, bitácora en `docs/sesiones/` y un resumen en lenguaje simple para Juan.

---

## Decisiones que necesita Juan antes de empezar

| #   | Decisión                                                                                                                                                                                          | Valor por defecto (si no dices nada)                                                   |
| :-- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------- |
| D-1 | ¿Quitar las secciones "Manifiesto", "Lo que arde" y "Voces" de la plantilla? Hablan solo de Ascua y el modelo de datos no las soporta. El catálogo vende "una página de una sección (plantilla)". | **Sí, quitarlas** (quedan en el historial de Git)                                      |
| D-2 | Tipografías abiertas (con licencia libre) para reemplazar las propietarias del diseño de referencia.                                                                                              | **DM Sans** (cuerpo y títulos) y **Fraunces** (acento editorial), alojadas en el sitio |
| D-3 | ¿Aprobar **jotai** como estado global? Se instaló sin tu permiso.                                                                                                                                 | **Aprobado** y documentado en un ADR                                                   |
| D-4 | ¿Pasar las 8 fotos de Ascua a una demo propia `ascua-demo`?                                                                                                                                       | **Sí** (C-20)                                                                          |

---

## Lote 1 — Limpieza y base (sin cambiar lo que se ve)

### C-01 · Archivos generados fuera del repositorio

1. Agrega al final de `.gitignore`:
   ```
   # Resultados de pruebas E2E (se generan solos)
   playwright-report/
   test-results/
   ```
2. `git rm -r --cached playwright-report test-results`.

**Aceptación:** `git status` no muestra esas carpetas después de `npm run test:e2e`.

### C-02 · Borrar el código muerto

1. **Antes de borrar**, comprueba que nadie los importa: `grep -rnE "Escena|lib/brasa|lib/calor|lib/carta|useReveal" src tests scripts`.
2. Borra: `src/components/Escena.jsx`, `src/lib/brasa.js`, `src/lib/calor.js`, `src/lib/carta.js`, `tests/unit/carta.test.ts`, `src/hooks/useReveal.js`. Conserva `src/lib/gsap.js` (lo usa `Menu.tsx`).
3. Si algún script de `package.json` o de `scripts/` (por ejemplo `scripts/carta.mjs`) solo servía a lo borrado, indícaselo a Juan en lugar de borrarlo.

**Aceptación:** `npm run verify` verde; la interfaz se ve igual.

### C-03 · Avisos de lint en cero

1. `Menu.tsx`: quita el import sin usar `Box`.
2. `ArGuideModal.tsx:23` y `DemoPanel.tsx:21`: llaman a `setState` dentro de un `useEffect`. Reemplaza por estado inicial calculado (`useState(() => …)`) o por valores derivados.
3. Cambia el script a `"lint": "oxlint --deny-warnings"` para que los avisos nuevos rompan el CI.

**Aceptación:** `npm run lint` sin avisos.

### C-04 · Sin `any`

1. Reemplaza los `any` de `Menu.tsx` (10), `ArGuideModal.tsx` (3), `Contacto.tsx` (2), `FloatingHelp.tsx`, `ArViewer.tsx` y los demás por los tipos del dominio (`Dish`, `Category`, `Restaurant`) y por tipos de eventos de React (`React.ChangeEvent<…>`, `React.FormEvent`).
2. Agrega a `.oxlintrc.json` la regla `typescript/no-explicit-any` como **error**.

**Aceptación:** `grep -rnE ": any|as any|<any>" src` sin resultados; `verify` verde.

### C-05 · `index.html` neutro y móvil

1. `<title>`: `Ascua — menú 3D y AR para restaurantes`; `description` genérica (el build ya inyecta la de cada restaurante en `dist/r/<slug>/index.html`).
2. `theme-color`: `#f4f3e7` (el fondo crema del diseño nuevo).
3. Viewport: `width=device-width, initial-scale=1.0, viewport-fit=cover`.
4. Quita las dos etiquetas `<link rel="preload" … bodoni … archivo …>` y el comentario `impeccable:direction` (describe el diseño anterior).

**Aceptación:** `npm run build` correcto; la página sigue arrancando en `npm run dev`.

### C-06 · Marca de terceros fuera y tipografías propias

1. En `HeroFuego.tsx` quita los textos de reserva `'SUNSHINE IN A SALAD'` y `'Fresh Food'` (el hero se reescribe en C-16, pero no dejes copia ajena mientras tanto: usa cadenas vacías).
2. **Renombra los tokens con marca**, de forma mecánica, en `tokens.css`, `tailwind.config.js`, `index.css` y todos los componentes:

   | Antes                                                         | Después                                     |
   | :------------------------------------------------------------ | :------------------------------------------ |
   | `--font-sweetsans` / `font-sweetsans`                         | `--font-display` / `font-display`           |
   | `--font-sweetsanstext` / `font-sweetsanstext`                 | `--font-body` / `font-body`                 |
   | `--font-sweetsanstext-regular` / `font-sweetsanstext-regular` | `--font-body-regular` / `font-body-regular` |
   | `--font-grenette` / `font-grenette`                           | `--font-serif-accent` / `font-serif-accent` |

   Reescribe el comentario de `index.css` ("Sweetgreen-inspired design system") por uno neutro. Los **nombres de colores** (`cream-canvas`, `forest-shadow`, `lime-glow`…) se quedan.

3. **Tipografías abiertas (D-2):** adapta `scripts/fuentes.mjs` para descargar **DM Sans** y **Fraunces** (licencia libre) en lugar de Bodoni Moda y Archivo, regenera `src/fuentes.css` y `public/fonts/`, y borra los `.woff2` de Bodoni y Archivo. Define las pilas de `tokens.css` con esas fuentes y sus alternativas del sistema. _(El script descarga desde Internet: córrelo en tu computador.)_
4. En `docs/DESIGN.md` agrega arriba una nota: _"Referencia de estilo inspirada en un tercero. Del diseño se toman principios y proporciones; no se copian marcas, textos ni tipografías propietarias."_

**Aceptación:** `grep -rniE "sweetsans|grenette|sunshine|fresh food|bodoni|archivo" src tailwind.config.js index.html` sin resultados; `verify` verde; revisa a ojo el sitio con las fuentes nuevas.

### C-07 · `docs/ESTADO.md` corregido

Reescribe "Fase actual", "Tarea actual", "Último paso completado" y "Siguiente paso exacto":

- **Fase actual:** "Fase C — Correcciones (revisión 2)".
- Quita las menciones obsoletas (`FloatingHelp.jsx`, `ArGuideModal.jsx`, "se usó `scale="1 1 1"`" como si fuera la medida real).
- **Completadas con observaciones:** P-107 (store de jotai; falta `presentation/`), P-307 (solo escala fija; la medida real por plato depende de A-204 en el repo AR), P-403 (rediseño hecho; falta que los datos del restaurante gobiernen la página, ver C-12 a C-19).
- **Siguiente después de las correcciones:** P-205 (QR imprimible), P-601 (demo genérica con modelos 3D aprobados), P-701 a P-705.
- **Manuales pendientes de Juan:** X-006 (proteger `main`), X-007 (Cloudflare Pages), X-008 (CodeQL).

### C-08 · ADR 0002 y 0003

- `docs/adr/0002-estado-global-con-jotai.md`: contexto (compartir el restaurante cargado y el estado de "agotado"), decisión (jotai, **aprobada por Juan**), opciones (jotai · React Context · zustand, con tabla de complejidad / tamaño / riesgo), consecuencias.
- `docs/adr/0003-sistema-de-diseno.md`: se adoptó un sistema de diseño inspirado en una referencia externa, con tokens neutros y tipografías abiertas (C-06); cada restaurante solo sobrescribe color primario, par tipográfico y logo.

### C-09 · Cobertura que mide lo que dice

En `vitest.config.js`, dentro de `coverage`, agrega:

```js
include: ['src/domain/**', 'src/application/**', 'src/infrastructure/**'],
thresholds: { lines: 90, branches: 85, functions: 90, statements: 90 },
```

Corre `npm run test:coverage`. Si `application` o `infrastructure` quedan bajo el umbral (probables: los _trackers_ de analítica y `LocalStorageSoldOutStore`), **agrega pruebas**. Si llegar exige demasiadas, **no bajes el número: reporta las cifras a Juan.**

**Aceptación:** `npm run test:coverage` pasa con los umbrales.

---

## Lote 2 — Rutas de assets _(hoy las fotos y los modelos no cargan)_

**El problema:** el JSON guarda `"foto": "assets/platos/p/foto.webp"`; el build copia esos archivos a `dist/data/<slug>/…`, pero `StaticJsonRestaurantRepository` devuelve el JSON tal cual. Desde `/r/<slug>` el navegador resuelve esa ruta como `/r/assets/…`, que no existe. Se comprobó con el render de prueba. Además, Scene Viewer necesita una URL **absoluta**.

### C-10 · Rutas seguras y resueltas _(primero las pruebas)_

1. En `tests/unit/domain/restaurant.test.ts` agrega pruebas que fallen:
   - el esquema **rechaza** rutas de asset con `..`, con `\`, que empiecen por `/` o `//`, o que traigan esquema (`http:`, `javascript:`, `data:`);
   - una función pura `resolveAssetUrls(restaurant)` devuelve una **copia** donde `tema.logo`, cada `foto` y cada `modelo.glb` / `usdz` / `poster` pasan de `assets/x.webp` a `/data/<slug>/assets/x.webp`.
2. En `src/domain/restaurant.ts` agrega `assetPathSchema` (con esas reglas) y aplícalo a **todos** los campos de ruta, incluidos los nuevos de C-12. Agrega `resolveAssetUrls` (pura, sin `window`).
3. En `StaticJsonRestaurantRepository.getBySlug`, después de `safeParse` y antes de devolver, llama a `resolveAssetUrls`. Agrega su prueba en `StaticJsonRestaurantRepository.test.ts`.
4. `grep -rn "\.logo\|\.foto" src`: ningún componente debe armar rutas por su cuenta.

### C-11 · Scene Viewer con URL absoluta

En `SceneViewerLauncher.ts` convierte el GLB antes de armar el intent: `new URL(asset.glb, window.location.origin).href`. Prueba en `arLaunchers.test.ts`. **No cambies** `mode=ar_preferred`, `resizable=false`, `package=com.google.android.googlequicksearchbox` ni `S.browser_fallback_url`.

> **Nota de verificación del lote:** la prueba E2E definitiva de que las fotos y los modelos cargan se escribe en **C-21**. Aquí solo confirma a mano con `npm run build; npm run preview` y un restaurante temporal que la `foto` carga desde `/data/<slug>/assets/…`. **Borra ese restaurante temporal y no lo subas.**

---

## Lote 3 — Que la página sea realmente multi-restaurante 🔴

Este es el lote más importante. **Objetivo:** que todo lo visible salga del `restaurant.json` de cada restaurante, y que nada de Ascua aparezca en la página de otro.

### C-12 · Campos opcionales nuevos en el esquema

En `src/domain/restaurant.ts` agrega (todos **opcionales**, para no romper contenido existente):

- `eslogan`: texto por idioma (`{ es: string, en?: string }`).
- `heroImagen`: ruta de asset (usa `assetPathSchema`).

Actualiza: `content/restaurants/_plantilla/restaurant.json`, `docs/runbooks/nuevo-restaurante.md`, el validador (que el archivo de `heroImagen` exista y respete el peso), `scripts/build-content.ts` (descripción SEO a partir de `eslogan`) y las pruebas del esquema. En `restaurantAuthorizationSchema.medio` agrega `'propio'` (para el contenido de PITS, que no necesita autorización de un tercero).

### C-13 · El tema del restaurante se aplica

1. En `src/domain/theme.ts` agrega funciones **puras** (con pruebas):
   ```ts
   /** Luminancia relativa WCAG de un color #RGB o #RRGGBB. */
   export function relativeLuminance(hex: string): number { … }
   /** Razón de contraste WCAG entre dos colores. */
   export function contrastRatio(a: string, b: string): number { … }
   /**
    * Elige el color de texto (oscuro #0e150e o blanco #ffffff) que mejor se lee
    * sobre el color primario del restaurante, y devuelve su razón de contraste.
    */
   export function pickReadableTextColor(bg: string): { color: string; ratio: number } { … }
   ```
2. **El validador usa la misma función** (importa de `src/domain/theme`) en lugar de su copia: el color primario es válido si el **mejor** texto alcanza 4.5:1. Agrega pruebas con un color claro (`#e6ff55`), uno oscuro y un gris medio.
3. En la página del restaurante (`App.tsx`, luego `RestaurantPage`) aplica el tema en el contenedor raíz:
   ```tsx
   const { color: onPrimary } = pickReadableTextColor(restaurant.tema.primario)
   <div style={{ '--color-primary': restaurant.tema.primario, '--color-on-primary': onPrimary } as React.CSSProperties}>
   ```
4. Los estilos de botones y acentos leen esas variables, con el valor actual como respaldo: `background: var(--color-primary, var(--color-lime-glow)); color: var(--color-on-primary, var(--color-forest-shadow));`.

### C-14 · Par tipográfico real

1. En `src/domain/theme.ts` cambia `parTipografico` a `z.enum(['sans', 'editorial']).default('sans')` (se retiran `brasa` y `mono`, que eran del diseño anterior). Actualiza la plantilla y las pruebas.
2. En `tokens.css`: `[data-font-pair='editorial'] { --font-display: var(--font-serif-accent); }`. En el contenedor raíz pon `data-font-pair={restaurant.tema.parTipografico}`.

### C-15 · Logo y nombre

- `Nav`, `Pie` y `LoadingScreen` muestran el **logo** del restaurante (`tema.logo` ya resuelto por C-10) o, si no hay, su **nombre** en texto.
- `alt` del logo = nombre del restaurante. El `aria-label` de "inicio" pasa de `"Ascua, inicio"` a `"<nombre>, inicio"`.

### C-16 · Portada con los datos del restaurante

`HeroFuego` (renómbralo a `Hero`) usa:

- imagen: `restaurant.heroImagen`, y si no existe, la foto del primer plato; si tampoco, un fondo de color liso;
- `<h1>`: el **nombre** del restaurante; encima, el **eslogan** localizado (si existe);
- `alt` descriptivo (el nombre del restaurante), nunca "Hero background";
- sin ninguna imagen ni texto fijo.

### C-17 · Contacto con los datos del restaurante

En `Contacto.tsx`:

- **Dirección y horario** salen de `contacto.direccion` y `contacto.horario`; si faltan, ese bloque no se muestra.
- **Quita el `<iframe>` de Google Maps.** En su lugar, un botón **"Cómo llegar"** que abre `contacto.mapsUrl` (`target="_blank" rel="noopener noreferrer"`); si no hay `mapsUrl`, no se muestra.
- Quita las líneas fijas "Calle 10 #45-20, local 3" y "Medellín".
- La reserva por WhatsApp se queda.
- _Recomendado:_ quita el campo **correo** del formulario: nada lo usa, porque el mensaje sale por WhatsApp. Ajusta su validación y sus pruebas.

### C-18 · Secciones sin datos (decisión D-1)

Si Juan aprobó D-1: quita `Manifiesto`, `LoQueArde` y `Voces` de la página, del menú de navegación y de `translations.ts` (es y en). Antes de borrar, guarda su texto en `docs/historico/landing-ascua-original.md`. La página genérica queda: **Portada → Menú → Reserva → Contacto → Pie**.

### C-19 · Textos genéricos (i18n)

- `translations.ts` solo conserva textos de **interfaz**; ninguno habla de Ascua salvo el pie "Hecho por PITS · Ascua".
- Textos que hoy están fijos en español dentro de componentes (por ejemplo "Algo salió mal" y "Volver a intentar" en `App.tsx`) pasan a `translations.ts`.
- El idioma inicial y el selector de idioma salen de `restaurant.idiomas`: si solo hay uno, el selector no se muestra. Actualiza `document.documentElement.lang` al cambiar de idioma.
- La URL del formulario de feedback (`tally.so/r/n0q1L7`) pasa de estar fija en `Pie.tsx` a **una constante** única (`src/shared/config.ts`).

### C-20 · Demo genérica `ascua-demo` con las fotos que ya tienes (decisión D-4)

1. Crea `content/restaurants/ascua-demo-<4 caracteres aleatorios>/` con: `restaurant.json` (nombre "Ascua", dirección y horario **claramente ficticios**, `autorizacion.medio = "propio"`, `expira` lejana), `assets/logo.svg` y los **8 platos** con sus fotos (de `public/images/carta/*.jpg`), **sin modelos 3D todavía**.
2. Convierte las fotos a **WebP ≤ 300 KB** (usa `ffmpeg-static`, que ya está instalado, o Squoosh a mano; **no instales nada**).
3. Con eso ya funcionando, borra `public/images/carta/`.
4. Los modelos 3D de esta demo llegan en P-601 (necesitan el Estudio 3D del repo AR).

**Aceptación del lote:** `npm run verify` y `npm run test:e2e` verdes; abre `/r/ascua-demo-xxxx` y `/r/<_plantilla copiada>` en `npm run preview` y comprueba que cada una muestra **sus** datos.

### C-21 · Pruebas multi-restaurante

1. **Unitarias:** `relativeLuminance`, `contrastRatio`, `pickReadableTextColor`, `resolveAssetUrls`, `parTipografico`.
2. **Componentes (Testing Library)** con **dos restaurantes de prueba (A y B)** en `tests/fixtures/`: la portada muestra el nombre y el eslogan del restaurante; el contacto muestra su dirección, su horario y un enlace de WhatsApp con **su** número; el color primario llega como `--color-primary`; **ningún** texto de Ascua aparece en la página de A ni de B.
   _(Para renderizar `App` en jsdom hacen falta simulaciones de `matchMedia`, `IntersectionObserver` y `ResizeObserver`; defínelas en `tests/setup.ts`.)_
3. **E2E (`tests/e2e/restaurant-data.spec.ts`):**
   - `/r/A` muestra los datos de A y **ninguno** de B;
   - todas las fotos de plato cargan (`naturalWidth > 0`) y todas las peticiones van a `/data/A/…`;
   - **ninguna petición sale a otro dominio** (sin `google.com/maps`, ni fuentes externas);
   - se conserva la prueba de aislamiento de red.

---

## Lote 4 — Conectar el AR a la interfaz 🟠 _(es la pieza más delicada del producto)_

> ⚠️ **Regla crítica:** iPhone y Android solo abren el AR si la llamada ocurre **dentro del gesto del usuario** (el toque). **No puede haber ningún `await` ni `setTimeout` entre el clic y `launcher.launch(...)`.** `launchDishAr` ya lo cumple; no lo rompas.

### C-22 · Un lanzador compuesto

1. Crea `src/infrastructure/ar/CompositeArLauncher.ts`:
   ```ts
   /**
    * Elige el lanzador de AR correcto según el modo que decidió el dominio
    * (quick-look, scene-viewer o model-viewer-modal) y le delega el trabajo.
    * No es `async` a propósito: así la llamada al lanzador sigue ocurriendo
    * dentro del mismo toque del usuario, que es lo que exigen iOS y Android.
    */
   export class CompositeArLauncher implements ArLauncher {
     constructor(
       private readonly launchers: Partial<Record<ArLaunchMode, ArLauncher>>
     ) {}

     launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult> {
       const launcher = this.launchers[mode]
       if (!launcher) {
         return Promise.resolve({
           success: false,
           mode,
           error: `No hay lanzador para el modo ${mode}`,
         })
       }
       return launcher.launch(dish, mode) // sin await: se conserva el gesto del usuario
     }
   }
   ```
2. En `compositionRoot.ts` reemplaza `arLaunchers: [...]` por `arLauncher: new CompositeArLauncher({ 'quick-look': new QuickLookLauncher(), 'scene-viewer': new SceneViewerLauncher(), 'model-viewer-modal': new ModelViewerFallbackLauncher() })`.
3. Pruebas (`CompositeArLauncher.test.ts`): delega al lanzador correcto; un modo sin lanzador devuelve `success: false` sin lanzar error; **y llama al lanzador de forma síncrona**:
   ```ts
   it('invoca al lanzador sin esperar (conserva el gesto del usuario)', () => {
     const launch = vi
       .fn()
       .mockResolvedValue({ success: true, mode: 'quick-look' })
     void new CompositeArLauncher({ 'quick-look': { launch } }).launch(
       dishConModelo,
       'quick-look'
     )
     expect(launch).toHaveBeenCalledTimes(1) // ya se llamó, sin haber hecho await
   })
   ```
   Agrega la misma comprobación síncrona a `launchDishAr.test.ts`.

### C-23 · El visor de respaldo, sin eventos fantasma

En `ModelViewerFallbackLauncher.ts` quita el `window.dispatchEvent(new CustomEvent('open-model-viewer'…))`; conserva la validación y devuelve `{ success: true, mode }` si hay GLB. **La interfaz abre el modal según el resultado.** Actualiza su prueba y comprueba con `grep -rn "open-model-viewer" src tests` que no queda ninguna referencia.

### C-24 · `Menu.tsx` usa el caso de uso

1. `const { soldOutStore, environmentDetector, arLauncher, analyticsTracker } = useDependencies()`.
2. Reemplaza `abrirAr` por:
   ```tsx
   const abrirAr = (plato: Dish) => {
     if (!plato.modelo) return
     // Se llama directo desde el toque: sin await ni setTimeout antes.
     launchDishAr({
       dish: plato,
       restaurantSlug: restaurant.slug,
       detector: environmentDetector,
       launcher: arLauncher,
       analytics: analyticsTracker,
     }).then((resultado) => {
       // En computador, o dentro de Instagram/WhatsApp, se muestra el visor 3D.
       if (resultado.success && resultado.mode === 'model-viewer-modal')
         setActivo({ dish: plato, mode: 'ar' })
     })
   }
   ```
   **Conserva** el estado `activo` y las props de `ArDishModal`. Quita el import de `lib/launchAr`.

### C-25 · El aviso de navegador embebido, con el nombre de la app

1. En `src/domain/ar.ts` agrega a `deviceCapabilitiesSchema`: `embeddedBrowserName: z.string().nullable()`.
2. En `BrowserEnvironmentDetector` calcúlalo con `IN_APP_MARKERS` (devuelve `"Instagram"`, `"WhatsApp"`… o `null`) y deja `isEmbeddedBrowser = embeddedBrowserName !== null`. **La lista de marcadores queda solo en el detector.**
3. `ArDishModal.tsx` usa `useDependencies().environmentDetector.getCapabilities().embeddedBrowserName` en lugar de `detectInAppBrowser()`. El texto del aviso **no cambia**.
4. Actualiza los datos de prueba que construyen `DeviceCapabilities` y agrega pruebas del nombre (WhatsApp, Instagram, Facebook, navegador normal → `null`).

### C-26 · Retirar el código antiguo

1. `grep -rnE "lib/(launchAr|browserEnv|arAssets)" src tests` debe salir vacío.
2. Borra `src/lib/launchAr.js`, `src/lib/browserEnv.js` y `src/lib/arAssets.js`.
3. Deja `.env.example` solo con el comentario _"Esta demo no necesita variables de entorno."_ y quita `VITE_SUPABASE_*` de cualquier declaración de tipos.

**Aceptación:** `verify` verde; `grep -ri supabase src .env.example` sin resultados.

### ✋ QA manual obligatorio de Juan (el agente **no puede** hacerlo)

Requiere una URL con **HTTPS** (la de _preview_ de Cloudflare, X-007, o un túnel HTTPS): el AR no funciona en `localhost`.

- [ ] **iPhone, Safari:** tocar el botón → guía (solo la primera vez) → "Entendido" → AR Quick Look con el plato **sobre la mesa, a tamaño real y sin poder agrandarlo**.
- [ ] **Android, Chrome:** igual con Scene Viewer; el plato no se puede agrandar.
- [ ] **Dentro de Instagram o WhatsApp:** visor 3D con el aviso que **nombra la app**.
- [ ] **Computador:** visor 3D con el plato girando.

> **X-007 (Cloudflare), si aún no lo hiciste:** crea una cuenta → _Workers & Pages_ → _Create_ → _Pages_ → **Direct Upload** con el nombre `ascua-demo`. Crea un token con el permiso _Cloudflare Pages: Edit_. En GitHub → _Settings → Secrets and variables → Actions_ agrega los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` y las variables `CF_PAGES_PROJECT` (= `ascua-demo`) y `PROD_URL`.

---

## Lote 5 — Mover la interfaz a `src/presentation/`

### C-27 · Quitar el ciclo antes de mover

1. Crea `src/application/dependencies.ts` con `AppDependencies` escrita **solo con puertos**:
   ```ts
   export interface AppDependencies {
     restaurantRepository: RestaurantRepository
     environmentDetector: EnvironmentDetector
     arLauncher: ArLauncher
     soldOutStore: SoldOutStore
     analyticsTracker: AnalyticsTracker
   }
   ```
2. `compositionRoot.ts` importa ese tipo y lo implementa.
3. Mueve (con `git mv`) `src/app/DependenciesContext.tsx` → `src/presentation/state/DependenciesContext.tsx` y `src/app/store.ts` → `src/presentation/state/restaurantStore.ts`. Actualiza los `import`.

**Aceptación:** `verify` verde (`arch:check` sin ciclos); en `src/app/` solo quedan `compositionRoot.ts` y `router.tsx`.

### C-28 · Mover por carpetas (`git mv`, un commit por movimiento, `verify` después de cada uno)

| Origen                                    | Destino                                                                   |
| :---------------------------------------- | :------------------------------------------------------------------------ |
| `src/components/*`                        | `src/presentation/components/`                                            |
| `src/hooks/*`                             | `src/presentation/hooks/`                                                 |
| `src/i18n/*`                              | `src/presentation/i18n/`                                                  |
| `src/App.tsx`                             | `src/presentation/pages/RestaurantPage.tsx` (componente `RestaurantPage`) |
| Páginas de relleno dentro de `router.tsx` | un archivo cada una en `src/presentation/pages/`                          |
| `src/lib/gsap.js`                         | `src/presentation/effects/gsap.ts`                                        |

**No cambies el contenido** de los archivos salvo las rutas de `import`; usa el alias `@/presentation/…`. Si `src/lib` queda vacía, bórrala. Comprueba que `tailwind.config.js` sigue cubriendo la nueva ruta (`./src/**/*.{js,jsx,ts,tsx}`).

### C-29 · Comprobar que la regla de capas ya vigila la interfaz

1. Prueba temporal: en un componente de `src/presentation/` agrega `import '@/infrastructure/ar/QuickLookLauncher'` y corre `npm run arch:check`: **debe fallar**. Deshaz el cambio.
2. Actualiza el README y el ADR 0001 donde digan que la interfaz vive en `src/components`.

**Aceptación:** `arch:check` falla con el import prohibido y pasa sin él; ya no existen `src/components`, `src/hooks`, `src/i18n` ni `src/lib`.

---

## Lote 6 — Móvil, accesibilidad y pruebas de interfaz

### C-30 · Dividir `Menu` y probar componentes

1. Extrae `src/presentation/components/menu/DishCard.tsx` (foto, nombre, precio, insignia 3D/AR, botón de AR, estado agotado). Todo por props. **Conserva los atributos `data-*` y las clases** que usan las animaciones.
2. Extrae `src/presentation/components/ar/InAppBrowserNotice.tsx` (hoy dentro de `ArDishModal`).
3. Pruebas con Testing Library: `DishCard` muestra nombre y precio con formato COP; la insignia y el botón de AR solo con `modelo.aprobado`; al tocar el botón llama a `onVerAr`; con `agotado` muestra ese estado. `InAppBrowserNotice` nombra la app.
4. **Solo informar (se resuelve en diseño):** hoy los botones dicen "Ver en RA" y "Ponerlo en mi mesa"; el plan pide evitar siglas y usar un texto como "Ver en mi mesa". Anótalo en `ESTADO.md`.

### C-31 · Móvil

1. **Barra inferior de reservas (`FranjaReserva`)**: agrega `padding-bottom: env(safe-area-inset-bottom)` y ajusta el `padding-bottom` de la página para que sea **igual a la altura de la barra** (hoy la barra mide 64 px y la página reserva 56 px: tapa 8 px de contenido). Haz lo mismo con `FloatingHelp`: que quede **por encima** de la barra y de la zona segura.
2. **Áreas táctiles ≥ 48 × 48 px** en enlaces del menú, botones de ícono, selector de idioma y botones de cerrar de los modales.
3. **Prueba responsive (Playwright)** a 360, 390, 430, 768 y 1280 px: **sin scroll horizontal** (`document.documentElement.scrollWidth <= innerWidth`) y todos los botones y enlaces visibles con `boundingBox` ≥ 48 px.

### C-32 · Accesibilidad básica

- `alt` descriptivos y en el idioma de la página; las imágenes decorativas llevan `alt=""`.
- Estilo global de `:focus-visible` con el color primario del restaurante (hoy hay uno solo).
- Los modales (`ArGuideModal`, `ArDishModal`) tienen `role="dialog"`, `aria-modal="true"`, se cierran con **Esc** y devuelven el foco al botón que los abrió. Revisa y completa lo que falte.
- Respeta `prefers-reduced-motion` también en el hero y en las transiciones de modales.

### C-33 · E2E del recorrido del comensal

En `tests/e2e/` (Desktop, Pixel 5 e iPhone 12): la **guía de AR aparece la primera vez y no la segunda**; en computador, "Ponerlo en mi mesa" abre el **visor 3D** de respaldo; `?demo=1` muestra el panel y marcar **agotado** funciona; el enlace de reserva apunta a `https://wa.me/<número del restaurante>?text=…`; una dirección inexistente muestra la página 404 y un restaurante expirado muestra "demo finalizada".
_(Playwright no puede abrir Quick Look ni Scene Viewer: eso lo cubre el QA manual.)_

---

## Lote 7 — Documentación y cierre

### C-34 · README al día

En el README de la raíz cambia estas filas de la tabla de estado (la sección "Estado" y "Limitaciones conocidas" actualízalas acorde):

| Área                                                                                   |                         Estado nuevo                          |
| :------------------------------------------------------------------------------------- | :-----------------------------------------------------------: |
| Adaptadores de AR conectados a la interfaz, con lanzador compuesto                     |                              ✅                               |
| Interfaz en `src/presentation/` con la regla de capas activa                           |                              ✅                               |
| Página gobernada por los datos del restaurante (nombre, logo, tema, contacto, portada) |                              ✅                               |
| Diseño nuevo, mobile-first y accesibilidad básica                                      | ✅ _(Lighthouse y prueba de usabilidad siguen pendientes 🗓️)_ |
| Demo genérica `ascua-demo` con fotos (modelos 3D aprobados pendientes)                 |                              🚧                               |
| Página de QR imprimible                                                                |                              🗓️                               |
| Cabeceras de seguridad y CSP                                                           |                              🗓️                               |
| Cloudflare Pages, protección de `main` y CodeQL (pasos manuales)                       |                              🗓️                               |

Quita de "Limitaciones" lo ya resuelto (AR sin conectar, `presentation` inexistente, archivos generados versionados) y deja lo que siga abierto. Actualiza la sección de pruebas con las cifras reales de `npm run test` y `npm run test:coverage`.

### C-35 · Cierre

1. `npm run verify` y `npm run test:e2e` en verde.
2. `docs/ESTADO.md`: C-01 a C-35 completas; **siguiente fase: P-205 (QR imprimible)**.
3. Bitácora de cada lote en `docs/sesiones/` y grafo actualizado (`graphify`).
4. Juan hace el **QA de dispositivos** del Lote 4 sobre la URL de _preview_ y decide si abre el Pull Request a `main`.

---

## Qué NO hacer ahora

- No empezar P-205 (QR), P-601 (modelos 3D de la demo) ni P-7xx (cabeceras, Lighthouse, lanzamiento) hasta cerrar el Lote 4.
- No implementar la **medida real por plato** (P-307 completo): depende de A-204 en el repo `ASCUA-DEMO-AR`.
- No cambiar los textos de los botones de AR ("Ver en RA"): se decide en la fase de diseño.
- No agregar dependencias.
