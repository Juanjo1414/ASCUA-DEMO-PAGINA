# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-17 · **Por:** Claude Code (revisión) · **Rama:** `dev/Juanjo`

## Fase actual

**Revisión integral post-Antigravity** (`docs/PLAN-REVISION.md`), antes de retomar P-601/P-602.
GitHub Actions llevaba varias ejecuciones en rojo; la revisión confirmó que la mayoría eran
commits intermedios ya corregidos, y encontró y corrigió una falla real de configuración de CI
más varios bugs visuales no detectados antes (ver `docs/revision/inventario.md`).

## Último paso completado (sesión de revisión, 2026-10-09)

- **R-0:** inventario completo de hallazgos y matriz de cumplimiento contra el plan
  original en `docs/revision/inventario.md`. Reemplaza las afirmaciones de esta
  sección de versiones anteriores de este documento, varias de las cuales no se
  pudieron verificar o eran imprecisas (ej.: "playwright tests pass" como parte de
  `npm run verify`, cuando `verify` nunca corrió E2E).
- **R-1 (CI en verde):** las pruebas E2E construían sobre `dist/` con restaurantes de
  prueba y borraban el restaurante real antes de que Lighthouse CI lo midiera en el
  mismo job; además `lighthouserc.json` apuntaba a un slug que no existe
  (`ascua-demo` en vez de `ascua-demo-abcd`). Ahora el E2E construye en `dist-e2e/`,
  separado del `dist/` real. `test:smoke` (que `deploy.yml` ya invocaba sin que
  existiera) y `playwright.smoke.config.ts` quedaron creados. `verify` alinea su
  orden y usa `test:coverage` igual que CI. Confirmado en GitHub Actions (run
  `37967279175`): `verify` ✅, `security` ✅, `e2e` (incluye Lighthouse) ✅.
- **Bug visual mayor no detectado antes:** toda la paleta de color vieja ("fogón":
  `llama`, `rescoldo`, `ceniza`, `loza`, `tinta`, `crema`, `carbon`, `brasa`, etc.)
  usaba variables CSS que nunca se definieron. 6 componentes del flujo de AR
  (`ArDishModal`, `ArViewer`, `InAppBrowserNotice`, `ArGuideModal`, `FloatingHelp`,
  `DemoPanel`) se veían con fondos/textos transparentes, y el botón que lanza el AR
  usaba una clase CSS (`.boton`) que tampoco existe, así que se mostraba sin ningún
  estilo. Migrados los 6 a los tokens reales del sistema de diseño; paleta muerta
  borrada de `tailwind.config.js`.
- **Contenido y seguridad:** textos de AR corregidos ("Ver en mi mesa", guía de 3
  pasos igual a CLAUDE.md, disclaimer de escala real aclarado); `public/robots.txt`
  agregado; `localStorage` en componentes de presentación ya no se llama directo
  (rompía en Safari modo privado) sino a través del nuevo puerto
  `UiPreferencesStore`; ADR 0004 documenta el dominio de Cloudflare Analytics en el
  CSP; `validate-content.ts` ahora exige `aprobadoPor`/`fechaAprobacion` cuando un
  modelo está `aprobado`.
- **Bug latente encontrado al escribir pruebas:** `scripts/` nunca estuvo en el
  `include` de `tsconfig.json`, así que `npm run typecheck` nunca revisó
  `scripts/validate-content.ts`, que usaba `parsed.error.errors` (no existe en
  `ZodError` de Zod 4; es `.issues`). Corregido y agregado `scripts/**` al typecheck.
- **Bitácoras reconstruidas** (no existían): Lote 5, P-205, P-701–P-704, y los dos
  commits sueltos de `vite.config.js` — ver `docs/sesiones/`.

### R-2 (arquitectura y calidad de código) y R-3 (contenido) — 2026-10-09 tarde

