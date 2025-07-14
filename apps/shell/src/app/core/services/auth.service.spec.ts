import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { IUser, StoredUser } from '@bytebank-pro/types';
import { AuthPayload, LoginInput, RegisterInput } from '../models/auth.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let apolloSpy: jasmine.SpyObj<Apollo>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockStoredUser: StoredUser = {
    _id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    token: 'mock-token-123'
  };

  const mockIUser: IUser = {
    _id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    acceptPrivacy: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockAuthPayload: AuthPayload = {
    token: 'mock-token-123',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'test@example.com'
    }
  };

  beforeEach(() => {
    // Create Apollo mock
    apolloSpy = jasmine.createSpyObj('Apollo', ['mutate', 'query'], {
      client: {
        resetStore: jasmine.createSpy('resetStore')
      }
    });

    // Create Router mock
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock localStorage functions
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    spyOn(window.localStorage, 'setItem');
    spyOn(window.localStorage, 'removeItem');

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Apollo, useValue: apolloSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Properties', () => {
    it('should return null user initially', () => {
      expect(service.user).toBeNull();
    });

    it('should return false for isLoggedIn initially', () => {
      expect(service.isLoggedIn).toBeFalse();
    });

    it('should return empty string for token initially', () => {
      expect(service.token).toBe('');
    });

    it('should return current user when logged in', () => {
      // Simulate logged in user
      (service as any)._currentUser.next(mockStoredUser);

      expect(service.user).toEqual(mockStoredUser);
    });

    it('should return true for isLoggedIn when user exists', () => {
      // Simulate logged in user
      (service as any)._currentUser.next(mockStoredUser);

      expect(service.isLoggedIn).toBeTrue();
    });

    it('should return token when user exists', () => {
      // Simulate logged in user
      (service as any)._currentUser.next(mockStoredUser);

      expect(service.token).toBe('mock-token-123');
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', (done) => {
      apolloSpy.mutate.and.returnValue(of({ data: { login: mockAuthPayload } }));

      service.login('test@example.com', 'password123').subscribe({
        next: (result) => {
          expect(result).toEqual(mockStoredUser);

          expect(apolloSpy.mutate).toHaveBeenCalledWith({
            mutation: jasmine.any(Object),
            variables: {
              input: { email: 'test@example.com', password: 'password123' }
            }
          });
          done();
        },
        error: done.fail
      });
    });

    it('should throw error when email is missing', (done) => {
      service.login('', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Email and password are required');
          done();
        }
      });
    });

    it('should throw error when password is missing', (done) => {
      service.login('test@example.com', '').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Email and password are required');
          done();
        }
      });
    });

    it('should throw error when authentication fails', (done) => {
      apolloSpy.mutate.and.returnValue(of({ data: { login: null } }));

      service.login('test@example.com', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Authentication failed');
          done();
        }
      });
    });

    it('should handle Apollo mutation error', (done) => {
      const errorMessage = 'Network error';
      apolloSpy.mutate.and.returnValue(throwError(() => new Error(errorMessage)));

      service.login('test@example.com', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Network error');
          done();
        }
      });
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', (done) => {
      apolloSpy.mutate.and.returnValue(of({ data: { register: mockAuthPayload } }));

      service.register('Test User', 'test@example.com', 'password123').subscribe({
        next: (result) => {
          expect(result).toEqual(mockStoredUser);

          expect(apolloSpy.mutate).toHaveBeenCalledWith({
            mutation: jasmine.any(Object),
            variables: {
              input: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                acceptPrivacy: true
              }
            }
          });
          done();
        },
        error: done.fail
      });
    });

    it('should throw error when name is missing', (done) => {
      service.register('', 'test@example.com', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Name, email, and password are required');
          done();
        }
      });
    });

    it('should throw error when email is missing', (done) => {
      service.register('Test User', '', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Name, email, and password are required');
          done();
        }
      });
    });

    it('should throw error when password is missing', (done) => {
      service.register('Test User', 'test@example.com', '').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Name, email, and password are required');
          done();
        }
      });
    });

    it('should throw error when registration fails', (done) => {
      apolloSpy.mutate.and.returnValue(of({ data: { register: null } }));

      service.register('Test User', 'test@example.com', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Registration failed');
          done();
        }
      });
    });

    it('should handle Apollo mutation error', (done) => {
      const errorMessage = 'Registration error';
      apolloSpy.mutate.and.returnValue(throwError(() => new Error(errorMessage)));

      service.register('Test User', 'test@example.com', 'password123').subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error.message).toBe('Registration error');
          done();
        }
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch current user successfully', (done) => {
      apolloSpy.query.and.returnValue(
        of({
          data: { me: mockIUser },
          loading: false,
          networkStatus: 7,
          error: undefined
        })
      );

      service.getCurrentUser().subscribe({
        next: (result) => {
          expect(result).toEqual(mockIUser);

          expect(apolloSpy.query).toHaveBeenCalledWith({
            query: jasmine.any(Object),
            fetchPolicy: 'network-only'
          });
          done();
        },
        error: done.fail
      });
    });

    it('should return null when no user data', (done) => {
      apolloSpy.query.and.returnValue(
        of({
          data: { me: null },
          loading: false,
          networkStatus: 7,
          error: undefined
        })
      );

      service.getCurrentUser().subscribe({
        next: (result) => {
          expect(result).toBeNull();
          done();
        },
        error: done.fail
      });
    });

    it('should handle authentication error and logout', (done) => {
      const authError = new Error('not authenticated');
      apolloSpy.query.and.returnValue(throwError(() => authError));
      spyOn(service, 'logout');

      service.getCurrentUser().subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error).toBe(authError);

          expect(service.logout).toHaveBeenCalled();
          done();
        }
      });
    });

    it('should handle unauthorized error and logout', (done) => {
      const authError = new Error('unauthorized');
      apolloSpy.query.and.returnValue(throwError(() => authError));
      spyOn(service, 'logout');

      service.getCurrentUser().subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error).toBe(authError);

          expect(service.logout).toHaveBeenCalled();
          done();
        }
      });
    });

    it('should handle other errors without logout', (done) => {
      const otherError = new Error('Network error');
      apolloSpy.query.and.returnValue(throwError(() => otherError));
      spyOn(service, 'logout');

      service.getCurrentUser().subscribe({
        next: () => done.fail('Should have thrown error'),
        error: (error) => {
          expect(error).toBe(otherError);

          expect(service.logout).not.toHaveBeenCalled();
          done();
        }
      });
    });
  });

  describe('logout', () => {
    it('should clear user data and redirect', () => {
      // Set up a logged in user
      (service as any)._currentUser.next(mockStoredUser);

      service.logout();

      expect(service.user).toBeNull();

      expect(service.isLoggedIn).toBeFalse();

      expect(service.token).toBe('');

      expect(apolloSpy.client.resetStore).toHaveBeenCalled();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('updateStoredUser', () => {
    it('should update stored user data', () => {
      const updatedUser: StoredUser = {
        _id: 'user456',
        name: 'Updated User',
        email: 'updated@example.com',
        token: 'new-token-456'
      };

      service.updateStoredUser(updatedUser);

      expect(service.user).toEqual(updatedUser);

      expect(service.isLoggedIn).toBeTrue();

      expect(service.token).toBe('new-token-456');
    });
  });

  describe('validateUser', () => {
    it('should validate user and update stored user', fakeAsync(() => {
      apolloSpy.query.and.returnValue(
        of({
          data: { me: mockIUser },
          loading: false,
          networkStatus: 7,
          error: undefined
        })
      );
      spyOn(service as any, 'setUserFromIUser');

      service.validateUser();
      tick();

      expect(apolloSpy.query).toHaveBeenCalled();

      expect((service as any).setUserFromIUser).toHaveBeenCalledWith(mockIUser);
    }));

    it('should logout when validation fails', fakeAsync(() => {
      apolloSpy.query.and.returnValue(throwError(() => new Error('Validation failed')));
      spyOn(service, 'logout');

      service.validateUser();
      tick();

      expect(apolloSpy.query).toHaveBeenCalled();

      expect(service.logout).toHaveBeenCalled();
    }));

    it('should logout when no user data returned', fakeAsync(() => {
      apolloSpy.query.and.returnValue(
        of({
          data: { me: null },
          loading: false,
          networkStatus: 7,
          error: undefined
        })
      );
      spyOn(service, 'logout');

      service.validateUser();
      tick();

      expect(apolloSpy.query).toHaveBeenCalled();

      expect(service.logout).toHaveBeenCalled();
    }));
  });

  describe('Observable', () => {
    it('should emit current user changes', (done) => {
      service.currentUser$.pipe(skip(1), take(1)).subscribe({
        next: (user) => {
          expect(user).toEqual(mockStoredUser);
          done();
        }
      });

      // Simulate user login
      (service as any)._currentUser.next(mockStoredUser);
    });

    it('should emit null when user logs out', (done) => {
      service.currentUser$.pipe(skip(1), take(1)).subscribe({
        next: (user) => {
          expect(user).toBeNull();
          done();
        }
      });

      // Simulate user logout
      (service as any)._currentUser.next(null);
    });
  });
});
