import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider as JotaiProvider, createStore } from 'jotai'
import Pie from '@/presentation/components/Pie'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { LanguageContext } from '@/presentation/i18n/LanguageContext'
import { translations } from '@/presentation/i18n/translations'
import type { Restaurant } from '@/domain/restaurant'

const languageValue = {
  lang: 'es' as const,
  setLang: () => {},
  t: translations.es,
}

function renderPie(restaurant: Restaurant | null) {
  const store = createStore()
  store.set(restaurantAtom, restaurant)
  return render(
    <JotaiProvider store={store}>
      <LanguageContext.Provider value={languageValue}>
        <Pie />
      </LanguageContext.Provider>
    </JotaiProvider>
  )
}

const baseRestaurant = {
  nombre: 'Restaurante de Prueba',
} as Restaurant

describe('Pie', () => {
  it('muestra la dirección y el horario reales del restaurante, nunca datos inventados', () => {
    const restaurant = {
      ...baseRestaurant,
      contacto: {
        whatsapp: '573001234567',
        direccion: 'Calle Ficticia 1-23, Pruebalandia',
        horario: ['Mar a dom: 7 p.m. - 11 p.m.'],
      },
    } as Restaurant

    renderPie(restaurant)

    expect(
      screen.getByText('Calle Ficticia 1-23, Pruebalandia')
    ).toBeInTheDocument()
    expect(screen.getByText('Mar a dom: 7 p.m. - 11 p.m.')).toBeInTheDocument()
    // Regresión: el pie no debe mostrar la dirección/horario inventados que
    // antes estaban quemados en el componente (bug encontrado en R-2).
    expect(
      screen.queryByText('Calle 10 #45-20, local 3, Medellín')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Martes a domingo, 7 p.m. – 11 p.m.')
    ).not.toBeInTheDocument()
  })

  it('no muestra el bloque de contacto si el restaurante no tiene dirección ni horario', () => {
    renderPie(baseRestaurant)

    expect(screen.queryByText(/Medellín/)).not.toBeInTheDocument()
  })
})
