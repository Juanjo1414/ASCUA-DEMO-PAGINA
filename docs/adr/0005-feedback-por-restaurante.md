# ADR 0005 — Feedback del comensal: un Google Form por restaurante

- **Estado:** aceptada (2026-10-16, decisión de Juan)
- **Tarea:** P-701-bis

## Contexto

La demo ya tenía un enlace "Danos tu opinión" hacia **un único** formulario
de Tally compartido por todos los restaurantes. Los comensales podían opinar,
pero nadie del restaurante veía las respuestas y solo Juan las recibía,
mezcladas. Juan pidió que tanto el dueño de cada restaurante como él puedan
ver el feedback de sus comensales.

El sitio es 100 % estático y sin backend por diseño (decisión D1 del plan,
"costo $0"), y la plataforma con base de datos se construye solo después de
validar que los restaurantes pagarían (decisión D8).

## Decisión

Cada restaurante tiene su **propio Google Form**, con su Google Sheet de
respuestas compartido en modo "puede ver" con el correo del dueño. El enlace
se guarda en el campo opcional `feedbackFormUrl` de `restaurant.json`
(validado con zod: solo `https`). `Pie.tsx` lo usa; si falta, cae al
formulario genérico de PITS con el slug como parámetro, para no romper
restaurantes ya dados de alta.

## Opciones consideradas

| Opción                                                         | Complejidad | Costo              | Riesgo                                                                      |
| -------------------------------------------------------------- | ----------- | ------------------ | --------------------------------------------------------------------------- |
| **A. Google Form por restaurante (elegida)**                   | Baja        | $0                 | Bajo: el comensal sale del sitio para opinar                                |
| B. Panel propio (Cloudflare D1 + Worker + login para el dueño) | Alta        | Bajo, pero no cero | Medio: rompe "sin backend", exige anti-spam y autenticación por restaurante |
| C. Seguir con un único formulario de Tally                     | Ninguna     | $0                 | No cumple el objetivo: el dueño no ve nada                                  |

## Consecuencias

- Cero infraestructura nueva y nada que mantener ni asegurar.
- Dar de alta un restaurante suma un paso manual: crear el Form y compartir el
  Sheet con el dueño (documentado en `docs/runbooks/nuevo-restaurante.md`).
- `validate-content.ts` avisa (sin fallar) si un restaurante real no tiene
  `feedbackFormUrl`, porque sin él el dueño no vería las opiniones.
- Si el producto se valida y pasa a la plataforma de pago (fase 8, ARFOODS),
  se revisita la opción B con los datos en una base de datos real.

## Tareas derivadas

- Crear el Google Form de `ascua-demo-abcd` y poner su enlace en
  `restaurant.json` (lo hace Juan; yo no tengo acceso a su cuenta de Google).
