import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: '**', redirectTo: '' }
];
