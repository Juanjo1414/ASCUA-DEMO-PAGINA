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
    <div className="mt-3 rounded-xl border border-warm-gray/30 bg-deep-forest px-4 py-3">
      {inAppName ? (
        <>
          <p className="text-xs font-medium text-cream-canvas">
            {t.ar.inAppTitle}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-warm-gray">
            {t.ar.inAppBody.replaceAll('{app}', inAppName)}
          </p>
          <button
            type="button"
            onClick={copyLink}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-warm-gray/40 px-3 py-1.5 text-xs text-cream-canvas transition-colors hover:bg-lime-glow hover:text-forest-shadow"
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
        <p className="text-xs leading-relaxed text-warm-gray">
          {t.ar.arUnavailable}
        </p>
      )}
    </div>
  )
}
