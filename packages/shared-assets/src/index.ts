/**
 * Paths para assets compartilhados do ByteBank Pro
 *
 * Este arquivo centraliza todos os caminhos dos assets para facilitar
 * a importação e manutenção em todos os microfrontends.
 *
 * Oferece duas formas de importação:
 * 1. Imports diretos (recomendado) - para bundlers modernos
 * 2. Paths relativos - para sistemas que precisam de URLs dinâmicas
 */

// Importação direta dos assets como módulos (melhor para bundlers)
import logoMainSvg from '../assets/logos/logo.svg';
import logoIconSvg from '../assets/logos/icon.svg';

// Imports diretos para ícones
import figmaIcon from '../assets/icons/figma.svg';
import githubIcon from '../assets/icons/github.svg';
import storybookIcon from '../assets/icons/storybook.svg';
import mainIcon from '../assets/icons/icon.svg';
import mainLogo from '../assets/icons/logo.svg';

// Imports diretos para imagens
import boxImage from '../assets/images/box.png';
import devicesImage from '../assets/images/devices.png';
import starImage from '../assets/images/star.png';
import withdrawalImage from '../assets/images/withdrawal.png';

// Imports diretos para ilustrações
import error404Illustration from '../assets/illustrations/404.svg';
import homeIllustration from '../assets/illustrations/home.svg';
import loginIllustration from '../assets/illustrations/login.svg';
import registerIllustration from '../assets/illustrations/register.svg';
import settingsIllustration from '../assets/illustrations/settings.svg';
import transactionIllustration from '../assets/illustrations/transaction.svg';

// Logos da marca ByteBank - usando imports diretos (RECOMENDADO)
export const LOGOS = {
  MAIN: logoMainSvg,
  ICON: logoIconSvg
} as const;

// Ícones customizados e ferramentas - usando imports diretos (RECOMENDADO)
export const ICONS = {
  MAIN_ICON: mainIcon,
  MAIN_LOGO: mainLogo,
  FIGMA: figmaIcon,
  GITHUB: githubIcon,
  STORYBOOK: storybookIcon
} as const;

// Imagens funcionais - usando imports diretos (RECOMENDADO)
export const IMAGES = {
  BOX: boxImage,
  DEVICES: devicesImage,
  STAR: starImage,
  WITHDRAWAL: withdrawalImage
} as const;

// Ilustrações para diferentes telas/estados - usando imports diretos (RECOMENDADO)
export const ILLUSTRATIONS = {
  ERROR_404: error404Illustration,
  HOME: homeIllustration,
  LOGIN: loginIllustration,
  REGISTER: registerIllustration,
  SETTINGS: settingsIllustration,
  TRANSACTION: transactionIllustration
} as const;

// Para compatibilidade com sistemas que ainda precisam de paths dinâmicos
export const ASSET_PATHS = {
  LOGOS: {
    MAIN: '/assets/logos/logo.svg',
    ICON: '/assets/logos/icon.svg'
  },
  ICONS: {
    MAIN_ICON: '/assets/icons/icon.svg',
    MAIN_LOGO: '/assets/icons/logo.svg',
    FIGMA: '/assets/icons/figma.svg',
    GITHUB: '/assets/icons/github.svg',
    STORYBOOK: '/assets/icons/storybook.svg'
  },
  IMAGES: {
    BOX: '/assets/images/box.png',
    DEVICES: '/assets/images/devices.png',
    STAR: '/assets/images/star.png',
    WITHDRAWAL: '/assets/images/withdrawal.png'
  },
  ILLUSTRATIONS: {
    ERROR_404: '/assets/illustrations/404.svg',
    HOME: '/assets/illustrations/home.svg',
    LOGIN: '/assets/illustrations/login.svg',
    REGISTER: '/assets/illustrations/register.svg',
    SETTINGS: '/assets/illustrations/settings.svg',
    TRANSACTION: '/assets/illustrations/transaction.svg'
  }
} as const;

// Função helper para construir URLs completas em diferentes ambientes
export function getAssetUrl(assetPath: string, baseUrl?: string): string {
  const cleanPath = assetPath.indexOf('/') === 0 ? assetPath.slice(1) : assetPath;
  const cleanBaseUrl =
    baseUrl && baseUrl.charAt(baseUrl.length - 1) === '/' ? baseUrl.slice(0, -1) : baseUrl;

  return cleanBaseUrl ? `${cleanBaseUrl}/${cleanPath}` : `/${cleanPath}`;
}

// Re-export de todos os assets para compatibilidade
export const ASSETS = {
  LOGOS,
  ICONS,
  IMAGES,
  ILLUSTRATIONS
} as const;

// Re-export dos paths para compatibilidade
export const ASSET_URLS = ASSET_PATHS;

/**
 * Hook para usar assets com base URL customizada
 * Útil para ambientes com CDN ou paths diferentes
 */
export function createAssetResolver(baseUrl: string) {
  return {
    getLogo: (variant: 'MAIN' | 'ICON') => getAssetUrl(ASSET_PATHS.LOGOS[variant], baseUrl),
    getIcon: (name: keyof typeof ASSET_PATHS.ICONS) =>
      getAssetUrl(ASSET_PATHS.ICONS[name], baseUrl),
    getImage: (name: keyof typeof ASSET_PATHS.IMAGES) =>
      getAssetUrl(ASSET_PATHS.IMAGES[name], baseUrl),
    getIllustration: (name: keyof typeof ASSET_PATHS.ILLUSTRATIONS) =>
      getAssetUrl(ASSET_PATHS.ILLUSTRATIONS[name], baseUrl)
  };
}
