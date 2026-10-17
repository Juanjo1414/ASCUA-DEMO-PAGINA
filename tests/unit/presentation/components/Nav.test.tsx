import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Nav from '@/presentation/components/Nav'
import {
  renderWithProviders,
  baseRestaurantFixture,
} from '../renderWithProviders'
import type { Restaurant } from '@/domain/restaurant'

const restaurantSinAr = {
  ...baseRestaurantFixture,
  idiomas: ['es'],
  categorias: [
    {
      id: 'fuertes',
      nombre: { es: 'Fuertes' },
      platos: [
        {
          id: 'plato-sin-ar',
          nombre: { es: 'Plato sin AR' },
          precio: 15000,
          foto: 'foto.webp',
          agotado: false,
        },
      ],
    },
  ],
} as unknown as Restaurant

const restaurantConAr = {
  ...restaurantSinAr,
  categorias: [
    {
      ...restaurantSinAr.categorias[0],
      platos: [
        {
          ...restaurantSinAr.categorias[0]!.platos[0],
          modelo: {
            glb: 'modelo.glb',
            usdz: 'modelo.usdz',
            poster: 'poster.webp',
            escalaRealCm: 18,
            aprobado: true,
          },
        },
      ],
    },
  ],
} as unknown as Restaurant

describe('Nav', () => {
  it('no muestra "Cómo funciona" si el restaurante no tiene ningún plato con AR aprobado', () => {
    // Regresión: el enlace apuntaba a #como-funciona aunque esa sección
    // (ComoFunciona.tsx) se oculta sin platos con AR, dejando un enlace
    // que no hacía nada al tocarlo.
    renderWithProviders(<Nav />, { restaurant: restaurantSinAr })

    expect(
      screen.queryByRole('link', { name: /cómo funciona/i })
    ).not.toBeInTheDocument()
  })

  it('muestra "Cómo funciona" cuando sí hay al menos un plato con AR aprobado', () => {
    renderWithProviders(<Nav />, { restaurant: restaurantConAr })

    const enlace = screen.getByRole('link', { name: /cómo funciona/i })
    expect(enlace).toHaveAttribute('href', '#como-funciona')
  })

  it('siempre muestra Carta y Contacto, tengan o no platos con AR', () => {
    renderWithProviders(<Nav />, { restaurant: restaurantSinAr })

    expect(screen.getByRole('link', { name: /carta/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument()
  })
})
