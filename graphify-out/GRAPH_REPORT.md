# Graph Report - MENU AR - PAGINA  (2026-10-06)

## Corpus Check
- Large corpus: 79 files · ~559,742 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 183 nodes · 338 edges · 19 communities (11 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.91)
- Token cost: 12,500 input · 3,200 output

## Community Hubs (Navigation)
- UI Presentation & Components
- Clean Architecture & AR Launching
- Runtime Dependencies & Libraries
- Canvas Fire Effects & Thermodynamics
- Dish Assets & Image Pipeline
- Multi-Restaurant & Supabase Decoupling
- Governance, CI/CD & DoD
- Build Tooling & DevDependencies
- Code Linting & Oxlint Rules
- Design Tokens & SweetSans Typography
- Phase 0 Foundations & Graph Memory
- Security Headers & CSP Hardening
- Graphify Workflow Automation
- Agent Session Protocol
- Mobile-First UX Guidelines
- SOLID Design Principles
- Dependabot Dependency Automation
- Product Strategy & Value Proposition

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 23 edges
2. `react` - 17 edges
3. `App()` - 16 edges
4. `Escena()` - 11 edges
5. `lucide-react` - 8 edges
6. `Menu()` - 8 edges
7. `ArDishModal()` - 7 edges
8. `launchAr()` - 7 edges
9. `Clean Architecture ligera (Capas)` - 7 edges
10. `lienzo()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Clean Architecture ligera (Capas)` --semantically_similar_to--> `Regla de capas y dependencias`  [INFERRED] [semantically similar]
  docs/PLAN-IMPLEMENTACION.md → CLAUDE.md
- `Mapa de arquitectura legacy` --references--> `App()`  [EXTRACTED]
  PROYECTO.md → src/App.jsx
- `Workflow CI (verify)` --references--> `lint`  [EXTRACTED]
  .github/workflows/ci.yml → package.json
- `Clean Architecture ligera (Capas)` --references--> `ArDishModal()`  [EXTRACTED]
  docs/PLAN-IMPLEMENTACION.md → src/components/ArDishModal.jsx
- `Clean Architecture ligera (Capas)` --references--> `ArViewer()`  [EXTRACTED]
  docs/PLAN-IMPLEMENTACION.md → src/components/ArViewer.jsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Gobernanza y Clean Architecture** — claude_reglas_gobernanza, agents_directivas_antigravity, docs_plan_implementacion_clean_architecture, docs_adr_0001_demo_estatica_multi_restaurante_adr0001 [EXTRACTED 1.00]
- **Pipeline y experiencia de lanzamiento AR** — src_lib_launchar_launchar, src_lib_browserenv_isios, src_components_arviewer_arviewer, docs_plan_implementacion_experiencia_ar [EXTRACTED 1.00]
- **Auditor?a de seguridad y desacople** — cyber_neo_report_cn_001_csp, cyber_neo_report_cn_002_supabase_anon, cyber_neo_report_cn_003_fetchactiveasset, src_lib_arassets [EXTRACTED 1.00]

## Communities (19 total, 8 thin omitted)

### Community 0 - "UI Presentation & Components"
Cohesion: 0.16
Nodes (23): Mapa de arquitectura legacy, lucide-react, react, App(), Contacto(), FranjaReserva(), HeroFuego(), LETRAS (+15 more)

### Community 1 - "Clean Architecture & AR Launching"
Cohesion: 0.15
Nodes (18): Regla de capas y dependencias, Clean Architecture ligera (Capas), Experiencia AR y escala real (Ley 1480), Fase P-1: Re-arquitectura de PAGINA, Prop?sito de producto Ascua (PITS), @google/model-viewer, ArDishModal(), ArViewer() (+10 more)

### Community 2 - "Runtime Dependencies & Libraries"
Cohesion: 0.08
Nodes (20): dependencies, @google/model-viewer, gsap, lucide-react, react, react-dom, name, private (+12 more)

### Community 3 - "Canvas Fire Effects & Thermodynamics"
Cohesion: 0.24
Nodes (16): Escena(), generarCama(), aUrl(), azar(), generarBrasa(), lienzo(), prepararBrasaTexto(), actualizarCalor() (+8 more)

### Community 4 - "Dish Assets & Image Pipeline"
Cohesion: 0.14
Nodes (11): Procedencia de fotos de carta y generaci?n IA, ffmpeg-static, destino, origen, PLATOS, raiz, bloques, css (+3 more)

### Community 5 - "Multi-Restaurant & Supabase Decoupling"
Cohesion: 0.20
Nodes (10): CN-002: Clave anon Supabase hardcodeada, CN-003: fetchActiveAsset no validado, Modelo de aislamiento multi-restaurante, Fase P-2: Multi-restaurante, Integraci?n legacy Supabase ARFOODS, DISH_INDEX_TO_ASSET_FOLDER, fetchActiveAsset(), getAssetForDishIndex() (+2 more)

### Community 6 - "Governance, CI/CD & DoD"
Cohesion: 0.18
Nodes (11): Directivas espec?ficas para Antigravity, Definici?n de terminado (DoD), Reglas de gobernanza y calidad, Plantilla de Pull Request con checklist, Workflow CI (verify), Workflow Deploy Cloudflare Pages, scripts, build (+3 more)

### Community 7 - "Build Tooling & DevDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, autoprefixer, ffmpeg-static, oxlint, postcss, tailwindcss, @types/react, @types/react-dom (+2 more)

### Community 8 - "Code Linting & Oxlint Rules"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 9 - "Design Tokens & SweetSans Typography"
Cohesion: 0.40
Nodes (3): Paleta crom?tica (Deep Forest, Lime Glow), Sistema de dise?o y tokens visuales, Tipograf?a y jerarqu?a (SweetSans)

### Community 10 - "Phase 0 Foundations & Graph Memory"
Cohesion: 0.67
Nodes (3): Reglas de consulta de graphify, Estado vivo del proyecto, Fase 0 ? Fundaciones (X-001 a X-011)

## Knowledge Gaps
- **72 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `name` (+67 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 77 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `UI Presentation & Components` to `Clean Architecture & AR Launching`, `Runtime Dependencies & Libraries`, `Canvas Fire Effects & Thermodynamics`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **Why does `ffmpeg-static` connect `Dish Assets & Image Pipeline` to `Runtime Dependencies & Libraries`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `scripts` connect `Governance, CI/CD & DoD` to `Runtime Dependencies & Libraries`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _72 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Runtime Dependencies & Libraries` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Dish Assets & Image Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._