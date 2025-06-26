/**
 * Paths para assets compartilhados do ByteBank Pro
 *
 * Este arquivo centraliza todos os caminhos dos assets para facilitar
 * a importação e manutenção em todos os microfrontends.
 *
 * Oferece duas formas de importação:
 * 1. Paths relativos (padrão) - funciona em qualquer ambiente
 * 2. Imports diretos (opcional) - para bundlers com configuração específica
 */

// Paths dos assets - ABORDAGEM PRINCIPAL
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

// Exports principais - usando paths (RECOMENDADO para Angular)
export const LOGOS = ASSET_PATHS.LOGOS;
export const ICONS = ASSET_PATHS.ICONS;
export const IMAGES = ASSET_PATHS.IMAGES;
export const ILLUSTRATIONS = ASSET_PATHS.ILLUSTRATIONS;

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
