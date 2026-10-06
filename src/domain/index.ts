/**
 * @file index.ts
 * @description Punto de entrada unificado para la capa de Dominio (Domain Layer).
 *
 * Expone todas las entidades, Value Objects, esquemas Zod y políticas puras
 * que gobiernan el modelo de negocio de Ascua.
 *
 * REGLA DE ARQUITECTURA:
 * La capa domain NO debe importar nada de React, librerías de UI, adaptadores ni APIs del navegador.
 */

export * from './price'
export * from './ar'
export * from './dish'
export * from './theme'
export * from './restaurant'
