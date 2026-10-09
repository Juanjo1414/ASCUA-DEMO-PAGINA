import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext, Lang } from './LanguageContext'
import { translations } from './translations'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { useDependencies } from '@/presentation/state/DependenciesContext'
import type { UiPreferencesStore } from '@/application/ports/uiPreferencesStore'

function detectInitialLang(store: UiPreferencesStore): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = store.get('ascua-lang')
  if (stored === 'es' || stored === 'en') return stored as Lang
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { uiPreferencesStore } = useDependencies()
  const [lang, setLangState] = useState<Lang>(() =>
    detectInitialLang(uiPreferencesStore)
  )
  const restaurant = useAtomValue(restaurantAtom)

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next)
      uiPreferencesStore.set('ascua-lang', next)
    },
    [uiPreferencesStore]
  )

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const activeLang =
    restaurant?.idiomas && !restaurant.idiomas.includes(lang)
      ? (restaurant.idiomas[0] as Lang)
      : lang

  const value = useMemo(
    () => ({ lang: activeLang, setLang, t: translations[activeLang] }),
    [activeLang, setLang]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
