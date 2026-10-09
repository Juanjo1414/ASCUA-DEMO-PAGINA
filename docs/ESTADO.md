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

## Siguiente paso exacto

1. Continuar `docs/PLAN-REVISION.md`: C-31 de R-6 (capturas en 360×640/390/
   430/768/1280 — necesita herramienta de navegador), R-7 (seguridad/
   rendimiento más allá de la ADR 0004 y robots.txt), R-8 (P-601: generar
   modelos 3D reales con el pipeline del repo AR, re-escalados a la medida
   real de cada plato — necesita que Juan provea sus llaves y Docker).
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare:
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
     Sin esto, `deploy`/`smoke` quedan en espera (no fallan, se omiten).
   - X-008: Fijar por SHA las acciones que faltan (`upload/download-artifact`,
     `gitleaks-action`, `wrangler-action`) y habilitar CodeQL.

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
