export enum MfeNames {
  DASHBOARD = 'dashboard',
  TRANSACTIONS = 'transactions',
  SETTINGS = 'settings'
}

interface MfeConfig {
  exposedModule: string;
  remoteEntry: string;
}

export interface IMfeRegistry extends Record<MfeNames, MfeConfig> {}