import { NavItemLabel, NavMenuItemLabel } from '../types/nav';

/**
 * Maps the current path to the corresponding NavItemLabel.
 * Used to determine which navigation item should be highlighted as active.
 * @param path The path to map to a NavItemLabel
 * @returns The corresponding NavItemLabel or 'Dashboard' as fallback
 */
export const getLabelFromPath = (path: string): NavItemLabel => {
  // If the path does not start with a slash, return the path as is
  if (!path.startsWith('/')) return path as NavItemLabel;

  // Remove the leading slash
  const pathname = path.slice(1);

  // Get the key of the NavMenuItemLabel enum that corresponds to the pathname
  const sanitizedPath = pathname as keyof typeof NavMenuItemLabel;

  // Get the NavItemLabel that corresponds to the pathname
  return NavMenuItemLabel[sanitizedPath];
};
