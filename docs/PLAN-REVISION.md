# Plan de revisión integral — ASCUA-DEMO-PAGINA (para ejecutar con Sonnet 5)

## Context

Antigravity (Gemini 3.1 Pro Low) ejecutó buena parte de `docs/PLAN-IMPLEMENTACION.md` (Fases P-1 a P-4, P-205, P-701–P-704) y de `docs/Correcciones antes de continuar.md` (Lotes 1–5 y parte de 6–7). `docs/ESTADO.md` dice "verify en verde", pero **GitHub Actions lleva ≥10 ejecuciones seguidas en rojo o canceladas** en `dev/Juanjo`, Juan reporta fallas visuales y nada se ha desplegado.

**Objetivo:** dejar la demo **funcional, con la menor cantidad posible de bugs y atractiva para los comensales y restaurantes** que la van a probar y darán el feedback del producto, fiel a la idea inicial (`docs/PROYECTO.md`, `docs/PRODUCT.md`, `docs/DESIGN.md`). Incluye completar **P-601** (demo genérica con modelos 3D reales generados con el pipeline del repo AR) y dejar **P-602** listo para que Juan agregue restaurantes reales.

**Fuera de alcance:** modificar el repo `MENU AR - AR` (ARFOODS). Su reescritura (A-201…A-204, Estudio 3D) es el **próximo proyecto**. Aquí solo se _ejecuta_ su pipeline para obtener modelos.

**Herramienta:** solo Sonnet (Claude Code). Igual, todo el contexto queda en el repo (ESTADO.md, bitácoras, inventario), porque las sesiones de Sonnet empiezan sin memoria.

**Entregable de la planeación:** al aprobarse, este plan se guarda como `docs/PLAN-REVISION.md` y se commitea `docs(R-000): plan de revisión integral`; luego se le da a Sonnet el prompt de §5.

---

## 0. Reglas para Sonnet (léelas antes de todo)

1. Sigue **CLAUDE.md** completo (protocolo §1, Git §2, DoD §3, comentarios §4.1, prohibiciones §10). Si algo de este plan choca con CLAUDE.md, gana CLAUDE.md y preguntas a Juan.
2. Contexto obligatorio, en este orden: `CLAUDE.md` → `docs/ESTADO.md` → este plan → `docs/Correcciones antes de continuar.md` → `docs/PLAN-IMPLEMENTACION.md` (§3, §5, §6, §9) → `docs/PROYECTO.md`, `docs/PRODUCT.md`, `docs/DESIGN.md` → **todas las bitácoras de `docs/sesiones/`** (registro de lo que hizo Gemini, por fecha) → `docs/adr/` → `docs/seguridad/2026-10-07.md`. Para P-601: `../MENU AR - AR/CLAUDE.md`, `PROJECT_CONTEXT.md` y `apps/worker/`.
3. **No confíes en las bitácoras ni en ESTADO.md**: verifica cada "hecho" contra el código y con un comando. Ya hay afirmaciones falsas (ver §1).
4. Usa `graphify query/explain/path` antes de buscar a ciegas.
5. IDs: `R-<fase><n>` (ej. `R-101`). Commits Conventional en español: `fix(R-101): …`. Un hallazgo = un commit pequeño con `npm run verify` en verde. Cada bug corregido lleva prueba de regresión.
6. **Nunca** push, PR ni merge sin que Juan lo pida en la sesión. Para validar CI, prepara el commit y pide permiso de push a `dev/Juanjo`.
7. AR del lado de PAGINA (lanzadores Quick Look / Scene Viewer / model-viewer): se revisa y se corrige solo con pruebas de contrato y QA de Juan en iPhone y Android. **Nunca** marcar `aprobado: true`: eso lo hace Juan.
8. Dependencias nuevas: pide aprobación con justificación y licencia (sin GPL/AGPL) antes de instalar.
9. Nunca leas ni imprimas `.env*`, tokens ni llaves (aplica a las llaves del pipeline del AR: Juan las pone en su terminal).
10. Las decisiones que son de Juan (umbrales, textos, cambios visuales grandes) van a la sección "Decisiones pendientes" del inventario y se preguntan en bloque.
11. Criterio rector ante dudas: **¿esto hace que un comensal poco técnico, en su celular, entienda y disfrute la demo sin que nadie le explique?**

---

## 1. Hallazgos ya confirmados (punto de partida, no lista cerrada)

