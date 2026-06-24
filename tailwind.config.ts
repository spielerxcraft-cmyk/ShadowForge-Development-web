import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          dark: '#030712',
          green: '#16a34a',
          bright: '#4ade80',
          amber: '#b45309',
        }
      },
      fontFamily: {
        minecraft: ['Courier New', 'monospace'],
      },
      borderWidth: {
        '6': '6px',
        '8': '8px',
      },
    },
  },
  plugins: [],
}

export default config
