# Inventario de revisión (R-0) — 2026-10-09

> Sesión 1 de `docs/PLAN-REVISION.md`. Todo lo de aquí abajo fue **verificado con código y comandos**,
> no copiado de las bitácoras de Antigravity/Gemini. Donde una bitácora afirmaba algo que no coincidía
> con el código, se anota explícitamente.

## 0. Línea base ejecutada

| Comando                                                                 | Resultado                                                                                                                                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `git branch --show-current`                                             | `dev/Juanjo` ✅                                                                                                                                                                 |
| `git pull`                                                              | Already up to date                                                                                                                                                              |
| `git status`                                                            | Solo `graphify-out/*` modificado (sin commitear desde antes de esta sesión)                                                                                                     |
| `node -v`                                                               | v22.13.0 ✅                                                                                                                                                                     |
| `npm run lint`                                                          | 0 avisos / 0 errores ✅                                                                                                                                                         |
| `npm run typecheck`                                                     | 0 errores ✅                                                                                                                                                                    |
| `npm run test:coverage`                                                 | 20 archivos, 103 pruebas, **todas pasan**. Cobertura global: 97.11 % líneas, 91.12 % ramas, 95.12 % funciones, 97.44 % líneas — **por encima** de los umbrales (90/85/90/90) ✅ |
| `npm run arch:check`                                                    | 0 violaciones (64 módulos, 150 dependencias) ✅                                                                                                                                 |
| `npm run content:validate`                                              | ✅ con 1 advertencia (asset duplicado `filete.webp`, ver R-3-1)                                                                                                                 |
| `npm run format:check`                                                  | 4 archivos sin formatear: `.dependency-cruiser.cjs` y los 3 de `graphify-out/`                                                                                                  |
| `npm run build`                                                         | ✅ Genera `dist/r/ascua-demo-abcd` y `dist/data/ascua-demo-abcd` correctamente                                                                                                  |
| `npm run test:e2e` (modo normal)                                        | 9/9 pasan ✅                                                                                                                                                                    |
| `npm audit` (todo, incl. dev)                                           | 25 vulnerabilidades (2 low, 6 moderate, 17 high) — todas en herramientas de desarrollo (`inquirer`→`tmp`, `uuid`)                                                               |
| `npm audit --omit=dev --audit-level=high` (el que corre CI)             | **0 vulnerabilidades** ✅                                                                                                                                                       |
| `npm run licenses:check`                                                | Pasa, solo `zod` como dependencia de producción, licencia MIT ✅                                                                                                                |
| `npx lhci autorun` con la URL del `lighthouserc.json` (`/r/ascua-demo`) | 🔴 Falla: ese slug no existe                                                                                                                                                    |
| Lighthouse contra la URL real (`/r/ascua-demo-abcd`)                    | performance 0.94, accesibilidad 0.94, mejores prácticas 1.00, SEO 0.92 — **las 4 categorías pasan** el umbral de 0.9                                                            |

**Conclusión clave:** el código en `HEAD` de `dev/Juanjo` está en mejor estado de lo que sugieren los `runs` fallidos de GitHub Actions — varios de esos `runs` corresponden a commits intermedios ya corregidos por commits posteriores. El problema real y vigente de CI es **uno solo** (R-101/R-102 abajo), no una acumulación de bugs de código.

## 1. Análisis de GitHub Actions (`gh run list` + `gh api .../logs`)

25 ejecuciones de `Deploy` en `dev/Juanjo`. Clasificación:

- **14 fallaron o se cancelaron en commits intermedios** ya corregidos por un commit posterior (ej. cobertura 86.8 % en el commit de las 20:11:25 del 7-oct, subida a 97.11 % en el commit final). No requieren acción: son historia, no estado actual.
- **El run del último commit** (`176ed95`, id `37687675153`, 2026-10-07 21:11): `verify` ✅, `security` ✅, `e2e` → Playwright ✅ pero **Lighthouse CI ❌**. Este es el único fallo vigente.

### Causa raíz de la falla de Lighthouse CI (confirmada reproduciendo el job localmente)