| #   | Hallazgo                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evidencia                                                     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| H1  | **Lighthouse CI falla** (run 37687675153: verify ✓, e2e ✓, Lighthouse ✗). Causas probables: (a) `playwright.config.ts › webServer` corre `npm run build` con `CONTENT_DIR=tests/fixtures/restaurants` y **sobrescribe el `dist` probado**, así Lighthouse sirve un dist sin el restaurante real; (b) `lighthouserc.json` apunta a `/r/ascua-demo` pero el slug real es `ascua-demo-abcd`; (c) performance ≥ 0.9 en móvil con el chunk de `@google/model-viewer` > 500 kB. | `ci.yml`, `playwright.config.ts`, `lighthouserc.json`         |
| H2  | `deploy.yml › smoke` ejecuta `npm run test:smoke`, **script inexistente**.                                                                                                                                                                                                                                                                                                                                                                                                | `package.json`                                                |
| H3  | `verify` local ≠ CI: verify usa `test`, CI usa `test:coverage` (umbrales 90/85); varios runs fallaron en ese paso. La cobertura **excluye `src/presentation/`**.                                                                                                                                                                                                                                                                                                          | `vitest.config.js`, run 37680123771                           |
| H4  | `licenses:check` usa `npx license-checker` (no está en devDependencies) y comillas simples `'GPL;AGPL'` que no funcionan en Windows.                                                                                                                                                                                                                                                                                                                                      | `package.json`                                                |
| H5  | Solo hay **1 spec E2E** (`isolation.spec.ts`). Falta el recorrido del comensal (C-33) y accesibilidad (C-32), aunque el paso de CI dice tenerlos. ESTADO.md afirma que verify corre Playwright: **falso**.                                                                                                                                                                                                                                                                | `tests/e2e/`, `docs/ESTADO.md`                                |
| H6  | Textos prohibidos: `viewAr: 'Ver en RA'`, `viewOnTable: 'Ponerlo en mi mesa'` (debe ser "Ver en mi mesa").                                                                                                                                                                                                                                                                                                                                                                | `src/presentation/i18n/translations.ts:70-71`                 |
| H7  | `/r/:slug/qr` está fuera de `LanguageProvider` (posible crash si usa `useLanguage`).                                                                                                                                                                                                                                                                                                                                                                                      | `src/app/router.tsx`                                          |
| H8  | La bitácora de Lote 4 dice que el lanzador compuesto "devuelve la promesa": comprobar que el AR se lance **sin `await` dentro del gesto** (C-22).                                                                                                                                                                                                                                                                                                                         | `CompositeArLauncher.ts`, `launchDishAr.ts`                   |
| H9  | Faltan bitácoras de Lotes 5–7, P-205 y P-701–P-704. Los dos últimos commits (`vite.config.js`: alias `@` y middleware `/data/` → `content/restaurants/`) no tienen ID, prueba ni bitácora.                                                                                                                                                                                                                                                                                | `docs/sesiones/`, `git log`                                   |
| H10 | `graphify-out/*` con cambios sin commitear.                                                                                                                                                                                                                                                                                                                                                                                                                               | `git status`                                                  |
| H11 | CI: acciones con Node 20 deprecadas, varias sin fijar por SHA, `ubuntu-latest` migra a Ubuntu 26 el 2026-10-19, `--if-present` debía retirarse (P-705).                                                                                                                                                                                                                                                                                                                   | `ci.yml`, `deploy.yml`                                        |
| H12 | 1 color hex quemado en `presentation/components                                                                                                                                                                                                                                                                                                                                                                                                                           | pages`.                                                       | grep `#[0-9a-fA-F]{6}` |
| H13 | **No existe ningún .glb/.usdz real** en ninguno de los dos repos (solo archivos de 12 bytes en `_plantilla`). El flujo AR nunca se ha probado con contenido de la demo.                                                                                                                                                                                                                                                                                                   | `content/restaurants/`                                        |
| H14 | El pipeline del AR fija **todos** los platos a 16 cm (`normalize-scale.ts`, `TARGET_SIZE_METERS`); PAGINA exige `escalaRealCm` por plato (±5 % contra `manifest.json`).                                                                                                                                                                                                                                                                                                   | `../MENU AR - AR/apps/worker/src/pipeline/normalize-scale.ts` |

---

## 2. Fases

Orden: primero CI en verde, luego calidad, luego experiencia, luego contenido 3D.

### R-0 · Arranque y línea base (sin cambiar código)

