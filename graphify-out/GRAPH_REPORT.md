# Graph Report - MENU AR - PAGINA (2026-10-06)

## Corpus Check

- 124 files · ~585,741 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: (none) 8, .woff2 8, .css 2)

## Summary

- 577 nodes · 1055 edges · 34 communities (25 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `57d8e5f1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- App.jsx
- restaurant.ts
- package.json
- Escena.jsx
- carta.mjs
- Ascua — landing de "cocina de autor" (Histórico)
- scripts
- devDependencies
- .oxlintrc.json
- Plan de implementación — Ascua (PITS)
- sweetgreen — Style Reference
- CLAUDE.md — ASCUA-DEMO-PAGINA
- compilerOptions
- doubles.ts
- main.tsx
- Configuraci?n de Dependabot
- ADR-0001: Demo estática multi-restaurante en Cloudflare Pages
- Bitácora de Sesión: P-107 Store Reactivo Global (Jotai)
- pull_request_template.md
- AGENTS.md — ASCUA-DEMO-PAGINA
- React + Vite
- rules/graphify.md
- workflows/graphify.md
- PROCEDENCIA.md
- Bitácora de Sesión: P-104 Adaptadores AR
- Estado del proyecto — ASCUA-DEMO-PAGINA
- Sesión 2026-10-06 — fundaciones
- Bitácora de Sesión: P-108 Reglas de Arquitectura en CI
- SoldOutStore

## God Nodes (most connected - your core abstractions)

1. `useLanguage()` - 27 edges
2. `Restaurant` - 23 edges
3. `react` - 22 edges
4. `Fase P-1 — Re-arquitectura de PAGINA` - 22 edges
5. `Dish` - 21 edges
6. `ArLauncher` - 20 edges
7. `ArLaunchMode` - 18 edges
8. `Decisiones tomadas` - 18 edges
9. `compilerOptions` - 16 edges
10. `vitest` - 16 edges

## Surprising Connections (you probably didn't know these)

- `Acciones realizadas` --references--> `Restaurant` [INFERRED]
  docs/sesiones/2026-10-06-P107-Jotai-Store.md → src/domain/restaurant.ts
- `5.1 PAGINA` --references--> `ArLauncher` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/arLauncher.ts
- `5. La función de IA / 3D / RA` --references--> `ArDishModal()` [INFERRED]
  docs/PROYECTO.md → src/components/ArDishModal.jsx
- `3.3 Principios SOLID aplicados (concreto, no teórico)` --references--> `RestaurantRepository` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/restaurantRepository.ts
- `Fase P-1 — Re-arquitectura de PAGINA` --references--> `RestaurantRepository` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/restaurantRepository.ts

## Import Cycles

- None detected.

## Communities (34 total, 9 thin omitted)

### Community 0 - "App.jsx"

Cohesion: 0.09
Nodes (38): @google/model-viewer, lucide-react, react, App(), ArDishModal(), ArGuideModal(), ArGuideModalProps, ArViewer() (+30 more)

### Community 1 - "restaurant.ts"

Cohesion: 0.07
Nodes (35): Último paso completado, Decisiones tomadas, Acciones realizadas, Bitácora de Sesión: P-105 Repositorio Estático, Objetivos, Siguiente Tarea, jotai, vitest (+27 more)

### Community 2 - "package.json"

Cohesion: 0.05
Nodes (36): dependencies, @google/model-viewer, gsap, jotai, lucide-react, react, react-dom, react-router-dom (+28 more)

### Community 3 - "Escena.jsx"

Cohesion: 0.24
Nodes (16): Escena(), generarCama(), aUrl(), azar(), generarBrasa(), lienzo(), prepararBrasaTexto(), actualizarCalor() (+8 more)

### Community 4 - "carta.mjs"

Cohesion: 0.15
Nodes (10): ffmpeg-static, destino, origen, PLATOS, raiz, bloques, css, destino (+2 more)

### Community 5 - "Ascua — landing de "cocina de autor" (Histórico)"

Cohesion: 0.05
Nodes (43): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles (+35 more)

### Community 6 - "scripts"

Cohesion: 0.13
Nodes (15): Workflow CI (verify), Workflow Deploy Cloudflare Pages, scripts, arch:check, build, dev, format, format:check (+7 more)

### Community 7 - "devDependencies"

Cohesion: 0.10
Nodes (20): devDependencies, autoprefixer, dependency-cruiser, ffmpeg-static, husky, jsdom, lint-staged, oxlint (+12 more)

### Community 8 - ".oxlintrc.json"

Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 10 - "Plan de implementación — Ascua (PITS)"

Cohesion: 0.05
Nodes (39): 0. Cómo usar este documento, 10. Definición de terminado (DoD) — aplica a toda tarea, 11. Riesgos, 12. Registro de cambios del plan, 1. Resumen ejecutivo y decisiones, 2. Línea base verificada (5 oct 2026), 3.1 Capas (Clean Architecture ligera), 3.2 Estructura de carpetas objetivo (+31 more)

### Community 11 - "sweetgreen — Style Reference"

Cohesion: 0.05
Nodes (39): Agent Prompt Guide, Border Radius, Components, CSS Custom Properties, Do, Do's and Don'ts, Don't, Elevation (+31 more)

### Community 12 - "CLAUDE.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.10
Nodes (19): 0.1 Arquitectura (regla de capas — se verifica con dependency-cruiser), 0. Contexto del proyecto, 10. Prohibiciones rápidas, 1. Protocolo de sesión (obligatorio), 2. Git y flujo de entrega, 3. Calidad: Definición de terminado (DoD), 4.1 Comentarios y documentación: el código se explica solo, 4. Principios de código (+11 more)

### Community 13 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, checkJs, esModuleInterop, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "doubles.ts"

Cohesion: 0.10
Nodes (34): 0.2 Reglas específicas de este repo, 3.3 Principios SOLID aplicados (concreto, no teórico), Fase P-1 — Re-arquitectura de PAGINA, Acciones realizadas, environmentDetector, AnalyticsEvent, AnalyticsTracker, ArLauncher (+26 more)

### Community 15 - "main.tsx"

Cohesion: 0.10
Nodes (13): Acciones realizadas, Bitácora de Sesión: P-106 Composition Root y Router, Objetivos, Siguiente Tarea, react-dom, react-router-dom, AppDependencies, compositionRoot (+5 more)

### Community 18 - "ADR-0001: Demo estática multi-restaurante en Cloudflare Pages"

Cohesion: 0.22
Nodes (8): A. Estática + contenido versionado (elegida), ADR-0001: Demo estática multi-restaurante en Cloudflare Pages, B. ARFOODS completo (Next.js + Supabase) en planes gratuitos, C. Un repo/despliegue por restaurante, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 19 - "Bitácora de Sesión: P-107 Store Reactivo Global (Jotai)"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-107 Store Reactivo Global (Jotai), Objetivos, Siguiente Tarea

### Community 20 - "pull_request_template.md"

Cohesion: 0.33
Nodes (5): Cómo se probó, Qué cambia y por qué, Revisión, Riesgos y rollback, Tarea(s)

### Community 21 - "AGENTS.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.40
Nodes (4): AGENTS.md — ASCUA-DEMO-PAGINA, Cierre de sesión (obligatorio), Diferencias para Antigravity, Regla principal

### Community 22 - "React + Vite"

Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + Vite

### Community 28 - "Bitácora de Sesión: P-104 Adaptadores AR"

Cohesion: 0.50
Nodes (3): Bitácora de Sesión: P-104 Adaptadores AR, Objetivos, Siguiente Tarea

### Community 29 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.22
Nodes (8): Bloqueos, Comandos para verificar, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-06), Pendientes detectados (fuera de alcance de la tarea actual), Siguiente paso exacto, Tarea actual

### Community 30 - "Sesión 2026-10-06 — fundaciones"

Cohesion: 0.33
Nodes (5): Cambios, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-06 — fundaciones, Verificación

### Community 31 - "Bitácora de Sesión: P-108 Reglas de Arquitectura en CI"

Cohesion: 0.40
Nodes (4): Acciones realizadas, Bitácora de Sesión: P-108 Reglas de Arquitectura en CI, Objetivos, Siguiente Tarea

### Community 32 - "SoldOutStore"

Cohesion: 0.23
Nodes (3): SoldOutStore, toggleSoldOut(), InMemorySoldOutStore

## Knowledge Gaps

- **259 isolated node(s):** `ArGuideModalProps`, `RestaurantAuthorization`, `RestaurantContact`, `CategoryViewModel`, `MenuViewModel` (+254 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 296 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.jsx` to `package.json`, `Escena.jsx`, `main.tsx`?**
  _High betweenness centrality (0.197) - this node is a cross-community bridge._
- **Why does `vitest` connect `restaurant.ts` to `SoldOutStore`, `App.jsx`, `package.json`, `doubles.ts`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `Fase P-1 — Re-arquitectura de PAGINA` connect `doubles.ts` to `SoldOutStore`, `restaurant.ts`, `Plan de implementación — Ascua (PITS)`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Restaurant` (e.g. with `Último paso completado` and `Fase P-1 — Re-arquitectura de PAGINA`) actually correct?**
  _`Restaurant` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 21 inferred relationships involving `Fase P-1 — Re-arquitectura de PAGINA` (e.g. with `AnalyticsTracker` and `ArLauncher`) actually correct?**
  _`Fase P-1 — Re-arquitectura de PAGINA` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Dish` (e.g. with `Fase P-1 — Re-arquitectura de PAGINA` and `Decisiones tomadas`) actually correct?**
  _`Dish` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ArGuideModalProps`, `RestaurantAuthorization`, `RestaurantContact` to the rest of the system?**
  _259 weakly-connected nodes found - possible documentation gaps or missing edges._
