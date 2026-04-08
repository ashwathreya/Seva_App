/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lux: {
          charcoal: '#0f0f0f',
          surface: '#1a1a1a',
          parchment: '#eaeaea',
          muted: '#a3a3a3',
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
        card: '0 4px 24px rgba(0,0,0,0.35)',
        cardLift: '0 20px 50px rgba(0,0,0,0.45)',
        goldGlow: '0 0 0 1px rgba(201,169,110,0.25), 0 12px 40px rgba(201,169,110,0.12)',
        goldGlowHover: '0 0 0 1px rgba(201,169,110,0.4), 0 20px 56px rgba(201,169,110,0.18)',
        innerLight: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'lux-gradient': 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
      },
    },
  },
  plugins: [],
};
