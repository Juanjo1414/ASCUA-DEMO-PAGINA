import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { InAppBrowserNotice } from '@/presentation/components/ar/InAppBrowserNotice'

describe('InAppBrowserNotice', () => {
  const mockT = {
    ar: {
      inAppTitle: 'Navegador Integrado',
      inAppBody: 'Estás usando {app}.',
      copied: 'Copiado',
      copyLink: 'Copiar enlace',
      arUnavailable: 'RA no disponible',
    },
  }

  it('nombra la app si se provee inAppName', () => {
    render(<InAppBrowserNotice inAppName="Instagram" t={mockT} />)
    expect(screen.getByText('Estás usando Instagram.')).toBeInTheDocument()
    expect(screen.getByText('Navegador Integrado')).toBeInTheDocument()
  })

  it('muestra mensaje generico si no hay inAppName', () => {
    render(<InAppBrowserNotice inAppName={null} t={mockT} />)
    expect(screen.getByText('RA no disponible')).toBeInTheDocument()
  })
})
