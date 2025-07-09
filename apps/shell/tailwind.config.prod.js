/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
    // Em produção, os estilos são carregados via CSS compartilhado
    // Não precisamos dos caminhos relativos dos MFEs
  ],
  theme: {
    extend: {
      colors: require('@bytebank-pro/shared-design-tokens').tailwindColors,
      typography: require('@bytebank-pro/shared-design-tokens').tailwindTypography
    }
  },
  plugins: []
};
