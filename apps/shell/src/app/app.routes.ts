import { Routes } from '@angular/router';
import { AuthGuard } from '@/core/guards';
import { LayoutComponent } from '@/layout/layout.component';
import { loadMfe } from '@/mfe-loader/mfe-registry';
import { MfeNames } from '@bytebank-pro/types';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: MfeNames.DASHBOARD,
        loadComponent: () => loadMfe(MfeNames.DASHBOARD).then(m => m.App)
      },
      {
        path: MfeNames.TRANSACTIONS,
        loadComponent: () => loadMfe(MfeNames.TRANSACTIONS).then(m => m.App)
      },
      {
        path: MfeNames.SETTINGS,
        loadComponent: () => loadMfe(MfeNames.SETTINGS).then(m => m.App)
      },
      {
        path: '',
        redirectTo: MfeNames.DASHBOARD,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('@/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
