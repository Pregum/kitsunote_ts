/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          50: 'var(--color-orange-50)',
          100: 'var(--color-orange-100)',
          200: 'var(--color-orange-200)',
          300: 'var(--color-orange-300)',
          400: 'var(--color-orange-400)',
          500: 'var(--color-orange-500)',
          600: 'var(--color-orange-600)',
          700: 'var(--color-orange-700)',
          800: 'var(--color-orange-800)',
          900: 'var(--color-orange-900)',
        },
        brown: {
          50: 'var(--color-brown-50)',
          100: 'var(--color-brown-100)',
          200: 'var(--color-brown-200)',
          300: 'var(--color-brown-300)',
          400: 'var(--color-brown-400)',
          500: 'var(--color-brown-500)',
          600: 'var(--color-brown-600)',
          700: 'var(--color-brown-700)',
          800: 'var(--color-brown-800)',
          900: 'var(--color-brown-900)',
        },
        cream: 'var(--color-cream)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'foxWag': 'foxTailWag 1.2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};