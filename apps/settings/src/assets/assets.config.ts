import { environment } from '../environments/environment';
import { buildAssetUrl } from '@bytebank-pro/utils';

/**
 * Builds an asset URL that works both locally and in the shell.
 * @param assetPath - The path to the asset.
 * @returns The full asset URL.
 */
const buildUrl = (assetPath: string): string => buildAssetUrl(environment, assetPath);

export const ASSETS = {
  ILLUSTRATIONS: {
    SETTINGS: buildUrl('/assets/illustrations/settings.svg')
  }
} as const;
