/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7EFDD',      // rice-paper base
        ink: '#2C3B2E',        // dark ink green — text/nav
        pickle: '#8C2F39',     // pickle-jar maroon — primary accent
        turmeric: '#D9A441',   // turmeric gold — secondary accent
        brass: '#B9863A',      // brass — borders/dividers
        cream: '#FFFBF2'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: []
}
