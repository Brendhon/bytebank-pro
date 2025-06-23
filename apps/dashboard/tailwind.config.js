/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: require('@bytebank-pro/shared-design-tokens').tailwindColors,
      typography: require('@bytebank-pro/shared-design-tokens').tailwindTypography,
    },
  },
  plugins: [],
}
