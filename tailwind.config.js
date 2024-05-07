/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        "azulClaro":"#243cff",
        "azulOscuro":"#0d1b3e",
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}

