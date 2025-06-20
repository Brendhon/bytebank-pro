import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { loadMfe, MfeNames } from './mfe-loader/mfe-registry';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => loadMfe(MfeNames.DASHBOARD).then(m => m.App)
      },
      {
        path: 'transactions',
        loadChildren: () => loadMfe(MfeNames.TRANSACTIONS).then(m => m.ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () => loadMfe(MfeNames.SETTINGS).then(m => m.ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
