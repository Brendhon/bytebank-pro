import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionsPageComponent } from './pages/transactions/transactions.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, TransactionsPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'transactions';
}
