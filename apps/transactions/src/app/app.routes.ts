import { Routes } from '@angular/router';
import { TransactionsPageComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  { path: '', component: TransactionsPageComponent },
  { path: '**', redirectTo: '' }
];
