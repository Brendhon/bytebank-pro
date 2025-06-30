import { NavItemLabel, NavMenuItemLabel } from '../types/nav';

/**
 * Maps the current path to the corresponding NavItemLabel.
 * Used to determine which navigation item should be highlighted as active.
 */
export const getLabelFromPath = (path: string): NavItemLabel => {
  const pathname = path.startsWith('/') ? path.slice(1) : path; // Remove leading slash
  const sanitizedPath = pathname as keyof typeof NavMenuItemLabel;
  return NavMenuItemLabel[sanitizedPath];
};
