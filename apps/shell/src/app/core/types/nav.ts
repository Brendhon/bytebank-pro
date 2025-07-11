import { LucideIconData } from 'lucide-angular';

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
  icon: LucideIconData;
}

export enum NavMenuItemLabel {
  dashboard = 'Dashboard',
  transactions = 'Transações',
  settings = 'Configurações'
}
