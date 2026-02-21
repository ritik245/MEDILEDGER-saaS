import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070b17',
        card: 'rgba(20, 29, 59, 0.55)',
        border: 'rgba(122, 162, 255, 0.25)',
        accent: '#3ee0ff'
      },
      boxShadow: {
        glow: '0 0 28px rgba(62, 224, 255, 0.18)'
      }
    }
  },
  plugins: []
} satisfies Config;
