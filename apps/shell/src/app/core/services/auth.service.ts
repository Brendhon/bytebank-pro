import { Injectable, inject } from '@angular/core';
import { IUser } from '@bytebank-pro/types';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LOGIN_MUTATION, ME_QUERY, REGISTER_MUTATION } from '../graphql/auth.queries';
import { AuthPayload, LoginInput, RegisterInput } from '../models/auth.model';
import { StoredUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'bytebank_auth_token';
  private readonly USER_KEY = 'bytebank_user';

  private apollo = inject(Apollo);
  private router = inject(Router);

  // User state management with BehaviorSubject following project guidelines
  private _currentUser = new BehaviorSubject<StoredUser | null>(null);
  readonly currentUser$ = this._currentUser.asObservable(); // Public Observable

  constructor() {
    this.loadUserFromStorage();
  }

  /**
   * Gets the current user value
   */
  get user(): StoredUser | null {
    return this._currentUser.getValue();
  }

  /**
   * Checks if a user is logged in
   */
  get isLoggedIn(): boolean {
    return !!this._currentUser.getValue();
  }

  /**
   * Gets the current authentication token
   */
  get token(): string {
    return this._currentUser.getValue()?.token || '';
  }

  /**
   * Logs in the user using the GraphQL API
   * @returns Observable that emits StoredUser on success
   */
  login(email: string, password: string): Observable<StoredUser | null> {
    if (!email || !password) {
      return throwError(() => new Error('Email and password are required'));
    }

    // Create login input
    const loginInput: LoginInput = { email, password };

    return this.apollo
      .mutate<{ login: AuthPayload }>({
        mutation: LOGIN_MUTATION,
        variables: {
          input: loginInput
        }
      })
      .pipe(
        map((result) => {
          const authPayload = result.data?.login;

          if (!authPayload) {
            throw new Error('Authentication failed');
          }

          const storedUser: StoredUser = {
            _id: authPayload.user._id,
            name: authPayload.user.name,
            email: authPayload.user.email,
            token: authPayload.token
          };

          this.setUser(storedUser);
          return storedUser;
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          return throwError(() => new Error(error.message || 'Authentication error'));
        })
      );
  }

  /**
   * Registers a new user using the GraphQL API
   * @returns Observable that emits StoredUser on success
   */
  register(name: string, email: string, password: string): Observable<StoredUser | null> {
    if (!name || !email || !password) {
      return throwError(() => new Error('Name, email, and password are required'));
    }

    // Create register input
    const registerInput: RegisterInput = {
      name,
      email,
      password,
      acceptPrivacy: true
    };

    return this.apollo
      .mutate<{ register: AuthPayload }>({
        mutation: REGISTER_MUTATION,
        variables: {
          input: registerInput
        }
      })
      .pipe(
        map((result) => {
          const authPayload = result.data?.register;

          if (!authPayload) {
            throw new Error('Registration failed');
          }

          const storedUser: StoredUser = {
            _id: authPayload.user._id,
            name: authPayload.user.name,
            email: authPayload.user.email,
            token: authPayload.token
          };

          this.setUser(storedUser);
          return storedUser;
        }),
        catchError((error) => {
          console.error('Error during registration:', error);
          return throwError(() => new Error(error.message || 'Registration error'));
        })
      );
  }

  /**
   * Fetches the current user's information from the API
   * @returns Observable that emits User on success or null if not authenticated
   */
  getCurrentUser(): Observable<IUser | null> {
    return this.apollo
      .query<{ me: IUser }>({
        query: ME_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map((result) => result.data?.me || null),
        catchError((error) => {
          console.error('Error fetching current user:', error);
          // If authentication error, log out
          if (
            error.message.includes('not authenticated') ||
            error.message.includes('unauthorized')
          ) {
            this.logout();
          }
          return throwError(() => error);
        })
      );
  }

  /**
   * Ends the user session
   */
  logout(): void {
    console.log('Logout successful');
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.next(null);

    // Clear Apollo cache
    this.apollo.client.resetStore();

    // Redirect to home page
    this.router.navigate(['/home']);
  }

  /**
   * Stores user data in localStorage and updates the BehaviorSubject
   */
  private setUser(user: StoredUser): void {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._currentUser.next(user);
  }

  /**
   * Loads the user from localStorage
   */
  private loadUserFromStorage(): void {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    const storedUser = localStorage.getItem(this.USER_KEY);

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser) as StoredUser;
        this._currentUser.next(user);
      } catch (error) {
        console.error('Error loading user from localStorage', error);
        this.logout();
      }
    }
  }
}
