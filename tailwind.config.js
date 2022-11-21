/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**"],
  theme: {
    colors: {
      'second': '#E4F2E7',
      'light': '#F2F2F2',
      'dark': '#0D0D0D',
      'grayx': '#595859',
      'gray-ligth': '#BFBFBF',
      'obscure': '#262223'
    },
    screens: {
      'phone': '425px',
      // => @media (min-width: 425px) { ... }

      'tablet': '768px',
      // => @media (min-width: 768px) { ... }

      'desktop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'wide': '2560px',
      // => @media (min-width: 1024px) { ... }

    },
    boxShadow: {
      'card': ' -10px 18px 7px -5px rgba(0,0,0,0.75);',
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
