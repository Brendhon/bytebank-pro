import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/core/services';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // Redirect to login and remember the current URL for redirection after login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });

  return false;
};
