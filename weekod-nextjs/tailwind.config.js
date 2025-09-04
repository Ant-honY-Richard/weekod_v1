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
        'inter': ['var(--font-inter)', 'sans-serif'],
        'mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        primary: {
          main: '#00F3FF',
          light: '#39FFFF',
          dark: '#00D1E0',
          // Legacy support
          cyan: '#00F3FF',
          magenta: '#FF00FF',
          green: '#39FF14',
        },
        secondary: {
          main: '#39FF14',
          light: '#5FFF4A',
          dark: '#2ECC0F',
        },
        accent: {
          main: '#FF00FF',
          light: '#FF4DFF',
          dark: '#CC00CC',
        },
        background: {
          main: '#0A0A12',
          light: '#0F0F1A',
          dark: '#050508',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          tertiary: '#A0A0A0',
        }
      },
      spacing: {
        'section': 'clamp(3rem, 8vw, 8rem)',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.75rem',
        'lg': '1.5rem',
        'xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 243, 255, 0.2)',
        'glow-md': '0 0 30px rgba(0, 243, 255, 0.3)',
        'glow-lg': '0 0 50px rgba(0, 243, 255, 0.4)',
        'glow-secondary': '0 0 20px rgba(57, 255, 20, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-fast': 'fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-medium': 'fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-slow': 'fadeIn 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(0, 243, 255, 0.7), 0 0 20px rgba(0, 243, 255, 0.5)' },
          '100%': { textShadow: '0 0 15px rgba(0, 243, 255, 0.8), 0 0 30px rgba(0, 243, 255, 0.6)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 40px rgba(0, 243, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1400px',
        },
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 7vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 8vw, 4rem)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-glow': {
          textShadow: '0 0 10px rgba(0, 243, 255, 0.7)',
        },
        '.text-glow-secondary': {
          textShadow: '0 0 10px rgba(57, 255, 20, 0.7)',
        },
        '.gradient-background': {
          background: 'linear-gradient(to bottom right, #0A0A12, #1A1A2E, #16213E)',
        },
        '.container-width': {
          maxWidth: '1400px',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}