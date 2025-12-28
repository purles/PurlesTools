/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        'background-light': '#111111',
        accent: '#4e3261',
        'accent-light': '#6b4580',
        'accent-glow': 'rgba(78, 50, 97, 0.5)',
        'text-primary': '#e4e4e7',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(78, 50, 97, 0.4)',
        'accent-glow-lg': '0 0 40px rgba(78, 50, 97, 0.5)',
      },
    },
  },
  plugins: [],
}