1. El job `e2e` de `ci.yml` descarga el artefacto `dist` (generado por `verify` con el contenido real, `ascua-demo-abcd`).
2. El paso "E2E (Desktop, Pixel, iPhone)..." corre `npm run test:e2e`. El `webServer` de `playwright.config.ts` tiene `reuseExistingServer: !process.env.CI` → en CI **siempre reconstruye**, ejecutando `npm run build` con `CONTENT_DIR=./tests/fixtures/restaurants`. Esto **sobrescribe por completo** `dist/r/` y `dist/data/`, dejando solo `rest-a-1234` y `rest-b-5678` (los restaurantes de prueba) y **borrando** `ascua-demo-abcd`.
   - **Verificado en vivo:** `rm -rf dist && npm run build` → `dist/r` tiene `ascua-demo-abcd`. Luego `CI=true npm run test:e2e` → `dist/r` y `dist/data` quedan con `rest-a-1234`/`rest-b-5678` únicamente.
3. El siguiente paso del mismo job, "Lighthouse CI", corre sobre ese mismo `dist` ya sobrescrito, y además `lighthouserc.json` pide la URL `http://localhost:4173/r/ascua-demo` (slug equivocado — el real es `ascua-demo-abcd`, y ni siquiera existe ya en ese `dist`).
4. Resultado: Lighthouse mide una página que no existe (probablemente la ruta 404 o el fallback de la SPA), de ahí los scores bajos (0.85 / 0.86) vistos en el run de GitHub Actions.

**Esto no es un problema de rendimiento o accesibilidad real de la página** — al apuntar Lighthouse a la URL correcta sobre un `dist` no sobrescrito, las 4 categorías pasan 0.9 sin tocar nada más (ver tabla de arriba). El arreglo es de configuración de CI (separar el `dist` de las pruebas E2E del `dist` que mide Lighthouse, y corregir el slug), no una tarea de optimización de rendimiento.

## 2. Recorrido de la app como comensal (360×640)

No se pudo abrir un navegador real en esta sesión (sin herramienta de browser disponible); el recorrido visual con capturas en los 5 anchos queda para la sesión de diseño (R-5), como indica el plan. En su lugar se revisó el código de cada pantalla del flujo (`LandingPage`, `RestaurantPage`/`Menu`, `ArGuideModal`, `ArDishModal`, `QrPage`, `NotFoundPage`, `ExpiredPage`) y se encontraron los hallazgos de contenido/robustez listados abajo (H15, H16).

## 3. Hallazgos verificados

### 🔴 Críticos

| ID          | Hallazgo                                                                                                                                                                                                                                                                                                                                                                                                                   | Evidencia                                                                                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **R-1-H1**  | Lighthouse CI falla porque el paso de Playwright sobrescribe el `dist` real con los restaurantes de prueba, y además `lighthouserc.json` apunta a un slug que no existe (`ascua-demo` en vez de `ascua-demo-abcd`). Con la URL correcta y el `dist` real, Lighthouse pasa las 4 categorías.                                                                                                                                | Reproducido en vivo (ver §1); `playwright.config.ts:31`, `lighthouserc.json:4`                                                                                                          |
| **R-1-H2**  | `deploy.yml` (job `smoke`) ejecuta `npm run test:smoke`, que **no existe** en `package.json`. Cualquier despliegue real (cuando Juan configure Cloudflare, X-007) fallará en este paso.                                                                                                                                                                                                                                    | `package.json` scripts, `deploy.yml`                                                                                                                                                    |
| **R-4-H16** | `ArGuideModal.tsx:119` y `Menu.tsx:51` llaman `localStorage.getItem/setItem` **sin `try/catch`**, igual que `LanguageProvider.tsx`. En Safari en modo privado (frecuente en iPhone) estas llamadas pueden lanzar excepción y romper exactamente el botón que el comensal toca para ver el plato en AR. `LocalStorageSoldOutStore.ts` sí lo protege — el patrón correcto ya existe en el código, solo falta aplicarlo aquí. | `src/presentation/components/ArGuideModal.tsx:119`, `Menu.tsx:51`, `src/presentation/i18n/LanguageProvider.tsx:9,21` vs. `src/infrastructure/storage/LocalStorageSoldOutStore.ts:14-33` |
| **R-8-H13** | No existe ningún archivo `.glb`/`.usdz` real en ninguno de los dos repos — solo placeholders de 12-14 bytes en `_plantilla`. El validador exige `aprobado: true` para publicar un plato con modelo, así que hoy **ningún plato real tiene AR funcional** en la demo. Bloquea P-601.                                                                                                                                        | `content/restaurants/*/assets/`, búsqueda en ambos repos                                                                                                                                |

