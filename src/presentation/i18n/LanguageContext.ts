import { createContext } from 'react'
import { translations } from './translations'

export type Lang = 'es' | 'en'

export interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof translations)['es']
}

export const LanguageContext = createContext<LanguageContextType | null>(null)
