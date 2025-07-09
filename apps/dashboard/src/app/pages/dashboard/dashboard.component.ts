import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { WelcomeCardComponent } from '@/components/welcome-card/welcome-card.component';
import { MovementsSectionComponent } from '@/components/movements-section/movements-section.component';
import { CardProps } from '@bytebank-pro/types';

/**
 * Dashboard page component that displays user financial overview
 * Shows welcome card with user info and movements section with financial data
 */
@Component({
  selector: 'bb-dashboard',
  standalone: true,
  imports: [WelcomeCardComponent, MovementsSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardPageComponent {
  /** User's full name for display in welcome card */
  userName = signal<string>('João Silva');

  /** Current account balance in Brazilian Real (BRL) */
  balance = signal<number>(15750.0);

  /** Current date for display in welcome card */
  currentDate = signal<Date>(new Date());

  /** Financial movements data for different transaction types */
  movements = signal<CardProps[]>([
    { key: 'payment', label: 'Pagamentos', value: 2450.0, variant: 'dark' },
    { key: 'deposit', label: 'Depósitos', value: 8320.0, variant: 'blue' },
    { key: 'transfer', label: 'Transferências', value: 1200.0, variant: 'orange' },
    { key: 'withdrawal', label: 'Saque', value: 3150.0, variant: 'green' }
  ]);
}
