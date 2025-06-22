/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: require('@bytebank-pro/shared-design-tokens').colors,
      typography: require('@bytebank-pro/shared-design-tokens').typography,
    },
  },
  plugins: [],
}
