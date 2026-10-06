# Bitácora de Sesión: P-202 Validador de Contenido

**Fecha:** 2026-10-06
**Herramienta:** Antigravity

## Objetivos

Construir y automatizar el validador estricto del contenido de los restaurantes antes del build.

## Acciones realizadas

1. **Script de Validación:** Se creó `scripts/validate-content.ts` utilizando Node.js `fs/promises`. Este script itera sobre cada carpeta dentro de `content/restaurants/`.
2. **Chequeos implementados:**
   - Que exista `restaurant.json` y cumpla con `restaurantSchema`.
   - Que el slug del JSON coincida con el nombre de la carpeta (omitiendo a `_plantilla`).
   - Prevención de path traversal o URLs absolutas en las rutas de los assets.
   - Validación de peso máximo de archivos (GLB 5MB, USDZ 8MB, WebP/SVG 300KB).
   - Generación de advertencias para restaurantes expirados o assets duplicados (mediante hash SHA-256).
   - Verificación de que los modelos de platos tengan la bandera `aprobado: true`.
3. **Pipeline:** Se agregó la dependencia `tsx` y el script `"content:validate"` a `package.json`, adjuntándolo a la secuencia de `npm run verify` para evitar subidas de datos erróneos.
4. **Verificación:** Se crearon assets simulados para la plantilla de modo que pasara correctamente la validación sin errores.

## Siguiente Tarea

P-203 — Build de contenido y HTML por restaurante.
