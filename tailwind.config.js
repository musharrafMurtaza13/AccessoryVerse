/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