- `arch:check` confirmado sin violaciones (67 módulos, 157 dependencias).
- `CloudflareAnalyticsTracker.ts` tenía dos `@ts-ignore` (prohibidos por
  CLAUDE.md) y un `console.log` comentado; se tipó `window.zaraz` y se quitó
  el código muerto, con prueba de regresión nueva.
- **Datos inventados presentados como reales** (viola CLAUDE.md "no
  inventes datos de restaurantes reales"): `Pie.tsx` mostraba una dirección
  y horario fijos ("Calle 10 #45-20, local 3, Medellín") sin relación con
  el restaurante; `FranjaReserva.tsx` mostraba un horario inventado. Ambos
  ahora usan `restaurant.contacto.direccion/horario` y no muestran nada si
  el restaurante no los tiene. Las claves de traducción muertas `hours` y
  `hoursCorto` se eliminaron.
- `Menu.tsx` tenía el título de la sección fijo en inglés ("Our Menu") sin
  importar el idioma activo; ahora usa `menuSection.heading` (es/en).
- `build-content.ts` interpolaba el nombre/eslogan del restaurante directo
  en el HTML generado por restaurante sin escapar: un nombre con comillas o
  `<` rompía la página o inyectaba markup. Se agregó `escapeHtml()`. De
  paso, `buildContent()` ahora acepta `contentDir`/`distDir` como
  parámetros (igual que `validateContent`) para poder probarlo con
  carpetas temporales.
- ~39 archivos de `src/` no tenían el encabezado de archivo obligatorio de
  CLAUDE.md §4.1 (qué es, para qué existe, quién lo usa, qué no hace). Se
  agregó a las 4 capas, incluido TSDoc en los lanzadores de AR y el
  detector de entorno.
- Pruebas: 118 pruebas unitarias (antes 113) + 2 nuevas para
  `build-content.ts`, todas en verde. Confirmado en GitHub Actions (run
  `37983571857`): `verify` ✅ `security` ✅ `e2e` ✅.
- Pendiente de R-3 (no bloqueante hoy): la validación `escalaRealCm` vs.
  `manifest.json` (±5 %) sigue diferida a R-8, porque todavía no existe
  ningún modelo 3D real que validar contra esa tolerancia.

### R-6 (C-32, accesibilidad automatizada) — 2026-10-09 tarde

- Juan aprobó `@axe-core/playwright` (MPL-2.0, permisiva, la mantiene el
  propio equipo de Deque/Playwright) como devDependency.
- `tests/e2e/accesibilidad.spec.ts` corre las reglas WCAG 2.1 A/AA de
  axe-core sobre la carta (`rest-a-1234`) y sobre la guía de 3 pasos de AR
  abierta (`rest-c-9012`), en los 3 proyectos de Playwright. Falla si hay
  alguna violación `serious` o `critical`.
- **Hallazgo real de la primera corrida:** el texto de copyright/privacidad
  del pie de página (`Pie.tsx`) tenía contraste 4.47:1 contra el fondo
  (`opacity-60` sobre `bg-deep-forest`), por debajo del mínimo AA de 4.5:1.
  Se subió a `opacity-80`; las 6 corridas (2 pruebas × 3 proyectos) pasan.
- Con esto, C-32 queda completo. Pendiente real de R-6: C-31 (revisión
  visual con capturas en 5 anchos), que necesita una herramienta de
  navegador no disponible en esta sesión.

### R-4 (pruebas de contrato AR) y runbooks manuales — 2026-10-09 noche

- `arLaunchers.test.ts` solo probaba éxito/error genérico; se agregaron
  pruebas que verifican los atributos exactos exigidos por CLAUDE.md
  §0.2: `QuickLookLauncher` crea `<a rel="ar">` con una `<img>` hija y
  `#allowsContentScaling=0` en el href; `SceneViewerLauncher` fija
  `resizable=false`, `mode=ar_preferred` y `S.browser_fallback_url` en el
  `intent://`. `BrowserEnvironmentDetector.test.ts` ganó casos para TikTok
  y LINE (ya estaban en el código, no probados).
- Creados dos runbooks que faltaban por completo:
  `docs/runbooks/qa-dispositivos.md` (checklist de QA manual en iPhone/
  Android, incluye dónde Juan marca `aprobado`/`aprobadoPor`/
  `fechaAprobacion`) y, para las tareas manuales de infraestructura,
  `docs/runbooks/configuracion-github-cloudflare.md` (X-006/X-007/X-008) y
  `docs/runbooks/configuracion-pipeline-3d.md` (de dónde sale el `HF_TOKEN`
  gratuito para R-8, sin usar Meshy de pago ni las credenciales de
  Supabase que Juan tuvo que eliminar).
- Juan está resolviendo en paralelo X-007 (Cloudflare Pages) y el token de
  Hugging Face para R-8.

### R-6 (C-30, pruebas de componente) — 2026-10-09 noche

- Faltaban pruebas para `Menu`, `ArGuideModal`, `ArDishModal`, `Hero`,
  `Contacto` y `Reserva` (solo existían para `DishCard`, `Pie` y
  `FranjaReserva`). Se agregaron las 6, con un helper nuevo
  `tests/unit/presentation/renderWithProviders.tsx` que monta cualquier
  componente con jotai + idioma + dependencias inyectadas usando los dobles
  en memoria de `tests/unit/application/doubles.ts` (se le agregó
  `InMemoryUiPreferencesStore`, que faltaba ahí). `Pie.test.tsx` y
  `FranjaReserva.test.tsx` se migraron al mismo helper para no tener 3
  copias del mismo montaje.
- Dos hallazgos de infraestructura de pruebas, no de producto: jsdom no
  implementa `window.matchMedia` (lo necesitan `Menu` y `LoadingScreen`
  para `prefers-reduced-motion`) — se agregó un polyfill mínimo en
  `tests/setup.ts`; y el `<model-viewer>` real de Google lanza errores
  internos de cámara al montarse en jsdom — las pruebas que abren el visor
  (`Menu`, `ArDishModal`) ahora lo simulan con `vi.mock('@google/model-viewer')`,
  porque no están verificando cómo se ve el modelo (eso es trabajo del QA
  manual de `qa-dispositivos.md`), solo que el flujo de UI abra el modal.
- `Menu.test.tsx` incluye la prueba de regresión del bug de "Our Menu" fijo
  en inglés (R-2) y cubre el flujo completo: primera vez muestra la guía,
  segunda vez (con `ascua:ar-guide-seen` ya puesto) lanza directo.
- 145 pruebas unitarias en verde (antes 118). Cobertura de `domain/` y
  `application/` sin cambios (sigue sin incluir `presentation/`, ver
  "Pendientes detectados").

### X-006, X-007, X-008 — completados (2026-10-09 noche)

- **X-006:** protección de `main` activa (confirmado con `gh api`): PR
  obligatorio, exige `ci / verify`, `ci / e2e`, `ci / security` en verde,
  rama actualizada antes de mergear, sin force-push ni borrado. Juan la
  dejó con `required_approving_review_count: 1`, lo que habría bloqueado
  el merge de su propio PR (GitHub no permite autoaprobación); corregido a
  `0` vía `gh api` con su confirmación.
- **X-007:** proyecto `ascua-demo-pagina` creado en Cloudflare Pages
  (Direct Upload). Secrets `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` y
  variables `CF_PAGES_PROJECT=ascua-demo-pagina`/
  `PROD_URL=ascua-demo-pagina.pages.dev` confirmados en GitHub. A partir
  del próximo push, `deploy`/`smoke` deberían dejar de quedar en espera.
- **X-008:** CodeQL confirmado activo (`javascript`/`typescript`, corrida
  semanal) y Dependabot alerts ya estaban habilitadas. La parte de código
  que faltaba (fijar por SHA `upload-artifact@v4.6.2`,
  `download-artifact@v4.3.0`, `gitleaks-action@v2.3.9`,
  `wrangler-action@v3.15.0`) quedó resuelta en `.github/workflows/`;
  `dependabot.yml` ya existía y estaba bien configurado.

### R-7 (seguridad y rendimiento) — 2026-10-09 noche

- Reporte nuevo en `docs/seguridad/2026-10-09.md`: `npm audit` de
  producción en 0 vulnerabilidades (las 25 del árbol completo son todas
  transitivas de `@lhci/cli@0.15.1`, ya en su última versión, sin
  exposición en producción); revisión manual de secretos quemados,
  cookies y `localStorage` directo fuera de `infrastructure/` — 0
  hallazgos; `public/_headers` reverificado (CSP, HSTS,
  `Permissions-Policy` coherente con cámara/AR, caché inmutable de
  assets 3D) — ya estaba bien desde P-701.
- Confirma por escrito el hallazgo de XSS que ya se había corregido en
  R-2 (HTML sin escapar en `build-content.ts`), para que quede trazado
  como parte de la auditoría formal y no solo en un mensaje de commit.
- **X-007 confirmado funcionando de punta a punta:** el push que fijó las
  acciones de X-008 disparó el primer `deploy`/`smoke` real contra
  Cloudflare Pages — ambos en verde.
- **Corrección importante (2026-10-10):** Juan reportó que el sitio
  "se veía igual" después de los fixes de R-5. La causa: `deploy`/`smoke`
  del commit `ab695dc` (los fixes de diseño) habían quedado en `skipped`
  porque Lighthouse falló en ese mismo run, y `deploy` depende de que
  todo el job `ci` pase. El primer deploy que sí corrió completo fue
  recién con `b3c9d53` (el ajuste del umbral de Lighthouse). Además,
  `https://ascua-demo-pagina.pages.dev` (sin rama) es el dominio de
  **producción** de Cloudflare — solo se actualiza con un merge a `main`,
  que todavía no ha pasado. La URL real y vigente de `dev/Juanjo` es
  **`https://dev-juanjo.ascua-demo-pagina.pages.dev`** (confirmado con
  `gh api` sobre el log del job `deploy`, y verificado que el bundle JS
  servido ahí sí incluye el fix de `heroImagen`). Corregido en el README.

### R-9 (alta de restaurantes, probado de punta a punta) — 2026-10-09 noche

- Se siguió el runbook `nuevo-restaurante.md` literalmente (copiar
  `_plantilla`, renombrar al slug, editar `restaurant.json`, validar,
  construir) con un restaurante ficticio en una carpeta temporal fuera del
  repo — nunca se publicó nada real. Dos hallazgos reales:
  - `_plantilla/restaurant.json` referenciaba `heroImagen: assets/hero.webp`,
    un archivo que no existe ahí; el validador lo dejaba pasar solo por
    ser la plantilla, así que copiarla rompía la validación de inmediato
    para cualquier restaurante nuevo. Se quitó la clave (es opcional;
    `Hero.tsx` ya cae de vuelta a la foto del primer plato destacado).
  - La plantilla traía `aprobado: true, aprobadoPor: "Juan"` de ejemplo en
    su plato con modelo 3D — copiarla tal cual publicaría un modelo
    "aprobado" que Juan nunca probó en sus celulares. Cambiado a
    `aprobado: false`; el runbook ahora explica que esos campos solo los
    marca Juan después de `qa-dispositivos.md`.
- Confirmado que el camino feliz (plato sin modelo, solo foto) valida
  limpio, y que `build-content.ts` genera el HTML SEO correcto con los
  datos del restaurante de prueba.

### R-10 (documentación y cierre) — 2026-10-09 noche

- Eliminadas 4 carpetas vacías y huérfanas (`src/components`, `src/hooks`,
  `src/i18n`, `src/lib`) que quedaban de antes de la migración a
  `presentation/` — nunca estuvieron en git (vacías), solo ensuciaban el
  árbol local.
- Creado `docs/ARQUITECTURA.md`: recorrido completo, archivo por archivo,
  de qué pasa cuando el comensal toca "Ver en mi mesa", cruzando las 4
  capas.
- Creado un `README.md` corto en cada capa: `src/domain/`,
  `src/application/`, `src/infrastructure/`, `src/presentation/`,
  `src/app/`, `src/shared/`.
- `README.md` raíz actualizado a fondo: estaba desactualizado desde el
  6 de octubre (decía que la migración a `presentation/` seguía
  pendiente, que faltaba crear el proyecto de Cloudflare, que
  `public/_headers` no existía, conteo de pruebas en 77/101 en vez de 145) — corregido todo contra el estado real verificado hoy.
- Deuda técnica (`engineering:tech-debt`, procedimiento manual porque la
  skill no está instalada): queda consolidada en la sección "Pendientes
  detectados" de este documento y en "Limitaciones conocidas" del
  `README.md` raíz, sin duplicar la lista en un tercer lugar.

### R-5 (diseño roto en producción) — 2026-10-09 noche

- Juan reportó con capturas reales de su celular que el sitio desplegado
  "no se ve bien ni en móvil ni en web" y cargó `diseño-ejemplo/` (4
  capturas del sitio real, no mockups — carpeta local, en `.gitignore`,
  nunca se sube). Se usó el navegador para reproducir y comparar contra
  `docs/DESIGN.md`. 4 bugs reales encontrados y corregidos:
  - `resolveAssetUrls()` no resolvía `heroImagen` (solo `tema.logo` y
    fotos de platos) → hero roto en cualquier restaurante con portada
    propia. Prueba de regresión agregada.
  - Los dos `logo.svg` (demo y `_plantilla`) eran placeholders rotos o
    ilegibles (uno con el texto perdido en un viewBox gigante, el otro ni
    siquiera un SVG válido). Reemplazados por wordmarks legibles.
  - `LoadingScreen.tsx` mostraba el logo sin el filtro `invert` que sí usa
    `Pie.tsx` para fondo oscuro → invisible durante la carga.
  - `FranjaReserva.tsx` (barra fija inferior en móvil) contradecía
    `DESIGN.md` ("no sticky behavior beyond the nav itself") y tapaba
    contenido real (formulario de contacto, precios) en las capturas de
    Juan. Eliminada; el acceso a "Reservar mesa" en móvil sigue
    disponible en el menú hamburguesa de `Nav.tsx`.
- Verificado visualmente en navegador (antes/después) para cada fix, no
  solo por código. `npm run verify` y `test:e2e` (25/25) en verde.
- **Decisión de Juan:** el umbral de `categories:performance` de
  Lighthouse CI se bajó de 0.9 a 0.8 solo para CI. Con 5 corridas, el
  runner compartido de GitHub Actions dio valores 0.5/0.89/0.82/0.87/0.89
  (mediana 0.89, por debajo del umbral) mientras que localmente el mismo
  build mide siempre ≥0.9 — es varianza del runner, no una regresión real
  (los cambios de esta sesión deberían mejorar el rendimiento, no
  empeorarlo: se quitó un componente). Accesibilidad, buenas prácticas y
  SEO se quedan en 0.9.
- Pendiente real de R-5: C-31 (capturas en los 5 anchos de
  360/390/430/768/1280 con el navegador, para revisión sistemática más
  allá de los bugs ya encontrados).

## Tareas grandes nuevas (pedidas por Juan, 2026-10-10)

### P-701-bis — Feedback del comensal visible para el restaurante y para Juan

- **Estado actual (confirmado en código):** ya existe un enlace "Danos tu
  opinión" en el pie de página (`Pie.tsx` → `FEEDBACK_URL` en
  `src/shared/config.ts`) que abre un **único** formulario externo de
  Tally compartido por todos los restaurantes, con el slug como parámetro
  de query. Los comensales sí pueden opinar, pero **nadie del restaurante
  tiene acceso** a esas respuestas — solo llegan a la cuenta de Tally de
  Juan, sin separar por restaurante de forma visible.
