/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'Cairo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lux: 'var(--shadow)',
        glow: 'var(--glow)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'pulse-soft': 'pulseSoft 3.2s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.8s linear infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.06)', opacity: '.85' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
