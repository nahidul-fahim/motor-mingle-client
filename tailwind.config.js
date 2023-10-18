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
      primary: '#ff0062',
      secondary: '#521b30',
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