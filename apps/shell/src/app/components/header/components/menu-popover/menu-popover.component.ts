import { NavMenuComponent } from '@/components/nav-menu/nav-menu.component';
import { NavItemLabel } from '@/core/types/nav';
import { getLabelFromPath } from '@/core/utils/nav';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PopoverComponent } from '@bytebank-pro/ui';
import { LucideAngularModule, Menu } from 'lucide-angular';

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
  pathname = input.required<string>();

  /**
   * Event emitted when a navigation action is requested from the NavMenu.
   * Emits the `href` of the clicked navigation item.
   */
  navigate = output<string>();

  /**
   * Internal signal to control the popover open/closed state.
   */
  private _isMenuOpen = signal<boolean>(false);

  /**
   * Returns the current active path, defaulting to '/dashboard' if `pathname` is undefined.
   */
  currentPath = computed<string>(() => this.pathname());

  /**
   * Maps the current path to the corresponding NavItemLabel.
   * Used to determine which navigation item should be highlighted as active.
   */
  currentNavLabel = computed<NavItemLabel>(() => getLabelFromPath(this.currentPath()));

  /**
   * The icon used for the menu toggle button.
   * Uses the Lucide Angular Menu icon.
   */
  menuIcon = Menu;

  /**
   * Returns the current state of the menu popover.
   */
  isMenuOpen = computed(() => this._isMenuOpen());

  /**
   * Handles the navigation event emitted by the NavMenu component.
   * Re-emits the event to the parent component and closes the menu.
   * @param href The URL to navigate to.
   */
  handleNavigation(href: string): void {
    this.navigate.emit(href);
    this.closeMenu(); // Close menu after navigation
  }

  /**
   * Handles popover open/close state changes.
   * @param isOpen The new open state of the popover.
   */
  handlePopoverOpenChange(isOpen: boolean): void {
    this._isMenuOpen.set(isOpen);
  }

  /**
   * Closes the menu popover.
   */
  closeMenu(): void {
    this._isMenuOpen.set(false);
  }

  /**
   * Opens the menu popover.
   */
  openMenu(): void {
    this._isMenuOpen.set(true);
  }
}
