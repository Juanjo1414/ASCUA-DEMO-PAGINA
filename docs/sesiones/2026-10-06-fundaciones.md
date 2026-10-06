# Sesión 2026-10-06 — fundaciones

- **Herramienta:** Antigravity
- **Tareas:** X-000, X-001, X-002, X-005, X-004, X-003, X-009, X-010, P-101, P-102

## Decisiones tomadas

- **Creación y push de rama `dev/Juanjo`:** se inició la rama a partir de `main` con el commit inicial de gobernanza y se preservó la autoría exclusiva de Juan Jose Jaramillo, sin créditos de IA ni coautorías.
- **Node 22 normalizado (X-005):** se fijó `.nvmrc` en 22 y `engines: { "node": ">=22" }` para asegurar paridad estricta entre el entorno local de Windows 11 y los workflows de CI en GitHub Actions.
- **Husky y lint-staged integrados (X-004):** se configuró `pre-commit` con `lint-staged` (`oxlint` + `prettier`) y `pre-push` con `npm run verify`.
- **Construcción y persistencia del grafo de conocimiento (X-003):** graphify 0.9.73 procesó tanto el código (AST) como los documentos de gobierno y arquitectura. Se versionan `graph.json`, `GRAPH_REPORT.md`, `manifest.json` y `cost.json`.
- **Desacople de Supabase de terceros (X-009):** se eliminaron credenciales y referencias externas de `.env.example`, `vercel.json` y `src/lib/arAssets.js`.
- **Limpieza de raíz y reestructuración (X-010):** se renombró el paquete a `ascua-demo`, se retiró `vercel.json`, se trasladaron los documentos a `docs/` y los assets crudos a `content/raw/`.
- **TypeScript y Vitest configurados (P-101):** se añadió `tsconfig.json` estricto (`strict: true`, `noUncheckedIndexedAccess: true`, `allowJs: true`, `moduleResolution: "bundler"`, alias `@/*`), Vitest con entorno `jsdom`, testing-library y pruebas unitarias iniciales para la carta (`tests/unit/carta.test.ts`).
- **Desacople de contexto y hook de internacionalización (P-101):** se resolvió la advertencia de React Fast Refresh (`react(only-export-components)`) separando `LanguageContext.js` (contexto), `useLanguage.js` (hook) y `LanguageProvider.jsx` (componente React). Oxlint queda en 0 advertencias y 0 errores.
- **Capa de dominio pura con Zod (P-102):** se crearon las entidades y esquemas Zod en `src/domain/` (`Price`, `ArAsset`, `DeviceCapabilities`, `Dish`, `Category`, `Theme`, `Restaurant`). Se implementó la política pura `selectArLaunchMode` que prioriza Quick Look en iOS, Scene Viewer en Android y degrada a visor 3D interactivo en navegadores dentro de aplicaciones (Instagram, WhatsApp). Se alcanzó 100 % de cobertura en la capa con cero dependencias del navegador ni de React.

## Cambios

- `src/domain/`: módulos `price.ts`, `ar.ts`, `dish.ts`, `theme.ts`, `restaurant.ts` e `index.ts`.
- `tests/unit/domain/`: suites completas `price.test.ts`, `ar.test.ts`, `dish.test.ts`, `theme.test.ts`, `restaurant.test.ts`.
- `package.json` y `package-lock.json`: dependencia de producción `zod`.
- `docs/ESTADO.md`: reflejando la culminación de P-102.
- `graphify-out/`: grafo ampliado a 440 nodos y 633 aristas.

## Verificación

- `npm run verify` → Exitoso (oxlint 0 warn/err, tsc 0 err, vitest 39/39 tests pass, vite build exitoso).
- `npm run test:coverage` → 100 % de cobertura en todas las métricas de `src/domain/`.
- `graphify update .` → Completado exitosamente.

## Pendiente / siguiente paso exacto

- **Siguiente paso exacto:** Iniciar la tarea **P-103** — Puertos y casos de uso (`application`).

## Notas para el grafo

- Las entidades de dominio son la raíz del modelo multi-restaurante, vinculadas a las especificaciones de seguridad y aislamiento del plan de implementación.
