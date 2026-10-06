# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase P-1 — Re-arquitectura de PAGINA (en progreso).

## Tarea actual

P-201 — Esquema de contenido v1. **Estado:** completada ✅.
Siguiente tarea: **P-202** — Validador de contenido.

## Último paso completado

- **P-201 (Esquema de contenido v1):**
  - Creada la carpeta `content/restaurants/_plantilla/` con el archivo `restaurant.json` base.
  - Verificado el esquema Zod `restaurantSchema` existente en `domain/restaurant.ts`.
  - Creado el documento `docs/runbooks/nuevo-restaurante.md` con los pasos operativos para añadir un restaurante.

- **P-108 (Reglas de arquitectura en CI):**
  - Instalado `dependency-cruiser`.
  - Configurado `.dependency-cruiser.cjs` con las reglas de dependencia entre capas.
  - Añadido el script `arch:check` e integrado en `npm run verify`.

- **P-107 (Store reactivo global):**
  - Instalado `jotai` como gestor de estado.
  - Creado `src/app/store.ts` con el átomo `restaurantAtom` tipado estrictamente con la interfaz `Restaurant`.
- **P-106 (Composition root y router):**
  - Implementado `src/app/compositionRoot.ts` inyectando instancias concretas (repositorio estático, adaptadores AR, detector de entorno).
  - Configurado `DependenciesContext.tsx` para inyectar los puertos en React y asegurar Clean Architecture en los componentes.
  - Creado `src/app/router.tsx` con React Router para las rutas principales (`/`, `/r/:slug`, `/r/:slug/qr`, etc.).
  - Refactorizado `main.tsx` para inicializar el router y los proveedores del contexto global.
- **P-105 (Repositorio de contenido estático):**
  - Implementado `StaticJsonRestaurantRepository` y sus validaciones (Zod, regex) previas al fetch de datos.
- **P-104 (Adaptadores AR):**
  - Implementados los lanzadores nativos para iOS (`QuickLookLauncher`), Android (`SceneViewerLauncher`) y Web (`ModelViewerFallbackLauncher`).
- **P-103 (Puertos y Casos de Uso - Capa `application`):**
  - Creados los puertos y los casos de uso (`getRestaurant`, `buildMenuView`, `launchDishAr`, etc.).
- **P-102 (Capa `domain` pura y esquemas Zod):**
  - Entidades de dominio base y esquemas.
- **P-101 (TypeScript + Vitest + Pipeline de calidad):**
  - Configuración estricta de entorno, lint, formateo, pre-push.

## Siguiente paso exacto

1. Iniciar la tarea **P-202** — Validador de contenido:
   - Crear `scripts/validate-content.ts`.
   - Validar schema, slugs, aislamiento de assets y tamaños máximos (GLB, USDZ, WebP).
   - Comprobar "aprobado: true" y "autorizacion".
   - Añadir el script al pipeline local y remoto.
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
