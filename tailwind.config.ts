import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f0f4f8',
        bg2: '#ffffff',
        bg3: '#e4edf6',
        navy: '#1a3a5c',
        blue: {
          DEFAULT: '#1e5fa8',
          2: '#2471c8',
          light: '#e8f1fb',
        },
        muted: '#5a7a9a',
        border: '#ccdcee',
        text: '#1a2a3a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
