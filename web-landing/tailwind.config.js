/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lux: {
          /** Deepest teal — primary canvas (replaces flat black) */
          charcoal: '#071F20',
          deep: '#071F20',
          /** Card / band surfaces */
          surface: '#0D2E30',
          /** Brand teal — highlights, gradients */
          teal: '#0F3D3E',
          /** Soft ink (SEVA) */
          parchment: '#EAF3F3',
          muted: '#A7B9BA',
          /** Muted luxury gold — CTAs only */
          gold: '#c9a96e',
          'gold-hover': '#d4b87a',
        },
        seva: {
          teal: '#0F3D3E',
          deep: '#071F20',
          soft: '#0D2E30',
          gold: '#F0A500',
          ink: '#EAF3F3',
          muted: '#A7B9BA',
          night: '#09090E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        display: ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['4.25rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        nav: '0 1px 0 rgba(255,255,255,0.06)',
        card: '0 4px 28px rgba(7,31,32,0.45)',
        cardLift: '0 20px 50px rgba(7,31,32,0.5)',
        goldGlow:
          '0 0 0 1px rgba(201,169,110,0.22), 0 12px 40px rgba(15,61,62,0.35), 0 12px 40px rgba(201,169,110,0.08)',
        goldGlowHover:
          '0 0 0 1px rgba(201,169,110,0.35), 0 20px 56px rgba(15,61,62,0.4), 0 20px 48px rgba(201,169,110,0.12)',
        innerLight: 'inset 0 1px 0 rgba(255,255,255,0.07)',
      },
      backgroundImage: {
        'lux-gradient': 'linear-gradient(165deg, #0D2E30 0%, #071F20 45%, #0a2e2f 100%)',
        'lux-hero': 'radial-gradient(ellipse 85% 55% at 75% 15%, rgba(15,61,62,0.55) 0%, transparent 55%)',
        'lux-hero-floor': 'radial-gradient(ellipse 70% 45% at 20% 90%, rgba(15,61,62,0.35) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};
