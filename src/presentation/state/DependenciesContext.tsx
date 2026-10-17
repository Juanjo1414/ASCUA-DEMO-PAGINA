/**
 * Inyección de dependencias para React vía Context.
 *
 * `main.tsx` envuelve toda la app en `DependenciesProvider` con las
 * instancias reales de `compositionRoot.ts`; cualquier componente de
 * `presentation/` pide lo que necesite con `useDependencies()` en vez de
 * importar `infrastructure/` directamente (esa importación la bloquea
 * `arch:check`). Las pruebas pasan sus propios dobles en memoria en vez del
 * composition root real.
 */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react'
import type { AppDependencies } from '@/application/dependencies'

const DependenciesContext = createContext<AppDependencies | null>(null)

interface Props {
  dependencies: AppDependencies
  children: ReactNode
}

/** Provee las dependencias de la app a todo su árbol de componentes. */
export function DependenciesProvider({ dependencies, children }: Props) {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  )
}

/**
 * Lee las dependencias inyectadas por `DependenciesProvider`.
 *
 * @throws Error si se llama fuera de un `DependenciesProvider` (indica un
 * árbol de componentes mal armado, nunca una condición esperada en producción).
 */
export function useDependencies(): AppDependencies {
  const context = useContext(DependenciesContext)
  if (!context) {
    throw new Error(
      'useDependencies debe usarse dentro de un DependenciesProvider'
    )
  }
  return context
}
