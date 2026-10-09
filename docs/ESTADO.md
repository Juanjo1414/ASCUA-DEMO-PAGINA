# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-09 · **Por:** Claude Code (revisión) · **Rama:** `dev/Juanjo`

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

## Siguiente paso exacto

1. Continuar `docs/PLAN-REVISION.md`: R-2/R-3 (arquitectura y contenido), R-6 (completar
   Lote 6: accesibilidad automatizada y E2E del recorrido del comensal — **no existen
   hoy**, pese a que el paso de CI dice tenerlas), R-8 (P-601: generar modelos 3D reales
   con el pipeline del repo AR, re-escalados a la medida real de cada plato).
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
