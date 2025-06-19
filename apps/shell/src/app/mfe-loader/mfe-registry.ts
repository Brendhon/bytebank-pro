import { loadRemoteModule } from '@angular-architects/module-federation';

export enum MfeNames {
  DASHBOARD = 'dashboard',
  TRANSACTIONS = 'transactions',
  SETTINGS = 'settings'
}

export interface MfeConfig {
  remoteName: string;
  exposedModule: string;
  remoteEntry: string;
}

export const mfeRegistry: Record<MfeNames, MfeConfig> = {
  dashboard: {
    remoteName: 'dashboard',
    exposedModule: './Routes',
    remoteEntry: 'http://localhost:4201/remoteEntry.js'
  },
  transactions: {
    remoteName: 'transactions',
    exposedModule: './Routes',
    remoteEntry: 'http://localhost:4202/remoteEntry.js'
  },
  settings: {
    remoteName: 'settings',
    exposedModule: './Routes',
    remoteEntry: 'http://localhost:4203/remoteEntry.js'
  }
} as const;

export const loadMfe = (mfeName: MfeNames) => {
  const config = mfeRegistry[mfeName];
  
  if (!config) {
    throw new Error(`MFE ${mfeName} not found in registry`);
  }
  
  return loadRemoteModule({
    type: 'manifest',
    remoteName: config.remoteName,
    exposedModule: config.exposedModule
  });
};
