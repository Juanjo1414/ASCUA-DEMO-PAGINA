/**
 * Regla de dominio que define qué forma puede tener la ruta de un asset
 * (imagen, modelo 3D) dentro de `restaurant.json`.
 *
 * La usa `domain/restaurant.ts` al validar el contenido de cada restaurante,
 * para que ninguna ruta pueda escapar de su propia carpeta
 * (`content/restaurants/<slug>/`) ni apuntar a otro dominio. No resuelve la
 * URL final: solo dice si el texto de la ruta es aceptable.
 */
import { z } from 'zod'

/**
 * Esquema zod para rutas de assets seguras: relativas, sin `..`, sin
 * backslash, sin empezar por `/` y sin esquema de URL (`http:`, `data:`…).
 */
export const assetPathSchema = z
  .string()
  .refine((val) => !val.includes('..'), 'Path traversal no permitido')
  .refine((val) => !val.includes('\\'), 'Rutas con backslash no permitidas')
  .refine(
    (val) => !val.startsWith('/'),
    'Las rutas deben ser relativas y no empezar por /'
  )
  .refine((val) => !val.startsWith('//'), 'Rutas absolutas no permitidas')
  .refine((val) => !/^[a-zA-Z]+:/.test(val), 'Esquemas de URL no permitidos')
