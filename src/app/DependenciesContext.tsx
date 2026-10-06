/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react'
import type { AppDependencies } from './compositionRoot'

const DependenciesContext = createContext<AppDependencies | null>(null)

interface Props {
  dependencies: AppDependencies
  children: ReactNode
}

export function DependenciesProvider({ dependencies, children }: Props) {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  )
}

export function useDependencies(): AppDependencies {
  const context = useContext(DependenciesContext)
  if (!context) {
    throw new Error(
      'useDependencies debe usarse dentro de un DependenciesProvider'
    )
  }
  return context
}
