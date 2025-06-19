/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Importando os tokens compartilhados
      colors: require('@bytebank-pro/shared-design-tokens').colors,
      typography: require('@bytebank-pro/shared-design-tokens').typography,
    },
  },
  plugins: [],
}
