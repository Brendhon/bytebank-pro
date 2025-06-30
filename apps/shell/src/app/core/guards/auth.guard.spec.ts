import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '@/core/services';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: { createUrlTree: jasmine.createSpy('createUrlTree') } }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should create the guard', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true for an authenticated user', () => {
    // Arrange
    Object.defineProperty(authService, 'isLoggedIn', {
      get: () => true
    });

    // Act
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    // Assert

    expect(result).toBe(true);
  });

  it('should redirect to login for an unauthenticated user', () => {
    // Arrange
    Object.defineProperty(authService, 'isLoggedIn', {
      get: () => false
    });
    (router.createUrlTree as jasmine.Spy).and.returnValue(new UrlTree());

    // Act
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url: '/protected-route' } as RouterStateSnapshot)
    );

    // Assert
    expect(router.createUrlTree).toHaveBeenCalledWith(['/home'], {
      queryParams: { returnUrl: '/protected-route' }
    });

    expect(result).toBeInstanceOf(UrlTree);
  });
});
