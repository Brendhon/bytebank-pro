import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@bytebank-pro/ui';
import { TransactionsTableComponent } from '@/components/transactions-table/transactions-table.component';
import { TransactionFormComponent } from '@/components/transaction-form/transaction-form.component';
import { ConfirmDeletionComponent } from '@/components/confirm-deletion/confirm-deletion.component';
import { ITransaction } from '@bytebank-pro/types';

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
export class TransactionsPageComponent {
  // Dialog state
  isDialogOpen = false;
  editingTransaction: ITransaction | null = null;

  // Delete confirmation dialog state
  isDeleteDialogOpen = false;
  transactionToDelete: ITransaction | null = null;

  // Signal for transactions
  private _transactions = signal<ITransaction[]>([
    {
      _id: '1',
      date: '2024-01-15',
      alias: 'Salário Janeiro',
      type: 'inflow',
      desc: 'deposit',
      value: 5000.0
    },
    {
      _id: '2',
      date: '2024-01-16',
      alias: 'Supermercado',
      type: 'outflow',
      desc: 'payment',
      value: 350.5
    },
    {
      _id: '3',
      date: '2024-01-17',
      alias: 'Transferência para poupança',
      type: 'outflow',
      desc: 'transfer',
      value: 1000.0
    },
    {
      _id: '4',
      date: '2024-01-18',
      alias: 'Freelance',
      type: 'inflow',
      desc: 'deposit',
      value: 800.0
    },
    {
      _id: '5',
      date: '2024-01-19',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    },
    {
      _id: '6',
      date: '2024-01-20',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    },
    {
      _id: '7',
      date: '2024-01-21',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    },
    {
      _id: '8',
      date: '2024-01-22',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    },
    {
      _id: '9',
      date: '2024-01-23',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    },
    {
      _id: '10',
      date: '2024-01-24',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    },
    {
      _id: '11',
      date: '2024-01-25',
      alias: 'Academia',
      type: 'outflow',
      desc: 'payment',
      value: 89.9
    }
  ]);

  // Public readonly signal for template
  transactions = this._transactions.asReadonly();

  constructor() {}

  // Dialog methods
  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.editingTransaction = null; // Reset editing state
  }

  // Transaction methods
  saveTransaction(): void {
    // Aqui virá a lógica para salvar a transação
    console.log('Saving transaction...');
    this.closeDialog();
  }

  // Handle edit transaction
  handleEditTransaction(transaction: ITransaction): void {
    console.log('Editing transaction:', transaction);
    this.editingTransaction = transaction;
    this.openDialog();
  }

  // Handle transaction submit (create or update)
  handleTransactionSubmit(transaction: ITransaction): void {
    console.log('Transaction submitted:', transaction);

    if (this.editingTransaction) {
      // Update existing transaction
      this._transactions.update((transactions) =>
        transactions.map((t) =>
          t._id === this.editingTransaction?._id
            ? { ...transaction, _id: this.editingTransaction!._id }
            : t
        )
      );
    } else {
      // Add new transaction
      const newTransaction = { ...transaction, _id: Date.now().toString() };
      this._transactions.update((transactions) => [newTransaction, ...transactions]);
    }

    this.closeDialog();
  }

  // Handle delete transaction
  handleDeleteTransaction(transaction: ITransaction): void {
    console.log('Opening delete confirmation for transaction:', transaction);
    this.transactionToDelete = transaction;
    this.isDeleteDialogOpen = true;
  }

  // Handle delete confirmation
  handleDeleteConfirm(transaction: ITransaction): void {
    console.log('Deleting transaction:', transaction);
    this._transactions.update((transactions) =>
      transactions.filter((t) => t._id !== transaction._id)
    );
    this.closeDeleteDialog();
  }

  // Handle delete cancellation
  handleDeleteCancel(): void {
    console.log('Delete cancelled');
    this.closeDeleteDialog();
  }

  // Close delete dialog
  closeDeleteDialog(): void {
    this.isDeleteDialogOpen = false;
    this.transactionToDelete = null;
  }

  // Additional methods for simulation
  addMockTransaction(): void {
    const mockTransaction: ITransaction = {
      _id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      alias: 'Transação Mock',
      type: Math.random() > 0.5 ? 'inflow' : 'outflow',
      desc: Math.random() > 0.5 ? 'deposit' : 'payment',
      value: Math.random() * 1000
    };

    this._transactions.update((transactions) => [mockTransaction, ...transactions]);
  }

  clearAllTransactions(): void {
    this._transactions.set([]);
  }
}
