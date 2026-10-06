# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual
Fase 0 — Fundaciones (completada) → Fase P-1 — Re-arquitectura de PAGINA (iniciando).

## Tarea actual
P-101 — TypeScript + herramientas de prueba (tsconfig estricto, Vitest, scripts typecheck/test/verify, corrección de warning de oxlint). **Estado:** lista para iniciar.

## Último paso completado
- **X-000 / X-001 / X-002:** Rama `dev/Juanjo` creada y subida a GitHub; reglas de gobierno (`CLAUDE.md`, `AGENTS.md`), plan de implementación, ADR-0001, `docs/DESIGN.md` y workflows de CI/CD.
- **X-005:** Node 22 fijado en `.nvmrc` y `engines` en `package.json`.
- **X-004:** Hooks locales con Husky (`pre-commit` con lint-staged y `pre-push` con `npm run verify` provisional).
- **X-003:** graphify instalado y grafo construido con 183 nodos y 338 aristas (código + `docs/`), integración en `.agents/`, `.gitignore` y hooks post-commit/post-checkout.
- **X-009:** Cortada la dependencia del Supabase de terceros en `src/lib/arAssets.js`, `.env.example` y `vercel.json` (0 ocurrencias de `vnztoczhwrqjrgatiutz`).
- **X-010:** Limpieza del repo: renombrado a `ascua-demo`, retirada de `vercel.json`, `PRODUCT.md` y `PROYECTO.md` (marcado como histórico) trasladados a `docs/`, reporte de seguridad a `docs/seguridad/` y assets fuente a `content/raw/`.

## Siguiente paso exacto
1. Comenzar la **Fase P-1**, tarea **P-101**:
   - Configurar `tsconfig.json` estricto con `allowJs: true` para migración incremental.
   - Instalar dependencias de prueba (Vitest, Testing Library, jsdom).
   - Crear scripts `typecheck`, `test`, `test:coverage` y ampliar `verify`.
   - Corregir el warning de oxlint en `src/i18n/LanguageContext.jsx`.
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare (cuando disponga):
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
   - X-008: Habilitar CodeQL en GitHub (Security → Code scanning).

## Línea base verificada (2026-10-06)
- `node -v`: v22.13.0 ✅
- `npm run verify` (lint + build): ✅ en verde (paquete `ascua-demo`, 0 errores).
- Git hooks: `pre-commit` (oxlint sobre staged files) y `pre-push` (`npm run verify`) activos.
- Grafo de conocimiento: operativo en `graphify-out/`.

## Bloqueos
- Ninguno.

## Pendientes detectados (fuera de alcance de la tarea actual)
- 8 vulnerabilidades detectadas por npm audit asociadas a herramientas de desarrollo (se auditarán con cyber-neo / P-703).
- Advertencia de oxlint en `LanguageContext.jsx` (`only-export-components`), a resolver en la tarea inmediata P-101.
- Chunk de `@google/model-viewer` > 500 kB en build (presupuesto de rendimiento en P-702).

## Comandos para verificar
```powershell
npm run verify
git status --short
```
