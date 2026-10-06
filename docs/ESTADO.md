# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-06 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase P-1 — Re-arquitectura de PAGINA (en progreso).

## Tarea actual

P-103 — Puertos y casos de uso (`application`). **Estado:** completada ✅.
Siguiente tarea: **P-104** — Adaptadores AR (QuickLookLauncher, SceneViewerLauncher, ModelViewerFallbackLauncher, BrowserEnvironmentDetector).

## Último paso completado

- **P-103 (Puertos y Casos de Uso - Capa `application`):**
  - Creados los puertos (interfaces TypeScript puras) en `src/application/ports/`:
    - `RestaurantRepository`: consulta por slug con tipado estricto.
    - `ArLauncher`: contrato de ejecución y apertura AR con resultado tipado (`ArLauncherResult`).
    - `EnvironmentDetector`: contrato para inspeccionar capacidades de dispositivo sin acoplamiento a `window`/`navigator`.
    - `SoldOutStore`: contrato para consultar y alternar platos agotados en cocina.
    - `AnalyticsTracker`: catálogo tipado de eventos analíticos sin cookies ni datos personales (Ley 1581 de 2012).
  - Implementados los casos de uso en `src/application/use-cases/`:
    - `getRestaurant`: guardia de seguridad para slugs no adivinables (`RESTAURANT_SLUG_REGEX`), evaluación de vigencia comercial (`isRestaurantExpired`) y control de estado pausado/activo.
    - `buildMenuView`: transforma categorías y platos para la UI, formateando precios en pesos colombianos, resolviendo textos en español/inglés, sincronizando platos agotados y precalculando el modo de lanzamiento AR óptimo (`DishViewModel`, `MenuViewModel`).
    - `launchDishAr`: orquesta la apertura de modelos 3D/AR, evaluando capacidades del dispositivo y emitiendo telemetría tipada (`launch_ar_attempt`, `launch_ar_success`, `launch_ar_error`).
    - `buildReservationLink`: construye el enlace universal a WhatsApp (`wa.me`) con mensaje prellenado en lenguaje natural, comensales, fecha, hora y comentarios.
    - `toggleSoldOut`: permite alternar la disponibilidad de un plato en el almacén de cocina.
  - Pruebas unitarias completas bajo `tests/unit/application/` con dobles de prueba en memoria (`InMemoryRestaurantRepository`, `InMemorySoldOutStore`, `MockArLauncher`, `MockEnvironmentDetector`, `MockAnalyticsTracker`).
  - Cobertura de código: **100 % de sentencias y líneas** en casos de uso de `application/`, y **100 %** en la capa `domain/` (57 pruebas unitarias pasando en verde).
  - Regla de arquitectura validada: cero imports de `infrastructure`, `presentation`, `react`, `window` o `document`.
- **P-102 (Capa `domain` pura y esquemas Zod):**
  - Entidades `Price`, `ArAsset`, `DeviceCapabilities`, `Dish`, `Category`, `Theme`, `Restaurant`.
- **P-101 (TypeScript + Vitest + Pipeline de calidad):**
  - `tsconfig.json` estricto, Vitest con `jsdom`, `.prettierrc`, scripts ampliados y warning de oxlint resuelto. Sincronizado en remoto (`34b0802`).
- **Fix CI (Gitleaks):**
  - Ofuscación de claves de ejemplo en documentación histórica y configuración de `.gitleaks.toml` y `.gitleaksignore`. Sincronizado en remoto (`fdbb601`).

## Siguiente paso exacto

1. Iniciar la tarea **P-104** — Adaptadores AR:
   - Migrar la lógica de `src/lib/launchAr.js` y `src/lib/browserEnv.js` hacia adaptadores que implementen los puertos `ArLauncher` y `EnvironmentDetector` (`QuickLookLauncher`, `SceneViewerLauncher`, `ModelViewerFallbackLauncher`, `BrowserEnvironmentDetector`).
   - Preservar exactamente el comportamiento probado en dispositivos (el `<img>` dentro del `<a rel="ar">`, el `intent://` con fallback y detección de in-app browsers).
   - Escribir pruebas de contrato para los adaptadores.
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
