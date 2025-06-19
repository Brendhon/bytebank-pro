import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MainLayoutComponent } from './layout/main-layout.component';
import { loadMfe, MfeNames } from './mfe-loader/mfe-registry';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => loadMfe(MfeNames.DASHBOARD).then(m => m.ROUTES)
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
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
