import { LayoutComponent } from '@/layout/layout.component';
import { loadMfe } from '@/mfe-loader/mfe-registry';
import { Routes } from '@angular/router';
import { MfeNames } from '@bytebank-pro/types';
import { authGuard } from './core/guards';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('@/pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => loadMfe(MfeNames.DASHBOARD).then((m) => m.App)
      },
      {
        path: 'transactions',
        loadComponent: () => loadMfe(MfeNames.TRANSACTIONS).then((m) => m.App)
      },
      {
        path: 'settings',
        loadComponent: () => loadMfe(MfeNames.SETTINGS).then((m) => m.App)
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
    loadComponent: () =>
      import('@/pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
