import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DishCard } from '@/presentation/components/menu/DishCard'
import type { Dish } from '@/domain/dish'

describe('DishCard', () => {
  const baseDish: Dish = {
    id: 'test-dish',
    nombre: { es: 'Plato de Prueba', en: 'Test Dish' },
    descripcion: { es: 'Descripción de prueba', en: 'Test description' },
    precio: 25000,
    foto: '/assets/test.jpg',
    agotado: false,
  }

  const mockT = {
    ar: { viewOnTable: 'Ver en mesa', view3d: 'Ver 3D' },
  }

  it('muestra nombre y precio con formato COP', () => {
    render(<DishCard dish={baseDish} lang="es" t={mockT} isSoldOut={false} />)

    expect(screen.getByText('Plato de Prueba')).toBeInTheDocument()
    // formatCopPrice adds spaces in node environment or not, depending on Intl, but usually "$ 25.000"
    // Let's just check if it contains the formatted number.
    const priceEl = screen.getByText(/\$ ?25\.000/)
    expect(priceEl).toBeInTheDocument()
  })

  it('no muestra botones AR si modelo no está aprobado', () => {
    const dishWithoutAr = { ...baseDish }
    render(
      <DishCard dish={dishWithoutAr} lang="es" t={mockT} isSoldOut={false} />
    )

    expect(screen.queryByText('Ver en mesa')).not.toBeInTheDocument()
    expect(screen.queryByText('Ver 3D')).not.toBeInTheDocument()
  })

  it('muestra botones AR si modelo está aprobado y llama a callback', () => {
    const dishWithAr: Dish = {
      ...baseDish,
      modelo: {
        glb: '/model.glb',
        usdz: '/model.usdz',
        poster: '/poster.jpg',
        escalaRealCm: 10,
        aprobado: true,
      },
    }
    const onArClick = vi.fn()
    render(
      <DishCard
        dish={dishWithAr}
        lang="es"
        t={mockT}
        isSoldOut={false}
        onArClick={onArClick}
      />
    )

    const btn = screen.getByText('Ver en mesa')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(onArClick).toHaveBeenCalledWith(dishWithAr)
  })

  it('muestra estado agotado y deshabilita botones', () => {
    const dishWithAr: Dish = {
      ...baseDish,
      modelo: {
        glb: '/model.glb',
        usdz: '/model.usdz',
        poster: '/poster.jpg',
        escalaRealCm: 10,
        aprobado: true,
      },
    }
    render(<DishCard dish={dishWithAr} lang="es" t={mockT} isSoldOut={true} />)

    expect(screen.getByText('Agotado')).toBeInTheDocument()
    const btnAr = screen.getByText('Ver en mesa')
    expect(btnAr).toBeDisabled()
  })
})
