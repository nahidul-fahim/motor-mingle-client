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
      lightMain: '#ecedf3',
      lightBlack: '#6b6b6b',
      third: '#52a1eb',
      fourth: '#050B20'
    },
    extend: {
      fontFamily: {
        heading: "'DM Sans', sans-serif",
        body: "'DM Sans', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}