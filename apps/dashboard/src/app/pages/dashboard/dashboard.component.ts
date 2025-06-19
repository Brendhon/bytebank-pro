import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardPageComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
    // Aqui virá a lógica para carregar os dados do dashboard
    console.log('Dashboard page initialized');
  }
}
