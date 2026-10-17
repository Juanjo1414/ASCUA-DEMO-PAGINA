/**
 * Aviso para cuando el comensal abre la demo dentro de un navegador
 * embebido (Instagram, WhatsApp, TikTok…) que no deja usar AR real.
 *
 * Lo usa `ArDishModal`. Si detecta la app (`inAppName`), ofrece copiar el
 * enlace para abrirlo en el navegador normal; si no la reconoce, solo avisa
 * que el AR no está disponible ahí.
 */
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface InAppBrowserNoticeProps {
  inAppName: string | null
  t: {
    ar: {
      inAppTitle: string
      inAppBody: string
      copied: string
      copyLink: string
      arUnavailable: string
    }
  }
}

export function InAppBrowserNotice({ inAppName, t }: InAppBrowserNoticeProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignored
    }
  }

  return (
    <div className="mt-3 rounded-xl bg-porcelana px-4 py-3 text-tinta">
      {inAppName ? (
        <>
          <p className="text-body font-bold text-tinta">{t.ar.inAppTitle}</p>
          <p className="mt-1.5 text-body text-tinta-soft">
            {t.ar.inAppBody.replaceAll('{app}', inAppName)}
          </p>
          <button
            type="button"
            onClick={copyLink}
            className="mt-3 inline-flex min-h-12 items-center gap-1.5 rounded-chip border-2 border-tinta px-4 text-body font-bold text-tinta transition-colors hover:bg-brasa hover:border-brasa"
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
        <p className="text-body text-tinta-soft">{t.ar.arUnavailable}</p>
      )}
    </div>
  )
}
