import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LogoComponent, LogoVariant } from '@bytebank-pro/ui';
import { AuthenticatedUserHeaderComponent } from './components/authenticated-user-header/authenticated-user-header.component';
import { GuestActionsComponent } from './components/guest-actions/guest-actions.component';
import { MenuPopoverComponent } from './components/menu-popover/menu-popover.component';

/**
 * Defines the possible variants for the Header component.
 * 'guest' for non-authenticated users, 'user' for authenticated users.
 */
export type HeaderVariant = 'guest' | 'user';

/**
 * Header component for the ByteBank Pro application.
 * Displays the logo, and conditionally renders actions based on whether the user is a 'guest' or 'user'.
 * Includes a mobile menu popover for user mode.
 *
 * @example
 * ```html
 * <bb-header
 *   [variant]="'guest'"
 *   (onLogin)="handleLogin()"
 *   (onOpenAccount)="handleOpenAccount()"
 * ></bb-header>
 *
 * <bb-header
 *   [variant]="'user'"
 *   [userName]="'Jane Doe'"
 *   [pathname]="'/dashboard'"
 *   (onNavigate)="handleNavigate($event)"
 *   (onLogout)="handleLogout()"
 * ></bb-header>
 * ```
 */
@Component({
  selector: 'bb-header', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [
    CommonModule,
    LogoComponent,
    GuestActionsComponent,
    MenuPopoverComponent,
    AuthenticatedUserHeaderComponent
  ], // All required child components
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './header.component.html', // Separated template for clarity
  styleUrls: ['./header.component.css'] // Component-specific styles
})
export class HeaderComponent {
  /**
   * The variant of the header, 'guest' or 'user'.
   */
  variant = input.required<HeaderVariant>();

  /**
   * The name of the authenticated user, displayed when `variant` is 'user'.
   */
  userName = input<string>();

  /**
   * The current pathname, used by the MenuPopover to determine the active navigation item.
   */
  pathname = input<string>();

  /**
   * Output event emitted when the "Login" action is triggered in 'guest' mode.
   */
  onLogin = output<void>();

  /**
   * Output event emitted when the "Open Account" action is triggered in 'guest' mode.
   */
  onOpenAccount = output<void>();

  /**
   * Output event emitted when a navigation action is triggered (e.g., from MenuPopover or UserActions).
   */
  onNavigate = output<string>();

  /**
   * Output event emitted when the "Logout" action is triggered in 'user' mode.
   */
  onLogout = output<void>();

  /**
   * Computes the CSS classes for the main header element based on the `variant`.
   * @returns A string of CSS classes.
   */
  get headerClasses(): string {
    const baseClasses = ''; // Global header styles defined in root CSS, so no base classes needed here.
    const variantClasses =
      this.variant() === 'guest' ? 'justify-center sm:justify-between' : 'justify-between';
    return `${baseClasses} ${variantClasses}`.trim();
  }

  /**
   * Computes the `variant` for the `bb-logo` component based on the header `variant`.
   * @returns The `LogoVariant` for the `bb-logo`.
   */
  get logoVariant(): LogoVariant {
    return this.variant() === 'guest' ? 'icon' : 'icon'; // Always 'icon' as per original
  }

  /**
   * Computes the CSS classes for the `bb-logo` component based on the header `variant`.
   * @returns A string of CSS classes.
   */
  get logoClasses(): string {
    const visibilityClasses = 'hidden'; // Base hidden class as per original
    const responsiveDisplayClasses = this.variant() === 'guest' ? 'sm:flex' : 'md:flex'; // Responsive display as per original
    const colorClasses =
      this.variant() === 'guest' ? 'text-bytebank-green' : 'text-bytebank-orange'; // Color based on variant using design tokens

    return `${visibilityClasses} ${responsiveDisplayClasses} ${colorClasses}`.trim();
  }
}
