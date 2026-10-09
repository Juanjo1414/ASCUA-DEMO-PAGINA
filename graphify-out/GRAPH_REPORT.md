# Graph Report - MENU AR - PAGINA (2026-10-09)

## Corpus Check

- 158 files · ~586,166 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 23 file(s) not represented in the graph (top: (none) 9, .woff2 8, .css 2)

## Summary

- 824 nodes · 1310 edges · 71 communities (52 shown, 19 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `9e8adb7d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- 4. Matriz de cumplimiento
- Product
- package.json
- validate-content.ts
- 🔥 Ascua – Demo Multi-restaurante
- scripts
- devDependencies
- rules
- Plan de implementación — Ascua (PITS)
- sweetgreen — Style Reference
- CLAUDE.md — ASCUA-DEMO-PAGINA
- compilerOptions
- dish.ts
- Estado del proyecto — ASCUA-DEMO-PAGINA
- Configuraci?n de Dependabot
- ADR-0001: Demo estática multi-restaurante en Cloudflare Pages
- Correcciones antes de continuar — ASCUA-DEMO-PAGINA
- pull_request_template.md
- English
- ArDishModal.tsx
- rules/graphify.md
- workflows/graphify.md
- PROCEDENCIA.md
- Pasos
- AGENTS.md — ASCUA-DEMO-PAGINA
- Bitácora de Sesión: P-108 Reglas de Arquitectura en CI
- restaurant.ts
- ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP
- ADR 0003: Sistema de diseño adaptable
- LocalStorageSoldOutStore
- Sesión 2026-10-07 — lote-3
- Menu.tsx
- DishCard.tsx
- dependencies
- Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados)
- Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante)
- Bitácora de Sesión: P-403 Rediseño de componentes
- Ascua — landing de "cocina de autor" (Histórico)
- StaticJsonRestaurantRepository
- ArGuideModal.tsx
- Bitácora de Sesión: P-201 Esquema de Contenido v1
- Bitácora de Sesión: P-202 Validador de Contenido
- Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante
- Cyber Neo Security Report
- 2. Fases
- vitest
- Restaurant
- ADR 0002: Estado global con Jotai
- vite.config.js
- Bitácora de Sesión: P-106 Composition Root y Router
- buildReservationLink.ts
- @playwright/test
- Sesión 2026-10-06 — fundaciones
- config.ts
- Bitácora de Sesión: P-105 Repositorio Estático
- Bitácora de Sesión: P-107 Store Reactivo Global (Jotai)
- lint-staged
- engines
- @testing-library/jest-dom
- Sesión 2026-10-07 — P-701 a P-704
- Sesión 2026-10-07 — P-205
- Sesión 2026-10-07 — ajustes de vite.config.js y cierre parcial del Lote 7
- Bitácora de Sesión: P-104 Adaptadores AR

## God Nodes (most connected - your core abstractions)

1. `vitest` - 24 edges
2. `Dish` - 23 edges
3. `Restaurant` - 23 edges
4. `Fase P-1 — Re-arquitectura de PAGINA` - 22 edges
5. `🔥 Ascua – Demo Multi-restaurante` - 22 edges
6. `ArLauncher` - 20 edges
7. `scripts` - 20 edges
8. `ArLaunchMode` - 18 edges
9. `Decisiones tomadas` - 17 edges
10. `AnalyticsTracker` - 16 edges

## Surprising Connections (you probably didn't know these)

- `Verificación (reconstruida el 2026-10-09)` --references--> `LanguageProvider()` [INFERRED]
  docs/sesiones/2026-10-07-P-205.md → src/presentation/i18n/LanguageProvider.tsx
- `5.1 PAGINA` --references--> `ArLauncher` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/arLauncher.ts
- `Contexto` --references--> `Restaurant` [INFERRED]
  docs/adr/0002-estado-global-con-jotai.md → src/domain/restaurant.ts
- `Acciones realizadas` --references--> `Restaurant` [INFERRED]
  docs/sesiones/2026-10-06-P107-Jotai-Store.md → src/domain/restaurant.ts
- `Siguiente Tarea` --references--> `StaticJsonRestaurantRepository` [INFERRED]
  docs/sesiones/2026-10-06-P104-Adaptadores-AR.md → src/infrastructure/content/StaticJsonRestaurantRepository.ts

## Import Cycles

- None detected.

## Communities (71 total, 19 thin omitted)

### Community 0 - "4. Matriz de cumplimiento"

Cohesion: 0.08
Nodes (23): 0. Línea base ejecutada, 1. Análisis de GitHub Actions (`gh run list` + `gh api .../logs`), 2. Recorrido de la app como comensal (360×640), 3. Hallazgos verificados, 4. Matriz de cumplimiento, 5. Decisiones que necesito de Juan antes de seguir a la sesión 2 (R-1), Causa raíz de la falla de Lighthouse CI (confirmada reproduciendo el job localmente), 🔴 Críticos (+15 more)

### Community 1 - "Product"

Cohesion: 0.20
Nodes (10): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles (+2 more)

### Community 2 - "package.json"

Cohesion: 0.09
Nodes (22): name, private, type, version, autoprefixer, dependency-cruiser, @google/model-viewer, gsap (+14 more)

### Community 4 - "validate-content.ts"

Cohesion: 0.07
Nodes (26): ffmpeg-static, react-qr-code, react-router-dom, buildContent(), copyDir(), DIST_DATA_DIR, DIST_R_DIR, destino (+18 more)

### Community 5 - "🔥 Ascua – Demo Multi-restaurante"

Cohesion: 0.10
Nodes (20): 🔥 Ascua – Demo Multi-restaurante, Contribuir, Cómo la vive el comensal, Descripción del proyecto, Despliegue, Documentación, Equipo, Licencia (+12 more)

### Community 6 - "scripts"

Cohesion: 0.09
Nodes (22): Workflow CI (verify), Workflow Deploy Cloudflare Pages, scripts, arch:check, build, build:e2e, content:validate, dev (+14 more)

### Community 7 - "devDependencies"

Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, dependency-cruiser, ffmpeg-static, husky, jsdom, @lhci/cli, license-checker (+16 more)

### Community 8 - "rules"

Cohesion: 0.29
Nodes (6): plugins, rules, react/only-export-components, react/rules-of-hooks, typescript/no-explicit-any, $schema

### Community 10 - "Plan de implementación — Ascua (PITS)"

Cohesion: 0.05
Nodes (39): 0. Cómo usar este documento, 10. Definición de terminado (DoD) — aplica a toda tarea, 11. Riesgos, 12. Registro de cambios del plan, 1. Resumen ejecutivo y decisiones, 2. Línea base verificada (5 oct 2026), 3.1 Capas (Clean Architecture ligera), 3.2 Estructura de carpetas objetivo (+31 more)

### Community 11 - "sweetgreen — Style Reference"

Cohesion: 0.05
Nodes (39): Agent Prompt Guide, Border Radius, Components, CSS Custom Properties, Do, Do's and Don'ts, Don't, Elevation (+31 more)

### Community 12 - "CLAUDE.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.11
Nodes (19): 0.1 Arquitectura (regla de capas — se verifica con dependency-cruiser), 0. Contexto del proyecto, 10. Prohibiciones rápidas, 1. Protocolo de sesión (obligatorio), 2. Git y flujo de entrega, 3. Calidad: Definición de terminado (DoD), 4.1 Comentarios y documentación: el código se explica solo, 4. Principios de código (+11 more)

### Community 13 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, checkJs, esModuleInterop, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "dish.ts"

Cohesion: 0.08
Nodes (46): 0.2 Reglas específicas de este repo, Fase P-1 — Re-arquitectura de PAGINA, R-4 · AR del lado de PAGINA, Fase P-1 — Re-arquitectura, Decisiones tomadas, Acciones realizadas, Arquitectura, Estructura del repositorio (+38 more)

### Community 15 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.15
Nodes (11): Bloqueos, Comandos para verificar, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-09), Notas y decisiones de diseño, Pendientes detectados (fuera de alcance de la tarea actual), Siguiente paso exacto (+3 more)

### Community 18 - "ADR-0001: Demo estática multi-restaurante en Cloudflare Pages"

Cohesion: 0.22
Nodes (8): A. Estática + contenido versionado (elegida), ADR-0001: Demo estática multi-restaurante en Cloudflare Pages, B. ARFOODS completo (Next.js + Supabase) en planes gratuitos, C. Un repo/despliegue por restaurante, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 19 - "Correcciones antes de continuar — ASCUA-DEMO-PAGINA"

Cohesion: 0.05
Nodes (38): 0. Reglas para el agente (léelas siempre), 1. Qué encontró la revisión, C-12 · Campos opcionales nuevos en el esquema, C-13 · El tema del restaurante se aplica, C-14 · Par tipográfico real, C-15 · Logo y nombre, C-16 · Portada con los datos del restaurante, C-17 · Contacto con los datos del restaurante (+30 more)

### Community 20 - "pull_request_template.md"

Cohesion: 0.33
Nodes (5): Cómo se probó, Qué cambia y por qué, Revisión, Riesgos y rollback, Tarea(s)

### Community 21 - "English"

Cohesion: 0.20
Nodes (9): English, Español, Landing Ascua Original, Lo que arde (Fuego), Manifesto, Manifiesto, Voces (Testimonios), Voices (Testimonials) (+1 more)

### Community 22 - "ArDishModal.tsx"

Cohesion: 0.18
Nodes (14): Último paso completado (sesión de revisión, 2026-10-09), react, InAppBrowserNotice(), InAppBrowserNoticeProps, ArDishModal(), ArDishModalProps, Asset, Dish (+6 more)

### Community 28 - "Pasos"

Cohesion: 0.25
Nodes (7): 1. Preparar la carpeta del restaurante, 2. Configurar `restaurant.json`, 3. Configurar Categorías y Platos, 4. Validar Localmente, 5. Pruebas y Despliegue, Pasos, Runbook: Creación de un Nuevo Restaurante para la Demo

### Community 30 - "AGENTS.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.40
Nodes (4): AGENTS.md — ASCUA-DEMO-PAGINA, Cierre de sesión (obligatorio), Diferencias para Antigravity, Regla principal

### Community 31 - "Bitácora de Sesión: P-108 Reglas de Arquitectura en CI"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-108 Reglas de Arquitectura en CI, Objetivos, Siguiente Tarea

### Community 32 - "restaurant.ts"

Cohesion: 0.21
Nodes (8): GetRestaurantResult, localizedStringSchema, RESTAURANT_SLUG_REGEX, RestaurantAuthorization, restaurantAuthorizationSchema, RestaurantContact, restaurantContactSchema, restaurantSchema

### Community 34 - "ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP"

Cohesion: 0.40
Nodes (4): ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP, Consecuencias, Contexto, Decisión

### Community 35 - "ADR 0003: Sistema de diseño adaptable"

Cohesion: 0.40
Nodes (4): ADR 0003: Sistema de diseño adaptable, Consecuencias, Contexto, Decisión

### Community 36 - "LocalStorageSoldOutStore"

Cohesion: 0.10
Nodes (17): C-01 · Archivos generados fuera del repositorio, C-02 · Borrar el código muerto, C-03 · Avisos de lint en cero, C-04 · Sin `any`, C-05 · `index.html` neutro y móvil, C-06 · Marca de terceros fuera y tipografías propias, C-07 · `docs/ESTADO.md` corregido, C-08 · ADR 0002 y 0003 (+9 more)

### Community 37 - "Sesión 2026-10-07 — lote-3"

Cohesion: 0.29
Nodes (6): Cambios, Decisiones tomadas, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-07 — lote-3, Verificación

### Community 39 - "DishCard.tsx"

Cohesion: 0.20
Nodes (7): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — lote-5, Verificación (reconstruida), @testing-library/react, DishCard(), Menu()

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

Cohesion: 0.15
Nodes (13): 10. Cómo correr esto, 11. Huecos conocidos / próximos pasos razonables, 1. Qué es (y qué no es), 2. Stack tecnológico, 3. Arquitectura, 4. Base de datos / backend, 5. La función de IA / 3D / RA, 6. Formulario de contacto — importante (+5 more)

### Community 45 - "StaticJsonRestaurantRepository"

Cohesion: 0.36
Nodes (5): C-10 · Rutas seguras y resueltas _(primero las pruebas)_, C-11 · Scene Viewer con URL absoluta, Lote 2 — Rutas de assets _(hoy las fotos y los modelos no cargan)_, resolveAssetUrls(), StaticJsonRestaurantRepository

### Community 46 - "ArGuideModal.tsx"

Cohesion: 0.36
Nodes (4): lucide-react, ArGuideModal(), ArGuideModalProps, FloatingHelp()

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

### Community 52 - "vitest"

Cohesion: 0.07
Nodes (19): Bitácora de Sesión: P-303, P-304, P-305 (Feedback, Analítica, Legal), Estado, Qué se hizo, vitest, AppDependencies, AnalyticsEvent, AnalyticsTracker, RestaurantRepository (+11 more)

### Community 54 - "ADR 0002: Estado global con Jotai"

Cohesion: 0.33
Nodes (5): ADR 0002: Estado global con Jotai, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 56 - "Bitácora de Sesión: P-106 Composition Root y Router"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-106 Composition Root y Router, Objetivos, Siguiente Tarea

### Community 57 - "buildReservationLink.ts"

Cohesion: 0.40
Nodes (4): Fase P-3 — Funciones de la demo, Ejemplo de un restaurante, buildReservationLink(), ReservationParams

### Community 59 - "Sesión 2026-10-06 — fundaciones"

Cohesion: 0.33
Nodes (5): Cambios, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-06 — fundaciones, Verificación

### Community 62 - "Bitácora de Sesión: P-105 Repositorio Estático"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-105 Repositorio Estático, Objetivos, Siguiente Tarea

### Community 63 - "Bitácora de Sesión: P-107 Store Reactivo Global (Jotai)"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-107 Store Reactivo Global (Jotai), Objetivos, Siguiente Tarea

### Community 64 - "lint-staged"

Cohesion: 0.67
Nodes (3): lint-staged, *.{js,jsx,ts,tsx}, *.{json,md,css}

### Community 67 - "Sesión 2026-10-07 — P-701 a P-704"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — P-701 a P-704, Verificación (reconstruida el 2026-10-09)

### Community 68 - "Sesión 2026-10-07 — P-205"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — P-205, Verificación (reconstruida el 2026-10-09)

### Community 69 - "Sesión 2026-10-07 — ajustes de vite.config.js y cierre parcial del Lote 7"

Cohesion: 0.40
Nodes (4): Pendiente / siguiente paso exacto, Qué se hizo, Sesión 2026-10-07 — ajustes de vite.config.js y cierre parcial del Lote 7, Verificación (reconstruida el 2026-10-09)

### Community 70 - "Bitácora de Sesión: P-104 Adaptadores AR"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-104 Adaptadores AR, Objetivos, Siguiente Tarea

## Knowledge Gaps

- **417 isolated node(s):** `Fase actual`, `Siguiente paso exacto`, `Línea base verificada (2026-10-09)`, `Bloqueos`, `Notas y decisiones de diseño` (+412 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 484 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `🔥 Ascua – Demo Multi-restaurante` connect `🔥 Ascua – Demo Multi-restaurante` to `buildReservationLink.ts`, `README.md`, `dish.ts`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `Arquitectura` connect `dish.ts` to `🔥 Ascua – Demo Multi-restaurante`, `vitest`, `StaticJsonRestaurantRepository`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `restaurant.ts`, `package.json`, `validate-content.ts`, `DishCard.tsx`, `StaticJsonRestaurantRepository`, `dish.ts`, `Restaurant`, `vite.config.js`, `buildReservationLink.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Restaurant` (e.g. with `Contexto` and `C-04 · Sin `any``) actually correct?**
  _`Restaurant` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 21 inferred relationships involving `Fase P-1 — Re-arquitectura de PAGINA` (e.g. with `AnalyticsTracker` and `ArLauncher`) actually correct?**
  _`Fase P-1 — Re-arquitectura de PAGINA` has 21 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Fase actual`, `Siguiente paso exacto`, `Línea base verificada (2026-10-09)` to the rest of the system?**
  _417 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `4. Matriz de cumplimiento` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
