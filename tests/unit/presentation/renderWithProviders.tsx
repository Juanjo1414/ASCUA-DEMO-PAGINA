/**
 * Helper compartido para pruebas de componentes de `presentation/`.
 *
 * Monta un componente con los tres contextos que casi todos necesitan
 * (restaurante activo en jotai, idioma/traducciones, dependencias
 * inyectadas) usando los dobles en memoria de `tests/unit/application/doubles.ts`,
 * para no repetir ese montaje en cada archivo de prueba.
 */
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider as JotaiProvider, createStore } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { LanguageContext, type Lang } from '@/presentation/i18n/LanguageContext'
import { translations } from '@/presentation/i18n/translations'
import { DependenciesProvider } from '@/presentation/state/DependenciesContext'
import type { AppDependencies } from '@/application/dependencies'
import type { Restaurant } from '@/domain/restaurant'
import {
  InMemoryRestaurantRepository,
  InMemorySoldOutStore,
  MockEnvironmentDetector,
  MockArLauncher,
  MockAnalyticsTracker,
  InMemoryUiPreferencesStore,
} from '../application/doubles'

/** Restaurante mínimo válido para pruebas que no necesitan datos específicos. */
export const baseRestaurantFixture = {
  nombre: 'Restaurante de Prueba',
} as Restaurant

/**
 * Construye un `AppDependencies` completo con dobles en memoria, para
 * pruebas que no necesitan verificar un adaptador en particular.
 */
export function createFakeDependencies(
  overrides: Partial<AppDependencies> = {}
): AppDependencies {
  return {
    restaurantRepository: new InMemoryRestaurantRepository(),
    environmentDetector: new MockEnvironmentDetector({
      isIos: false,
      isAndroid: false,
      isMobile: false,
      isSafari: false,
      isChrome: true,
      isEmbeddedBrowser: false,
      embeddedBrowserName: null,
      canQuickLook: false,
      canSceneViewer: false,
    }),
    arLauncher: new MockArLauncher(),
    soldOutStore: new InMemorySoldOutStore(),
    analyticsTracker: new MockAnalyticsTracker(),
    uiPreferencesStore: new InMemoryUiPreferencesStore(),
    ...overrides,
  }
}

interface RenderOptions {
  restaurant?: Restaurant | null
  lang?: Lang
  dependencies?: Partial<AppDependencies>
}

/**
 * Renderiza un componente envuelto en los contextos de jotai, idioma y
 * dependencias.
 *
 * @param ui - Elemento de React a montar.
 * @param options.restaurant - Restaurante activo (por defecto, `baseRestaurantFixture`).
 * @param options.lang - Idioma activo (por defecto, `'es'`).
 * @param options.dependencies - Overrides de `AppDependencies`; lo no indicado usa dobles en memoria.
 */
export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions = {}
) {
  const {
    restaurant = baseRestaurantFixture,
    lang = 'es',
    dependencies = {},
  } = options

  const store = createStore()
  store.set(restaurantAtom, restaurant)

  const languageValue = {
    lang,
    setLang: () => {},
    t: translations[lang],
  }

  return render(
    <JotaiProvider store={store}>
      <DependenciesProvider dependencies={createFakeDependencies(dependencies)}>
        <LanguageContext.Provider value={languageValue}>
          {ui}
        </LanguageContext.Provider>
      </DependenciesProvider>
    </JotaiProvider>
  )
}
