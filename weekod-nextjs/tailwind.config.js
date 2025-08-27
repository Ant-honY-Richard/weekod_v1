/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'manrope': ['var(--font-manrope)', 'sans-serif'],
      },
      colors: {
        primary: {
          cyan: '#00F3FF',
          magenta: '#FF00FF',
          green: '#39FF14',
          dark: '#0A0A12',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(0, 243, 255, 0.7), 0 0 20px rgba(0, 243, 255, 0.5)' },
          '100%': { textShadow: '0 0 15px rgba(0, 243, 255, 0.8), 0 0 30px rgba(0, 243, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}