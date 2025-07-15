import { environment } from '../environments/environment';

/**
 * Builds an asset URL that works both locally and in the shell.
 * @param assetPath - The path to the asset.
 * @returns The full asset URL.
 */
const buildAssetUrl = (assetPath: string): string =>
  environment.baseUrl ? `${environment.baseUrl}${assetPath}` : assetPath;

export const ASSETS = {
  ILLUSTRATIONS: {
    SETTINGS: buildAssetUrl('/assets/illustrations/settings.svg')
  }
} as const;
