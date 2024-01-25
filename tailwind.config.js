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
      second: 'var(--second_color)', // this is not being used in the website, but this will be helpful for the future use in any project. So, I'm keeping it.
      gray: '#d1d1d1',
      lightMain: '#6590d6',
      lightBlack: '#6b6b6b',
      third: '#52a1eb'
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