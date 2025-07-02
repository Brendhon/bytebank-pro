import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';

/**
 * Auth guard to protect routes that require user authentication.
 * Redirects unauthenticated users to the login page while preserving the intended destination.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (authService.isLoggedIn) return true;

  // Redirect to home and remember the current URL for redirection after home
  return router.createUrlTree(['/home'], { queryParams: { returnUrl: state.url } });
};
