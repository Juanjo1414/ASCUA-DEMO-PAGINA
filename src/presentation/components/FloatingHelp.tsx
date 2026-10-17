/**
 * Botón flotante "¿Cómo funciona?" siempre visible en la carta.
 *
 * Lo usa `RestaurantPage`. Permite reabrir la guía de 3 pasos de AR
 * (`ArGuideModal`) en cualquier momento, no solo en la primera visita —
 * CLAUDE.md exige que la ayuda esté siempre a la mano. El ícono siempre va
 * con texto (también en celular) y respeta las zonas seguras del teléfono.
 */
import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import ArGuideModal from './ArGuideModal'

export default function FloatingHelp() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed z-40 flex min-h-12 items-center gap-2 rounded-chip bg-porcelana px-5 font-bold text-tinta shadow-plato transition-transform duration-200 ease-salida active:scale-95"
        style={{
          right: 'max(1rem, env(safe-area-inset-right))',
          bottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <HelpCircle size={20} strokeWidth={2.25} aria-hidden="true" />
        {t.arGuide.title}
      </button>

      <ArGuideModal
        isOpen={isOpen}
        isReplay={true}
        onClose={() => setIsOpen(false)}
        onContinue={() => setIsOpen(false)}
      />
    </>
  )
}
