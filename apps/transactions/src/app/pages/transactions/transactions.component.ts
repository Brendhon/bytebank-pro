import { Component, OnInit } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@bytebank-pro/ui';
import { TransactionsTableComponent } from '@/components/transactions-table/transactions-table.component';
import { ITransaction } from '@bytebank-pro/types';

@Component({
  selector: 'bb-transactions',
  standalone: true,
  imports: [DialogComponent, ButtonComponent, TransactionsTableComponent],
  templateUrl: './transactions.component.html'
})
export class TransactionsPageComponent implements OnInit {
  // Dialog state
  isDialogOpen = false;

  // Mock data for transactions
  transactions: ITransaction[] = [
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
  ];

  constructor() {}

  ngOnInit(): void {
    // Aqui virá a lógica para carregar os dados do transactions
    console.log('transactions page initialized');
  }

  // Dialog methods
  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
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
    // Aqui virá a lógica para editar a transação
    // Por exemplo, abrir o dialog com os dados preenchidos
  }

  // Handle delete transaction
  handleDeleteTransaction(transaction: ITransaction): void {
    console.log('Deleting transaction:', transaction);
    // Aqui virá a lógica para deletar a transação
    // Por exemplo, mostrar um confirm dialog
  }
}
