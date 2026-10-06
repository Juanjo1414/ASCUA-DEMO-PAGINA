# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase P-1 — Re-arquitectura de PAGINA (en progreso).

## Tarea actual

P-105 — Repositorio de contenido estático. **Estado:** completada ✅.
Siguiente tarea: **P-106** — Composition root y router.

## Último paso completado

- **P-105 (Repositorio de contenido estático):**
  - Creada la implementación `StaticJsonRestaurantRepository` en `infrastructure/content/`.
  - Agregado el guardia de seguridad (`RESTAURANT_SLUG_REGEX`) para prevenir path traversal antes del `fetch`.
  - Validación zod de la respuesta JSON para que la capa de UI siempre trabaje con datos íntegros.
  - Implementadas pruebas unitarias del repositorio con cobertura sobre los escenarios de validación fallida y respuesta exitosa.
- **P-104 (Adaptadores AR):**
  - Implementados los adaptadores nativos `QuickLookLauncher`, `SceneViewerLauncher` y `ModelViewerFallbackLauncher` en `src/infrastructure/ar/`.
  - Implementado `BrowserEnvironmentDetector` en `src/infrastructure/browser/` preservando las detecciones de in-app browsers y de SO del proyecto antiguo.
  - Creadas las pruebas de contrato en Vitest (`describe.each`) asegurando que los 3 lanzadores cumplen con `ArLauncher`.
- **P-103 (Puertos y Casos de Uso - Capa `application`):**
  - Creados los puertos en `src/application/ports/` y los casos de uso en `src/application/use-cases/`.
- **P-102 (Capa `domain` pura y esquemas Zod):**
  - Entidades `Price`, `ArAsset`, `DeviceCapabilities`, `Dish`, `Category`, `Theme`, `Restaurant`.
- **P-101 (TypeScript + Vitest + Pipeline de calidad):**
  - Configuración estricta de entorno.

## Siguiente paso exacto

1. Iniciar la tarea **P-106** — Composition root y router:
   - Crear `src/app/compositionRoot.ts`.
   - Crear el contexto de dependencias para inyectar puertos a React (no se pueden importar de `infrastructure` dentro de los componentes).
   - Crear el router con React Router y configurar las rutas `/`, `/r/:slug`, `/r/:slug/qr`, página de error 404, y página de expirado.
   - Refactorizar `main.tsx` o similar para arrancar la aplicación pasando por el `compositionRoot`.
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare (cuando disponga):
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
   - X-008: Habilitar CodeQL en GitHub (Security → Code scanning).

## Línea base verificada (2026-10-06)

- `node -v`: v22.13.0 ✅
- `npm run verify`: ✅ en verde (oxlint 0 warn/err, tsc 0 err, vitest 57/57 tests pass, vite build exitoso).
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
