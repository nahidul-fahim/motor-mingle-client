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
      main: '#2c0b87',
      sub: '#0a0140',
      second: 'var(--second_color)',
      gray: '#d1d1d1',
      lightMain: '#8D5EE2'
    },
    extend: {
      fontFamily: {
        heading: "'Montserrat', sans-serif",
        body: "'Montserrat', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}