import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/graphql',
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
