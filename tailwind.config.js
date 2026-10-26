/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          light: '#FFF0F6',
          DEFAULT: '#FFD6E7',
          deep: '#FFB8D6',
        },
        rose: {
          soft: '#FFAECB',
          DEFAULT: '#FF8FB8',
          vibrant: '#F472B6',
          deep: '#E11D48',
        },
        lavender: {
          light: '#F3F0FF',
          DEFAULT: '#DCD6FF',
          deep: '#A99AEF',
          vibrant: '#8B5CF6',
        },
        cream: {
          DEFAULT: '#FFF8FC',
          muted: '#F9EEF6',
        },
        midnight: {
          DEFAULT: '#21172F',
          light: '#312247',
          dark: '#140D1F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat"', '"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'glow-pink': '0 0 35px -5px rgba(255, 143, 184, 0.45), 0 0 15px -2px rgba(255, 214, 231, 0.3)',
        'glow-lavender': '0 0 35px -5px rgba(169, 154, 239, 0.45), 0 0 15px -2px rgba(220, 214, 255, 0.3)',
        'glow-heart': '0 0 50px rgba(255, 143, 184, 0.6), 0 0 20px rgba(255, 214, 231, 0.5)',
        'glass': '0 8px 32px 0 rgba(33, 23, 47, 0.25)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-very-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
