/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backwards compatibility mapping (resolves to exact same color values via CSS variables)
        void: 'var(--color-background)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-surface-2)',
        border: 'var(--color-border)',
        text: {
          primary: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        accent: {
          violet: '#6D28D9', // Kept legacy hex directly for safety
        },
        // Global Design System Tokens
        brand: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          stone: 'var(--color-stone)',
          charcoal: 'var(--color-charcoal)',
        },
        // Status Colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
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
