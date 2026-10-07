# Graph Report - MENU AR - PAGINA (2026-10-07)

## Corpus Check

- 127 files · ~581,438 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: (none) 8, .woff2 8, .css 2)

## Summary

- 731 nodes · 1272 edges · 46 communities (34 shown, 12 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 109 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `200ae4de`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- 🔥 Ascua – Demo Multi-restaurante
- restaurant.ts
- package.json
- carta.mjs
- Ascua — landing de "cocina de autor" (Histórico)
- scripts
- devDependencies
- rules
- Plan de implementación — Ascua (PITS)
- sweetgreen — Style Reference
- CLAUDE.md — ASCUA-DEMO-PAGINA
- compilerOptions
- doubles.ts
- Product
- Configuraci?n de Dependabot
- ADR-0001: Demo estática multi-restaurante en Cloudflare Pages
- Correcciones antes de continuar — ASCUA-DEMO-PAGINA
- pull_request_template.md
- AGENTS.md — ASCUA-DEMO-PAGINA
- rules/graphify.md
- workflows/graphify.md
- PROCEDENCIA.md
- Estado del proyecto — ASCUA-DEMO-PAGINA
- Sesión 2026-10-06 — fundaciones
- Bitácora de Sesión: P-108 Reglas de Arquitectura en CI
- InMemorySoldOutStore
- App.tsx
- ADR 0003: Sistema de diseño adaptable
- LocalStorageSoldOutStore
- Pasos
- Bitácora de Sesión: P-303, P-304, P-305 (Feedback, Analítica, Legal)
- Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados)
- Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante)
- Bitácora de Sesión: P-403 Rediseño de componentes
- ADR 0002: Estado global con Jotai
- Acciones realizadas
- Bitácora de Sesión: P-201 Esquema de Contenido v1
- Bitácora de Sesión: P-202 Validador de Contenido
- Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante

## God Nodes (most connected - your core abstractions)

1. `useLanguage()` - 27 edges
2. `Restaurant` - 24 edges
3. `🔥 Ascua – Demo Multi-restaurante` - 22 edges
4. `Fase P-1 — Re-arquitectura de PAGINA` - 22 edges
5. `Dish` - 20 edges
6. `ArLauncher` - 20 edges
7. `ArLaunchMode` - 18 edges
8. `App()` - 18 edges
9. `react` - 18 edges
10. `Decisiones tomadas` - 17 edges

## Surprising Connections (you probably didn't know these)

- `Contexto` --references--> `Restaurant` [INFERRED]
  docs/adr/0002-estado-global-con-jotai.md → src/domain/restaurant.ts
- `C-27 · Quitar el ciclo antes de mover` --references--> `AppDependencies` [INFERRED]
  docs/Correcciones antes de continuar.md → src/app/compositionRoot.ts
- `Qué se hizo` --references--> `AnalyticsTracker` [INFERRED]
  docs/sesiones/2026-10-06-P303-P305-Feedback-Analitica-Legal.md → src/application/ports/analyticsTracker.ts
- `5.1 PAGINA` --references--> `ArLauncher` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/arLauncher.ts
- `Ejemplo de un restaurante` --references--> `buildReservationLink()` [INFERRED]
  README.md → src/application/use-cases/buildReservationLink.ts

## Import Cycles

- None detected.

## Communities (46 total, 12 thin omitted)

### Community 0 - "🔥 Ascua – Demo Multi-restaurante"

Cohesion: 0.10
Nodes (21): 🔥 Ascua – Demo Multi-restaurante, Contribuir, Cómo la vive el comensal, Descripción del proyecto, Despliegue, Documentación, Ejemplo de un restaurante, Equipo (+13 more)

### Community 1 - "restaurant.ts"

