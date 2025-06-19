import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>
      
      <div class="flex flex-1">
        <app-sidebar></app-sidebar>
        <main class="flex-1 bg-gray-100 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
})
export class MainLayoutComponent {}
