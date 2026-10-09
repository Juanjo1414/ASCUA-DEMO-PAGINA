import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FranjaReserva from '@/presentation/components/FranjaReserva'
import type { Restaurant } from '@/domain/restaurant'
import {
  renderWithProviders,
  baseRestaurantFixture,
} from '../renderWithProviders'

describe('FranjaReserva', () => {
  it('muestra el horario real del restaurante, nunca el texto inventado anterior', () => {
    const restaurant = {
      ...baseRestaurantFixture,
      contacto: {
        whatsapp: '573001234567',
        horario: ['Mar a dom · 7 p.m.'],
      },
    } as Restaurant

    renderWithProviders(<FranjaReserva />, { restaurant })

    expect(screen.getByText('Mar a dom · 7 p.m.')).toBeInTheDocument()
  })

  it('no muestra ningún horario si el restaurante no lo tiene configurado', () => {
    renderWithProviders(<FranjaReserva />, {
      restaurant: baseRestaurantFixture,
    })

    expect(screen.queryByText(/p\.m\./)).not.toBeInTheDocument()
  })
})
