# Graph Report - MENU AR - PAGINA (2026-10-11)

## Corpus Check

- 181 files · ~602,245 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 23 file(s) not represented in the graph (top: (none) 9, .woff2 8, .css 2)

## Summary

- 975 nodes · 1738 edges · 75 communities (57 shown, 18 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 188 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `0a46c33f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- 4. Matriz de cumplimiento
- Product
- package.json
- StaticJsonRestaurantRepository
- 🔥 Ascua – Demo Multi-restaurante
- scripts
- devDependencies
- rules
- Plan de implementación — Ascua (PITS)
- sweetgreen — Style Reference
- CLAUDE.md — ASCUA-DEMO-PAGINA
- compilerOptions
- ar.ts
- doubles.ts
- Configuraci?n de Dependabot
- ADR-0001: Demo estática multi-restaurante en Cloudflare Pages
- Correcciones antes de continuar — ASCUA-DEMO-PAGINA
- pull_request_template.md
- English
- Menu.tsx
- rules/graphify.md
- workflows/graphify.md
- PROCEDENCIA.md
- Pasos
- README.md
- Runbook — Configuración manual de GitHub y Cloudflare (X-006, X-007, X-008)
- Bitácora de Sesión: P-108 Reglas de Arquitectura en CI
- Estado del proyecto — ASCUA-DEMO-PAGINA
- ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP
- ADR 0003: Sistema de diseño adaptable
- SoldOutStore
- Sesión 2026-10-07 — lote-3
- gsap
- Paso a paso
- dependencies
- Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados)
- Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante)
- Bitácora de Sesión: P-403 Rediseño de componentes
- Ascua — landing de "cocina de autor" (Histórico)
- Checklist — recorrido del comensal
- Runbook — Credenciales del pipeline de modelos 3D (preparación para R-8 / P-601)
- Bitácora de Sesión: P-201 Esquema de Contenido v1
- Bitácora de Sesión: P-202 Validador de Contenido
- Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante
- Cyber Neo Security Report
- 2. Fases
- X-007 — Cloudflare Pages (Direct Upload) + secrets en GitHub
- AnalyticsTracker
- carta.mjs
- vite.config.js
- `infrastructure/`
- LocalStorageUiPreferencesStore.ts
- @playwright/test
- Sesión 2026-10-06 — fundaciones
- Auditoría de seguridad — R-7 (revisión post-Antigravity)
- ADR 0002: Estado global con Jotai
- engines
- lint-staged
- shared/README.md
- @testing-library/jest-dom
- Sesión 2026-10-07 — P-701 a P-704
- Sesión 2026-10-07 — lote-5
- Sesión 2026-10-07 — ajustes de vite.config.js y cierre parcial del Lote 7
- AGENTS.md — ASCUA-DEMO-PAGINA
- restaurant.ts
- Sesión 2026-10-09 — Lote 6 (parcial): E2E del recorrido del comensal
- Bitácora de Sesión: P-107 Store Reactivo Global (Jotai)
- Sesión 2026-10-07 — P-205

## God Nodes (most connected - your core abstractions)

1. `vitest` - 32 edges
2. `Restaurant` - 30 edges
3. `Dish` - 23 edges
4. `ArLauncher` - 22 edges
5. `Fase P-1 — Re-arquitectura de PAGINA` - 22 edges
6. `🔥 Ascua – Demo Multi-restaurante` - 22 edges
7. `scripts` - 20 edges
8. `ArLaunchMode` - 19 edges
9. `Carpetas` - 19 edges
10. `useDependencies()` - 18 edges

## Surprising Connections (you probably didn't know these)

- `5.1 PAGINA` --references--> `ArLauncher` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/arLauncher.ts
- `6. ¿Qué dispositivo detectó, en realidad?` --references--> `EnvironmentDetector` [INFERRED]
  docs/ARQUITECTURA.md → src/application/ports/environmentDetector.ts
- `Contexto` --references--> `Restaurant` [INFERRED]
  docs/adr/0002-estado-global-con-jotai.md → src/domain/restaurant.ts
- `Acciones realizadas` --references--> `Restaurant` [INFERRED]
  docs/sesiones/2026-10-06-P107-Jotai-Store.md → src/domain/restaurant.ts
- `C-09 · Cobertura que mide lo que dice` --references--> `LocalStorageSoldOutStore` [INFERRED]
  docs/Correcciones antes de continuar.md → src/infrastructure/storage/LocalStorageSoldOutStore.ts

## Import Cycles

- None detected.

## Communities (75 total, 18 thin omitted)

### Community 0 - "4. Matriz de cumplimiento"

Cohesion: 0.12
Nodes (16): 0. Línea base ejecutada, 1. Análisis de GitHub Actions (`gh run list` + `gh api .../logs`), 3. Hallazgos verificados, 4. Matriz de cumplimiento, 5. Decisiones que necesito de Juan antes de seguir a la sesión 2 (R-1), Causa raíz de la falla de Lighthouse CI (confirmada reproduciendo el job localmente), 🔴 Críticos, Fase 0 — Fundaciones (+8 more)

### Community 1 - "Product"

Cohesion: 0.20
Nodes (10): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles (+2 more)

### Community 2 - "package.json"

Cohesion: 0.09
Nodes (22): name, private, type, version, autoprefixer, dependency-cruiser, @google/model-viewer, husky (+14 more)

### Community 4 - "StaticJsonRestaurantRepository"

Cohesion: 0.11
Nodes (15): C-10 · Rutas seguras y resueltas _(primero las pruebas)_, C-11 · Scene Viewer con URL absoluta, Lote 2 — Rutas de assets _(hoy las fotos y los modelos no cargan)_, Bitácora de Sesión: P-104 Adaptadores AR, Objetivos, Siguiente Tarea, Acciones realizadas, Bitácora de Sesión: P-105 Repositorio Estático (+7 more)

### Community 5 - "🔥 Ascua – Demo Multi-restaurante"

Cohesion: 0.06
Nodes (31): 9. Backlog por fases, Fase 0 — Fundaciones (ambos repos), Fase 5 — Estudio 3D (repo AR), Fase 6 — Contenido de la demo, Fase 7 — Endurecimiento y lanzamiento v1.0.0, Fase 8 — Plataforma ARFOODS (solo después de validar), Fase A — Saneamiento de ARFOODS (en paralelo con Fase P-1), Fase P-2 — Multi-restaurante (+23 more)

### Community 6 - "scripts"

Cohesion: 0.09
Nodes (22): Workflow CI (verify), Workflow Deploy Cloudflare Pages, scripts, arch:check, build, build:e2e, content:validate, dev (+14 more)

### Community 7 - "devDependencies"

Cohesion: 0.08
Nodes (25): devDependencies, autoprefixer, @axe-core/playwright, dependency-cruiser, ffmpeg-static, husky, jsdom, @lhci/cli (+17 more)

### Community 8 - "rules"

Cohesion: 0.29
Nodes (6): plugins, rules, react/only-export-components, react/rules-of-hooks, typescript/no-explicit-any, $schema

### Community 10 - "Plan de implementación — Ascua (PITS)"

Cohesion: 0.07
Nodes (29): 0. Cómo usar este documento, 10. Definición de terminado (DoD) — aplica a toda tarea, 11. Riesgos, 12. Registro de cambios del plan, 1. Resumen ejecutivo y decisiones, 2. Línea base verificada (5 oct 2026), 3.1 Capas (Clean Architecture ligera), 3.2 Estructura de carpetas objetivo (+21 more)

### Community 11 - "sweetgreen — Style Reference"

Cohesion: 0.05
Nodes (39): Agent Prompt Guide, Border Radius, Components, CSS Custom Properties, Do, Do's and Don'ts, Don't, Elevation (+31 more)

### Community 12 - "CLAUDE.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.11
Nodes (19): 0.1 Arquitectura (regla de capas — se verifica con dependency-cruiser), 0. Contexto del proyecto, 10. Prohibiciones rápidas, 1. Protocolo de sesión (obligatorio), 2. Git y flujo de entrega, 3. Calidad: Definición de terminado (DoD), 4.1 Comentarios y documentación: el código se explica solo, 4. Principios de código (+11 more)

### Community 13 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, checkJs, esModuleInterop, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "ar.ts"

Cohesion: 0.08
Nodes (42): 0.2 Reglas específicas de este repo, 5. Caso de uso: decidir y lanzar, R-4 (pruebas de contrato AR) y runbooks manuales — 2026-10-09 noche, 3.3 Principios SOLID aplicados (concreto, no teórico), Fase P-1 — Re-arquitectura de PAGINA, R-4 · AR del lado de PAGINA, Fase P-1 — Re-arquitectura, Decisiones tomadas (+34 more)

### Community 15 - "doubles.ts"

Cohesion: 0.08
Nodes (28): @testing-library/react, vitest, `app/`, AppDependencies, RestaurantRepository, UiPreferencesStore, ReservationParams, GetRestaurantResult (+20 more)

### Community 18 - "ADR-0001: Demo estática multi-restaurante en Cloudflare Pages"

Cohesion: 0.22
Nodes (8): A. Estática + contenido versionado (elegida), ADR-0001: Demo estática multi-restaurante en Cloudflare Pages, B. ARFOODS completo (Next.js + Supabase) en planes gratuitos, C. Un repo/despliegue por restaurante, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 19 - "Correcciones antes de continuar — ASCUA-DEMO-PAGINA"

Cohesion: 0.04
Nodes (48): 0. Reglas para el agente (léelas siempre), 1. Qué encontró la revisión, C-01 · Archivos generados fuera del repositorio, C-02 · Borrar el código muerto, C-03 · Avisos de lint en cero, C-04 · Sin `any`, C-05 · `index.html` neutro y móvil, C-06 · Marca de terceros fuera y tipografías propias (+40 more)

### Community 20 - "pull_request_template.md"

Cohesion: 0.33
Nodes (5): Cómo se probó, Qué cambia y por qué, Revisión, Riesgos y rollback, Tarea(s)

### Community 21 - "English"

Cohesion: 0.20
Nodes (9): English, Español, Landing Ascua Original, Lo que arde (Fuego), Manifesto, Manifiesto, Voces (Testimonios), Voices (Testimonials) (+1 more)

### Community 22 - "Menu.tsx"

Cohesion: 0.06
Nodes (61): 2. ¿Ya vio la guía en este dispositivo?, Pendientes detectados (fuera de alcance de la tarea actual), R-10 (documentación y cierre) — 2026-10-09 noche, R-5-bis — Rediseño con `frontend-design` y `ui-ux-pro-max`, R-6 (C-30, pruebas de componente) — 2026-10-09 noche, R-6 (C-32, accesibilidad automatizada) — 2026-10-09 tarde, R-7 (seguridad y rendimiento) — 2026-10-09 noche, R-9 (alta de restaurantes, probado de punta a punta) — 2026-10-09 noche (+53 more)

### Community 28 - "Pasos"

Cohesion: 0.29
Nodes (7): 1. Preparar la carpeta del restaurante, 2. Configurar `restaurant.json`, 3.1 Aprobar un modelo 3D (obligatorio antes de publicarlo), 3. Configurar Categorías y Platos, 4. Validar Localmente, 5. Pruebas y Despliegue, Pasos

### Community 30 - "Runbook — Configuración manual de GitHub y Cloudflare (X-006, X-007, X-008)"

Cohesion: 0.29
Nodes (6): Dependabot, Habilitar CodeQL (manual, una sola vez), Resumen — qué avisar cuando termines, Runbook — Configuración manual de GitHub y Cloudflare (X-006, X-007, X-008), X-006 — Proteger la rama `main`, X-008 — CodeQL y Dependabot

### Community 31 - "Bitácora de Sesión: P-108 Reglas de Arquitectura en CI"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-108 Reglas de Arquitectura en CI, Objetivos, Siguiente Tarea

### Community 32 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.18
Nodes (10): Bloqueos, Comandos para verificar, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-09), Notas y decisiones de diseño, P-701-bis — Feedback del comensal visible para el restaurante y para Juan, R-5-ter — Rediseñar la landing genérica (`/`) (+2 more)

### Community 34 - "ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP"

Cohesion: 0.40
Nodes (4): ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP, Consecuencias, Contexto, Decisión

### Community 35 - "ADR 0003: Sistema de diseño adaptable"

Cohesion: 0.40
Nodes (4): ADR 0003: Sistema de diseño adaptable, Consecuencias, Contexto, Decisión

### Community 36 - "SoldOutStore"

Cohesion: 0.09
Nodes (13): Sesión 2026-10-06: Lote 1 - Limpieza y base, Siguiente paso recomendado, Tareas realizadas, Bitácora de Sesión: P-301 y P-302 (Reservas y Modo Presentación), Estado, Qué se hizo, SoldOutStore, `application/` (+5 more)

### Community 37 - "Sesión 2026-10-07 — lote-3"

Cohesion: 0.29
Nodes (6): Cambios, Decisiones tomadas, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-07 — lote-3, Verificación

### Community 39 - "Paso a paso"

Cohesion: 0.14
Nodes (13): 1. El comensal toca "Ver en mi mesa", 3. La guía de 3 pasos, 4. Orquestar el lanzamiento (el primer cruce de capas), 6. ¿Qué dispositivo detectó, en realidad?, 7. Elegir el lanzador concreto, 8a. iPhone — Quick Look, 8b. Android — Scene Viewer, 8c. Sin AR nativo — el visor en pantalla (+5 more)

### Community 40 - "dependencies"

Cohesion: 0.20
Nodes (10): dependencies, @google/model-viewer, gsap, jotai, lucide-react, react, react-dom, react-qr-code (+2 more)

### Community 41 - "Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados)"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados), Estado, Qué se hizo

### Community 42 - "Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante)"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante), Estado, Qué se hizo

### Community 43 - "Bitácora de Sesión: P-403 Rediseño de componentes"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-403 Rediseño de componentes, Qué se hizo, Siguiente paso exacto

### Community 44 - "Ascua — landing de "cocina de autor" (Histórico)"

Cohesion: 0.14
Nodes (13): 10. Cómo correr esto, 11. Huecos conocidos / próximos pasos razonables, 1. Qué es (y qué no es), 2. Stack tecnológico, 3. Arquitectura, 4. Base de datos / backend, 5. La función de IA / 3D / RA, 6. Formulario de contacto — importante (+5 more)

### Community 45 - "Checklist — recorrido del comensal"

Cohesion: 0.18
Nodes (11): 1. Carta y navegación, 2. Guía de AR (primera vez), 3. AR real — iPhone (Quick Look), 4. AR real — Android (Scene Viewer), 5. Sin AR nativo — visor 3D de respaldo, 6. Navegadores embebidos (Instagram, WhatsApp, TikTok), 7. Idioma, reservas y legal, Al terminar (+3 more)

### Community 46 - "Runbook — Credenciales del pipeline de modelos 3D (preparación para R-8 / P-601)"

Cohesion: 0.25
Nodes (7): Contexto (para que sepas por qué este token y no otro), Paso 1 — Crear tu propia cuenta de Hugging Face (gratis), Paso 2 — Crear el token de acceso, Paso 3 — Dónde poner el token (y dónde NO), Paso 4 — Docker (para la conversión a `.usdz`, sin credenciales), Paso 5 — Avisar que está listo, Runbook — Credenciales del pipeline de modelos 3D (preparación para R-8 / P-601)

### Community 47 - "Bitácora de Sesión: P-201 Esquema de Contenido v1"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-201 Esquema de Contenido v1, Objetivos, Siguiente Tarea

### Community 48 - "Bitácora de Sesión: P-202 Validador de Contenido"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-202 Validador de Contenido, Objetivos, Siguiente Tarea

### Community 49 - "Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante, Objetivos, Siguiente Tarea

### Community 50 - "Cyber Neo Security Report"

Cohesion: 0.12
Nodes (15): [CN-001] Missing Content-Security-Policy and security headers, [CN-002] Third-party Supabase anon key and URL hardcoded in client bundle, [CN-003] Unused `fetchActiveAsset()` would feed unvalidated Supabase data into AR viewer if wired up, [CN-004] Google Maps iframe embed missing `sandbox` attribute, [CN-005] `.gitignore` doesn't cover broader secret-file patterns, Cyber Neo Security Report, Dependency Vulnerabilities, Executive Summary (+7 more)

### Community 51 - "2. Fases"

Cohesion: 0.11
Nodes (18): 0. Reglas para Sonnet (léelas antes de todo), 1. Hallazgos ya confirmados (punto de partida, no lista cerrada), 2. Fases, 3. Sesiones sugeridas, 4. Verificación final ("revisión terminada"), 5. Prompt de arranque para Sonnet, Context, Plan de revisión integral — ASCUA-DEMO-PAGINA (para ejecutar con Sonnet 5) (+10 more)

### Community 52 - "X-007 — Cloudflare Pages (Direct Upload) + secrets en GitHub"

Cohesion: 0.29
Nodes (7): Paso 1 — Crear el proyecto en Cloudflare Pages, Paso 2 — Crear el token de API (permiso mínimo), Paso 3 — Anotar tu Account ID, Paso 4 — Poner los secrets y variables en GitHub, Paso 5 — Confirmar que funcionó, Paso 6 (opcional, recomendado) — Dominio propio, X-007 — Cloudflare Pages (Direct Upload) + secrets en GitHub

### Community 53 - "AnalyticsTracker"

Cohesion: 0.18
Nodes (10): ADR-0004, Bitácora de Sesión: P-303, P-304, P-305 (Feedback, Analítica, Legal), Estado, Qué se hizo, AnalyticsEvent, AnalyticsTracker, CloudflareAnalyticsTracker, Window (+2 more)

### Community 54 - "carta.mjs"

Cohesion: 0.10
Nodes (16): R-2 (arquitectura y calidad de código) y R-3 (contenido) — 2026-10-09 tarde, OWASP / revisión manual del código, ffmpeg-static, buildContent(), copyDir(), escapeHtml(), destino, origen (+8 more)

### Community 56 - "`infrastructure/`"

Cohesion: 0.29
Nodes (6): `analytics/`, `ar/` — zona sensible (CLAUDE.md §0.2), `browser/`, `content/`, `infrastructure/`, `storage/`

### Community 57 - "LocalStorageUiPreferencesStore.ts"

Cohesion: 0.42
Nodes (3): LocalStorageUiPreferencesStore, safeLocalStorageGet(), safeLocalStorageSet()

### Community 59 - "Sesión 2026-10-06 — fundaciones"

Cohesion: 0.33
Nodes (5): Cambios, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-06 — fundaciones, Verificación

### Community 60 - "Auditoría de seguridad — R-7 (revisión post-Antigravity)"

Cohesion: 0.29
Nodes (6): Auditoría de seguridad — R-7 (revisión post-Antigravity), Cabeceras (`public/_headers`), Conclusión, Dependencias (`npm audit`), Resumen, Secretos (`gitleaks`)

### Community 62 - "ADR 0002: Estado global con Jotai"

Cohesion: 0.33
Nodes (5): ADR 0002: Estado global con Jotai, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 64 - "lint-staged"

Cohesion: 0.67
Nodes (3): lint-staged, *.{js,jsx,ts,tsx}, *.{json,md,css}

### Community 67 - "Sesión 2026-10-07 — P-701 a P-704"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — P-701 a P-704, Verificación (reconstruida el 2026-10-09)

### Community 68 - "Sesión 2026-10-07 — lote-5"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — lote-5, Verificación (reconstruida)

### Community 69 - "Sesión 2026-10-07 — ajustes de vite.config.js y cierre parcial del Lote 7"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — ajustes de vite.config.js y cierre parcial del Lote 7, Verificación (reconstruida el 2026-10-09)

### Community 70 - "AGENTS.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.40
Nodes (4): AGENTS.md — ASCUA-DEMO-PAGINA, Cierre de sesión (obligatorio), Diferencias para Antigravity, Regla principal

### Community 71 - "restaurant.ts"

Cohesion: 0.10
Nodes (26): R-5 (diseño roto en producción) — 2026-10-09 noche, zod, fileExists(), hashFile(), MAX_SIZES, validateContent(), assetPathSchema, categorySchema (+18 more)

### Community 72 - "Sesión 2026-10-09 — Lote 6 (parcial): E2E del recorrido del comensal"

Cohesion: 0.33
Nodes (5): Notas para el grafo, Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-09 — Lote 6 (parcial): E2E del recorrido del comensal, Verificación

### Community 73 - "Bitácora de Sesión: P-107 Store Reactivo Global (Jotai)"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-107 Store Reactivo Global (Jotai), Objetivos, Siguiente Tarea

### Community 74 - "Sesión 2026-10-07 — P-205"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — P-205, Verificación (reconstruida el 2026-10-09)

## Knowledge Gaps

- **478 isolated node(s):** `Fase actual`, `R-6 (C-32, accesibilidad automatizada) — 2026-10-09 tarde`, `X-006, X-007, X-008 — completados (2026-10-09 noche)`, `R-7 (seguridad y rendimiento) — 2026-10-09 noche`, `R-9 (alta de restaurantes, probado de punta a punta) — 2026-10-09 noche` (+473 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 546 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `🔥 Ascua – Demo Multi-restaurante` connect `🔥 Ascua – Demo Multi-restaurante` to `README.md`, `ar.ts`, `Menu.tsx`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `vitest` connect `doubles.ts` to `package.json`, `SoldOutStore`, `restaurant.ts`, `ar.ts`, `AnalyticsTracker`, `Menu.tsx`, `carta.mjs`, `vite.config.js`, `LocalStorageUiPreferencesStore.ts`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `Arquitectura` connect `ar.ts` to `StaticJsonRestaurantRepository`, `🔥 Ascua – Demo Multi-restaurante`, `Menu.tsx`, `doubles.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Restaurant` (e.g. with `Contexto` and `C-04 · Sin `any``) actually correct?**
  _`Restaurant` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `ArLauncher` (e.g. with `5. Caso de uso: decidir y lanzar` and `3.3 Principios SOLID aplicados (concreto, no teórico)`) actually correct?**
  _`ArLauncher` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Fase actual`, `R-6 (C-32, accesibilidad automatizada) — 2026-10-09 tarde`, `X-006, X-007, X-008 — completados (2026-10-09 noche)` to the rest of the system?**
  _478 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `4. Matriz de cumplimiento` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
