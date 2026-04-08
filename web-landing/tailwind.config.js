/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        content: '1240px',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        250: '250ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      colors: {
        /**
         * SEVA design system (Stripe-level tokens)
         * Gold: CTAs, highlights, active only
         */
        ds: {
          base: '#0F0F10',
          surface: '#151516',
          elevated: '#1C1C1D',
          line: '#222222',
          text: '#EAEAEA',
          text2: '#A1A1A1',
          quiet: '#6B6B6B',
          gold: '#C9A96E',
          goldHi: '#D8B97F',
          goldSoft: '#3A2F1F',
        },
        /** Semantic aliases used across marketing + app */
        lux: {
          charcoal: '#0F0F10',
          deep: '#0F0F10',
          surface: '#151516',
          elevated: '#1C1C1D',
          border: '#222222',
          parchment: '#EAEAEA',
          muted: '#A1A1A1',
          quiet: '#6B6B6B',
          gold: '#C9A96E',
          'gold-hover': '#D8B97F',
          'gold-subtle': '#3A2F1F',
          teal: '#0F3D3E',
        },
        /** Customer portal (light panels) + accents */
        seva: {
          teal: '#0CB8B3',
          tealDeep: '#0F3D3E',
          deep: '#0F0F10',
          soft: '#151516',
          gold: '#C9A96E',
          ink: '#EAEAEA',
          muted: '#A1A1A1',
          night: '#0F0F10',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        display: ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['4.25rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        nav: '0 1px 0 rgba(255,255,255,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.35)',
        cardLift: '0 16px 48px rgba(0,0,0,0.45)',
        goldGlow:
          '0 0 0 1px rgba(201,169,110,0.2), 0 8px 32px rgba(0,0,0,0.35), 0 0 40px rgba(201,169,110,0.06)',
        goldGlowHover:
          '0 0 0 1px rgba(201,169,110,0.32), 0 12px 40px rgba(0,0,0,0.4), 0 0 48px rgba(201,169,110,0.1)',
        innerLight: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        inputFocus: '0 0 0 3px rgba(201,169,110,0.18)',
      },
      backgroundImage: {
        'lux-gradient': 'linear-gradient(165deg, #1C1C1D 0%, #0F0F10 50%, #151516 100%)',
        'lux-hero': 'radial-gradient(ellipse 85% 55% at 75% 12%, rgba(201,169,110,0.08) 0%, transparent 55%)',
        'lux-hero-floor': 'radial-gradient(ellipse 70% 45% at 20% 92%, rgba(15,61,62,0.2) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};
