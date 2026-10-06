# Graph Report - MENU AR - PAGINA (2026-10-06)

## Corpus Check

- 68 files · ~567,675 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 18 file(s) not represented in the graph (top: .woff2 8, (none) 7, .css 2)

## Summary

- 440 nodes · 633 edges · 29 communities (20 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `34b08022`
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
- restaurant.ts
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
- carta.js

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
- `Fase P-1 — Re-arquitectura de PAGINA` --references--> `ArLaunchMode` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/domain/ar.ts
- `Fase P-1 — Re-arquitectura de PAGINA` --references--> `Price` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/domain/price.ts
- `Fase P-1 — Re-arquitectura de PAGINA` --references--> `Theme` [INFERRED]
  docs/PLAN-IMPLEMENTACION.md → src/domain/theme.ts
- `11. Huecos conocidos / próximos pasos razonables` --references--> `fetchActiveAsset()` [INFERRED]
  docs/PROYECTO.md → src/lib/arAssets.js

## Import Cycles

- None detected.

## Communities (29 total, 9 thin omitted)

### Community 0 - "App.jsx"

Cohesion: 0.11
Nodes (28): lucide-react, react, react-dom, App(), ArDishModal(), ArViewer(), VIEWER_ATTRS, Contacto() (+20 more)

### Community 1 - "launchAr"

Cohesion: 0.48
Nodes (5): IN_APP_MARKERS, isIOS(), launchAr(), launchQuickLook(), launchSceneViewer()

### Community 2 - "package.json"

Cohesion: 0.06
Nodes (34): dependencies, @google/model-viewer, gsap, lucide-react, react, react-dom, zod, engines (+26 more)

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
Nodes (40): 0. Cómo usar este documento, 10. Definición de terminado (DoD) — aplica a toda tarea, 11. Riesgos, 12. Registro de cambios del plan, 1. Resumen ejecutivo y decisiones, 2. Línea base verificada (5 oct 2026), 3.1 Capas (Clean Architecture ligera), 3.2 Estructura de carpetas objetivo (+32 more)

### Community 11 - "sweetgreen — Style Reference"

Cohesion: 0.05
Nodes (39): Agent Prompt Guide, Border Radius, Components, CSS Custom Properties, Do, Do's and Don'ts, Don't, Elevation (+31 more)

### Community 12 - "CLAUDE.md — ASCUA-DEMO-PAGINA"

Cohesion: 0.10
Nodes (20): 0.1 Arquitectura (regla de capas — se verifica con dependency-cruiser), 0.2 Reglas específicas de este repo, 0. Contexto del proyecto, 10. Prohibiciones rápidas, 1. Protocolo de sesión (obligatorio), 2. Git y flujo de entrega, 3. Calidad: Definición de terminado (DoD), 4.1 Comentarios y documentación: el código se explica solo (+12 more)

### Community 13 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, checkJs, esModuleInterop, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "restaurant.ts"

Cohesion: 0.10
Nodes (28): Fase P-1 — Re-arquitectura de PAGINA, vitest, zod, ArAsset, arAssetSchema, ArLaunchMode, DeviceCapabilities, deviceCapabilitiesSchema (+20 more)

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

- **240 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `name` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 266 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.jsx` to `package.json`, `Escena.jsx`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `9. Backlog por fases` connect `Plan de implementación — Ascua (PITS)` to `restaurant.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `Fase P-1 — Re-arquitectura de PAGINA` connect `restaurant.ts` to `Plan de implementación — Ascua (PITS)`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11248185776487664 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `Ascua — landing de "cocina de autor" (Histórico)` be split into smaller, more focused modules?**
  _Cohesion score 0.04717853839037928 - nodes in this community are weakly interconnected._
