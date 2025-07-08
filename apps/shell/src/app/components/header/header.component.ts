import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LogoComponent } from '@bytebank-pro/ui';
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
   */
  headerClasses = computed(() => {
    const baseClasses = ''; // Global header styles defined in root CSS, so no base classes needed here.
    const variantClasses =
      this.variant() === 'guest' ? 'justify-center sm:justify-between' : 'justify-between';
    return `${baseClasses} ${variantClasses}`.trim();
  });

  /**
   * Computes the CSS classes for the `bb-logo` component based on the header `variant`.
   */
  logoClasses = computed(() =>
    this.variant() === 'guest' ? 'text-bytebank-green' : 'text-bytebank-orange'
  );

  /**
   * Computes the logo variant responsive
   */
  responsiveDisplayClasses = computed(
    () => `hidden ${this.variant() === 'guest' ? 'sm:flex' : 'md:flex'}`
  );
}
