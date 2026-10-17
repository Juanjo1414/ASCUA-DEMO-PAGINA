import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from '@/presentation/components/Hero'
import ComoFunciona from '@/presentation/components/ComoFunciona'
import Menu from '@/presentation/components/Menu'
import { EVENTO_VER_EN_MESA } from '@/presentation/state/arEvents'
import type { Restaurant } from '@/domain/restaurant'
import {
  renderWithProviders,
  baseRestaurantFixture,
} from '../renderWithProviders'

// El visor real de <model-viewer> no funciona en jsdom.
vi.mock('@google/model-viewer', () => ({}))

const modelo = (aprobado: boolean) => ({
  glb: 'm.glb',
  usdz: 'm.usdz',
  poster: 'p.webp',
  escalaRealCm: 26,
  aprobado,
})

const plato = (id: string, extra: Record<string, unknown> = {}) => ({
  id,
  nombre: { es: `Plato ${id}` },
  precio: 20000,
  foto: `${id}.webp`,
  agotado: false,
  ...extra,
})

const restauranteCon = (platos: unknown[], extra = {}) =>
  ({
    ...baseRestaurantFixture,
    slug: 'prueba-abcd',
    idiomas: ['es'],
    categorias: [{ id: 'c', nombre: { es: 'C' }, platos }],
    ...extra,
  }) as unknown as Restaurant

describe('Hero (plato estrella)', () => {
  it('ofrece "Ver en mi mesa" y la medida real si hay plato con modelo aprobado', () => {
    const restaurant = restauranteCon([plato('a', { modelo: modelo(true) })])
    renderWithProviders(<Hero />, { restaurant })

    expect(
      screen.getByRole('button', { name: /ver en mi mesa/i })
    ).toBeInTheDocument()
    expect(screen.getByText('26 cm · tamaño real')).toBeInTheDocument()
  })

  it('no promete AR si ningún plato tiene modelo aprobado', () => {
    const restaurant = restauranteCon([plato('a', { modelo: modelo(false) })])
    renderWithProviders(<Hero />, { restaurant })

    expect(
      screen.queryByRole('button', { name: /ver en mi mesa/i })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver la carta/i })).toBeVisible()
  })

  it('avisa a Menu con el evento al tocar "Ver en mi mesa"', () => {
    const oyente = vi.fn()
    window.addEventListener(EVENTO_VER_EN_MESA, oyente)
    const restaurant = restauranteCon([plato('a', { modelo: modelo(true) })])
    renderWithProviders(<Hero />, { restaurant })

    fireEvent.click(screen.getByRole('button', { name: /ver en mi mesa/i }))

    expect(oyente).toHaveBeenCalledTimes(1)
    window.removeEventListener(EVENTO_VER_EN_MESA, oyente)
  })
})

describe('ComoFunciona', () => {
  it('muestra los 3 pasos solo si hay algún plato en AR', () => {
    const conAr = restauranteCon([plato('a', { modelo: modelo(true) })])
    const { unmount } = renderWithProviders(<ComoFunciona />, {
      restaurant: conAr,
    })
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    unmount()

    const sinAr = restauranteCon([plato('a')])
    const { container } = renderWithProviders(<ComoFunciona />, {
      restaurant: sinAr,
    })
    expect(container).toBeEmptyDOMElement()
  })
})

describe('Menu: Lo más pedido', () => {
  it('muestra la sección solo con platos marcados como destacados', () => {
    const sin = restauranteCon([plato('a'), plato('b')])
    const { unmount } = renderWithProviders(<Menu />, { restaurant: sin })
    expect(screen.queryByText('Lo más pedido')).not.toBeInTheDocument()
    unmount()

    const con = restauranteCon([plato('a'), plato('b', { destacado: true })])
    renderWithProviders(<Menu />, { restaurant: con })
    expect(screen.getByText('Lo más pedido')).toBeInTheDocument()
  })
})
