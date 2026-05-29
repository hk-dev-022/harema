/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-figtree)', 'var(--font-noto-sans-jp)', 'sans-serif'],
      },
      fontSize: {
        'body-sm': '0.6875rem',
        'body-base': ['0.8125rem', { lineHeight: '2' }],
      },
      spacing: {
        '18': '72px; @media (min-width: 768px) { margin-top: 4.5rem; padding-top: 4.5rem; gap: 4.5rem; }',
      },
      colors: {
        gray: 'var(--color-gray)',
        black: 'var(--color-black)',
      }
    },
  },
  plugins: [],
}