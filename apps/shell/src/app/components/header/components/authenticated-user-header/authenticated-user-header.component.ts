import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActionsComponent } from '../user-actions/user-actions.component';

/**
 * AuthenticatedUserHeader component displays the logged-in user's name
 * and provides an avatar with a popover for navigation and logout actions.
 *
 * @example
 * ```html
 * <bb-authenticated-user-header
 * userName="John Doe"
 * (onNavigate)="handleNavigation($event)"
 * (onLogout)="handleLogout()"
 * ></bb-authenticated-user-header>
 * ```
 */
@Component({
  selector: 'bb-authenticated-user-header', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, UserActionsComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './authenticated-user-header.component.html', // Separated template for clarity
  styleUrls: ['./authenticated-user-header.component.css'] // CSS file for component-specific styles
})
export class AuthenticatedUserHeaderComponent {
  /**
   * The name of the authenticated user to display.
   */
  userName = input.required<string>();

  /**
   * Event emitted when a navigation action is requested.
   * Emits the URL to navigate to.
   */
  navigate = output<string>();

  /**
   * Event emitted when a logout action is requested.
   */
  logout = output<void>();
}
