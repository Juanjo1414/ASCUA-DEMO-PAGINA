/**
 * @file dish.ts
 * @description Entidades de dominio para platos y categorías del menú gastronómico.
 *
 * Cada plato pertenece a una categoría, tiene textos traducibles (español e inglés),
 * precio en COP, fotografía obligatoria y modelo 3D opcional.
 */

import { z } from 'zod'
import { arAssetSchema } from './ar'
import { priceSchema } from './price'
import { assetPathSchema } from './assetPath'

/**
 * Esquema para cadenas de texto localizadas (español obligatorio, inglés opcional).
 */
export const localizedStringSchema = z.object({
  es: z.string().min(1, 'El texto en español es obligatorio'),
  en: z.string().min(1).optional(),
})

export type LocalizedString = z.infer<typeof localizedStringSchema>

/**
 * Esquema Zod para un plato de la carta.
 */
export const dishSchema = z.object({
  /** Identificador único del plato dentro de la carta (ej: 'asado-tira') */
  id: z
    .string()
    .min(1, 'El ID del plato es obligatorio')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'El ID debe ser un kebab-case válido'),
  /** Nombre del plato en español e inglés */
  nombre: localizedStringSchema,
  /** Descripción o notas de cata del plato */
  descripcion: localizedStringSchema.optional(),
  /** Precio en pesos colombianos (sin decimales) */
  precio: priceSchema,
  /** Ruta a la fotografía del plato servido (WebP o JPG) */
  foto: assetPathSchema,
  /** Modelo 3D para realidad aumentada y visor interactivo (opcional) */
  modelo: arAssetSchema.nullable().optional(),
  /** Temperatura de servicio o cocción en grados Celsius (concepto estético del fuego de Ascua) */
  temperatura: z.number().int().optional(),
  /** Estado de disponibilidad: true si el plato se agotó en cocina */
  agotado: z.boolean().default(false),
})

export type Dish = z.infer<typeof dishSchema>

/**
 * Esquema Zod para una sección o categoría del menú (ej: Entradas, Cortes a la brasa, Postres).
 */
export const categorySchema = z.object({
  /** Identificador único de la categoría (ej: 'cortes-fuertes') */
  id: z
    .string()
    .min(1, 'El ID de categoría es obligatorio')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'El ID debe ser kebab-case'),
  /** Nombre visible de la categoría en español e inglés */
  nombre: localizedStringSchema,
  /** Lista ordenada de platos pertenecientes a esta categoría */
  platos: z
    .array(dishSchema)
    .min(1, 'Cada categoría debe tener al menos un plato'),
})

export type Category = z.infer<typeof categorySchema>
