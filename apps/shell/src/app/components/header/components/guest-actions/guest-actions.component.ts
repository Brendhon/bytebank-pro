import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@bytebank-pro/ui';
/**
 * GuestActions component provides calls to action for users who are not logged in,
 * such as opening an account or logging in.
 *
 * @example
 * ```html
 * <bb-guest-actions (onOpenAccount)="handleOpenAccount()" (onLogin)="handleLogin()"></bb-guest-actions>
 * ```
 */
@Component({
  selector: 'bb-guest-actions', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, ButtonComponent], // Required imports, including ButtonComponent
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './guest-actions.component.html', // Template file
  styleUrls: ['./guest-actions.component.css'] // Component-specific styles
})
export class GuestActionsComponent {
  /**
   * Event emitted when the "Abrir conta" button is clicked.
   */
  openAccount = output<void>();

  /**
   * Event emitted when the "Já tenho conta" button is clicked.
   */
  login = output<void>();
}
