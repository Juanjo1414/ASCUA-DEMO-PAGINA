import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { translations } from './translations'

function detectInitialLang() {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem('ascua-lang')
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  const setLang = (next) => {
    setLangState(next)
    try {
      window.localStorage.setItem('ascua-lang', next)
    } catch {
      /* ignore storage errors */
    }
  }

  // El lector de pantalla y el traductor del navegador leen este atributo.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
