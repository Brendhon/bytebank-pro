import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SettingsPageComponent } from './pages/settings/settings.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, SettingsPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'settings';
}
