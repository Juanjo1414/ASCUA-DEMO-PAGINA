# Graph Report - MENU AR - PAGINA (2026-10-06)

## Corpus Check

- 87 files · ~571,662 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 20 file(s) not represented in the graph (top: (none) 8, .woff2 8, .css 2)

## Summary

- 500 nodes · 867 edges · 33 communities (24 shown, 9 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `fdbb6011`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- App.jsx
- launchAr
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
- Product
- arAssets.js
- Findings
- Cyber Neo Security Report
- InMemorySoldOutStore

## God Nodes (most connected - your core abstractions)

1. `useLanguage()` - 23 edges
2. `react` - 19 edges
3. `Restaurant` - 19 edges
4. `Fase P-1 — Re-arquitectura de PAGINA` - 18 edges
5. `compilerOptions` - 16 edges
6. `App()` - 15 edges
7. `Dish` - 15 edges
8. `CLAUDE.md — ASCUA-DEMO-PAGINA` - 15 edges
9. `sweetgreen — Style Reference` - 15 edges
10. `Plan de implementación — Ascua (PITS)` - 14 edges

## Surprising Connections (you probably didn't know these)

- `5.1 PAGINA` --references--> `ArLauncher` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/application/ports/arLauncher.ts
- `5. La función de IA / 3D / RA` --references--> `ArDishModal()` [INFERRED]
  docs/PROYECTO.md → src/components/ArDishModal.jsx
- `11. Huecos conocidos / próximos pasos razonables` --references--> `fetchActiveAsset()` [INFERRED]
  docs/PROYECTO.md → src/lib/arAssets.js
- `[CN-003] Unused `fetchActiveAsset()` would feed unvalidated Supabase data into AR viewer if wired up` --references--> `fetchActiveAsset()` [INFERRED]
  docs/seguridad/2026-08-28-cyber-neo.md → src/lib/arAssets.js
- `Executive Summary` --references--> `fetchActiveAsset()` [INFERRED]
  docs/seguridad/2026-08-28-cyber-neo.md → src/lib/arAssets.js

## Import Cycles

- None detected.

## Communities (33 total, 9 thin omitted)

### Community 0 - "App.jsx"

Cohesion: 0.10
Nodes (30): lucide-react, react, react-dom, App(), ArDishModal(), ArViewer(), VIEWER_ATTRS, Contacto() (+22 more)

### Community 1 - "launchAr"

Cohesion: 0.48
Nodes (5): IN_APP_MARKERS, isIOS(), launchAr(), launchQuickLook(), launchSceneViewer()

### Community 2 - "package.json"

Cohesion: 0.05
Nodes (34): dependencies, @google/model-viewer, gsap, lucide-react, react, react-dom, zod, engines (+26 more)

### Community 3 - "Escena.jsx"

Cohesion: 0.24
Nodes (16): Escena(), generarCama(), aUrl(), azar(), generarBrasa(), lienzo(), prepararBrasaTexto(), actualizarCalor() (+8 more)

### Community 4 - "carta.mjs"

Cohesion: 0.15
Nodes (10): ffmpeg-static, destino, origen, PLATOS, raiz, bloques, css, destino (+2 more)

### Community 5 - "Ascua — landing de "cocina de autor" (Histórico)"

Cohesion: 0.17
Nodes (11): 10. Cómo correr esto, 1. Qué es (y qué no es), 2. Stack tecnológico, 3. Arquitectura, 5. La función de IA / 3D / RA, 6. Formulario de contacto — importante, 7. Seguridad, 8. Accesibilidad y rendimiento — decisiones notables (+3 more)

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
Nodes (38): 0. Cómo usar este documento, 10. Definición de terminado (DoD) — aplica a toda tarea, 11. Riesgos, 12. Registro de cambios del plan, 1. Resumen ejecutivo y decisiones, 2. Línea base verificada (5 oct 2026), 3.1 Capas (Clean Architecture ligera), 3.2 Estructura de carpetas objetivo (+30 more)

### Community 11 - "sweetgreen — Style Reference"

Cohesion: 0.05
Nodes (39): Agent Prompt Guide, Border Radius, Components, CSS Custom Properties, Do, Do's and Don'ts, Don't, Elevation (+31 more)

### Community 12 - "CLAUDE.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.10
Nodes (20): 0.1 Arquitectura (regla de capas — se verifica con dependency-cruiser), 0.2 Reglas específicas de este repo, 0. Contexto del proyecto, 10. Prohibiciones rápidas, 1. Protocolo de sesión (obligatorio), 2. Git y flujo de entrega, 3. Calidad: Definición de terminado (DoD), 4.1 Comentarios y documentación: el código se explica solo (+12 more)

### Community 13 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, checkJs, esModuleInterop, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "doubles.ts"

Cohesion: 0.06
Nodes (55): Siguiente paso exacto, Último paso completado, 3.3 Principios SOLID aplicados (concreto, no teórico), Fase P-1 — Re-arquitectura de PAGINA, Fase P-3 — Funciones de la demo, Decisiones tomadas, vitest, zod (+47 more)

### Community 15 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.25
Nodes (7): Bloqueos, Comandos para verificar, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-06), Pendientes detectados (fuera de alcance de la tarea actual), Tarea actual

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

### Community 28 - "Product"

Cohesion: 0.20
Nodes (9): Brand Commitments, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles, Product Purpose (+1 more)

### Community 29 - "arAssets.js"

Cohesion: 0.24
Nodes (9): Capabilities and Constraints, 11. Huecos conocidos / próximos pasos razonables, 4. Base de datos / backend, Executive Summary, DISH_INDEX_TO_ASSET_FOLDER, fetchActiveAsset(), getAssetForDishIndex(), isTrustedAssetUrl() (+1 more)

### Community 30 - "Findings"

Cohesion: 0.22
Nodes (9): [CN-001] Missing Content-Security-Policy and security headers, [CN-002] Third-party Supabase anon key and URL hardcoded in client bundle, [CN-003] Unused `fetchActiveAsset()` would feed unvalidated Supabase data into AR viewer if wired up, [CN-004] Google Maps iframe embed missing `sandbox` attribute, [CN-005] `.gitignore` doesn't cover broader secret-file patterns, Findings, Low Findings, Low & Informational Findings (+1 more)

### Community 31 - "Cyber Neo Security Report"

Cohesion: 0.33
Nodes (5): Cyber Neo Security Report, Dependency Vulnerabilities, Scan Metadata, Supply Chain Assessment, What Was Verified Clean

## Knowledge Gaps

- **236 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `name` (+231 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 266 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `doubles.ts` to `App.jsx`, `package.json`?**
  _High betweenness centrality (0.176) - this node is a cross-community bridge._
- **Why does `react` connect `App.jsx` to `package.json`, `Escena.jsx`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `zod` connect `doubles.ts` to `package.json`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Restaurant` (e.g. with `Último paso completado` and `Fase P-1 — Re-arquitectura de PAGINA`) actually correct?**
  _`Restaurant` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 17 inferred relationships involving `Fase P-1 — Re-arquitectura de PAGINA` (e.g. with `AnalyticsTracker` and `ArLauncher`) actually correct?**
  _`Fase P-1 — Re-arquitectura de PAGINA` has 17 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _236 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10213032581453634 - nodes in this community are weakly interconnected._
