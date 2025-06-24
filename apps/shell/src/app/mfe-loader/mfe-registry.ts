import { loadRemoteModule } from '@angular-architects/module-federation';
import { IMfeRegistry, MfeNames } from '@bytebank-pro/types';

export const mfeRegistry: IMfeRegistry = {
  dashboard: {
    exposedModule: './Component',
    remoteEntry: 'http://localhost:4201/remoteEntry.js'
  },
  transactions: {
    exposedModule: './Component',
    remoteEntry: 'http://localhost:4202/remoteEntry.js'
  },
  settings: {
    exposedModule: './Component',
    remoteEntry: 'http://localhost:4203/remoteEntry.js'
  }
} as const;

export const loadMfe = (mfeName: MfeNames) => {
  const config = mfeRegistry[mfeName];

  if (!config) {
    throw new Error(`MFE ${mfeName} not found in registry`);
  }

  return loadRemoteModule({
    type: 'module',
    remoteEntry: config.remoteEntry,
    exposedModule: config.exposedModule
  });
};
