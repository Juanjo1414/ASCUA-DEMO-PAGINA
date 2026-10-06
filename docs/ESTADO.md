# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase P-1 — Re-arquitectura de PAGINA (en progreso).

## Tarea actual

P-102 — Capa `domain`. **Estado:** completada ✅.
Siguiente tarea: **P-103** — Puertos y casos de uso (`application`).

## Último paso completado

- **P-102 (Capa `domain` pura y esquemas Zod):**
  - Creados los módulos en `src/domain/`:
    - `price.ts`: Value Object y validación de precios enteros en COP sin decimales, con formateador estándar `formatCopPrice`.
    - `ar.ts`: Entidad `ArAsset`, `DeviceCapabilities`, `ArLaunchMode` y la política pura `selectArLaunchMode` (prioriza Quick Look en iOS, Scene Viewer en Android, y model-viewer interactivo en navegadores embebidos o escritorio).
    - `dish.ts`: Entidad `Dish` (textos localizados es/en, precio, foto obligatoria, modelo 3D opcional) y `Category`.
    - `theme.ts`: Entidad `Theme` (código hexadecimal de color primario, par tipográfico y logo).
    - `restaurant.ts`: Entidad `Restaurant`, autorización comercial, contacto con WhatsApp internacional y función pura `isRestaurantExpired`. Regex estricto de slug con sufijo aleatorio de 4 caracteres obligatorio (`^[a-z0-9]+(-[a-z0-9]+)*-[a-z0-9]{4}$`).
    - `index.ts`: Exportación unificada de la capa.
  - Pruebas unitarias completas bajo `tests/unit/domain/` (39 pruebas en total en el proyecto).
  - Cobertura de código en `domain/`: **100 %** de líneas, ramas, funciones y sentencias (supera el criterio de aceptación de ≥ 90 %).
  - Cero dependencias de React, APIs del navegador (`window`/`document`) o capas externas.
- **P-101 (TypeScript + Vitest + Pipeline de calidad):**
  - `tsconfig.json` estricto, Vitest con `jsdom`, `.prettierrc`, scripts ampliados y warning de oxlint resuelto. Sincronizado en remoto (`34b0802`).

## Siguiente paso exacto

1. Iniciar la tarea **P-103** — Puertos y casos de uso (`application`):
   - Definir puertos (interfaces TypeScript puras): `RestaurantRepository`, `ArLauncher`, `EnvironmentDetector`, `SoldOutStore`, `AnalyticsTracker`.
   - Implementar casos de uso: `getRestaurant`, `buildMenuView`, `launchDishAr`, `buildReservationLink`, `toggleSoldOut`.
   - Escribir pruebas unitarias con dobles en memoria (meta: ≥ 90 % cobertura).
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare (cuando disponga):
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
   - X-008: Habilitar CodeQL en GitHub (Security → Code scanning).

## Línea base verificada (2026-10-06)

- `node -v`: v22.13.0 ✅
- `npm run verify`: ✅ en verde (oxlint 0 warn/err, tsc 0 err, vitest 39/39 tests pass, vite build exitoso).
- Cobertura `domain/`: 100 % en todas las métricas.
- Git hooks: `pre-commit` y `pre-push` activos.
- Grafo de conocimiento: operativo y sincronizado en `graphify-out/` (440 nodos, 633 aristas).

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
