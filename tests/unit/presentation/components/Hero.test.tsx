import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '@/presentation/components/Hero'
import type { Restaurant } from '@/domain/restaurant'
import {
  renderWithProviders,
  baseRestaurantFixture,
} from '../renderWithProviders'

describe('Hero', () => {
  it('no renderiza nada mientras no haya restaurante cargado', () => {
    const { container } = renderWithProviders(<Hero />, { restaurant: null })

    expect(container).toBeEmptyDOMElement()
  })

  it('muestra el nombre y el eslogan del restaurante en el idioma activo', () => {
    const restaurant = {
      ...baseRestaurantFixture,
      nombre: 'La Brasa',
      eslogan: { es: 'Fuego de verdad', en: 'Real fire' },
    } as Restaurant

    renderWithProviders(<Hero />, { restaurant, lang: 'en' })

    expect(screen.getByText('La Brasa')).toBeInTheDocument()
    expect(screen.getByText('Real fire')).toBeInTheDocument()
  })
})
