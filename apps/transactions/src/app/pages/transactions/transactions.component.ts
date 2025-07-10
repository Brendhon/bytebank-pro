import { ConfirmDeletionComponent } from '@/components/confirm-deletion/confirm-deletion.component';
import { TransactionFormComponent } from '@/components/transaction-form/transaction-form.component';
import { TransactionsTableComponent } from '@/components/transactions-table/transactions-table.component';
import { TransactionsService } from '@/core/services/transactions.service';
import { Component, OnInit, signal } from '@angular/core';
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
  styleUrls: ['./transactions.component.css']
})
export class TransactionsPageComponent implements OnInit {
  // Dialog state
  isDialogOpen = false;
  editingTransaction: ITransaction | null = null;

  // Delete confirmation dialog state
  isDeleteDialogOpen = false;
  transactionToDelete: ITransaction | null = null;

  // Signal for transactions
  private _transactions = signal<ITransaction[]>([]);
  transactions = this._transactions.asReadonly();

  // Loading state
  loading = signal(false);

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  /**
   * Loads transactions from the service
   */
  private loadTransactions(): void {
    this.loading.set(true);

    this.transactionsService
      .loadTransactions()
      .pipe(first())
      .subscribe({
        next: (paginatedTransactions) => this._transactions.set(paginatedTransactions.items),
        error: (error) => console.error('Error loading transactions:', error),
        complete: () => this.loading.set(false)
      });
  }

  // Dialog methods
  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.editingTransaction = null; // Reset editing state
  }

  // Handle edit transaction
  handleEditTransaction(transaction: ITransaction): void {
    this.editingTransaction = transaction;
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

    if (this.editingTransaction) {
      // Update existing transaction
      this.transactionsService
        .updateTransaction(this.editingTransaction._id!, transactionToSave)
        .pipe(first())
        .subscribe({
          next: () => this.handleTransactionSuccess(),
          error: (error) => console.error('Error updating transaction:', error)
        });
    } else {
      // Create new transaction
      this.transactionsService
        .createTransaction(transactionToSave)
        .pipe(first())
        .subscribe({
          next: () => this.handleTransactionSuccess(),
          error: (error) => console.error('Error creating transaction:', error)
        });
    }
  }

  // Handle transaction success
  handleTransactionSuccess(): void {
    this.loadTransactions();
    this.closeDialog();
  }

  // Handle delete transaction
  handleDeleteTransaction(transaction: ITransaction): void {
    this.transactionToDelete = transaction;
    this.isDeleteDialogOpen = true;
  }

  // Handle delete confirmation
  handleDeleteConfirm(transaction: ITransaction): void {
    this.transactionsService
      .deleteTransaction(transaction._id!)
      .pipe(first())
      .subscribe({
        next: () => this.handleDeleteSuccess(),
        error: (error) => console.error('Error deleting transaction:', error)
      });
  }

  // Handle delete cancellation
  handleDeleteCancel(): void {
    this.closeDeleteDialog();
  }

  // Handle delete success
  handleDeleteSuccess(): void {
    this.closeDeleteDialog();
  }

  // Close delete dialog
  closeDeleteDialog(): void {
    this.isDeleteDialogOpen = false;
    this.transactionToDelete = null;
  }
}
