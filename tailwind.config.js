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
      main: '#000',
      sub: '#4E6CFB',
      second: 'var(--second_color)',
      gray: '#d1d1d1',
      lightMain: '#c0a5f0',
      lightBlack: '#6b6b6b',
      third: '#42a4ff'
    },
    extend: {
      fontFamily: {
        heading: "'Nunito Sans', sans-serif",
        body: "'Nunito Sans', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}