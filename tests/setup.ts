import '@testing-library/jest-dom/vitest'

// jsdom no implementa matchMedia; varios componentes lo usan para respetar
// prefers-reduced-motion (Menu, LoadingScreen). Por defecto, en pruebas,
// "no coincide" (no reducido), igual que en un navegador normal sin esa
// preferencia activada.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}
