# Graph Report - MENU AR - PAGINA (2026-10-06)

## Corpus Check

- 57 files · ~564,282 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 17 file(s) not represented in the graph (top: .woff2 8, (none) 6, .css 2)

## Summary

- 402 nodes · 554 edges · 28 communities (20 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `83daf388`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- App.jsx
- ArDishModal.jsx
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
- Components
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

## God Nodes (most connected - your core abstractions)

1. `useLanguage()` - 23 edges
2. `react` - 19 edges
3. `compilerOptions` - 16 edges
4. `App()` - 15 edges
5. `CLAUDE.md — ASCUA-DEMO-PAGINA` - 15 edges
6. `sweetgreen — Style Reference` - 15 edges
7. `Plan de implementación — Ascua (PITS)` - 14 edges
8. `scripts` - 12 edges
9. `Components` - 12 edges
10. `Ascua — landing de "cocina de autor" (Histórico)` - 12 edges

## Surprising Connections (you probably didn't know these)

- `5. La función de IA / 3D / RA` --references--> `ArDishModal()` [INFERRED]
  docs/PROYECTO.md → src/components/ArDishModal.jsx
- `11. Huecos conocidos / próximos pasos razonables` --references--> `fetchActiveAsset()` [INFERRED]
  docs/PROYECTO.md → src/lib/arAssets.js
- `Executive Summary` --references--> `fetchActiveAsset()` [INFERRED]
  docs/seguridad/2026-08-28-cyber-neo.md → src/lib/arAssets.js
- `Capabilities and Constraints` --references--> `launchAr()` [INFERRED]
  docs/PRODUCT.md → src/lib/launchAr.js
- `4. Base de datos / backend` --references--> `fetchActiveAsset()` [INFERRED]
  docs/PROYECTO.md → src/lib/arAssets.js

## Import Cycles

- None detected.

## Communities (28 total, 8 thin omitted)

### Community 0 - "App.jsx"

Cohesion: 0.13
Nodes (24): lucide-react, react, react-dom, App(), Contacto(), FranjaReserva(), HeroFuego(), LETRAS (+16 more)

### Community 1 - "ArDishModal.jsx"

Cohesion: 0.21
Nodes (10): @google/model-viewer, ArDishModal(), ArViewer(), VIEWER_ATTRS, detectInAppBrowser(), IN_APP_MARKERS, isIOS(), launchAr() (+2 more)

### Community 2 - "package.json"

Cohesion: 0.05
Nodes (35): dependencies, @google/model-viewer, gsap, lucide-react, react, react-dom, engines, node (+27 more)

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
Nodes (41): 0. Cómo usar este documento, 10. Definición de terminado (DoD) — aplica a toda tarea, 11. Riesgos, 12. Registro de cambios del plan, 1. Resumen ejecutivo y decisiones, 2. Línea base verificada (5 oct 2026), 3.1 Capas (Clean Architecture ligera), 3.2 Estructura de carpetas objetivo (+33 more)

### Community 11 - "sweetgreen — Style Reference"

Cohesion: 0.07
Nodes (27): Agent Prompt Guide, Border Radius, CSS Custom Properties, Do, Do's and Don'ts, Don't, Elevation, Example Component Prompts (+19 more)

### Community 12 - "CLAUDE.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.10
Nodes (20): 0.1 Arquitectura (regla de capas — se verifica con dependency-cruiser), 0.2 Reglas específicas de este repo, 0. Contexto del proyecto, 10. Prohibiciones rápidas, 1. Protocolo de sesión (obligatorio), 2. Git y flujo de entrega, 3. Calidad: Definición de terminado (DoD), 4.1 Comentarios y documentación: el código se explica solo (+12 more)

### Community 13 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, checkJs, esModuleInterop, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "Components"

Cohesion: 0.17
Nodes (12): Components, Eyebrow Label, Food Photograph (Standard), Full-Bleed Hero with Text Overlay, Ghost Text Link, Menu Category Tab, Navigation Bar, Online Only Badge (+4 more)

### Community 15 - "Estado del proyecto — ASCUA-DEMO-PAGINA"

Cohesion: 0.20
Nodes (9): Bloqueos, Comandos para verificar, Estado del proyecto — ASCUA-DEMO-PAGINA, Fase actual, Línea base verificada (2026-10-06), Pendientes detectados (fuera de alcance de la tarea actual), Siguiente paso exacto, Tarea actual (+1 more)

### Community 18 - "ADR-0001: Demo estática multi-restaurante en Cloudflare Pages"

Cohesion: 0.22
Nodes (8): A. Estática + contenido versionado (elegida), ADR-0001: Demo estática multi-restaurante en Cloudflare Pages, B. ARFOODS completo (Next.js + Supabase) en planes gratuitos, C. Un repo/despliegue por restaurante, Consecuencias, Contexto, Decisión, Opciones consideradas

### Community 19 - "Sesión 2026-10-06 — fundaciones"

Cohesion: 0.29
Nodes (6): Cambios, Decisiones tomadas, Notas para el grafo, Pendiente / siguiente paso exacto, Sesión 2026-10-06 — fundaciones, Verificación

### Community 20 - "pull_request_template.md"

Cohesion: 0.33
Nodes (5): Cómo se probó, Qué cambia y por qué, Revisión, Riesgos y rollback, Tarea(s)

### Community 21 - "AGENTS.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.40
Nodes (4): AGENTS.md — ASCUA-DEMO-PAGINA, Cierre de sesión (obligatorio), Diferencias para Antigravity, Regla principal

### Community 22 - "React + Vite"

Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + Vite

## Knowledge Gaps

- **234 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `name` (+229 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 260 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.jsx` to `ArDishModal.jsx`, `package.json`, `Escena.jsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `getAssetForDishIndex()` connect `Ascua — landing de "cocina de autor" (Histórico)` to `App.jsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _234 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1323671497584541 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05226480836236934 - nodes in this community are weakly interconnected._
- **Should `Ascua — landing de "cocina de autor" (Histórico)` be split into smaller, more focused modules?**
  _Cohesion score 0.04717853839037928 - nodes in this community are weakly interconnected._
