/** SEVA brand — teal #0F3D3E + gold #F0A500 (matches native app) */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      boxShadow: {
        nav: '0 1px 0 rgba(0,0,0,0.12), 0 4px 24px rgba(0,0,0,0.15)',
        card: '0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.12)',
        cardHover: '0 8px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(240,165,0,0.15)',
        goldGlow: '0 8px 32px rgba(240,165,0,0.25)',
      },
    },
  },
  plugins: [],
};
