import { Routes } from '@angular/router';
import { AuthGuard } from '@/core/guards';
import { LayoutComponent } from '@/layout/layout.component';
import { loadMfe } from '@/mfe-loader/mfe-registry';
import { MfeNames } from '@bytebank-pro/types';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@/pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
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
