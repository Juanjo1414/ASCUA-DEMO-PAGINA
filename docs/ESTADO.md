# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-07 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase C — Correcciones (revisión 2).

## Tarea actual

Finalizada la implementación del Lote 3 de correcciones (multi-restaurante).

## Último paso completado

- **Lote 3 (C-12 a C-21):** Implementación completa del aislamiento multi-restaurante. Eliminación de datos quemados de Ascua (Manifiesto, Lo que arde, Voces), adición de campos opcionales al esquema, tematización dinámica (color primario, par tipográfico), carga de logo dinámico en Nav y Footer, limpieza de Contacto y traducciones genéricas en interfaz. Creación de demo genérica `ascua-demo-abcd` y paso de pruebas unitarias y E2E de aislamiento.
- **C-11 (Scene Viewer con URL absoluta):** Convertido a URL absoluta el intent del GLB en `SceneViewerLauncher.ts`. Agregadas pruebas para verificar este comportamiento.
- **C-10 (Rutas seguras y resueltas):** Creado `assetPathSchema` en un archivo separado para prevenir dependencias circulares y validado en dominios. Creado `resolveAssetUrls` para transformar las rutas de assets locales a rutas relativas `/data/<slug>/`. Validado que ningún componente arma las rutas de assets.
- **Lote 1 (C-01 a C-09):** Limpieza de archivos de testing generados, código muerto borrado, warnings de lint arreglados, eliminación del tipo `any`, metadatos en HTML mejorados, marca de terceros quitada y tipografías locales añadidas.

### Completadas con observaciones de fases previas:

- **P-403 (Rediseño de componentes):** rediseño hecho; validado en Lote 3 que los datos del restaurante gobiernan la página.
- **P-307 (Medida real):** solo escala fija; la medida real por plato depende de A-204 en el repo AR.
- **P-107 (Store reactivo global):** store de jotai implementado y aprobado; capa `presentation/` actualizada.

## Siguiente paso exacto

1. **Siguiente después de las correcciones:** P-205 (QR imprimible), P-601 (demo genérica con modelos 3D aprobados), P-701 a P-705.
2. Tareas manuales pendientes de Juan en GitHub / Cloudflare (cuando disponga):
   - X-006: Activar reglas de protección de rama `main` en GitHub.
   - X-007: Crear proyecto en Cloudflare Pages (modo Direct Upload) y configurar secrets.
   - X-008: Habilitar CodeQL en GitHub (Security → Code scanning).

## Línea base verificada (2026-10-07)

- `node -v`: v22.13.0 ✅
- `npm run verify`: ✅ en verde (oxlint 0 warn/err, tsc 0 err, vitest tests pass, playwright tests pass, vite build exitoso).
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
