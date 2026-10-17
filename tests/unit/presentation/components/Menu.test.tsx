import { screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Menu from '@/presentation/components/Menu'

// El <model-viewer> real registra un custom element con lógica de cámara
// que no funciona en jsdom (lanza al intentar sincronizar la cámara AR).
// Estas pruebas solo verifican que el modal abra, no cómo se ve el visor
// 3D (eso lo cubre el QA manual de Juan en dispositivos reales).
vi.mock('@google/model-viewer', () => ({}))
import {
  InMemoryUiPreferencesStore,
  MockArLauncher,
} from '../../application/doubles'
import {
  renderWithProviders,
  baseRestaurantFixture,
} from '../renderWithProviders'
import type { Restaurant } from '@/domain/restaurant'

const restaurantConPlatos = {
  ...baseRestaurantFixture,
  slug: 'rest-menu-test-0000',
  categorias: [
    {
      id: 'fuertes',
      nombre: { es: 'Fuertes' },
      platos: [
        {
          id: 'plato-con-ar',
          nombre: { es: 'Plato con AR' },
          descripcion: { es: 'Descripción del plato con AR.' },
          precio: 30000,
          foto: 'foto-ar.webp',
          agotado: false,
          modelo: {
            glb: 'modelo.glb',
            usdz: 'modelo.usdz',
            poster: 'poster.webp',
            escalaRealCm: 18,
            aprobado: true,
          },
        },
        {
          id: 'plato-sin-ar',
          nombre: { es: 'Plato sin AR' },
          descripcion: { es: 'Descripción del plato sin AR.' },
          precio: 15000,
          foto: 'foto-sin-ar.webp',
          agotado: false,
        },
      ],
    },
  ],
} as unknown as Restaurant

describe('Menu', () => {
  it('usa el título traducido de la sección, no un texto fijo en inglés (regresión)', () => {
    renderWithProviders(<Menu />, { restaurant: restaurantConPlatos })

    expect(screen.getByText('Nuestro Menú')).toBeInTheDocument()
    expect(screen.queryByText('Our Menu')).not.toBeInTheDocument()
  })

  it('separa los platos con modelo aprobado (destacados) del resto', () => {
    renderWithProviders(<Menu />, { restaurant: restaurantConPlatos })

    expect(screen.getByText('Plato con AR')).toBeInTheDocument()
    expect(screen.getByText('Plato sin AR')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /ver en mi mesa/i })
    ).toBeInTheDocument()
  })

  it('primera vez: tocar "Ver en mi mesa" muestra la guía antes de lanzar el AR', () => {
    renderWithProviders(<Menu />, { restaurant: restaurantConPlatos })

    fireEvent.click(screen.getByRole('button', { name: /ver en mi mesa/i }))

    expect(screen.getByText('Apunta a tu mesa')).toBeInTheDocument()
  })

  it('al continuar desde la guía, lanza el AR y abre el visor si cae al modo de respaldo', async () => {
    const arLauncher = new MockArLauncher()
    renderWithProviders(<Menu />, {
      restaurant: restaurantConPlatos,
      dependencies: { arLauncher },
    })

    fireEvent.click(screen.getByRole('button', { name: /ver en mi mesa/i }))
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: /entendido, abrir cámara/i })
      )
    })

    expect(arLauncher.launchedDishes).toHaveLength(1)
    expect(arLauncher.launchedDishes[0]!.dish.id).toBe('plato-con-ar')
    expect(
      await screen.findByRole('dialog', { name: 'Plato con AR' })
    ).toBeInTheDocument()
  })

  it('si ya se vio la guía en este dispositivo, lanza el AR directo sin mostrarla', async () => {
    const uiPreferencesStore = new InMemoryUiPreferencesStore({
      'ascua:ar-guide-seen': '1',
    })
    const arLauncher = new MockArLauncher()
    renderWithProviders(<Menu />, {
      restaurant: restaurantConPlatos,
      dependencies: { uiPreferencesStore, arLauncher },
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /ver en mi mesa/i }))
    })

    expect(screen.queryByText('Apunta a tu mesa')).not.toBeInTheDocument()
    expect(arLauncher.launchedDishes).toHaveLength(1)
  })
})
