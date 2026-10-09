# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-09 (tarde) · **Por:** Claude Code (revisión) · **Rama:** `dev/Juanjo`

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

## Siguiente paso exacto

1. Continuar `docs/PLAN-REVISION.md` en este orden (acordado con Juan):
   R-7 (seguridad/rendimiento: `/security-review`, `npm audit` documentado,
   revisar `Permissions-Policy` y caché de assets 3D) → R-9 (probar
   `nuevo-restaurante.md` de punta a punta con fixtures) → R-10
   (`docs/ARQUITECTURA.md`, README por capa, `engineering:tech-debt`).
   R-5 (capturas visuales) queda para cuando haya herramienta de navegador
   cargada en la sesión; R-8 (P-601) espera que Juan termine HF_TOKEN/Docker.
2. Confirmar en el próximo push que `deploy` y `smoke` ya corren de verdad
   contra el preview de Cloudflare (X-007 recién configurado).

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
