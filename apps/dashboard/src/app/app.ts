import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'dashboard';
}
