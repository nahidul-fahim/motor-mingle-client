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
      main: '#1b2a4f',
      sub: '#3b75ff',
      second: 'var(--second_color)',
      gray: '#d1d1d1',
      lightMain: '#c0a5f0',
      lightBlack: '#6b6b6b',
      third: '#42a4ff'
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