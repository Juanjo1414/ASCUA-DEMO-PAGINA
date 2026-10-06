# Graph Report - MENU AR - PAGINA (2026-10-06)

## Corpus Check

- 94 files · ~573,123 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 20 file(s) not represented in the graph (top: (none) 8, .woff2 8, .css 2)

## Summary

- 520 nodes · 968 edges · 30 communities (21 shown, 9 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 96 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `5ddc2ed8`
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
- Último paso completado
- Estado del proyecto — ASCUA-DEMO-PAGINA
- Configuraci?n de Dependabot
- ADR-0001: Demo estática multi-restaurante en Cloudflare Pages
- Sesión 2026-10-06 — fundaciones
- pull_request_template.md
- AGENTS.md — ASCUA-DEMO-PAGINA
- React + Vite
- rules/graphify.md
- workflows/graphify.md
- PROCEDENCIA.md
- Bitácora de Sesión: P-104 Adaptadores AR
- InMemorySoldOutStore

## God Nodes (most connected - your core abstractions)

1. `Último paso completado` - 30 edges
2. `useLanguage()` - 23 edges
3. `Dish` - 22 edges
4. `Fase P-1 — Re-arquitectura de PAGINA` - 22 edges
5. `Restaurant` - 19 edges
6. `ArLauncher` - 19 edges
7. `react` - 19 edges
8. `ArLaunchMode` - 18 edges
9. `Decisiones tomadas` - 18 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)

- `5.1 PAGINA` --references--> `ArLauncher` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/arLauncher.ts
- `5. La función de IA / 3D / RA` --references--> `ArDishModal()` [INFERRED]
  docs/PROYECTO.md → src/components/ArDishModal.jsx
- `Último paso completado` --references--> `MenuViewModel` [INFERRED]
  docs/ESTADO.md → src/application/use-cases/buildMenuView.ts
- `Último paso completado` --references--> `buildReservationLink()` [INFERRED]
  docs/ESTADO.md → src/application/use-cases/buildReservationLink.ts
- `Último paso completado` --references--> `getRestaurant()` [INFERRED]
  docs/ESTADO.md → src/application/use-cases/getRestaurant.ts

## Import Cycles

- None detected.

## Communities (30 total, 9 thin omitted)

### Community 0 - "App.jsx"

Cohesion: 0.09
Nodes (36): lucide-react, react, react-dom, App(), ArDishModal(), ArViewer(), VIEWER_ATTRS, Contacto() (+28 more)

### Community 1 - "restaurant.ts"

Cohesion: 0.11
Nodes (18): vitest, zod, buildReservationLink(), ReservationParams, getRestaurant(), GetRestaurantResult, formatCopPrice(), priceSchema (+10 more)

### Community 2 - "package.json"

Cohesion: 0.05
Nodes (34): dependencies, @google/model-viewer, gsap, lucide-react, react, react-dom, zod, engines (+26 more)

### Community 3 - "Escena.jsx"

Cohesion: 0.25
Nodes (15): Escena(), generarCama(), aUrl(), azar(), generarBrasa(), lienzo(), prepararBrasaTexto(), actualizarCalor() (+7 more)

### Community 4 - "carta.mjs"

Cohesion: 0.15
Nodes (10): ffmpeg-static, destino, origen, PLATOS, raiz, bloques, css, destino (+2 more)

### Community 5 - "Ascua — landing de "cocina de autor" (Histórico)"

Cohesion: 0.05
Nodes (43): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles (+35 more)

### Community 6 - "scripts"

Cohesion: 0.14
Nodes (14): Workflow CI (verify), Workflow Deploy Cloudflare Pages, scripts, build, dev, format, format:check, lint (+6 more)

### Community 7 - "devDependencies"

Cohesion: 0.11
Nodes (19): devDependencies, autoprefixer, ffmpeg-static, husky, jsdom, lint-staged, oxlint, postcss (+11 more)

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

### Community 14 - "Último paso completado"

Cohesion: 0.09
Nodes (43): 0.2 Reglas específicas de este repo, Último paso completado, 3.3 Principios SOLID aplicados (concreto, no teórico), Fase P-1 — Re-arquitectura de PAGINA, Decisiones tomadas, Acciones realizadas, AnalyticsEvent, AnalyticsTracker (+35 more)

### Community 15 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.22
Nodes (8): Bloqueos, Comandos para verificar, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-06), Pendientes detectados (fuera de alcance de la tarea actual), Siguiente paso exacto, Tarea actual

### Community 18 - "ADR-0001: Demo estática multi-restaurante en Cloudflare Pages"

Cohesion: 0.22
Nodes (8): A. Estática + contenido versionado (elegida), ADR-0001: Demo estática multi-restaurante en Cloudflare Pages, B. ARFOODS completo (Next.js + Supabase) en planes gratuitos, C. Un repo/despliegue por restaurante, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 19 - "Sesión 2026-10-06 — fundaciones"

Cohesion: 0.33
Nodes (5): Cambios, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-06 — fundaciones, Verificación

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

## Knowledge Gaps

- **240 isolated node(s):** `Fase actual`, `Tarea actual`, `Siguiente paso exacto`, `Línea base verificada (2026-10-06)`, `Bloqueos` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 269 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `restaurant.ts` to `InMemorySoldOutStore`, `App.jsx`, `package.json`, `Último paso completado`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **Why does `react` connect `App.jsx` to `package.json`, `Escena.jsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `zod` connect `restaurant.ts` to `package.json`, `Último paso completado`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Are the 29 inferred relationships involving `Último paso completado` (e.g. with `AnalyticsTracker` and `ArLauncher`) actually correct?**
  _`Último paso completado` has 29 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Dish` (e.g. with `Último paso completado` and `Fase P-1 — Re-arquitectura de PAGINA`) actually correct?**
  _`Dish` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 21 inferred relationships involving `Fase P-1 — Re-arquitectura de PAGINA` (e.g. with `AnalyticsTracker` and `ArLauncher`) actually correct?**
  _`Fase P-1 — Re-arquitectura de PAGINA` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Restaurant` (e.g. with `Último paso completado` and `Fase P-1 — Re-arquitectura de PAGINA`) actually correct?**
  _`Restaurant` has 3 INFERRED edges - model-reasoned connections that need verification._
