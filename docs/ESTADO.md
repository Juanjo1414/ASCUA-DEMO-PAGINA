# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual
Fase 0 — Fundaciones.

## Tarea actual
X-006 — Protección de rama `main` y environments (manual en GitHub) / X-008 — Dependabot y CodeQL / X-009 — Cortar dependencia del Supabase de terceros. **Estado:** lista para iniciar.

## Último paso completado
- **X-000 / X-001 / X-002:** Rama `dev/Juanjo` creada y subida a GitHub; reglas de gobierno (`CLAUDE.md`, `AGENTS.md`), plan de implementación, ADR-0001, `docs/DESIGN.md` y workflows de CI/CD commiteados.
- **X-005:** Node 22 fijado en `.nvmrc` y `engines` en `package.json`.
- **X-004:** Hooks locales configurados con Husky (`pre-commit` con lint-staged y `pre-push` con `npm run verify` provisional). Probada falla y restauración manual.
- **X-003:** graphify instalado y grafo construido con 183 nodos y 338 aristas (código + `docs/`), integración en `.agents/`, `.gitignore` y hooks post-commit/post-checkout configurados.

## Siguiente paso exacto
1. Configurar reglas de protección de rama `main` en GitHub (X-006).
2. Habilitar Dependabot y CodeQL en GitHub (X-008).
3. Proceder con la tarea **X-009**: Cortar la dependencia del Supabase de terceros en `arAssets.js`, `.env.example` y `vercel.json`.

## Línea base verificada (2026-10-06)
- `node -v`: v22.13.0 ✅
- `npm run verify` (lint + build): ✅ en verde (1 warning conocido de oxlint en `LanguageContext.jsx`, 0 errores).
- Git hooks: `pre-commit` (oxlint sobre staged files) y `pre-push` (`npm run verify`) activos.
- Grafo de conocimiento: `graphify query` y `graphify explain` operativos en `graphify-out/`.

## Bloqueos
- Ninguno.

## Pendientes detectados (fuera de alcance de la tarea actual)
- `npm audit` reporta 8 vulnerabilidades (2 moderadas, 6 altas) asociadas a herramientas de dev (revisar en auditoría de seguridad).
- Advertencia de oxlint en `LanguageContext.jsx` (`only-export-components`), planificada para resolverse en P-101.
- Chunk de `@google/model-viewer` > 500 kB en build, planificado para presupuesto de rendimiento en P-702.
- Normalización de modelos 3D a medida real (planificado para A-204 en repo AR y P-307 en PAGINA).

## Comandos para verificar
```powershell
npm run verify
graphify query "launchAr"
graphify explain "Menu"
```
