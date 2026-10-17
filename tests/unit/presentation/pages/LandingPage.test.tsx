import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { LandingPage } from '@/presentation/pages/LandingPage'
import { DEMO_RESTAURANT_SLUG } from '@/shared/config'

const renderLanding = () =>
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  )

describe('LandingPage', () => {
  it('presenta el producto y lleva a la demo genérica de PITS', () => {
    renderLanding()

    expect(
      screen.getByRole('heading', { level: 1, name: /sobre tu mesa/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver la demo/i })).toHaveAttribute(
      'href',
      `/r/${DEMO_RESTAURANT_SLUG}`
    )
  })

  it('explica los 3 pasos de uso en orden', () => {
    renderLanding()

    const pasos = screen.getAllByRole('listitem')
    expect(pasos).toHaveLength(3)
    expect(pasos[0]).toHaveTextContent(/escanea el qr/i)
    expect(pasos[2]).toHaveTextContent(/tamaño real/i)
  })

  it('nunca lista restaurantes: el único enlace a /r/ es el de la demo', () => {
    renderLanding()

    const enlacesARestaurantes = screen
      .getAllByRole('link')
      .map((enlace) => enlace.getAttribute('href'))
      .filter((href) => href?.startsWith('/r/'))
    expect(enlacesARestaurantes).toEqual([`/r/${DEMO_RESTAURANT_SLUG}`])
  })
})