- Protocolo §1 de CLAUDE.md (rama `dev/Juanjo`, `git pull`; preguntar qué hacer con `graphify-out/` sucio).
- Correr y anotar: `npm run verify`, `npm run test:coverage`, `npm run test:e2e`, `npm run build && npx lhci autorun`, `npm run format:check`, `npm audit`.
- CI: `gh run list --limit 20` y `gh run view <id> --log-failed` de cada run fallido; clasificar por job/paso.
- Abrir la app (`npm run dev` / `npm run preview`) con el skill `run` o Playwright, recorrerla como comensal en 360×640 y anotar todo lo roto o feo.
- Crear `docs/revision/inventario.md`: tabla (ID R-, severidad 🔴/🟠/🟡, archivo, evidencia, fase, estado) + "Decisiones pendientes de Juan".
- **Matriz de cumplimiento:** cada ID de `PLAN-IMPLEMENTACION.md §9` (Fase 0, P-1…P-7) y C-01…C-35 → declarado vs real (archivo + comando/prueba que lo demuestra) → ✅ / ⚠️ / ❌ / 🚫 bloqueado.
- Resumen a Juan + decisiones en bloque antes de R-1.

### R-1 · CI/CD en verde (máxima prioridad)

- **R-101** E2E no debe pisar el `dist` real: build de fixtures en otra carpeta/puerto para que Lighthouse mida el dist probado. (H1a)
- **R-102** `lighthouserc.json` con el slug real, servidor coherente, perfiles móvil y desktop. (H1b)
- **R-103** Rendimiento: `@google/model-viewer` con import dinámico (solo al abrir el visor 3D), imágenes con `loading="lazy"`/tamaños, fuentes con `font-display`. Si no llega a 0.9, proponer umbral a Juan con datos (no bajarlo sin aprobación). (H1c)
- **R-104** `test:smoke` + `tests/e2e/smoke.spec.ts` con `BASE_URL` (carga de `/r/<slug>`, carta visible, 404 de slug inexistente, cabeceras de `_headers`). (H2)
- **R-105** `verify` igual a CI (`test:coverage`; orden de CLAUDE.md) y documentar que E2E va aparte. (H3)
- **R-106** `licenses:check` reproducible y multiplataforma. (H4)
- **R-107** Workflows: acciones por SHA y compatibles con Node 24, `ubuntu-24.04` explícito, sin `--if-present`, artefactos de Playwright y LHCI.
- Validación: pedir permiso de push y confirmar con `gh run watch` que `verify`, `e2e` y `security` pasan. Deploy/smoke dependen de que Juan haga X-007.

### R-2 · Arquitectura y calidad de código

- `npm run arch:check` + revisar la config de dependency-cruiser: que vigile `presentation → infrastructure` y `domain` sin React/DOM (C-29). Ubicar `src/shared/config.ts` en una capa.
- Recorrer los 65 archivos de `src/` con este checklist: encabezado, TSDoc en español en exports, comentarios del porqué y vigentes, sin `any`/`@ts-ignore`/`console.log`/TODO sin ID, nombres en inglés, < ~200 líneas, efectos solo en infraestructura, zod en todo borde (JSON, params de URL, localStorage), errores tipados sin `catch` vacíos, `compositionRoot.ts` único que instancia adaptadores.
- `vite.config.js`: a TS si corresponde, middleware de dev seguro (sin path traversal, ignora `_plantilla`) y con prueba/bitácora. (H9)
- `engineering:code-review` sobre `src/` completo; `/simplify` o `ponytail lite` donde sobre código.

### R-3 · Contenido y multi-restaurante

- Validador: slug con sufijo, rutas dentro de su carpeta, pesos (GLB ≤ 5 MB, USDZ ≤ 8 MB, WebP ≤ 300 KB), `aprobado`+`aprobadoPor`+`fechaAprobacion`, `escalaRealCm` vs `manifest.json` (±5 %), `autorizacion`, `expira` → "demo finalizada". Una prueba con fixture inválido por regla.
- `build-content.ts`: ignora `_plantilla`, sin mezcla entre restaurantes, HTML SEO por restaurante, `/` no lista restaurantes.
- E2E de aislamiento de red en los 3 proyectos de Playwright.
- Nada inventado presentado como real en el demo.

### R-4 · AR del lado de PAGINA

- Pruebas de contrato estrictas por adaptador:
  - `QuickLookLauncher`: `<a rel="ar">` con `<img>` hija, `#allowsContentScaling=0`, URL `.usdz` absoluta.
  - `SceneViewerLauncher`: `intent://` con `resizable=false`, `mode=ar_preferred`, `S.browser_fallback_url`, GLB absoluto.
  - `ModelViewerFallbackLauncher`: `ar-scale="fixed"`, sin eventos de `window`.
  - `BrowserEnvironmentDetector`: Instagram, WhatsApp, TikTok, Facebook, Line… con `embeddedBrowserName`.
  - `CompositeArLauncher`/`launchDishAr`: sin `await` entre toque y lanzamiento, con prueba que lo demuestre. (H8)
