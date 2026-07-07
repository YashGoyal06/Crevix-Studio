/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void:    '#080808',
        surface: '#0E0E0E',
        elevated:'#111111',
        border:  'rgba(255, 255, 255, 0.06)',
        text: {
          primary:   '#FFFFFF',
          secondary: '#6B7280',
          muted:     '#374151',
        },
        accent: {
          violet: '#6D28D9',
        },
      },
      fontFamily: {
        syne: ['Satoshi', 'sans-serif'],
        brand: ['Syne', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
