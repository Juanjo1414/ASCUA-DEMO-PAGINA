# Bitácora de Sesión: P-201 Esquema de Contenido v1

**Fecha:** 2026-10-06
**Herramienta:** Antigravity

## Objetivos

Definir y validar el esquema base para el contenido multi-restaurante, implementando la fase P-2.

## Acciones realizadas

1. **Plantilla de contenido:** Se generó `content/restaurants/_plantilla/restaurant.json` como modelo de referencia. El archivo cumple completamente con la especificación `restaurantSchema` en `domain/restaurant.ts`.
2. **Documentación (Runbook):** Se redactó el documento `docs/runbooks/nuevo-restaurante.md` especificando de forma clara los pasos (carpetas, configuración JSON, slugs y validación) que cualquier persona debe seguir para integrar un cliente al demo sin depender de bases de datos.
3. **Esquema:** Se comprobó que el esquema en `domain/restaurant.ts` es exacto a lo requerido en la sección 3.4 (autorización, expira, tema, slug, etc.).
4. **Verificación:** Ejecución de `npm run verify` pasando de forma exitosa.

## Siguiente Tarea

P-202 — Validador de contenido.