- Flujo de UI: guía de 3 pasos con los textos de CLAUDE.md, botón "Entendido, abrir cámara" como gesto que lanza, primera vez por dispositivo (localStorage con try/catch), reabrible desde "¿Cómo funciona?", disclaimer Ley 1480, estados (cargando "Preparando tu plato…", error con Reintentar, sin AR → visor 3D a ~45° con rotación lenta, navegador embebido).
- "Ver en mi mesa" en es/en (H6). Plato sin modelo aprobado: el botón no aparece o se explica con amabilidad.
- Crear/actualizar `docs/runbooks/qa-dispositivos.md` con el checklist que Juan corre en el preview.

### R-5 · Diseño y experiencia (que sea atractiva)

- Contrastar con `DESIGN.md`/`PRODUCT.md`: tokens solo en `src/presentation/theme/` (H12); tema por restaurante (primario con AA, par tipográfico de lista cerrada, logo).
- **Revisión visual con capturas:** script Playwright que capture `/r/<slug>`, detalle del plato, guía AR, visor 3D, contacto/reserva, 404, expirado y QR en 360×640, 390, 430, 768 y 1280 (capturas en `.impeccable/review/`, ignorado por git). Revisar cada una: sin scroll horizontal, nada cortado, jerarquía clara, fotos apetitosas, una acción principal por pantalla, estética coherente y "de restaurante premium", no de plantilla.
- Accesibilidad: táctiles ≥ 48 px, texto ≥ 16 px, foco visible, labels, íconos con texto, `prefers-reduced-motion` (incluido GSAP), `env(safe-area-inset-*)`, nada con hover.
- Textos: sin tecnicismos, errores con acción, i18n es/en completo. Usar `design:design-critique`, `design:accessibility-review`, `impeccable` o `emil-design-eng` para pulir.
- Cambios visuales grandes: proponer a Juan con capturas antes/después.

### R-6 · Pruebas

- Mínimo a completar: E2E del recorrido del comensal (carta → plato → "Ver en mi mesa" → guía → lanzamiento simulado) en los 3 proyectos (C-33); accesibilidad automática con axe (aprobar dependencia) (C-32); pruebas de componentes faltantes (Menu, ArGuideModal, ArDishModal, Hero, Contacto, Reserva con enlace de WhatsApp) (C-30); regresión por cada bug de R-1…R-5.
- Sin `.skip/.only`, sin dependencia de orden ni de red real. Proponer a Juan incluir `presentation/` en cobertura.

### R-7 · Seguridad y rendimiento

- `/security-review` del código de Gemini; `npm audit`; gitleaks si está disponible.
- `public/_headers`: CSP sin terceros sin ADR (Cloudflare Analytics y model-viewer: si no tienen ADR, crearlo), `Permissions-Policy` coherente con cámara/AR, cache de assets 3D.
- Sin cookies ni rastreo identificable (Ley 1581).

### R-8 · P-601 — Demo genérica con modelos 3D reales

Objetivo: 4–5 platos del demo `ascua-demo-abcd` con `.glb` + `.usdz` + poster, a su medida real, listos para que Juan los apruebe.

1. Leer `../MENU AR - AR/apps/worker` (generators Meshy/TripoSR/InstantMesh, `normalize-scale`, `optimize`, `usdz`, `poster`) y su CLAUDE.md. **No editar ese repo.**
2. Escribir un script de orquestación **fuera del repo AR** (p. ej. `scripts/tools/generar-modelos-demo.ts` en PAGINA si Juan lo aprueba, o en el scratchpad) que importe/ejecute esas etapas con las fotos del demo, sin subir a Supabase.
3. Requisitos que Juan provee en su terminal (Sonnet nunca los lee): `HF_TOKEN` o `MESHY_API_KEY` según el generador elegido; Docker para `usd_from_gltf` (imagen del `Dockerfile` del worker). Si falta algo, detenerse y pedirlo.
4. Escala real (H14): después del pipeline, re-escalar cada GLB a su `escalaRealCm` con origen en la base (gltf-transform), y generar `manifest.json` con las medidas; el validador debe pasar con ±5 %.
5. Presupuestos: GLB ≤ 5 MB, USDZ ≤ 8 MB, poster WebP ≤ 300 KB. Revisar licencias del generador (A-201 / `docs/licencias/`).
6. Agregar al `restaurant.json` con `aprobado: false`. Verificar cómo trata la UI un modelo no aprobado y cómo puede Juan probarlo en sus celulares antes de aprobarlo (sin relajar el validador; si hace falta un mecanismo, proponerlo con ADR).
7. Juan corre el QA de `qa-dispositivos.md` y marca `aprobado`, `aprobadoPor`, `fechaAprobacion`. Documentar en el runbook del AR lo aprendido para el próximo proyecto (anotar, no implementar).

