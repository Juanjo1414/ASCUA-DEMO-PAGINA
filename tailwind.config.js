/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Bodoni para la voz grande: el trazo fino de sus remates corta como un
        // filo y, en mayúsculas espaciadas, tiene la nobleza de un rótulo de
        // joyería. Archivo hace todo lo demás; su eje de anchura da la letra
        // ancha de los rótulos sin cargar otra familia.
        display: ['"Bodoni Moda"', 'Didot', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Los valores viven en index.css para poder invertirlos en claro.
        carbon: {
          DEFAULT: 'rgb(var(--c-carbon) / <alpha-value>)',
          950: 'rgb(var(--c-carbon) / <alpha-value>)',
          900: 'rgb(var(--c-carbon-900) / <alpha-value>)',
          800: 'rgb(var(--c-carbon-800) / <alpha-value>)',
          700: 'rgb(var(--c-carbon-700) / <alpha-value>)',
        },
        brasa: {
          DEFAULT: 'rgb(var(--c-brasa) / <alpha-value>)',
          500: 'rgb(var(--c-brasa) / <alpha-value>)',
          600: 'rgb(var(--c-brasa) / <alpha-value>)',
        },
        llama: 'rgb(var(--c-llama) / <alpha-value>)',
        rescoldo: 'rgb(var(--c-rescoldo) / <alpha-value>)',
        ceniza: 'rgb(var(--c-ceniza) / <alpha-value>)',
        loza: 'rgb(var(--c-loza) / <alpha-value>)',
        blanco: 'rgb(var(--c-blanco) / <alpha-value>)',
        kraft: 'rgb(var(--c-kraft) / <alpha-value>)',
        acento: 'rgb(var(--c-acento) / <alpha-value>)',
        tinta: 'rgb(var(--c-tinta) / <alpha-value>)',
        crema: 'rgb(var(--c-crema) / <alpha-value>)',
      },
      maxWidth: {
        content: '1400px',
      },
      keyframes: {
      },
      animation: {
      },
    },
  },
  plugins: [],
}
