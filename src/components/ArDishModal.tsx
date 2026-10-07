import { useEffect, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import ArViewer from './ArViewer'
import { useLanguage } from '../i18n/useLanguage'
import { useDependencies } from '@/presentation/state/DependenciesContext'

interface Dish {
  name: string
  description: string
}

interface Asset {
  glbUrl: string
  posterUrl: string
}

interface ArDishModalProps {
  dish: Dish
  asset: Asset
  mode: string
  onClose: () => void
}

export default function ArDishModal({
  dish,
  asset,
  mode,
  onClose,
}: ArDishModalProps) {
  const { t } = useLanguage()
  const arUnavailable = mode === 'ar'
  const [copied, setCopied] = useState(false)
  const { environmentDetector } = useDependencies()
  const inAppName = environmentDetector.getCapabilities().embeddedBrowserName

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignored
    }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-carbon/90 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-rescoldo/40 bg-carbon-900 p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.ar.close}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-rescoldo/50 bg-carbon-800/80 text-loza transition-colors hover:bg-brasa hover:text-carbon"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <ArViewer glb={asset.glbUrl} poster={asset.posterUrl} alt={dish.name} />

        <div className="mt-5">
          <p className="font-display text-lg font-semibold tracking-tight text-loza">
            {dish.name}
          </p>
          <p className="mt-1 text-sm text-ceniza">{dish.description}</p>
          {arUnavailable && (
            <div className="mt-3 rounded-xl border border-rescoldo/50 bg-carbon-800 px-4 py-3">
              {inAppName ? (
                <>
                  <p className="text-xs font-medium text-loza">
                    {t.ar.inAppTitle}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ceniza">
                    {t.ar.inAppBody.replaceAll('{app}', inAppName)}
                  </p>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-rescoldo/60 px-3 py-1.5 text-xs text-loza transition-colors hover:bg-brasa hover:text-carbon"
                  >
                    {copied ? (
                      <Check size={13} strokeWidth={2} />
                    ) : (
                      <Copy size={13} strokeWidth={2} />
                    )}
                    {copied ? t.ar.copied : t.ar.copyLink}
                  </button>
                </>
              ) : (
                <p className="text-xs leading-relaxed text-ceniza">
                  {t.ar.arUnavailable}
                </p>
              )}
            </div>
          )}
          <p className="mt-3 text-xs text-ceniza/70">{t.ar.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}
