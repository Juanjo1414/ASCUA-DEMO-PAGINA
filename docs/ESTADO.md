# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase P-1 — Re-arquitectura de PAGINA (en progreso).

## Tarea actual

P-101 — TypeScript + herramientas de prueba. **Estado:** completada ✅.
Siguiente tarea: **P-102** — Zod y esquemas del borde.

## Último paso completado

- **P-101 (TypeScript + Vitest + Pipeline de calidad):**
  - `tsconfig.json` estricto configurado (`strict: true`, `noUncheckedIndexedAccess: true`, `allowJs: true`, `moduleResolution: "bundler"`, paths `@/*`).
  - Vitest + Testing Library + jsdom configurados en `vitest.config.js` y `tests/setup.ts`.
  - Prueba unitaria inicial implementada en `tests/unit/carta.test.ts` (100% pasando).
  - Scripts creados en `package.json`: `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `test:coverage`, `format` (`prettier --write .`), `format:check`.
  - `npm run verify` ampliado para correr la suite completa en cadena: `lint && typecheck && test && build`.
  - Warning de oxlint en `LanguageContext.jsx` resuelto limpiamente desacoplando `LanguageContext.js` (contexto), `useLanguage.js` (hook) y `LanguageProvider.jsx` (componente React). 0 advertencias, 0 errores.
  - `.prettierrc` configurado respetando las convenciones del repositorio (`singleQuote: true`, `semi: false`).
- **Fase 0 (X-000 a X-010):**
  - Fundaciones completadas: Node 22 fijado, Husky + lint-staged activos, Graphify indexando el repositorio, desacople total de Supabase y reorganización limpia de la raíz.

## Siguiente paso exacto

1. Iniciar la tarea **P-102** — Zod y esquemas del borde:
   - Instalar `zod`.
   - Definir esquemas para datos de entrada externa (platos, carta, restaurante, configuración visual, idioma).
   - Validar datos de la carta en el borde contra los esquemas Zod con pruebas unitarias.
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare (cuando disponga):
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
   - X-008: Habilitar CodeQL en GitHub (Security → Code scanning).

## Línea base verificada (2026-10-06)

- `node -v`: v22.13.0 ✅
- `npm run verify`: ✅ en verde (oxlint 0 warn/err, tsc 0 err, vitest 2/2 tests pass, vite build exitoso).
- Git hooks: `pre-commit` (oxlint + prettier) y `pre-push` (`npm run verify`) activos.
- Grafo de conocimiento: operativo y actualizado en `graphify-out/` (402 nodos, 554 aristas).

## Bloqueos

- Ninguno.

## Pendientes detectados (fuera de alcance de la tarea actual)

- 8 vulnerabilidades detectadas por npm audit asociadas a herramientas de desarrollo (se auditarán con cyber-neo / P-703).
- Advertencia de chunk de `@google/model-viewer` > 500 kB en build (presupuesto de rendimiento en P-702).

## Comandos para verificar

```powershell
npm run verify
git status --short
```
