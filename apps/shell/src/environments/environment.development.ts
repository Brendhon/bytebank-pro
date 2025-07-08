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
  },
  publicLinks: {
    github: 'https://github.com/Brendhon/bytebank-pro',
    figma:
      'https://www.figma.com/design/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264'
  }
};
