/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAF4E8',
          creamSoft: '#FFF8F0',
          wine: '#8B0000',
          red: '#C8102E',
          redDark: '#B22222',
          green: '#228B22',
          earth: '#7A4F2A',
          ink: '#33190F',
          wineDark: '#5A0E0E',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(51, 25, 15, 0.12)',
      },
    },
  },
  plugins: [],
}
