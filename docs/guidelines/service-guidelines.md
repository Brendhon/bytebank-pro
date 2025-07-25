# 📋 Service Creation Best Practices Guide for ByteBank Pro

This guide defines the guidelines and best practices for service development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### 📦 Services

Services should be placed in a `services` folder within the module or feature they serve.

- **Standard Structure:**
  ```
  src/
  └── feature-name/
    └── services/
      ├── service-name.service.ts
      └── service-name.service.spec.ts // Create a simple test file with a basic test
  ```
- **Naming Conventions:**
  - **Folder**: `kebab-case` (e.g., `user-management`)
  - **File**: `kebab-case.service.{ext}` (e.g., `user.service.ts`)
  - **Class**: `PascalCaseService` (e.g., `UserService`)

## 🏗️ Angular Modern Best Practices (Angular 20) for Services

Always use the latest officially recommended Angular APIs and approaches to ensure performance, security, and maintainability.

1.  **Code Comments**: All comments (inline, JSDoc, annotations) must be written in **English**.
2.  **Dependency Injection with `inject()` (Angular 14+)**: For cleaner and more testable code, use `inject()` instead of constructors.

    ```typescript
    import { inject } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    export class UserService {
      private http = inject(HttpClient);

      // ...
    }
    ```

3.  **State Management in Services**:

    - **For complex and reactive states (asynchronous data, data collections, global/shared states)**: Use RxJS `Observables` (`BehaviorSubject`, `ReplaySubject`) to ensure a reactive and powerful data flow.

      ```typescript
      // user.service.ts
      import { Injectable, inject } from '@angular/core';
      import { HttpClient } from '@angular/common/http';
      import { BehaviorSubject, Observable, tap } from 'rxjs';
      import { User } from '../models/user.model';

      @Injectable({
        providedIn: 'root'
      })
      export class UserService {
        private http = inject(HttpClient);
        private _currentUser = new BehaviorSubject<User | null>(null);
        readonly currentUser$ = this._currentUser.asObservable(); // Expose as public Observable

        constructor() {
          // Load user on service initialization, if necessary
          this.loadCurrentUser();
        }

        private loadCurrentUser(): void {
          // Example: fetch logged-in user
          this.http
            .get<User>('/api/current-user')
            .pipe(tap((user) => this._currentUser.next(user)))
            .subscribe();
        }

        updateUser(user: User): Observable<User> {
          return this.http.put<User>(`/api/users/${user.id}`, user).pipe(
            tap((updatedUser) => this._currentUser.next(updatedUser)) // Update state
          );
        }
      }
      ```

    - **For simple, synchronous, or UI local states (e.g., counter, boolean flag in a small service)**: `Signals` can be used for conciseness and fine-grained reactivity. **Avoid using Signals for asynchronous data that requires complex RxJS transformations.**

      ```typescript
      // counter.service.ts
      import { Injectable, signal, computed } from '@angular/core';

      @Injectable({
        providedIn: 'root'
      })
      export class CounterService {
        count = signal(0);
        doubleCount = computed(() => this.count() * 2);

        increment(): void {
          this.count.update((value) => value + 1);
        }

        decrement(): void {
          this.count.update((value) => value - 1);
        }
      }
      ```

    - **State Choice Guidelines**:
      - **Use Observables**: When the data source is asynchronous (HTTP, WebSockets), for complex data transformations (map, filter, debounce), for chained operations, or to manage a continuous flow of events. They are ideal for most business data.
      - **Use Signals**: For simple synchronous data, local UI state that does not require RxJS orchestration, or when Angular Signals' granular reactivity is strictly necessary for performance optimization in specific scenarios. **Do not use them to replace the robust data flow management that RxJS offers.**

4.  **`providedIn: 'root'` Services**: Whenever possible, declare services with `providedIn: 'root'` to make them singletons and tree-shakable. This reduces the final application bundle size.
    ```typescript
    @Injectable({
      providedIn: 'root'
    })
    export class MyService {
      /* ... */
    }
    ```
5.  **Error Management**: Implement robust error handling strategies in services, especially for HTTP calls, using RxJS operators like `catchError` and `retry`.

    ```typescript
    import { catchError, retry } from 'rxjs/operators';
    import { throwError } from 'rxjs';

    // ...
    this.http
      .get<User>('/api/users/1')
      .pipe(
        retry(3), // Retry 3 times in case of error
        catchError((error) => {
          console.error('Error fetching user:', error);
          return throwError(() => new Error('Could not load user.'));
        })
      )
      .subscribe();
    ```

6.  **Subscription Cleanup**: In services with logic that creates subscriptions (e.g., WebSockets Observables, timers), use `takeUntilDestroyed` (if the service is injected in a context with `DestroyRef`) or manually manage subscriptions with `Subscription.add()` and `Subscription.unsubscribe()` in `ngOnDestroy`.

    ```typescript
    import { Injectable, DestroyRef, inject, OnDestroy } from '@angular/core';
    import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
    import { interval, Subscription } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class DataStreamService implements OnDestroy {
      private destroyRef = inject(DestroyRef);
      private subscription: Subscription | undefined;

      constructor() {
        // Example with takeUntilDestroyed (if the service has a lifecycle tied to a parent injector)
        interval(1000)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((value) => console.log('Data stream:', value));

        // Example of manual management for singletons or long-lived services
        // this.subscription = interval(1000).subscribe(value => console.log('Manual stream:', value));
      }

      ngOnDestroy(): void {
        // If using manual management, uncomment:
        // this.subscription?.unsubscribe();
      }
    }
    ```

7.  **Strong Typing**: Always use strong typing (`interface`, `type`) for data returned by APIs or manipulated in services.
    ```typescript
    export interface Product {
      id: string;
      name: string;
      price: number;
    }
    // ...
    getProduct(id: string): Observable<Product> { /* ... */ }
    ```
8.  **Reusability**: Create generic or abstract services when logic can be shared between different entities (e.g., `CrudService<T>`).
9.  **Single Responsibility Principle (SRP)**: Each service should have a single, well-defined responsibility. Avoid "do-it-all" services.
10. **Immutability**: Whenever possible, work with data immutably, especially when updating complex states in services.
11. **Documentation**: Use JSDoc to document public methods and properties of services, explaining the purpose, parameters, and returns.

```typescript
/**
 * Service for managing users.
 */
export class UserService {
  /**
   * Retrieves a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns Observable with the user data.
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
```

Comments should be clear, concise, and written in English.

## 📚 Modern Examples

### Authentication Service

```typescript
// auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, AuthCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null); // Using signal for logged-in user state

  readonly currentUser = this._currentUser.asReadonly(); // Expose as readonly signal

  constructor() {
    // Try to load user from localStorage on service start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }
  }

  login(credentials: AuthCredentials): Observable<User> {
    return this.http.post<User>('/api/auth/login', credentials).pipe(
      tap((user) => {
        this._currentUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('currentUser');
    // Call logout API if necessary
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }
}
```
