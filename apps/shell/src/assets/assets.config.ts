import { environment } from 'src/environments/environment';
import { buildAssetUrl } from '@bytebank-pro/utils';

/**
 * Builds an asset URL that works both locally and in the shell.
 * @param assetPath - The path to the asset.
 * @returns The full asset URL.
 */
const buildUrl = (assetPath: string): string => buildAssetUrl(environment, assetPath);

export const ASSETS = {
  ILLUSTRATIONS: {
    HOME: buildUrl('/assets/illustrations/home.svg'),
    ERROR_404: buildUrl('/assets/illustrations/404.svg'),
    LOGIN: buildUrl('/assets/illustrations/login.svg'),
    REGISTER: buildUrl('/assets/illustrations/register.svg')
  },
  IMAGES: {
    BOX: buildUrl('/assets/images/box.png'),
    WITHDRAWAL: buildUrl('/assets/images/withdrawal.png'),
    STAR: buildUrl('/assets/images/star.png'),
    DEVICES: buildUrl('/assets/images/devices.png')
  },
  ICONS: {
    GITHUB: buildUrl('/assets/icons/github.svg'),
    FIGMA: buildUrl('/assets/icons/figma.svg')
  },
  LOGOS: {
    MAIN: buildUrl('/assets/logos/logo.svg'),
    ICON: buildUrl('/assets/logos/icon.svg')
  }
} as const;
