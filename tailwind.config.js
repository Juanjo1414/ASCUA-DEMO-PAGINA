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
        accent: ['var(--font-accent)'],
        body: ['var(--font-body)'],
      },
      colors: {
        mantel: token('mantel'),
        'on-mantel': token('on-mantel'),
        'on-mantel-soft': token('on-mantel-soft'),
        'mantel-deep': token('mantel-deep'),
        porcelana: token('porcelana'),
        'porcelana-dim': token('porcelana-dim'),
        tinta: token('tinta'),
        'tinta-soft': token('tinta-soft'),
        linea: token('linea'),
        brasa: token('brasa'),
        'brasa-deep': token('brasa-deep'),
        'on-brasa': token('on-brasa'),
        error: token('error'),
      },
      fontSize: {
        display: [
          'var(--text-display)',
          {
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
          },
        ],
        h2: [
          'var(--text-h2)',
          {
            lineHeight: 'var(--leading-h2)',
            letterSpacing: 'var(--tracking-h2)',
          },
        ],
        h3: [
          'var(--text-h3)',
          {
            lineHeight: 'var(--leading-h3)',
            letterSpacing: 'var(--tracking-h3)',
          },
        ],
        lead: ['var(--text-lead)', { lineHeight: 'var(--leading-lead)' }],
        body: ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
        small: ['var(--text-small)', { lineHeight: 'var(--leading-small)' }],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        chip: 'var(--radius-chip)',
      },
      boxShadow: {
        plato: 'var(--shadow-plato)',
        hoja: 'var(--shadow-hoja)',
      },
      maxWidth: {
        page: 'var(--page-max-width)',
      },
      transitionTimingFunction: {
        salida: 'var(--ease-salida)',
      },
    },
  },
  plugins: [],
}
