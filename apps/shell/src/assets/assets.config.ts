import { environment } from 'src/environments/environment';

/**
 * Builds an asset URL that works both locally and in the shell.
 * @param assetPath - The path to the asset.
 * @returns The full asset URL.
 */
const buildAssetUrl = (assetPath: string): string =>
  environment.baseUrl ? `${environment.baseUrl}${assetPath}` : assetPath;

export const ASSETS = {
  ILLUSTRATIONS: {
    HOME: buildAssetUrl('/assets/illustrations/home.svg'),
    ERROR_404: buildAssetUrl('/assets/illustrations/404.svg'),
    LOGIN: buildAssetUrl('/assets/illustrations/login.svg'),
    REGISTER: buildAssetUrl('/assets/illustrations/register.svg')
  },
  IMAGES: {
    BOX: buildAssetUrl('/assets/images/box.png'),
    WITHDRAWAL: buildAssetUrl('/assets/images/withdrawal.png'),
    STAR: buildAssetUrl('/assets/images/star.png'),
    DEVICES: buildAssetUrl('/assets/images/devices.png')
  },
  ICONS: {
    GITHUB: buildAssetUrl('/assets/icons/github.svg'),
    FIGMA: buildAssetUrl('/assets/icons/figma.svg')
  },
  LOGOS: {
    MAIN: buildAssetUrl('/assets/logos/logo.svg'),
    ICON: buildAssetUrl('/assets/logos/icon.svg')
  }
} as const;
