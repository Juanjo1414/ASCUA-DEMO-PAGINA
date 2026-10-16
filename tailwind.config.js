/**
 * Color de Tailwind respaldado por una variable CSS que SÍ admite
 * transparencia (`bg-cream-canvas/95`, `border-deep-forest/10`…).
 *
 * Con `'var(--color-x)'` a secas, Tailwind no sabe cómo mezclar un alfa y
 * descarta en silencio toda clase con `/NN` (se perdían el panel del hero,
 * el oscurecido detrás de los modales y las líneas finas). `color-mix`
 * resuelve el alfa en el navegador sin tener que duplicar los tokens en RGB.
 */
const token =
  (nombre) =>
  ({ opacityValue }) => {
    // Para los colores lisos (`bg-cream-canvas`) Tailwind pasa `undefined` o la
    // variable `var(--tw-bg-opacity)`: no es un número, así que se deja el
    // color tal cual. Solo se mezcla cuando la clase trae un alfa real (/95).
    const alfa = Number(opacityValue)
    return opacityValue === undefined || Number.isNaN(alfa) || alfa === 1
      ? `var(--color-${nombre})`
      : `color-mix(in srgb, var(--color-${nombre}) ${alfa * 100}%, transparent)`
  }

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        'serif-accent': ['var(--font-serif-accent)'],
        body: ['var(--font-body)'],
        'body-regular': ['var(--font-body-regular)'],
      },
      colors: {
        'deep-forest': token('deep-forest'),
        'lime-glow': token('lime-glow'),
        'sage-mist': token('sage-mist'),
        'warm-sand': token('warm-sand'),
        'cream-canvas': token('cream-canvas'),
        'forest-shadow': token('forest-shadow'),
        'pure-ink': token('pure-ink'),
        'warm-gray': token('warm-gray'),
        'slate-gray': token('slate-gray'),
      },
      fontSize: {
        caption: [
          'var(--text-caption)',
          {
            lineHeight: 'var(--leading-caption)',
            letterSpacing: 'var(--tracking-caption)',
          },
        ],
        'body-sm': [
          'var(--text-body-sm)',
          {
            lineHeight: 'var(--leading-body-sm)',
            letterSpacing: 'var(--tracking-body-sm)',
          },
        ],
        body: [
          'var(--text-body)',
          {
            lineHeight: 'var(--leading-body)',
            letterSpacing: 'var(--tracking-body)',
          },
        ],
        'body-lg': [
          'var(--text-body-lg)',
          {
            lineHeight: 'var(--leading-body-lg)',
            letterSpacing: 'var(--tracking-body-lg)',
          },
        ],
        subheading: [
          'var(--text-subheading)',
          {
            lineHeight: 'var(--leading-subheading)',
            letterSpacing: 'var(--tracking-subheading)',
          },
        ],
        'heading-sm': [
          'var(--text-heading-sm)',
          {
            lineHeight: 'var(--leading-heading-sm)',
            letterSpacing: 'var(--tracking-heading-sm)',
          },
        ],
        heading: [
          'var(--text-heading)',
          {
            lineHeight: 'var(--leading-heading)',
            letterSpacing: 'var(--tracking-heading)',
          },
        ],
        'heading-lg': [
          'var(--text-heading-lg)',
          {
            lineHeight: 'var(--leading-heading-lg)',
            letterSpacing: 'var(--tracking-heading-lg)',
          },
        ],
        'display-sm': [
          'var(--text-display-sm)',
          {
            lineHeight: 'var(--leading-display-sm)',
            letterSpacing: 'var(--tracking-display-sm)',
          },
        ],
        display: [
          'var(--text-display)',
          {
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
          },
        ],
        'display-lg': [
          'var(--text-display-lg)',
          {
            lineHeight: 'var(--leading-display-lg)',
            letterSpacing: 'var(--tracking-display-lg)',
          },
        ],
      },
      borderRadius: {
        cards: 'var(--radius-cards)',
        small: 'var(--radius-small)',
        badges: 'var(--radius-badges)',
        images: 'var(--radius-images)',
        inputs: 'var(--radius-inputs)',
        buttons: 'var(--radius-buttons)',
      },
      boxShadow: {
        xl: 'var(--shadow-xl)',
      },
      maxWidth: {
        page: 'var(--page-max-width)',
      },
    },
  },
  plugins: [],
}
