import { IEnvironment } from '@bytebank-pro/types';

export const environment: IEnvironment = {
  production: true,
  apiUrl: 'https://bytebank-api.onrender.com/graphql',
  mfeRegistry: {
    dashboard: {
      remoteEntry: 'https://bytebank-pro-dashboard.vercel.app/remoteEntry.js',
      exposedModule: './Component'
    },
    transactions: {
      remoteEntry: 'https://bytebank-pro-transactions.vercel.app/remoteEntry.js',
      exposedModule: './Component'
    },
    settings: {
      remoteEntry: 'https://bytebank-pro-settings.vercel.app/remoteEntry.js',
      exposedModule: './Component'
    }
  },
  publicLinks: {
    github: 'https://github.com/Brendhon/bytebank-pro',
    figma:
      'https://www.figma.com/design/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264'
  }
};
