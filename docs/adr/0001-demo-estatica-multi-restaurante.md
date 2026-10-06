# ADR-0001: Demo estática multi-restaurante en Cloudflare Pages

**Estado:** Aceptado · **Fecha:** 2026-10-05 · **Decide:** Juan José Jaramillo Mora

## Contexto

Ascua necesita validar con restaurantes reales si pagarían la suscripción. La demo debe mostrar landing + carta con platos en 3D/AR para varios restaurantes, sin mezclar su información, sin costo de infraestructura y sin riesgo de caídas frente al cliente. El repo original dependía de un proyecto Supabase de un tercero para dos modelos 3D.

## Decisión

Plantilla estática (React + Vite + TypeScript) con un paquete de contenido por restaurante (`content/restaurants/<slug>/`), validado con esquema en cada build y desplegado en Cloudflare Pages exclusivamente desde GitHub Actions.

## Opciones consideradas

### A. Estática + contenido versionado (elegida)

| Dimensión        | Evaluación                                                               |
| ---------------- | ------------------------------------------------------------------------ |
| Complejidad      | Baja                                                                     |
| Costo            | $0                                                                       |
| Riesgo operativo | Muy bajo: nada se pausa ni depende de servicios externos                 |
| Aislamiento      | Por diseño (carpeta + validación + pruebas E2E); no es control de acceso |

### B. ARFOODS completo (Next.js + Supabase) en planes gratuitos

| Dimensión        | Evaluación                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Complejidad      | Alta (migraciones, auth, worker)                                                                                        |
| Costo            | $0 con límites                                                                                                          |
| Riesgo operativo | Alto: los proyectos gratuitos de Supabase se pausan tras una semana sin actividad; Vercel Hobby no admite uso comercial |
| Aislamiento      | Fuerte (RLS)                                                                                                            |

### C. Un repo/despliegue por restaurante

Aislamiento máximo, pero duplica código y mantenimiento por cada cliente. Descartada.

## Consecuencias

- ✅ Agregar un restaurante = una carpeta + push; cero costo.
- ✅ Control de calidad explícito (`aprobado`) antes de publicar un modelo.
- ⚠️ El restaurante no edita su menú solo: lo hace PITS (coherente con la "instalación asistida" del catálogo).
- ⚠️ El aislamiento es por diseño, no por autenticación; aceptable porque el contenido es una carta pública.
- 🔁 Revisar cuando haya clientes pagando: migrar contenido a la plataforma ARFOODS (fase 8, tarea A-307).
