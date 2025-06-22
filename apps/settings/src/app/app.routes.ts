import { Routes } from '@angular/router';
import { SettingsPageComponent } from '@/pages/settings/settings.component';

export const routes: Routes = [
  { path: '', component: SettingsPageComponent },
  { path: '**', redirectTo: '' }
];