### 🟠 Importantes

| ID          | Hallazgo                                                                                                                                                                                                                                                                                                                                        | Evidencia                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **R-2-H6**  | `vitest.config.js` excluye `src/presentation/` de la cobertura. La capa de UI (más de la mitad del código) no tiene ningún umbral exigido; el 97 % de cobertura solo mide `domain/application/infrastructure`.                                                                                                                                  | `vitest.config.js:25`                                                                                                          |
| **R-1-H7**  | No existe `public/robots.txt`. La regla catch-all de SPA (`_redirects`) sirve `index.html` en esa ruta, y Lighthouse detecta "robots.txt no es válido (29 errores)" porque recibe HTML.                                                                                                                                                         | `dist/robots.txt` tras build = el `index.html` completo                                                                        |
| **R-7-H8**  | El CSP en `public/_headers` permite `static.cloudflareinsights.com` y `cloudflareinsights.com` sin que exista un ADR que lo autorice, violando la regla explícita de CLAUDE.md ("CSP sin dominios de terceros salvo los aprobados en un ADR").                                                                                                  | `public/_headers:7`, `ls docs/adr/` (solo 3 ADR, ninguno sobre Cloudflare)                                                     |
| **R-5-H9**  | `Reserva.tsx:10` usa `className="bg-[#EFE8DD] ..."` — color hex quemado en un componente, prohibido por CLAUDE.md (los colores van solo como tokens).                                                                                                                                                                                           | `src/presentation/components/Reserva.tsx:10`                                                                                   |
| **R-4-H15** | El texto real de la guía de AR (`translations.ts:84-101`, usado también como _fallback_ en `ArGuideModal.tsx`) no coincide con el que exige CLAUDE.md §0.2: faltan el paso "acércate o camina alrededor" y la frase explícita "aparece en su tamaño real"; el orden y la redacción de los otros dos pasos también difieren del texto normativo. | `src/presentation/i18n/translations.ts:84-101` vs. CLAUDE.md §0.2 "Experiencia AR"                                             |
| **R-5-H17** | El disclaimer `"Modelo referencial. La presentación puede variar."` (`translations.ts:82,217`) puede leerse como que contradice la garantía de escala real fija exigida por la Ley 1480 — necesita una redacción que Juan apruebe (p. ej. aclarar que varía el emplatado/guarnición, no el tamaño).                                             | `src/presentation/i18n/translations.ts:82`                                                                                     |
| **R-6-H10** | Solo existe 1 archivo de pruebas E2E (`tests/e2e/isolation.spec.ts`, 9 pruebas: aislamiento + 404 + expirado). No hay recorrido del comensal (carta → plato → "Ver en mi mesa" → guía) ni pruebas de accesibilidad automatizadas, aunque el paso de CI se llama "E2E... + accesibilidad + aislamiento".                                         | `tests/e2e/` (1 archivo)                                                                                                       |
| **R-3-H11** | `scripts/validate-content.ts` valida `aprobado` pero **no** valida que existan `aprobadoPor`/`fechaAprobacion` cuando `aprobado: true`, ni compara `escalaRealCm` contra ningún `manifest.json` (ese mecanismo no existe todavía). Bloqueará la aprobación segura de los modelos de P-601 si no se completa antes.                              | `scripts/validate-content.ts` (sin referencias a `escalaRealCm`/`manifest`); esquema sí los define en `src/domain/ar.ts:24-32` |
| **R-8-H14** | El pipeline de generación 3D del repo hermano (`MENU AR - AR/apps/worker/src/pipeline/normalize-scale.ts:39`) fija **todos** los platos a un tamaño objetivo único (`TARGET_SIZE_METERS`), no a la medida real por plato (`escalaRealCm`) que exige PAGINA. Hay que reescalar cada modelo después del pipeline, no usarlo tal cual.             | `../MENU AR - AR/apps/worker/src/pipeline/normalize-scale.ts:39`                                                               |

### 🟡 Menores

