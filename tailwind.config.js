/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#09C2A7',
          light: '#0EE0BF',
          dark: '#067A6B',
        },
        'blue-deep': '#0D3B66',
        cream: '#E7E2D6',
        stone: '#7A857F',
        carbon: '#111418',
      },
      fontFamily: {
        trickster: ['Trickster', 'serif'],
        lora: ['var(--font-lora)', 'serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      fontSize: {
        display: ['clamp(56px, 10vw, 120px)', { lineHeight: '0.95' }],
        h1: ['clamp(40px, 6vw, 64px)', { lineHeight: '1.05' }],
        h2: ['clamp(28px, 4vw, 40px)', { lineHeight: '1.1' }],
        h3: ['clamp(20px, 2.5vw, 24px)', { lineHeight: '1.2' }],
        'body-lg': ['clamp(16px, 1.6vw, 20px)', { lineHeight: '1.7' }],
        body: ['clamp(14px, 1.2vw, 16px)', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.4' }],
        tiny: ['12px', { lineHeight: '1.3' }],
      },
      spacing: {
        '4xs': '4px',
        '3xs': '8px',
        '2xs': '16px',
        xs: '24px',
        sm: '48px',
        md: '96px',
        lg: '144px',
      },
      transitionTimingFunction: {
        artisan: 'cubic-bezier(0.65, 0, 0.35, 1)',
        ink: 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        breathe: 'breathe 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1.0)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
