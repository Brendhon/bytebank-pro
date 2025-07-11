import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { ICONS } from '@bytebank-pro/shared-assets';
import { IPublicLinks } from '@bytebank-pro/types';
import { ImgComponent, PopoverComponent } from '@bytebank-pro/ui';
import { LucideAngularModule, User } from 'lucide-angular';
import { environment } from 'src/environments/environment';

/**
 * UserActions component provides a dropdown menu with navigation links to external resources
 * and a logout option for authenticated users.
 *
 * @example
 * ```html
 * <bb-user-actions (onNavigate)="handleNavigation($event)" (onLogout)="handleLogout()"></bb-user-actions>
 * ```
 */
@Component({
  selector: 'bb-user-actions', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule, PopoverComponent, ImgComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './user-actions.component.html', // Separated template for clarity
  styleUrls: ['./user-actions.component.css'] // Always include CSS file
})
export class UserActionsComponent {
  /**
   * Event emitted when a navigation link (Github, Figma, Storybook) is clicked.
   * Emits the URL to navigate to.
   */
  navigate = output<string>();

  /**
   * Event emitted when the "Sair" (Logout) button is clicked.
   */
  logout = output<void>();

  /**
   * Internal signal to control the popover open/closed state.
   */
  private _isPopoverOpen = signal<boolean>(false);

  /**
   * Returns the current state of the user actions popover.
   */
  isPopoverOpen = computed(() => this._isPopoverOpen());

  /**
   * Public links from environment configuration.
   */
  publicLinks = environment.publicLinks;

  /**
   * Icons used in the component, imported from shared assets
   */
  icons = {
    user: User,
    github: ICONS.GITHUB,
    figma: ICONS.FIGMA
  };

  /**
   * Handles the click on a navigation link.
   * Opens the URL in a new tab and closes the popover.
   * @param url The URL to navigate to.
   */
  handleExternalLinkNavigate(url: string | null): void {
    if (url) {
      window.open(url, '_blank');
      this.closePopover(); // Close popover after navigation
    }
  }

  /**
   * Get public link from environment
   * @param key The key of the public link
   * @returns The public link
   */
  getPublicLink(key: keyof IPublicLinks): string {
    return this.publicLinks?.[key] || '';
  }

  /**
   * Open public link in a new tab
   * @param key The key of the public link
   */
  openPublicLink(key: keyof IPublicLinks): void {
    this.handleExternalLinkNavigate(this.getPublicLink(key));
  }

  /**
   * Handles the click on the logout button.
   * Closes the popover after logout action.
   */
  handleLogout(): void {
    this.logout.emit();
    this.closePopover(); // Close popover after logout
  }

  /**
   * Handles popover open/close state changes.
   * @param isOpen The new open state of the popover.
   */
  handlePopoverOpenChange(isOpen: boolean): void {
    this._isPopoverOpen.set(isOpen);
  }

  /**
   * Closes the user actions popover.
   */
  closePopover(): void {
    this._isPopoverOpen.set(false);
  }

  /**
   * Opens the user actions popover.
   */
  openPopover(): void {
    this._isPopoverOpen.set(true);
  }
}
