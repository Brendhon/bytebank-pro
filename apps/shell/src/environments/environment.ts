import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: true,
  apiUrl: 'https://bytebank-api.onrender.com/graphql',
  mfeRegistry: {
    dashboard: {
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Component'
    },
    transactions: {
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './Component'
    },
    settings: {
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './Component'
    }
  }
};
