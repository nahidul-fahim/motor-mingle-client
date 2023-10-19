/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      main: '#ff0062',
      sub: '#0a0140',
      gray: '#d1d1d1',
      lightMain: '#ff2c8f38'
    },
    extend: {
      fontFamily: {
        heading: "'Montserrat', sans-serif",
        body: "'Assistant', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
}