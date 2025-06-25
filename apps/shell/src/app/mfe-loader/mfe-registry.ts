import { loadRemoteModule } from '@angular-architects/module-federation';
import { MfeNames } from '@bytebank-pro/types';
import { environment } from 'src/environments/environment';
import { Type } from '@angular/core';

/**
 * Interface that defines the structure of a loaded MFE module
 */
interface MfeModule {
  App: Type<unknown>;
}

/**
 * Loads a micro frontend (MFE) module dynamically based on the provided MFE name.
 * @param {MfeNames} mfeName - The name of the micro frontend to load
 * @returns {Promise<MfeModule>} A promise that resolves to the loaded MFE module
 */
export const loadMfe = (mfeName: MfeNames): Promise<MfeModule> => {
  // Check if the MFE registry is defined in the environment
  const config = environment.mfeRegistry?.[mfeName];

  // Check if the MFE configuration exists in the registry
  if (!config) throw new Error(`MFE ${mfeName} not found in registry`);

  // Load the remote module using the configuration from the registry
  return loadRemoteModule<MfeModule>({
    type: 'module',
    remoteEntry: config.remoteEntry,
    exposedModule: config.exposedModule
  });
};