Cohesion: 0.06
Nodes (39): C-10 · Rutas seguras y resueltas _(primero las pruebas)_, C-11 · Scene Viewer con URL absoluta, Lote 2 — Rutas de assets _(hoy las fotos y los modelos no cargan)_, Bitácora de Sesión: P-104 Adaptadores AR, Objetivos, Siguiente Tarea, Acciones realizadas, Bitácora de Sesión: P-105 Repositorio Estático (+31 more)

### Community 2 - "package.json"

Cohesion: 0.04
Nodes (38): dependencies, @google/model-viewer, gsap, jotai, lucide-react, react, react-dom, react-router-dom (+30 more)

### Community 4 - "carta.mjs"

Cohesion: 0.11
Nodes (15): ffmpeg-static, buildContent(), copyDir(), DIST_DATA_DIR, DIST_DIR, DIST_R_DIR, destino, origen (+7 more)

### Community 5 - "Ascua — landing de "cocina de autor" (Histórico)"

Cohesion: 0.06
Nodes (39): Capabilities and Constraints, 10. Cómo correr esto, 11. Huecos conocidos / próximos pasos razonables, 1. Qué es (y qué no es), 2. Stack tecnológico, 3. Arquitectura, 4. Base de datos / backend, 5. La función de IA / 3D / RA (+31 more)

### Community 6 - "scripts"

Cohesion: 0.12
Nodes (17): Workflow CI (verify), Workflow Deploy Cloudflare Pages, scripts, arch:check, build, content:validate, dev, format (+9 more)

### Community 7 - "devDependencies"

Cohesion: 0.09
Nodes (22): devDependencies, autoprefixer, dependency-cruiser, ffmpeg-static, husky, jsdom, lint-staged, oxlint (+14 more)

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

### Community 14 - "doubles.ts"

Cohesion: 0.07
Nodes (51): 0.2 Reglas específicas de este repo, C-25 · El aviso de navegador embebido, con el nombre de la app, 3.3 Principios SOLID aplicados (concreto, no teórico), Fase P-1 — Re-arquitectura de PAGINA, Decisiones tomadas, Acciones realizadas, zod, AppDependencies (+43 more)

### Community 15 - "Product"

Cohesion: 0.22
Nodes (9): Brand Commitments, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles, Product Purpose (+1 more)

### Community 18 - "ADR-0001: Demo estática multi-restaurante en Cloudflare Pages"

Cohesion: 0.22
Nodes (8): A. Estática + contenido versionado (elegida), ADR-0001: Demo estática multi-restaurante en Cloudflare Pages, B. ARFOODS completo (Next.js + Supabase) en planes gratuitos, C. Un repo/despliegue por restaurante, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 19 - "Correcciones antes de continuar — ASCUA-DEMO-PAGINA"

Cohesion: 0.06
Nodes (30): 0. Reglas para el agente (léelas siempre), 1. Qué encontró la revisión, C-12 · Campos opcionales nuevos en el esquema, C-13 · El tema del restaurante se aplica, C-14 · Par tipográfico real, C-16 · Portada con los datos del restaurante, C-17 · Contacto con los datos del restaurante, C-19 · Textos genéricos (i18n) (+22 more)

### Community 20 - "pull_request_template.md"

Cohesion: 0.33
Nodes (5): Cómo se probó, Qué cambia y por qué, Revisión, Riesgos y rollback, Tarea(s)

### Community 21 - "AGENTS.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.40
Nodes (4): AGENTS.md — ASCUA-DEMO-PAGINA, Cierre de sesión (obligatorio), Diferencias para Antigravity, Regla principal

### Community 29 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.20
Nodes (10): Bloqueos, Comandos para verificar, Completadas con observaciones de fases previas:, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-07), Pendientes detectados (fuera de alcance de la tarea actual), Siguiente paso exacto (+2 more)

### Community 30 - "Sesión 2026-10-06 — fundaciones"

Cohesion: 0.33
Nodes (5): Cambios, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-06 — fundaciones, Verificación

### Community 31 - "Bitácora de Sesión: P-108 Reglas de Arquitectura en CI"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-108 Reglas de Arquitectura en CI, Objetivos, Siguiente Tarea

