/**
 * Defines possible labels for navigation items.
 */
export type NavItemLabel = 'Dashboard' | 'Transações' | 'Configurações';

/**
 * Defines the structure of a single navigation menu item.
 */
export interface NavMenuItem {
  label: NavItemLabel;
  href: string;
  icon: any; // Type for Lucide icon
}
