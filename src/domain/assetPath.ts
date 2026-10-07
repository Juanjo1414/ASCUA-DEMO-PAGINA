import { z } from 'zod'

/**
 * Esquema para validar rutas de assets seguras.
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
