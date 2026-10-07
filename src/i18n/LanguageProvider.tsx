import { useEffect, useMemo, useState } from 'react'
import { LanguageContext, Lang } from './LanguageContext'
import { translations } from './translations'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/app/store'

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem('ascua-lang')
  if (stored === 'es' || stored === 'en') return stored as Lang
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)
  const restaurant = useAtomValue(restaurantAtom)

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem('ascua-lang', next)
    } catch {
      /* ignore storage errors */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const activeLang =
    restaurant?.idiomas && !restaurant.idiomas.includes(lang)
      ? (restaurant.idiomas[0] as Lang)
      : lang

  const value = useMemo(
    () => ({ lang: activeLang, setLang, t: translations[activeLang] }),
    [activeLang]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
