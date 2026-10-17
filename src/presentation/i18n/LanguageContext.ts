/**
 * Definición del contexto de idioma (es/en).
 *
 * Separado de `LanguageProvider.tsx` solo porque React exige que un archivo
 * con Fast Refresh no mezcle componentes con otros exports; el contexto en
 * sí lo llena `LanguageProvider` y lo lee cualquier componente con
 * `useLanguage()`.
 */
import { createContext } from 'react'
import { translations } from './translations'

export type Lang = 'es' | 'en'

export interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof translations)['es']
}

export const LanguageContext = createContext<LanguageContextType | null>(null)
