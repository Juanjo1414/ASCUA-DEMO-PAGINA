/**
 * @file index.ts
 * @description Punto de entrada unificado para la capa Application (Casos de uso y Puertos).
 *
 * REGLA DE ARQUITECTURA:
 * La capa application solo depende de la capa domain. No debe importar nada de
 * infrastructure, ni de presentation, ni librerías de UI o del navegador.
 */

export * from './ports'
export * from './use-cases'
