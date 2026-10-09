import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider as JotaiProvider, createStore } from 'jotai'
import FranjaReserva from '@/presentation/components/FranjaReserva'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { LanguageContext } from '@/presentation/i18n/LanguageContext'
import { translations } from '@/presentation/i18n/translations'
import type { Restaurant } from '@/domain/restaurant'

const languageValue = {
  lang: 'es' as const,
  setLang: () => {},
  t: translations.es,
}

function renderFranja(restaurant: Restaurant | null) {
  const store = createStore()
  store.set(restaurantAtom, restaurant)
  return render(
    <JotaiProvider store={store}>
      <LanguageContext.Provider value={languageValue}>
        <FranjaReserva />
      </LanguageContext.Provider>
    </JotaiProvider>
  )
}

const baseRestaurant = {
  nombre: 'Restaurante de Prueba',
} as Restaurant

describe('FranjaReserva', () => {
  it('muestra el horario real del restaurante, nunca el texto inventado anterior', () => {
    const restaurant = {
      ...baseRestaurant,
      contacto: {
        whatsapp: '573001234567',
        horario: ['Mar a dom · 7 p.m.'],
      },
    } as Restaurant

    renderFranja(restaurant)

    expect(screen.getByText('Mar a dom · 7 p.m.')).toBeInTheDocument()
  })

  it('no muestra ningún horario si el restaurante no lo tiene configurado', () => {
    renderFranja(baseRestaurant)

    expect(screen.queryByText(/p\.m\./)).not.toBeInTheDocument()
  })
})