### R-9 · P-602 — Dejar listo el alta de restaurantes reales

- `docs/runbooks/nuevo-restaurante.md` al día y probado de punta a punta: copiar `_plantilla`, slug con sufijo aleatorio, autorización, tema (validar contraste AA), fotos WebP, modelos, QR imprimible (`/r/<slug>/qr`), expiración y borrado.
- Script/comando de ayuda para crear la carpeta con slug válido (si no existe).
- Probar el flujo con 2–3 restaurantes de ejemplo **ficticios y claramente marcados** como tales solo en fixtures de prueba (no publicados), y E2E de aislamiento entre ellos.
- Los restaurantes reales los agrega Juan con su autorización.

### R-10 · Documentación y cierre

- `docs/ESTADO.md` veraz (matriz de R-0 al día, sin afirmaciones falsas).
- Bitácoras retroactivas breves de Lotes 5–7, P-205, P-701–P-704 y commits de `vite.config.js`, marcadas "reconstruida en revisión".
- README por capa, `docs/ARQUITECTURA.md` con el recorrido de "Ver en mi mesa", README raíz, ADR por decisión nueva.
- `engineering:tech-debt` → deuda en ESTADO.md (incluye lo que se pasa al proyecto del AR). `/graphify . --update`.
- Preparar (sin abrir) PR `dev/Juanjo → main` con plantilla y `engineering:deploy-checklist`; esperar orden de Juan.

---

## 3. Sesiones sugeridas

| Sesión | Fases                | Cierre                                               |
| ------ | -------------------- | ---------------------------------------------------- |
| 1      | R-0                  | Inventario + matriz commiteados, decisiones a Juan   |
| 2      | R-1                  | CI verde (salvo deploy/smoke, X-007)                 |
| 3      | R-2 + R-3            | verify verde                                         |
| 4      | R-4 + R-6 (parte AR) | Pruebas de contrato + checklist QA                   |
| 5      | R-5 + resto de R-6   | Capturas revisadas, E2E comensal + a11y              |
| 6      | R-8                  | Modelos generados, a la espera de aprobación de Juan |
| 7      | R-7 + R-9 + R-10     | Docs al día, PR preparado                            |

Cada sesión cierra con el protocolo "Al cerrar" de CLAUDE.md y deja el **siguiente paso exacto** en ESTADO.md.

## 4. Verificación final ("revisión terminada")

- `npm run verify` y `npm run test:e2e` verdes en Windows; jobs `verify`, `e2e` (con Lighthouse) y `security` verdes en GitHub Actions para el último commit de `dev/Juanjo`.
- Matriz de cumplimiento sin ❌ sin explicar; cada ⚠️ con tarea.
- Capturas en 5 anchos sin scroll horizontal ni elementos cortados, y aprobadas por Juan.
- Demo con 4–5 platos 3D a medida real, QA de Juan en iPhone y Android hecho y modelos aprobados por él.
- Runbook de alta de restaurantes probado de punta a punta.
- ESTADO.md veraz, bitácoras completas, grafo actualizado, PR preparado sin abrir.

## 5. Prompt de arranque para Sonnet

> Eres el revisor del repo ASCUA-DEMO-PAGINA. Lee completos `CLAUDE.md`, `docs/ESTADO.md` y `docs/PLAN-REVISION.md`, y luego el contexto de su §0.2, incluidas todas las bitácoras de `docs/sesiones/` (son el registro de lo que hizo Gemini). Ejecuta la **sesión 1 (R-0)**: protocolo de inicio, línea base, análisis con `gh` de los runs fallidos de GitHub Actions, recorrido de la app como comensal en 360×640, e inventario de hallazgos más la matriz de cumplimiento en `docs/revision/inventario.md`. En esta sesión no cambies código. No confíes en las bitácoras: verifica cada afirmación con código y comandos. Al terminar, resúmeme en español los hallazgos 🔴 y las decisiones que necesitas de mí. Nunca hagas push sin que te lo pida.
>
> En sesiones siguientes: "Continúa con la siguiente sesión de `docs/PLAN-REVISION.md` según el siguiente paso exacto de `docs/ESTADO.md`."
