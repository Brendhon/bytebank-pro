import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  templateUrl: './transactions.component.html',
})
export class TransactionsPageComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
    // Aqui virá a lógica para carregar os dados do transactions
    console.log('transactions page initialized');
  }
}
