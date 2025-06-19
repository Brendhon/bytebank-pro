const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',
  exposes: {},
  remotes: {
    "dashboard": "http://localhost:4201/remoteEntry.js",
    "transactions": "http://localhost:4202/remoteEntry.js",
    "settings": "http://localhost:4203/remoteEntry.js"
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  }
});
