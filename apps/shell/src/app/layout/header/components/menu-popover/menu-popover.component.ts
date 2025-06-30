import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Menu } from 'lucide-angular'; // Import specific icon
import { NavMenuComponent } from '@/components/nav-menu/nav-menu.component';
import { PopoverComponent } from '@bytebank-pro/ui';
import { NavItemLabel, NavMenuItemLabel } from '@/core/types/nav';
/**
 * MenuPopover component provides a collapsible navigation menu, typically for smaller screens.
 * It uses a popover to display the navigation items.
 *
 * @example
 * ```html
 * <bb-menu-popover [pathname]="currentPath" (onNavigate)="handleNavigation($event)"></bb-menu-popover>
 * ```
 */
@Component({
  selector: 'bb-menu-popover', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule, PopoverComponent, NavMenuComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './menu-popover.component.html', // Separated template for clarity
  styleUrls: ['./menu-popover.component.css'] // Use CSS specific to component
})
export class MenuPopoverComponent {
  /**
   * The current pathname, used to determine the active navigation item.
   * @default '/dashboard' if not provided.
   */
  pathname = input<string | undefined>(undefined);

  /**
   * Event emitted when a navigation action is requested from the NavMenu.
   * Emits the `href` of the clicked navigation item.
   */
  onNavigate = output<string>();

  /**
   * Returns the current active path, defaulting to '/dashboard' if `pathname` is undefined.
   */
  get currentPath(): string {
    return this.pathname() ?? '/dashboard';
  }

  /**
   * Maps the current path to the corresponding NavItemLabel.
   * Used to determine which navigation item should be highlighted as active.
   */
  currentNavLabel = computed<NavItemLabel>(() => {
    const pathname = this.currentPath.replace(/\/$/, '') as keyof typeof NavMenuItemLabel;
    return NavMenuItemLabel[pathname];
  });

  /**
   * The icon used for the menu toggle button.
   * Uses the Lucide Angular Menu icon.
   */
  menuIcon = Menu;

  /**
   * Handles the navigation event emitted by the NavMenu component.
   * Re-emits the event to the parent component.
   * @param href The URL to navigate to.
   */
  handleNavigation(href: string): void {
    this.onNavigate.emit(href);
  }
}
