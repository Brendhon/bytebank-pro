import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { WelcomeCardComponent } from '@/components/welcome-card/welcome-card.component';
import { MovementsSectionComponent } from '@/components/movements-section/movements-section.component';
import { CardProps } from '@bytebank-pro/types';
import { DashboardService } from '@/core/services/dashboard.service';
import { TransactionSummary } from '@bytebank-pro/types';
import { getUserDataFromLocalStorage } from '@bytebank-pro/utils';
import { first } from 'rxjs';

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
export class DashboardPageComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  // Get user name from localStorage
  userName = getUserDataFromLocalStorage()?.name ?? 'Desconhecido';

  /** Current account balance in Brazilian Real (BRL) */
  balance = signal<number>(0);

  /** Current date for display in welcome card */
  currentDate = signal<Date>(new Date());

  /** Loading state for data fetching */
  isLoading = signal<boolean>(false);

  /** Error state for data fetching */
  error = signal<string | null>(null);

  /** Financial movements data for different transaction types */
  movements = signal<CardProps[]>([]);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Loads dashboard data from the API
   */
  private loadDashboardData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.dashboardService
      .loadTransactionSummary()
      .pipe(first())
      .subscribe({
        next: (summary: TransactionSummary) => this.setDashboardData(summary),
        error: (error: Error) => this.setDashboardError(error),
        complete: () => this.isLoading.set(false)
      });
  }

  /**
   * Set dashboard data
   */
  private setDashboardData(summary: TransactionSummary): void {
    this.balance.set(summary.balance);
    this.movements.set(this.mapTransactionSummaryToMovements(summary));
    this.error.set(null);
  }

  /**
   * Set dashboard error
   */
  private setDashboardError(error: Error): void {
    console.log('error', error);
    this.error.set(error.message || 'Erro ao carregar dados do dashboard');
  }

  /**
   * Maps transaction summary data to movements format for display
   * @param summary - Transaction summary from API
   * @returns Array of CardProps for movements display
   */
  private mapTransactionSummaryToMovements(summary: TransactionSummary): CardProps[] {
    return [
      {
        key: 'payment',
        label: 'Pagamentos',
        value: summary.breakdown.payment || 0,
        variant: 'dark'
      },
      {
        key: 'deposit',
        label: 'Depósitos',
        value: summary.breakdown.deposit || 0,
        variant: 'blue'
      },
      {
        key: 'transfer',
        label: 'Transferências',
        value: summary.breakdown.transfer || 0,
        variant: 'orange'
      },
      {
        key: 'withdrawal',
        label: 'Saque',
        value: summary.breakdown.withdrawal || 0,
        variant: 'green'
      }
    ];
  }
}
