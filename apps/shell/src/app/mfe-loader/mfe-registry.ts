import { loadRemoteModule } from '@angular-architects/module-federation';
import { MfeNames } from '@bytebank-pro/types';
import { environment } from 'src/environments/environment';

/**
 * Loads a micro frontend (MFE) module dynamically based on the provided MFE name.
 * @param {MfeNames} mfeName - The name of the micro frontend to load
 * @returns {Promise<any>} A promise that resolves to the loaded MFE module
 */
export const loadMfe = (mfeName: MfeNames): Promise<any> => {
  // Check if the MFE registry is defined in the environment
  const config = environment.mfeRegistry?.[mfeName];

  // Check if the MFE configuration exists in the registry
  if (!config) throw new Error(`MFE ${mfeName} not found in registry`);

  // Load the remote module using the configuration from the registry
  return loadRemoteModule({
    type: 'module',
    remoteEntry: config.remoteEntry,
    exposedModule: config.exposedModule
  });
};
