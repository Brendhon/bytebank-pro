import { Component, ChangeDetectionStrategy, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { DateLongFormatterPipe } from '@/core/pipes/date-long-formatter.pipe';
import { CurrencyFormatPipe } from '@/core/pipes/currency-format.pipe';

/**
 * WelcomeCard component displays user's greeting, current date, and account balance.
 * The balance visibility can be toggled by the user.
 *
 * @example
 * ```html
 * <bb-welcome-card name="João Silva" [balance]="1234.56" accountType="Conta Poupança"></bb-welcome-card>
 * <bb-welcome-card name="Maria Souza" [balance]="987.65" [date]="myCustomDate"></bb-welcome-card>
 * ```
 */
@Component({
  selector: 'bb-welcome-card', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule, CurrencyFormatPipe, DateLongFormatterPipe], // Required imports, including pipes
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './welcome-card.component.html', // Separated template for clarity
  styleUrls: ['./welcome-card.component.css'] // Separate CSS file for component-specific styles
})
export class WelcomeCardComponent {
  /**
   * The name of the user to display in the greeting.
   */
  name = input.required<string>();

  /**
   * The current balance of the account.
   */
  balance = input.required<number>();

  /**
   * The type of the account (e.g., 'Conta Corrente', 'Conta Poupança').
   * @default 'Conta Corrente'
   */
  accountType = input<string>('Conta Corrente');

  /**
   * The date to display. Defaults to the current date.
   * @default new Date()
   */
  date = input<Date>(new Date());

  /**
   * Icons to display in the card.
   */
  icons = {
    eye: Eye,
    eyeOff: EyeOff
  };

  /**
   * Controls the visibility state of the balance.
   * Initialized as `false`, meaning balance is hidden by default.
   */
  isBalanceVisible = signal(false); // Using Angular Signal for state management

  /**
   * Toggles the visibility of the balance.
   */
  toggleBalanceVisibility(): void {
    this.isBalanceVisible.update((current) => !current); // Update signal value
  }
}
