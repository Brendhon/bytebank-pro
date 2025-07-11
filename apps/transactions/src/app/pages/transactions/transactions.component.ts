import { ConfirmDeletionComponent } from '@/components/confirm-deletion/confirm-deletion.component';
import { TransactionFormComponent } from '@/components/transaction-form/transaction-form.component';
import { TransactionsTableComponent } from '@/components/transactions-table/transactions-table.component';
import { PaginatedTransactions } from '@/core/models/transaction.model';
import { MfeToastService } from '@/core/services/mfe-toast.service';
import { TransactionsService } from '@/core/services/transactions.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { ITransaction } from '@bytebank-pro/types';
import { ButtonComponent } from '@bytebank-pro/ui';
import { first } from 'rxjs';

@Component({
  selector: 'bb-transactions',
  standalone: true,
  imports: [
    ButtonComponent,
    TransactionsTableComponent,
    TransactionFormComponent,
    ConfirmDeletionComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsPageComponent implements OnInit {
  // Inject dependencies
  private readonly transactionsService = inject(TransactionsService);
  private readonly toastService = inject(MfeToastService);

  // Dialog state
  isDialogOpen = signal(false);
  editingTransaction = signal<ITransaction | null>(null);

  // Delete confirmation dialog state
  isDeleteDialogOpen = signal(false);
  transactionToDelete = signal<ITransaction | null>(null);

  // Signal for transactions
  private readonly _transactions = signal<ITransaction[]>([]);
  readonly transactions = this._transactions.asReadonly();

  // Computed values
  readonly hasTransactions = computed(() => this.transactions().length > 0);

  ngOnInit(): void {
    this.loadTransactions();
  }

  /**
   * Loads transactions from the service
   */
  private loadTransactions(): void {
    this.transactionsService
      .loadTransactions()
      .pipe(first())
      .subscribe({
        next: (paginatedTransactions: PaginatedTransactions) =>
          this._transactions.set(paginatedTransactions.items),
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.toastService.showError('Falha ao carregar transações. Recarregue a página.');
        }
      });
  }

  // Dialog methods
  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
    this.editingTransaction.set(null); // Reset editing state
  }

  // Handle edit transaction
  handleEditTransaction(transaction: ITransaction): void {
    this.editingTransaction.set(transaction);
    this.openDialog();
  }

  // Handle transaction submit (create or update)
  handleTransactionSubmit(transaction: ITransaction): void {
    const transactionToSave = {
      ...(transaction.alias && { alias: transaction.alias }),
      date: transaction.date,
      desc: transaction.desc,
      type: transaction.type,
      value: transaction.value
    };

    const currentEditingTransaction = this.editingTransaction();

    if (currentEditingTransaction) {
      // Update existing transaction
      this.transactionsService
        .updateTransaction(currentEditingTransaction._id!, transactionToSave)
        .pipe(first())
        .subscribe({
          next: () => this.handleTransactionSuccess(),
          error: (error) => {
            console.error('Error updating transaction:', error);
            this.toastService.showError('Falha ao atualizar transação. Tente novamente.');
          }
        });
    } else {
      // Create new transaction
      this.transactionsService
        .createTransaction(transactionToSave)
        .pipe(first())
        .subscribe({
          next: () => this.handleTransactionSuccess(),
          error: (error) => {
            console.error('Error creating transaction:', error);
            this.toastService.showError('Falha ao criar transação. Tente novamente.');
          }
        });
    }
  }

  // Handle transaction success
  handleTransactionSuccess(): void {
    this.loadTransactions();
    this.closeDialog();
    this.toastService.showSuccess('Transação salva com sucesso!');
  }

  // Handle delete transaction
  handleDeleteTransaction(transaction: ITransaction): void {
    this.transactionToDelete.set(transaction);
    this.isDeleteDialogOpen.set(true);
  }

  // Handle delete confirmation
  handleDeleteConfirm(transaction: ITransaction): void {
    this.transactionsService
      .deleteTransaction(transaction._id!)
      .pipe(first())
      .subscribe({
        next: () => this.handleDeleteSuccess(),
        error: (error) => {
          console.error('Error deleting transaction:', error);
          this.toastService.showError('Falha ao excluir transação. Tente novamente.');
        }
      });
  }

  // Handle delete cancellation
  handleDeleteCancel(): void {
    this.closeDeleteDialog();
  }

  // Handle delete success
  handleDeleteSuccess(): void {
    this.loadTransactions();
    this.closeDeleteDialog();
    this.toastService.showSuccess('Transação excluída com sucesso!');
  }

  // Close delete dialog
  closeDeleteDialog(): void {
    this.isDeleteDialogOpen.set(false);
    this.transactionToDelete.set(null);
  }
}
