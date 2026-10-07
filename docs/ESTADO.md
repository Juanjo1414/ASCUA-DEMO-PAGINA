# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-07 · **Por:** Antigravity · **Rama:** `dev/Juanjo`

## Fase actual

Fase C — Correcciones (revisión 2).

## Tarea actual

En progreso: Lote 6 (Móvil, accesibilidad y pruebas de interfaz).

## Último paso completado

- **Lote 5:** Reubicación de componentes, estado, hooks, i18n y utilidades (UI) a `src/presentation/`. Validación de `arch:check` (C-27 a C-29) completada con éxito.
- **Lote 4 (C-22 a C-26):** Creado el `CompositeArLauncher` para mantener la llamada de AR de forma síncrona dentro del gesto del usuario, eliminando esperas y asincronía antes del lanzamiento. Se removió el evento manual `open-model-viewer` en favor del retorno del resultado. El aviso del navegador embebido ahora nombra la app usando el nuevo atributo `embeddedBrowserName`. Todo el código antiguo y variables de entorno de Supabase fue eliminado por completo. Tests actualizados, `npm run verify` pasando limpio.
- **C-11 (Scene Viewer con URL absoluta):** Convertido a URL absoluta el intent del GLB en `SceneViewerLauncher.ts`. Agregadas pruebas para verificar este comportamiento.
- **C-10 (Rutas seguras y resueltas):** Creado `assetPathSchema` en un archivo separado para prevenir dependencias circulares y validado en dominios. Creado `resolveAssetUrls` para transformar las rutas de assets locales a rutas relativas `/data/<slug>/`. Validado que ningún componente arma las rutas de assets.
- **Lote 1 (C-01 a C-09):** Limpieza de archivos de testing generados, código muerto borrado, warnings de lint arreglados, eliminación del tipo `any`, metadatos en HTML mejorados, marca de terceros quitada y tipografías locales añadidas.

### Completadas con observaciones de fases previas:

- **P-403 (Rediseño de componentes):** rediseño hecho; validado en Lote 3 que los datos del restaurante gobiernan la página.
- **P-307 (Medida real):** solo escala fija; la medida real por plato depende de A-204 en el repo AR.
- **P-107 (Store reactivo global):** store de jotai implementado y aprobado; capa `presentation/` actualizada.

## Siguiente paso exacto

1. **Siguiente después de las correcciones:** P-205 (QR imprimible).
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

## Notas y decisiones de diseño

- **Textos de botones AR:** El plan indica que se deben evitar siglas y usar un texto como "Ver en mi mesa" en lugar de "Ver en RA" o "Ponerlo en mi mesa" que están actualmente. Se resolverá en diseño (Lote 6).

## Comandos para verificar

```powershell
npm run verify
npm run test:coverage
git status --short
```
