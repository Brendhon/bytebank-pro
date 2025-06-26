/**
 * Paths for ByteBank Pro shared assets
 *
 * This file centralizes all asset paths to facilitate
 * import and maintenance across all microfrontends.
 *
 * Offers two import approaches:
 * 1. Relative paths (default) - works in any environment
 * 2. Direct imports (optional) - for bundlers with specific configuration
 */

// Asset paths - MAIN APPROACH
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

// Main exports - using paths (RECOMMENDED for Angular)
export const LOGOS = ASSET_PATHS.LOGOS;
export const ICONS = ASSET_PATHS.ICONS;
export const IMAGES = ASSET_PATHS.IMAGES;
export const ILLUSTRATIONS = ASSET_PATHS.ILLUSTRATIONS;
// Re-export all assets for compatibility
export const ASSETS = {
  LOGOS,
  ICONS,
  IMAGES,
  ILLUSTRATIONS
} as const;

// Re-export paths for compatibility
export const ASSET_URLS = ASSET_PATHS;

// Direct exports - for bundlers with specific configuration (optional)
export type AssetType = 'svg' | 'image';

// Interface for asset content
export interface AssetContent {
  type: AssetType;
  content: string;
}

// Helper function to build full URLs in different environments
export function getAssetUrl(assetPath: string, baseUrl?: string): string {
  const cleanPath = assetPath.indexOf('/') === 0 ? assetPath.slice(1) : assetPath;
  const cleanBaseUrl =
    baseUrl && baseUrl.charAt(baseUrl.length - 1) === '/' ? baseUrl.slice(0, -1) : baseUrl;

  return cleanBaseUrl ? `${cleanBaseUrl}/${cleanPath}` : `/${cleanPath}`;
}

/**
 * Utility function to detect if an asset is an SVG file
 * @param assetPath - The path to the asset
 * @returns true if the asset is an SVG, false otherwise
 */
export function isSvgAsset(assetPath: string): boolean {
  return assetPath.toLowerCase().endsWith('.svg');
}

/**
 * Gets the appropriate asset content based on file type
 * For SVG files, returns the SVG content string for currentColor support
 * For other files, returns the asset path for traditional img loading
 * @param assetPath - The path to the asset
 * @param svgContentKey - The key to lookup SVG content in SVG_CONTENT (e.g., 'LOGOS.MAIN')
 * @returns Object with type and content for rendering
 */
export async function getAssetContent(assetPath: string): Promise<AssetContent> {
  // Default return object for non-SVG assets
  const returnDefault: AssetContent = { type: 'image', content: assetPath };

  if (isSvgAsset(assetPath)) {
    // Fetch SVG content asynchronously using fetch
    let svgContent: string = '';

    // Try to fetch the SVG content from the asset path
    // If fetch fails, fallback to traditional image loading
    try {
      // Attempt to fetch the SVG content from the asset path

      // Use fetch to get the SVG content
      const response = await fetch(assetPath);

      // Check if the response is ok (status in the range 200-299)
      // If ok, read the response text as SVG content
      // If not ok, throw an error to fallback to traditional image loading
      // Note: This assumes the assetPath is a valid URL or relative path accessible by fetch
      if (response.ok) svgContent = await response.text();
      else throw new Error(`Failed to load SVG: ${response.statusText}`);
    } catch (error) {
      // Fallback to traditional image loading
      return returnDefault;
    }

    // Return the SVG content or the asset path if fetch failed
    return { type: 'svg', content: svgContent };
  }

  // Fallback to traditional image loading
  return returnDefault;
}

/**
 * Hook to use assets with a custom base URL
 * Useful for environments with CDN or different paths
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