| ID       | Hallazgo                                                                                                                                                                                                                                                                                                | Evidencia                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| R-1-H3   | Varias acciones de los workflows usan tags flotantes (`actions/upload-artifact@v4`, `download-artifact@v4`, `gitleaks/gitleaks-action@v2`, `cloudflare/wrangler-action@v3`) con `TODO(X-008)` pendiente; cada run muestra avisos de Node 20 deprecado; `ubuntu-latest` migra a Ubuntu 26 el 2026-10-19. | `ci.yml`, `deploy.yml`, anotaciones de los runs                     |
| R-1-H4   | `--if-present` sigue en los pasos de `ci.yml` (P-705 pedía quitarlo una vez los scripts existieran; ya existen todos).                                                                                                                                                                                  | `ci.yml`                                                            |
| R-2-H5   | `npm run licenses:check` usa `npx license-checker` (no está fijado como devDependency, se descarga en cada corrida). Funciona hoy, pero no es reproducible ni rápido.                                                                                                                                   | `package.json` script `licenses:check`                              |
| R-8-H12  | `content:validate` reporta una advertencia de asset duplicado (`filete.webp` repetido dentro de `ascua-demo-abcd/assets/`) — no rompe nada, pero conviene limpiarlo.                                                                                                                                    | salida de `npm run content:validate`                                |
| R-10-H18 | Faltan bitácoras de: Lote 5, Lote 6, Lote 7, P-205, P-701–P-704, y los 2 últimos commits sueltos de `vite.config.js` (alias `@` y middleware de contenido en dev). Ninguno tiene ID de tarea ni prueba de regresión asociada visible en el historial de commits.                                        | `docs/sesiones/` (17 archivos, faltan los de esas fases), `git log` |
| R-10-H19 | `graphify-out/*` llegó modificado y sin commitear al inicio de esta sesión (no se tocó, se deja para que Juan decida).                                                                                                                                                                                  | `git status` al inicio                                              |
| R-5-H20  | `format:check` marca 4 archivos sin formatear: `.dependency-cruiser.cjs` y los 3 de `graphify-out/`.                                                                                                                                                                                                    | salida de `npm run format:check`                                    |
| R-10-H21 | README.md trae el badge de cobertura en 98 % y el texto en 97 %/91 %; ambos son aproximadamente correctos hoy (97.11 %/91.12 %) pero conviene que el badge se genere o se actualice junto con el número real en cada cierre de sesión.                                                                  | `README.md:16,384`                                                  |

## 4. Matriz de cumplimiento

Leyenda: ✅ hecho y verificado · ⚠️ parcial o con hallazgo · ❌ no hecho · 🚫 bloqueado (depende de algo externo)

### Fase 0 — Fundaciones

| ID                           | Declarado                   | Real | Evidencia                                                                                                                                                                         |
| ---------------------------- | --------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| X-000–X-010                  | ✅ (bitácora "fundaciones") | ✅   | Node 22 fijado (`engines`), Husky con `pre-commit`/`pre-push`/`post-commit`/`post-checkout`, grafo en `graphify-out/`, sin Supabase ni credenciales de terceros en `.env.example` |
| P-101 TypeScript/Vitest      | ✅                          | ✅   | `tsconfig.json` estricto, `vitest.config.js`, 0 errores de tipos                                                                                                                  |
| P-102 Dominio puro + Zod     | ✅                          | ✅   | `src/domain/*.ts`, sin imports de React/DOM                                                                                                                                       |
| P-103 Puertos y casos de uso | ✅                          | ✅   | `src/application/ports/`, `use-cases/`, 100 % cobertura en esa capa                                                                                                               |

### Fase P-1 — Re-arquitectura

| ID                              | Declarado | Real | Evidencia                                                                                                                                          |
| ------------------------------- | --------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-104 Adaptadores AR            | ✅        | ✅   | `QuickLookLauncher`/`SceneViewerLauncher`/`ModelViewerFallbackLauncher`/`BrowserEnvironmentDetector`, pruebas de contrato en `arLaunchers.test.ts` |
| P-105 Repositorio estático      | ✅        | ✅   | `StaticJsonRestaurantRepository.ts`, valida slug + Zod                                                                                             |
| P-106 Composition root y router | ✅        | ✅   | `src/app/compositionRoot.ts`, `router.tsx` (movido desde `src/app` original a su ubicación actual sin romper nada)                                 |
| P-107 Store reactivo (Jotai)    | ✅        | ✅   | `src/presentation/state/restaurantStore.ts`                                                                                                        |
| P-108 `arch:check` en CI        | ✅        | ✅   | `.dependency-cruiser.cjs`, 0 violaciones, corre en `ci.yml`                                                                                        |

