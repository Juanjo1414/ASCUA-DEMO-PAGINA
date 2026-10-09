/**
 * Botón flotante "¿Cómo funciona?" siempre visible en la carta.
 *
 * Lo usa `RestaurantPage`. Permite reabrir la guía de 3 pasos de AR
 * (`ArGuideModal`) en cualquier momento, no solo en la primera visita —
 * CLAUDE.md exige que la ayuda esté siempre a la mano.
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
        onClick={() => setIsOpen(true)}
        aria-label={t.arGuide?.title || '¿Cómo funciona?'}
        className="fixed bottom-6 right-6 z-40 flex h-12 items-center gap-2 rounded-full bg-cream-canvas/80 px-4 py-2 font-display text-sm font-medium text-forest-shadow shadow-lg backdrop-blur border border-warm-gray/10 transition-colors hover:bg-forest-shadow hover:text-lime-glow lg:bottom-10 lg:right-10"
      >
        <HelpCircle size={18} strokeWidth={2} />
        <span className="hidden sm:inline">
          {t.arGuide?.title || '¿Cómo funciona?'}
        </span>
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
