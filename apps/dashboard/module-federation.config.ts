const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './src/app/app.ts',
  },
  shared: {
    '@angular/core': { singleton: true },
    '@angular/common': { singleton: true },
    '@angular/router': { singleton: true },
    '@angular/platform-browser': { singleton: true }
  }
});
