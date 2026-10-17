import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

/**
 * Hook para acceder al idioma actual y a la función de cambio de idioma.
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
