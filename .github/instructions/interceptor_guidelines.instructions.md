---
applyTo: '**/*.interceptor.ts'
---

# 📋 Interceptor Creation Best Practices Guide for ByteBank Pro

This guide defines the guidelines and best practices for interceptor development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### ⚙️ Interceptors

Interceptors should be placed in an `interceptors` folder at the root of your feature or in the `core` folder if they are for global use.

- **Standard Structure:**
  ```
  src/
  └── core/
    └── interceptors/
      ├── interceptor-name.interceptor.ts
      └── interceptor-name.interceptor.spec.ts // Create a simple test file with a basic test
  ```
- **Naming Conventions:**
  - **Folder**: `kebab-case` (e.g., `auth`)
  - **File**: `kebab-case.interceptor.{ext}` (e.g., `auth.interceptor.ts`)
  - **Class/Function**: `HttpInterceptorFn` (e.g., `AuthInterceptor`)

## 🏗️ Angular Modern Best Practices (Angular 20) for Interceptors

Always use the latest officially recommended Angular APIs and approaches to ensure performance, security, and maintainability.

1.  **Code Comments**: All comments (inline, JSDoc, annotations) must be written in **English**.

2.  **Dependency Injection with `inject()` (Angular 14+)**: For cleaner and more testable code, use `inject()` instead of constructors.

    ```typescript
    import { inject } from '@angular/core';
    import { AuthService } from '../services/auth.service';

    export const authInterceptor: HttpInterceptorFn = (req, next) => {
      const authService = inject(AuthService);
      // ...
    };
    ```

3.  **Function-Based Interceptors (Angular 15+)**: Prefer functions for Interceptors (`HttpInterceptorFn`) for more concise and "treeshakeable" code. This is the recommended approach from Angular 15 onwards.

    ```typescript
    // auth.interceptor.ts
    import { HttpInterceptorFn } from '@angular/common/http';
    import { inject } from '@angular/core';
    import { AuthService } from '../services/auth.service';

    export const authInterceptor: HttpInterceptorFn = (req, next) => {
      const authService = inject(AuthService);
      const authToken = authService.getAuthToken(); // Example: Get authentication token

      // Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Pass the modified request to the next handler
      return next(authReq);
    };
    ```

4.  **Request Immutability**: Requests (`HttpRequest`) are immutable. To modify them (e.g., add headers, change URL), you must clone them using `req.clone()`.

    ```typescript
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Custom-Header': 'Value'
      },
      url: 'new-url'
    });
    return next(modifiedReq);
    ```

5.  **Response Handling**: Interceptors can also intercept and modify responses, or handle response errors using RxJS operators.

    ```typescript
    // error.interceptor.ts
    import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
    import { catchError } from 'rxjs/operators';
    import { throwError } from 'rxjs';
    import { inject } from '@angular/core';
    import { NotificationService } from '../services/notification.service'; // Example service

    export const errorInterceptor: HttpInterceptorFn = (req, next) => {
      const notificationService = inject(NotificationService);

      return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Logic for 401 (Unauthorized)
            notificationService.showError('Session expired. Please log in again.');
            // Redirect to login, if necessary
          } else if (error.status === 404) {
            notificationService.showError('Resource not found.');
          } else {
            notificationService.showError('An unexpected error occurred. Please try again.');
          }
          return throwError(() => error); // Propagate the error to the original subscriber
        })
      );
    };
    ```

6.  **Interceptor Order**: The order in which interceptors are provided in your `app.config.ts` (or `app.module.ts` in non-standalone projects) is crucial. Interceptors are executed in the order they are registered.

    ```typescript
    // app.config.ts (Interceptor registration example)
    import { ApplicationConfig } from '@angular/core';
    import { provideRouter } from '@angular/router';
    import { provideHttpClient, withInterceptors } from '@angular/common/http';

    import { routes } from './app.routes';
    import { authInterceptor } from './core/interceptors/auth.interceptor';
    import { errorInterceptor } from './core/interceptors/error.interceptor';
    import { loadingInterceptor } from './core/interceptors/loading.interceptor'; // Example

    export const appConfig: ApplicationConfig = {
      providers: [
        provideRouter(routes),
        provideHttpClient(
          withInterceptors([
            authInterceptor, // Executes first (adds token)
            loadingInterceptor, // Executes second (shows/hides loading)
            errorInterceptor // Executes last (handles errors)
          ])
        )
      ]
    };
    ```

7.  **Single Responsibility Principle (SRP)**: Each interceptor should have a single, well-defined responsibility (e.g., one for authentication, one for error handling, one for loading indicators).

## 📚 Modern Examples

### Authentication Interceptor (Auth Interceptor)

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthToken(); // Method in AuthService to get the token

  // If there is a token, add it to the request header
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Otherwise, just pass the original request
  return next(req);
};
```

### Error Interceptor

```typescript
// error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service'; // Service to display notifications

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Backend returned error
        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request.';
            if (error.error?.message) {
              // If the API returns a specific message
              errorMessage = error.error.message;
            }
            break;
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            router.navigate(['/login']); // Redirect to login screen
            break;
          case 403:
            errorMessage = 'Access forbidden.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          default:
            if (error.message) {
              errorMessage = `Server error: ${error.message}`;
            }
            break;
        }
      }

      console.error(error); // Log the full error for debugging
      notificationService.showError(errorMessage); // Display a friendly notification to the user

      return throwError(() => error); // Propagate the error to the original subscriber
    })
  );
};
```