### Fase P-2 — Multi-restaurante

| ID                           | Declarado         | Real | Evidencia                                                                                                               |
| ---------------------------- | ----------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| P-201 Esquema de contenido   | ✅                | ✅   | `_plantilla/restaurant.json`, `src/domain/restaurant.ts`                                                                |
| P-202 Validador de contenido | ✅                | ⚠️   | Valida slug, rutas, pesos, `aprobado`; **no** valida `aprobadoPor`/`fechaAprobacion`/`escalaRealCm` (R-3-H11)           |
| P-203 Build + HTML SEO       | ✅                | ✅   | `scripts/build-content.ts`, genera `dist/r/<slug>/index.html` con OG tags y `noindex`                                   |
| P-204 E2E de aislamiento     | ✅                | ⚠️   | Existe y pasa (9 pruebas), pero es la única suite E2E del proyecto                                                      |
| P-205 QR imprimible          | ✅ (sin bitácora) | ✅   | `QrPage.tsx`, `react-qr-code`, prueba en `tests/unit/presentation/pages/QrPage.test.tsx` — falta la bitácora (R-10-H18) |

### Fase P-3 — Funciones de la demo

| ID                                             | Declarado                      | Real | Evidencia                                                                                                                                                             |
| ---------------------------------------------- | ------------------------------ | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-301 Reservas / P-302 Demo Panel              | ✅                             | ✅   | `Reserva.tsx`, `DemoPanel.tsx`, `LocalStorageSoldOutStore.ts`                                                                                                         |
| P-303 Feedback / P-304 Analítica / P-305 Legal | ✅                             | ✅   | `Pie.tsx`, `CloudflareAnalyticsTracker.ts`, disclaimers en `translations.ts` (aunque uno necesita revisión de wording, R-5-H17)                                       |
| P-306 Guía AR / P-308 Ayuda y estados          | ✅                             | ⚠️   | Modal y `FloatingHelp.tsx` existen y funcionan, pero el texto no coincide con el requerido por CLAUDE.md (R-4-H15)                                                    |
| P-307 Medida real por plato                    | 🚫 bloqueado (según ESTADO.md) | 🚫   | Confirmado: solo escala fija global (`ar-scale="fixed"`/`allowsContentScaling=0`); sin modelos reales no hay `escalaRealCm` que aplicar. Correcto que esté bloqueado. |

### Fase P-4 — Diseño

| ID                            | Declarado | Real | Evidencia                                                       |
| ----------------------------- | --------- | ---- | --------------------------------------------------------------- |
| P-401 Tokens desde DESIGN.md  | ✅        | ✅   | `src/presentation/theme/tokens.css`                             |
| P-402 Contraste AA validado   | ✅        | ✅   | Chequeo en `validate-content.ts`, plantilla con color accesible |
| P-403 Rediseño de componentes | ✅        | ⚠️   | Hecho, pero con 1 color hex quemado fuera de tokens (R-5-H9)    |

### Lotes de correcciones (Gemini/Antigravity)

