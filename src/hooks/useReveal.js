import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useReveal({
  selector = '.reveal-item',
  y = 24,
  stagger = 0.08,
} = {}) {
  const scope = useRef(null)

  useEffect(() => {
    if (!scope.current) return
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector)
      if (!targets.length) return

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.set(targets, { opacity: 0, y })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 82%',
          once: true,
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [selector, y, stagger])

  return scope
}
