/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    // Incluir arquivos dos microfrontends remotos
    '../../apps/dashboard/src/**/*.{html,ts}',
    '../../apps/transactions/src/**/*.{html,ts}',
    '../../apps/settings/src/**/*.{html,ts}',
    // Incluir arquivos da biblioteca UI compartilhada
    '../../packages/ui/src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: require('@bytebank-pro/shared-design-tokens').tailwindColors,
      typography: require('@bytebank-pro/shared-design-tokens').tailwindTypography
    }
  },
  plugins: []
};
