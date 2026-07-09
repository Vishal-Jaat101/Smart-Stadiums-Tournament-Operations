/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stadiumCharcoal: '#12151A',
        stadiumFloodlight: '#F5F7FA',
        stadiumTurf: '#2F8F5B',
        stadiumAmber: '#E8A93D',
        stadiumRed: '#D9483C',
        stadiumCyan: '#3FA9D6',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'],
        display: ['"Oswald"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

