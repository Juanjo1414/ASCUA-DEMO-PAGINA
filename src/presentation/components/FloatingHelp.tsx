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
        className="fixed bottom-6 right-6 z-40 flex h-12 items-center gap-2 rounded-full bg-fondo/80 px-4 py-2 font-display text-sm font-medium text-crema shadow-lg backdrop-blur border border-loza/10 transition-colors hover:bg-tinta hover:text-llama lg:bottom-10 lg:right-10"
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