### Community 34 - "App.tsx"

Cohesion: 0.06
Nodes (55): C-15 · Logo y nombre, C-18 · Secciones sin datos (decisión D-1), C-30 · Dividir `Menu` y probar componentes, C-31 · Móvil, C-32 · Accesibilidad básica, C-33 · E2E del recorrido del comensal, Lote 6 — Móvil, accesibilidad y pruebas de interfaz, @google/model-viewer (+47 more)

### Community 35 - "ADR 0003: Sistema de diseño adaptable"

Cohesion: 0.40
Nodes (4): ADR 0003: Sistema de diseño adaptable, Consecuencias, Contexto, Decisión

### Community 36 - "LocalStorageSoldOutStore"

Cohesion: 0.10
Nodes (17): C-01 · Archivos generados fuera del repositorio, C-02 · Borrar el código muerto, C-03 · Avisos de lint en cero, C-04 · Sin `any`, C-05 · `index.html` neutro y móvil, C-06 · Marca de terceros fuera y tipografías propias, C-07 · `docs/ESTADO.md` corregido, C-08 · ADR 0002 y 0003 (+9 more)

### Community 39 - "Pasos"

Cohesion: 0.25
Nodes (7): 1. Preparar la carpeta del restaurante, 2. Configurar `restaurant.json`, 3. Configurar Categorías y Platos, 4. Validar Localmente, 5. Pruebas y Despliegue, Pasos, Runbook: Creación de un Nuevo Restaurante para la Demo

### Community 40 - "Bitácora de Sesión: P-303, P-304, P-305 (Feedback, Analítica, Legal)"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-303, P-304, P-305 (Feedback, Analítica, Legal), Estado, Qué se hizo

### Community 41 - "Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados)"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados), Estado, Qué se hizo

### Community 42 - "Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante)"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-401, P-402 (Tokens y Tema por Restaurante), Estado, Qué se hizo

### Community 43 - "Bitácora de Sesión: P-403 Rediseño de componentes"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-403 Rediseño de componentes, Qué se hizo, Siguiente paso exacto

### Community 44 - "ADR 0002: Estado global con Jotai"

Cohesion: 0.33
Nodes (5): ADR 0002: Estado global con Jotai, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 45 - "Acciones realizadas"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-106 Composition Root y Router, Objetivos, Siguiente Tarea

### Community 47 - "Bitácora de Sesión: P-201 Esquema de Contenido v1"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-201 Esquema de Contenido v1, Objetivos, Siguiente Tarea

### Community 48 - "Bitácora de Sesión: P-202 Validador de Contenido"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-202 Validador de Contenido, Objetivos, Siguiente Tarea

### Community 49 - "Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante, Objetivos, Siguiente Tarea

## Knowledge Gaps

- **345 isolated node(s):** `Fase actual`, `Tarea actual`, `Completadas con observaciones de fases previas:`, `Siguiente paso exacto`, `Línea base verificada (2026-10-07)` (+340 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 391 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `🔥 Ascua – Demo Multi-restaurante` connect `🔥 Ascua – Demo Multi-restaurante` to `restaurant.ts`, `README.md`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `Arquitectura` connect `restaurant.ts` to `🔥 Ascua – Demo Multi-restaurante`, `doubles.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `sweetgreen — Style Reference` connect `sweetgreen — Style Reference` to `README.md`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Restaurant` (e.g. with `Contexto` and `C-04 · Sin `any``) actually correct?**
  _`Restaurant` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 21 inferred relationships involving `Fase P-1 — Re-arquitectura de PAGINA` (e.g. with `AnalyticsTracker` and `ArLauncher`) actually correct?**
  _`Fase P-1 — Re-arquitectura de PAGINA` has 21 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Fase actual`, `Tarea actual`, `Completadas con observaciones de fases previas:` to the rest of the system?**
  _345 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `🔥 Ascua – Demo Multi-restaurante` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