| Lote                | Declarado                                                                  | Real                                                                                                                                                               |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lote 1 (C-01–C-09)  | ✅                                                                         | ✅ — confirmado: sin `any`, 0 avisos de lint, umbrales de cobertura activos y superados                                                                            |
| Lote 2 (C-10, C-11) | ✅                                                                         | ✅ — `assetPathSchema` bloquea path traversal y URLs absolutas; Scene Viewer usa URL de GLB absoluta                                                               |
| Lote 3 (C-12–C-21)  | ✅                                                                         | ✅ — demo `ascua-demo-abcd` con 8 platos, tema/logo/par tipográfico dinámicos, `LanguageProvider` envolviendo la página del restaurante                            |
| Lote 4 (C-22–C-26)  | ✅                                                                         | ✅ — `CompositeArLauncher` sin `await` antes de delegar, llamada desde el gesto confirmada en `Menu.tsx`, sin eventos fantasma de `window` en el visor de respaldo |
| Lote 5 (C-27–C-29)  | Sin bitácora                                                               | ✅ (código) / ⚠️ (documentación) — la capa `presentation/` existe y `arch:check` no reporta violaciones, pero falta la bitácora (R-10-H18)                         |
| Lote 6 (C-30–C-33)  | Sin bitácora, sin mención en ESTADO.md                                     | ❌                                                                                                                                                                 | `Menu.tsx` ya está razonablemente dividido (`DishCard` extraído), pero **no hay** pruebas de accesibilidad automatizadas ni E2E del recorrido del comensal |
| Lote 7 (C-34, C-35) | "README actualizado (101 tests, 97%)" según commit, sin bitácora de cierre | ⚠️                                                                                                                                                                 | README existe y está casi al día (números con pequeño desajuste, R-10-H21); falta la bitácora de cierre del lote                                           |

### Fase 7 — Endurecimiento

| ID                           | Declarado                     | Real | Evidencia                                                                                                 |
| ---------------------------- | ----------------------------- | ---- | --------------------------------------------------------------------------------------------------------- |
| P-701 Cabeceras de seguridad | ✅                            | ⚠️   | `_headers` existe y es razonable, pero el dominio de Cloudflare Analytics en el CSP no tiene ADR (R-7-H8) |
| P-702 Presupuesto Lighthouse | ✅                            | 🔴   | Configurado pero roto (R-1-H1); una vez arreglada la configuración, los presupuestos sí se cumplen        |
| P-703 Reporte de seguridad   | ✅                            | ✅   | `docs/seguridad/2026-10-07.md` existe                                                                     |
| P-704 Licencias              | ✅                            | ⚠️   | Pasa, pero frágil/no reproducible (R-2-H5)                                                                |
| P-705 Quitar `--if-present`  | No mencionado como completado | ❌   | Confirmado: sigue presente en `ci.yml`                                                                    |

### Fase 6 — Contenido de la demo

| ID                                 | Estado                                                      |
| ---------------------------------- | ----------------------------------------------------------- |
| P-601 Demo genérica con modelos 3D | 🚫 bloqueado — cero modelos reales en ambos repos (R-8-H13) |
| P-602 Primeros 3 restaurantes      | 🚫 bloqueado — depende de P-601                             |

## 5. Decisiones que necesito de Juan antes de seguir a la sesión 2 (R-1)

1. **`graphify-out/*` sin commitear:** ¿lo dejo tal cual para que quede en el próximo `/graphify . --update`, o lo descarto con `git checkout -- graphify-out/` antes de seguir?
2. **Umbral de Lighthouse:** una vez arreglada la configuración (R-1), las 4 categorías ya pasan 0.9 sin tocar código de rendimiento. ¿Confirmas que me quedo en ese umbral (90) o prefieres subirlo ahora que sabemos que se cumple con margen?
3. **Texto de la guía de AR (R-4-H15):** ¿apruebas que reescriba los 3 pasos para que coincidan exactamente con el texto de CLAUDE.md ("apunta a tu mesa → mueve el teléfono despacio hasta que aparezca el plato → acércate o camina alrededor", con "aparece en su tamaño real" y "funciona mejor con buena luz"), o prefieres mantener el tono actual y yo solo agrego el paso y la frase que faltan?
4. **Disclaimer "Modelo referencial. La presentación puede variar." (R-5-H17):** ¿lo dejamos así, o lo aclaro para que no se confunda con el tamaño (p. ej. "El modelo representa el plato a su tamaño real; el emplatado puede variar ligeramente")?
5. **CSP de Cloudflare Analytics (R-7-H8):** ¿apruebo con un ADR corto el dominio que ya está en `_headers`, o prefieres quitarlo y usar otro mecanismo de analítica?
6. **Bitácoras faltantes (R-10-H18):** ¿las reconstruyo retroactivamente ahora (marcadas "reconstruida en revisión") o lo dejo para el cierre de toda la revisión (R-10), como dice el plan?

Con tu visto bueno en estos puntos, sigo con la **sesión 2 (R-1): dejar GitHub Actions en verde.**
