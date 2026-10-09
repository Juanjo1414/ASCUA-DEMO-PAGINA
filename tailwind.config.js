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
        'deep-forest': 'var(--color-deep-forest)',
        'lime-glow': 'var(--color-lime-glow)',
        'sage-mist': 'var(--color-sage-mist)',
        'warm-sand': 'var(--color-warm-sand)',
        'cream-canvas': 'var(--color-cream-canvas)',
        'forest-shadow': 'var(--color-forest-shadow)',
        'pure-ink': 'var(--color-pure-ink)',
        'warm-gray': 'var(--color-warm-gray)',
        'slate-gray': 'var(--color-slate-gray)',
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
      spacing: {
        4: 'var(--spacing-4)',
        8: 'var(--spacing-8)',
        12: 'var(--spacing-12)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
        40: 'var(--spacing-40)',
        60: 'var(--spacing-60)',
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
