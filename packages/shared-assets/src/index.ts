/**
 * Paths para assets compartilhados do ByteBank Pro
 *
 * Este arquivo centraliza todos os caminhos dos assets para facilitar
 * a importação e manutenção em todos os microfrontends.
 */

// Logos da marca ByteBank
export const LOGOS = {
  MAIN: '/assets/logos/logo.svg',
  ICON: '/assets/logos/icon.svg'
} as const;

// Ícones customizados e ferramentas
export const ICONS = {
  // Ícones da aplicação
  MAIN_ICON: '/assets/icons/icon.svg',
  MAIN_LOGO: '/assets/icons/logo.svg',

  // Ícones de ferramentas/plataformas
  FIGMA: '/assets/icons/figma.svg',
  GITHUB: '/assets/icons/github.svg',
  STORYBOOK: '/assets/icons/storybook.svg'
} as const;

// Imagens funcionais
export const IMAGES = {
  BOX: '/assets/images/box.png',
  DEVICES: '/assets/images/devices.png',
  STAR: '/assets/images/star.png',
  WITHDRAWAL: '/assets/images/withdrawal.png'
} as const;

// Ilustrações para diferentes telas/estados
export const ILLUSTRATIONS = {
  ERROR_404: '/assets/illustrations/404.svg',
  HOME: '/assets/illustrations/home.svg',
  LOGIN: '/assets/illustrations/login.svg',
  REGISTER: '/assets/illustrations/register.svg',
  SETTINGS: '/assets/illustrations/settings.svg',
  TRANSACTION: '/assets/illustrations/transaction.svg'
} as const;

// Função helper para construir URLs completas em diferentes ambientes
export function getAssetUrl(assetPath: string, baseUrl?: string): string {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const cleanBaseUrl = baseUrl?.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  return cleanBaseUrl ? `${cleanBaseUrl}/${cleanPath}` : `/${cleanPath}`;
}

// Re-export de todos os assets
export const ASSETS = {
  LOGOS,
  ICONS,
  IMAGES,
  ILLUSTRATIONS
} as const;
