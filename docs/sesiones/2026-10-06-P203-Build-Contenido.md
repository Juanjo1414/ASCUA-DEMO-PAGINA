# Bitácora de Sesión: P-203 Build de Contenido y HTML por Restaurante

**Fecha:** 2026-10-06
**Herramienta:** Antigravity

## Objetivos

Automatizar la generación de archivos estáticos HTML (`index.html`) por restaurante para asegurar la indexabilidad y el pre-renderizado de los metadatos y gráficos sociales (Open Graph).

## Acciones realizadas

1. **Script:** Se creó `scripts/build-content.ts` el cual lee la plantilla de `dist/index.html` construida por Vite y genera por cada slug en `content/restaurants/` una versión en `dist/r/<slug>/index.html`.
2. **Metadata:** Se implementó inyección en el bloque `<head>` de `<title>`, `description`, y los tags `og:title` y `og:description` usando los datos del json de cada restaurante, asegurando además la bandera `<meta name="robots" content="noindex, nofollow">` requerida.
3. **Manejo de Assets:** El script crea copias puras de los assets de cada restaurante bajo la ruta expuesta `dist/data/<slug>/` asegurando el desacoplamiento de los assets del bundle de React.
4. **Cloudflare SPA:** Se genera en `dist/_redirects` la regla catch-all (`/* /index.html 200`) para posibilitar el enrutamiento client-side de las vistas que no son pre-renderizadas o para las navegaciones internas de `react-router-dom`.
5. **Ajuste `package.json`:** `npm run build` fue modificado para ejecutar el comando Vite y luego `tsx scripts/build-content.ts`.

## Siguiente Tarea

P-204 — Pruebas E2E de aislamiento.
