# 📋 Guard Creation Best Practices Guide for ByteBank Pro

This guide defines the guidelines and best practices for guard development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### 🛡️ Guards

Guards should be placed in a `guards` folder within the module or feature they protect.

- **Standard Structure:**
  ```
  src/
  └── feature-name/
    └── guards/
      ├── guard-name.guard.ts
      └── guard-name.guard.spec.ts // Create a simple test file with a basic test
  ```
- **Naming Conventions:**
  - **Folder**: `kebab-case` (e.g., `auth`)
  - **File**: `kebab-case.guard.{ext}` (e.g., `auth.guard.ts`)
  - **Class/Function**: `CanActivateFn`, `CanMatchFn`, etc. (e.g., `AuthGuard`)

## 🏗️ Angular Modern Best Practices (Angular 20) for Guards

Always use the latest officially recommended Angular APIs and approaches to ensure performance, security, and maintainability.

1.  **Code Comments**: All comments (inline, JSDoc, annotations) must be written in **English**.

2.  **Dependency Injection with `inject()` (Angular 14+)**: For cleaner and more testable code, use `inject()` instead of constructors.

    ```typescript
    import { inject } from '@angular/core';
    import { AuthService } from '../services/auth.service';

    export const authGuard: CanActivateFn = (route, state) => {
      const authService = inject(AuthService);
      // ...
    };
    ```

3.  **Function-Based Guards (Angular 15+)**: Prefer functions for Guards (`CanActivateFn`, `CanMatchFn`, `CanDeactivateFn`, `CanLoadFn`, `CanActivateChildFn`) for more concise and "treeshakeable" code.

    ```typescript
    // auth.guard.ts
    import { CanActivateFn, Router } from '@angular/router';
    import { inject } from '@angular/core';
    import { AuthService } from './auth.service';

    export const authGuard: CanActivateFn = (route, state) => {
      const authService = inject(AuthService);
      const router = inject(Router);

      if (authService.isAuthenticated()) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    };
    ```

4.  **Clear and Concise Logic**: Keep the guard logic as simple and direct as possible. Guards should focus on a single responsibility (e.g., authentication, authorization).

5.  **Return Values**: Guards can return:

    - `boolean`: `true` to allow navigation, `false` to block it.
    - `UrlTree`: To redirect the user to another URL.
    - `Observable<boolean | UrlTree>` or `Promise<boolean | UrlTree>`: For asynchronous logic (e.g., checking authentication in a service).

6.  **Error Management**: Although guards generally do not directly handle API errors (this is the responsibility of services and interceptors), they must be robust enough to handle unexpected states of the data they query.

## 📚 Modern Example

### Authentication Guard (Auth Guard)

```typescript
// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to the login page if not authenticated
    return router.createUrlTree(['/login']);
  }
};
```
