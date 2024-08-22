/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lemon: ['Lemon', 'serif'],
      },
      colors: {
        mintGreen: '#3BBA9C',
        darkBlueGray: '#2E3047',
        slateGray: '#43455C',
        navyGray: '#3C3F58',
        coolGray: '#707793',
      },
    },
  },
  plugins: [],
}