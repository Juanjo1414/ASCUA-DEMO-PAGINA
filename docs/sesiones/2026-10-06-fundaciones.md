# Sesión 2026-10-06 — fundaciones
- **Herramienta:** Antigravity
- **Tareas:** X-000, X-001, X-002, X-005, X-004, X-003, X-009, X-010

## Decisiones tomadas
- **Creación y push de rama `dev/Juanjo`:** se inició la rama a partir de `main` con el commit inicial de gobernanza y se preservó la autoría exclusiva de Juan Jose Jaramillo, sin créditos de IA ni coautorías.
- **Node 22 normalizado (X-005):** se fijó `.nvmrc` en 22 y `engines: { "node": ">=22" }` para asegurar paridad estricta entre el entorno local de Windows 11 y los workflows de CI en GitHub Actions.
- **Husky y lint-staged integrados (X-004):** se configuró `pre-commit` con `lint-staged` (`oxlint`) y `pre-push` con `npm run verify` provisional (`npm run lint && npm run build`). Se probó manualmente la denegación ante fallas y la aprobación al restaurar.
- **Construcción y persistencia del grafo de conocimiento (X-003):** graphify 0.9.73 procesó tanto el código (AST) como los documentos de gobierno y arquitectura (`docs/`, `PRODUCT.md`, `PROYECTO.md`, reportes de seguridad y workflows). Se versionan `graph.json`, `GRAPH_REPORT.md`, `manifest.json` y `cost.json`; se ignoran `cache/`, archivos `.graphify_*` y `graph.html`.
- **Desacople de Supabase de terceros (X-009):** se eliminaron credenciales y referencias externas de `.env.example`, `vercel.json` y `src/lib/arAssets.js`. Si no hay URL configurada en variables de entorno, la demo estática opera sin peticiones de red hacia servicios de terceros.
- **Limpieza de raíz y reestructuración (X-010):** se renombró el paquete a `ascua-demo`, se retiró `vercel.json`, se trasladaron los documentos a `docs/` (`PROYECTO.md` marcado con banner histórico, reporte de seguridad en `docs/seguridad/`) y los assets crudos a `content/raw/`.

## Cambios
- `.nvmrc`: fijada versión 22 de Node.js.
- `package.json` y `package-lock.json`: nombre `ascua-demo`, campo `engines`, scripts `prepare` y `verify`, y dependencias de desarrollo `husky` y `lint-staged`.
- `.husky/`: hooks `pre-commit`, `pre-push`, `post-commit` y `post-checkout`.
- `.gitignore` y `.gitattributes`: exclusiones de temporales de graphify y driver de unión de merge para `graphify-out/graph.json`.
- `.agents/rules/graphify.md` y `.agents/workflows/graphify.md`: integración nativa de la skill y workflow para Antigravity.
- `src/lib/arAssets.js` y `.env.example`: desacoplados de dominios de terceros y documentados con TSDoc y encabezado de propósito.
- `docs/`: consolidación de `docs/PRODUCT.md`, `docs/PROYECTO.md` (histórico), `docs/seguridad/` y `docs/ESTADO.md`.
- `content/raw/`: almacenamiento de video y fotos de platos fuente fuera de la raíz.
- `graphify-out/`: grafo de conocimiento con 183 nodos y 338 aristas, reporte y métricas de costo.

## Verificación
- `npm run verify` → Exitoso (oxlint 0 errores / 1 warning conocido; build de Vite de `ascua-demo` completado en verde).
- `git push origin dev/Juanjo` → Verificación automática de `pre-push` en verde y commits subidos exitosamente a GitHub.
- `& "C:\Program Files\Git\bin\sh.exe" .husky/pre-push` con sintaxis rota → Retornó código `1` (rechazo verificado).
- `& "C:\Program Files\Git\bin\sh.exe" .husky/pre-push` restaurado → Retornó código `0` (aprobación verificada).
- `git grep -i vnztoczhwrqjrgatiutz` → 0 resultados en código activo o configuración.
- `graphify query "launchAr"` y `graphify explain "Menu"` → Operativos y validados contra el grafo.

## Pendiente / siguiente paso exacto
- **Siguiente paso exacto:** Iniciar **Fase P-1**, tarea **P-101**: TypeScript estricto, configuración de Vitest, scripts `typecheck`/`test` y resolución de advertencia de oxlint en `LanguageContext.jsx`.

## Notas para el grafo
- Se enlazaron las directivas de gobierno (`CLAUDE.md`, `AGENTS.md`) con las capas de arquitectura del plan (`docs/PLAN-IMPLEMENTACION.md`) y los lanzadores AR de `src/lib/launchAr.js`.
- La raíz quedó limpia y sin archivos fuera de lugar, facilitando que el analizador de código y graphify mantengan un mapa exacto de la arquitectura.
