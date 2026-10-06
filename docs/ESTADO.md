# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase C — Correcciones (revisión 2).

## Tarea actual

Implementando el Lote 1 de correcciones (C-01 a C-09).

## Último paso completado

- **C-06 (Marca de terceros fuera y tipografías propias):** Eliminada la marca de terceros y configuradas las fuentes DM Sans y Fraunces localmente.
- **C-05 (index.html neutro y móvil):** `<title>`, descripción genérica, `theme-color` y `viewport-fit=cover` configurados en `index.html`.
- **C-04 (Sin `any`):** Reemplazados tipos genéricos por los del dominio. Regla `no-explicit-any` en `.oxlintrc.json`.
- **C-03 (Avisos de lint en cero):** Limpieza de avisos de `eslint`. Script lint modificado a `oxlint --deny-warnings`.
- **C-02 (Borrar código muerto):** Eliminados scripts no usados y archivo de pruebas.
- **C-01 (Archivos generados fuera del repositorio):** Añadidos `playwright-report` y `test-results` a `.gitignore`.

### Completadas con observaciones de fases previas:

- **P-403 (Rediseño de componentes):** rediseño hecho; falta que los datos del restaurante gobiernen la página, ver C-12 a C-19.
- **P-307 (Medida real):** solo escala fija; la medida real por plato depende de A-204 en el repo AR.
- **P-107 (Store reactivo global):** store de jotai implementado y aprobado; falta la capa `presentation/`.

## Siguiente paso exacto

1. **Siguiente después de las correcciones:** P-205 (QR imprimible), P-601 (demo genérica con modelos 3D aprobados), P-701 a P-705.
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare (cuando disponga):
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
   - X-008: Habilitar CodeQL en GitHub (Security → Code scanning).

## Línea base verificada (2026-10-06)

- `node -v`: v22.13.0 ✅
- `npm run verify`: ✅ en verde (oxlint 0 warn/err, tsc 0 err, vitest 77/77 tests pass, playwright 9/9 tests pass, vite build exitoso).
- Cobertura: 100 % líneas en `domain/` y `application/use-cases/`.
- Git hooks: `pre-commit` y `pre-push` activos.
- Grafo de conocimiento: 500 nodos y 867 aristas en `graphify-out/`.

## Bloqueos

- Ninguno.

## Pendientes detectados (fuera de alcance de la tarea actual)

- 8 vulnerabilidades detectadas por npm audit asociadas a herramientas de desarrollo (se auditarán con cyber-neo / P-703).
- Advertencia de chunk de `@google/model-viewer` > 500 kB en build (presupuesto de rendimiento en P-702).

## Comandos para verificar

```powershell
npm run verify
npm run test:coverage
git status --short
```
