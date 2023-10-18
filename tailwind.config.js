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
      sub: '#521b30',
      gray: '#d1d1d1',
    },
    extend: {
      fontFamily: {
        heading: "'Montserrat', sans-serif",
        body: "'Roboto', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
}