- **Lo que pide Juan:** que el comensal deje su opinión sobre la demo, y
  que tanto el **administrador de cada restaurante** como **Juan** puedan
  verla.
- **Por qué no es trivial:** el proyecto es un sitio **100% estático, sin
  backend ni base de datos** (decisión D1 de `PLAN-IMPLEMENTACION.md`,
  "costo $0"). Guardar y mostrar feedback filtrado por restaurante implica
  elegir entre: (a) seguir con un formulario externo pero uno **por
  restaurante** con su propia vista de resultados compartible (Tally,
  Google Forms + Sheet), sin tocar la arquitectura; o (b) agregar
  almacenamiento real (Cloudflare D1/KV + un endpoint con Workers, o un
  servicio de terceros tipo Supabase) con una pantalla de panel simple
  para leer los comentarios — esto sí cambia la arquitectura ("sin
  backend") y necesita una decisión explícita de Juan, documentada en un
  ADR, antes de empezar.
- **Decisión de Juan (2026-10-11): opción (a).** Un **Google Form por
  restaurante**, con su Google Sheet de respuestas compartido en modo
  "puede ver" con el correo del dueño del restaurante — así el dueño lo ve
  sin necesitar login especial, y Juan ve todos los Sheets porque es quien
  los crea. Sin backend nuevo, sin dependencias nuevas, coherente con que
  el sitio siga siendo estático mientras el producto no esté validado
  comercialmente (Decisión D8 de `PLAN-IMPLEMENTACION.md`).
- **Implementado (2026-10-16):** campo opcional `feedbackFormUrl` en el
  esquema (solo `https`, con prueba de que rechaza `http`/`javascript:`);
  `Pie.tsx` usa el Form propio del restaurante y, si falta, cae al
  formulario genérico con el slug (con pruebas de ambos casos);
  `validate-content.ts` avisa (sin fallar) si un restaurante real no lo
  tiene; runbook `nuevo-restaurante.md` con el paso 2.1 (crear Form,
  vincular Sheet, compartir con el dueño); ADR `0005-feedback-por-restaurante.md`.
  De paso, la cobertura de vitest dejó de intentar parsear los `README.md`
  de `src/` (ruido en el log).
- **Pendiente de Juan:** crear el Google Form de `ascua-demo-abcd` y pegar
  su URL en `content/restaurants/ascua-demo-abcd/restaurant.json`
  (`feedbackFormUrl`). Hasta entonces el validador muestra la advertencia
  y el pie usa el formulario genérico.

### R-5-bis — Rediseño "La mesa" de la landing del restaurante (HECHO, falta QA de Juan)

- Dirección "La mesa" (ver `docs/DESIGN.md`): el color del restaurante es el
  mantel, los platos son círculos de porcelana, "Ver en mi mesa" siempre en
  naranja brasa. Paleta derivada de `tema.primario`.
- Nuevo: `Destacados.tsx` + `menu/FeaturedDish.tsx` ("Lo más pedido"),
  `ComoFunciona.tsx` (3 pasos ilustrados, solo si hay AR),
  `hooks/useRevealOnScroll.ts` (movimiento solo CSS), `state/arEvents.ts`.
  Reescritos: `Nav`, `Hero`, `Menu`, `DishCard`, `Reserva`, `Contacto`, `Pie`,
  `LoadingScreen`, `FloatingHelp`, `ExpiredPage`, `NotFoundPage`, tokens y Tailwind.
- Dominio: campo opcional `destacado` por plato (A elegida por Juan),
  `selectFeaturedDishes`, `selectStarDish`, `hasArDishes`.
- Fuentes autoalojadas nuevas (Bricolage Grotesque, Hanken Grotesk, Young
  Serif); se quitaron DM Sans, Fraunces y la dependencia `gsap`.
- Responsive: 360 a 1280 px; sin scroll horizontal (el script de capturas no avisó).
- Se quitaron textos inventados que se mostraban en todos los restaurantes
  (horario "martes a domingo", eslogan genérico, enlace a Instagram).
- **Pendiente de Juan:** probar en su iPhone y Android sobre el preview;
  el demo no tiene ningún modelo 3D aprobado, así que la portada muestra
  "Ver la carta" y no "Ver en mi mesa" hasta que apruebe uno.
- **Siguiente paso:** QA visual de Juan, y decidir si el favicon/`theme-color`
  global y la landing `/` se alinean al nuevo sistema (ver R-5-ter).

### R-5-ter — Rediseñar la landing genérica (`/`)

- Hoy `LandingPage.tsx` es un placeholder de puro texto ("Ascua Menu AR /
  Selecciona un restaurante.") — intencional en cuanto a que **nunca**
  debe listar restaurantes (regla de seguridad de CLAUDE.md), pero sin
  ningún diseño: no representa la marca Ascua/PITS ni sirve como landing
  de presentación del producto.
- Juan pide rediseñarla con las mismas skills (`frontend-design:frontend-design`,
  `ui-ux-pro-max`), manteniendo la regla de no listar restaurantes.
- **Avance:** `LandingPage.tsx` (`/`) fue escrita por otra sesión el 2026-10-16
  (con prueba propia) y solo se reestilizó con los tokens nuevos, sin cambiar
  su contenido. Revisar con Juan si se rediseña a fondo.
- **Hecho (2026-10-17):** `LandingPage.tsx` quedó reescrita (hero con foto
  de plato, un único botón "Ver la demo" hacia `DEMO_RESTAURANT_SLUG`, 3
  pasos de uso), reestilizada por la sesión de impeccable con los tokens
  "La mesa" (`mantel`, `porcelana`). Sigue sin listar restaurantes
  (verificado con prueba). Subida en el mismo commit que R-5-bis.

### Subida a GitHub de ambos rediseños — 2026-10-17

- Se encontró que el rediseño de la sesión de `/impeccable` (R-5-bis,
  "La mesa") y mi landing (R-5-ter) **nunca se habían subido**: Juan creía
  que impeccable ya había hecho commit, pero su propia bitácora
  (`docs/sesiones/2026-10-16-rediseno-la-mesa.md`) decía lo contrario y
  `dev/Juanjo` en GitHub seguía en el commit anterior. Todo vivía solo en
  el disco local (48 archivos modificados + 16 nuevos), sin respaldo.
- Verificado antes de subir: `npm run verify` (167 pruebas), `test:e2e`
  (28/30, 2 omitidas a propósito) y Lighthouse CI, todo en verde. Se
  confirmó que mis 3 arreglos de raíz de la sesión anterior (transparencia,
  espaciado, titulares fluidos) seguían intactos debajo del rediseño nuevo
  — no hubo ningún choque entre ambos trabajos.
- De paso se corrigió un falso positivo del validador: avisaba "asset
  duplicado" cuando un restaurante reutiliza su propia foto (la demo usa
  la misma foto como `heroImagen` y como foto de un plato); ahora solo
  avisa si el archivo se repite entre restaurantes **distintos**.
- 3 commits subidos a `dev/Juanjo`, CI verde de punta a punta incluido
  `deploy`/`smoke`. Confirmado con el bundle real servido en
  `https://dev-juanjo.ascua-demo-pagina.pages.dev` (trae `.bg-mantel` y
  `.bg-porcelana`, las clases de la paleta nueva).

## Siguiente paso exacto

1. ~~Feedback (P-701-bis)~~ — **hecho** (falta solo que Juan cree el
   Google Form de la demo y pegue su URL en `feedbackFormUrl`).
2. ~~Rediseño R-5-bis/R-5-ter~~ — **hecho y en el preview de `dev/Juanjo`**.
   Falta: **QA de Juan en iPhone y Android** sobre
   `https://dev-juanjo.ascua-demo-pagina.pages.dev`
   (`docs/runbooks/qa-dispositivos.md`).
3. Limpieza menor pendiente: `Menu.tsx` y `Contacto.tsx` pasan de ~200
   líneas (213); revisar si vale la pena dividirlos.
4. R-8 (P-601: generar modelos 3D reales — Juan ya tiene `HF_TOKEN` y
   Docker listos; falta escribir el script de orquestación). **Hoy la
   demo no tiene ningún plato con modelo aprobado**, así que el botón
   "Ver en mi mesa" no aparece en ningún plato — es el hueco más visible
   que queda antes de mostrarle la demo a un restaurante real.
5. Preparar (sin abrir) el PR `dev/Juanjo → main` con la plantilla del
   repositorio y `engineering:deploy-checklist`, cuando Juan lo pida. Al
   mergear, `https://ascua-demo-pagina.pages.dev` (producción, sin rama)
   por fin mostrará el rediseño.

## Línea base verificada (2026-10-09)

- `node -v`: v22.13.0 ✅
- `npm run verify`: ✅ en verde (lint 0 warn/err, typecheck 0 err —ahora incluye
  `scripts/`—, 113 pruebas con cobertura 96.8 %/91.12 %/95.55 %/97.1 % sobre
  umbrales 90/85/90/90, `content:validate` ✅ con 1 advertencia benigna, `arch:check`
  sin violaciones, `licenses:check` ✅, build ✅).
- `npm run test:e2e`: ✅ 9/9, y confirmado que no modifica el `dist/` real.
- Lighthouse CI contra el `dist/` real y el slug correcto: rendimiento 0.92,
  accesibilidad 0.94, mejores prácticas 1.00, SEO 0.92 (las 4 categorías ≥ 0.9).
- GitHub Actions, run `37967279175`: `verify` ✅ `security` ✅ `e2e` ✅.
- Git hooks: `pre-commit` y `pre-push` activos.

## Bloqueos

- Ninguno para seguir con la revisión de código. P-601/P-602 dependen de generar
  los modelos 3D con el pipeline de `MENU AR - AR` (en curso, R-8).

## Pendientes detectados (fuera de alcance de la tarea actual)

- 25 vulnerabilidades de `npm audit` en herramientas de desarrollo (0 en producción
  con `--omit=dev --audit-level=high`, que es lo que corre CI).
- Chunk de `@google/model-viewer` > 1 MB en el build; Lighthouse ya pasa 0.9 en
  rendimiento sin tocarlo, pero cargarlo con `import()` dinámico seguiría siendo una
  mejora pendiente.
- `script-src` del CSP necesita `'unsafe-inline' 'unsafe-eval'` por cómo cargan
  Vite/React y `@google/model-viewer` hoy; anotado en el ADR 0004, no resuelto.
- Acciones de GitHub sin fijar por SHA (`upload/download-artifact@v4`,
  `gitleaks-action@v2`, `wrangler-action@v3`) — asignado a X-008.
- Lote 6 (C-30 a C-33) sigue incompleto: falta accesibilidad automatizada y E2E del
  recorrido del comensal.
- `QrPage.tsx` no está envuelta en `LanguageProvider` y sus textos de carga/error
  están en español fijo (inconsistencia menor de i18n, no rompe nada hoy).

## Notas y decisiones de diseño

- **Textos de botones AR:** resuelto. "Ver en mi mesa" en es/en; se quitó la clave
  de traducción muerta `viewAr`.
- **Guía de AR:** reescrita para coincidir con CLAUDE.md (apunta a tu mesa → mueve
  el celular despacio hasta que aparezca, en su tamaño real → acércate o camina
  alrededor).

## Comandos para verificar

```powershell
npm run verify
npm run test:coverage
npm run test:e2e
git status --short
```
