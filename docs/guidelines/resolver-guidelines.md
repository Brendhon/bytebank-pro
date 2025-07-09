# 📋 Resolver Creation Best Practices Guide for ByteBank Pro

This guide defines the guidelines and best practices for resolver development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### 🔄 Resolvers

Resolvers should be placed in a `resolvers` folder within the module or feature where they are used.

- **Standard Structure:**
  ```
  src/
  └── feature-name/
    └── resolvers/
      ├── resolver-name.resolver.ts
      └── resolver-name.resolver.spec.ts // Create a simple test file with a basic test
  ```
- **Naming Conventions:**
  - **Folder**: `kebab-case` (e.g., `user-profile`)
  - **File**: `kebab-case.resolver.{ext}` (e.g., `user-data.resolver.ts`)
  - **Class/Function**: `ResolveFn` (e.g., `UserDataResolver`)

## 🏗️ Angular Modern Best Practices (Angular 20) for Resolvers

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

3.  **Function-Based Resolvers (Angular 15+)**: Prefer functions for Resolvers (`ResolveFn`) for more concise and "treeshakeable" code.

    ```typescript
    // user-data.resolver.ts
    import { ResolveFn } from '@angular/router';
    import { inject } from '@angular/core';
    import { UserService } from '../services/user.service';
    import { User } from '../models/user.model';
    import { Observable } from 'rxjs';

    export const userDataResolver: ResolveFn<User> = (route, state): Observable<User> => {
      const userService = inject(UserService);
      const userId = route.paramMap.get('id');
      return userService.getUser(userId!);
    };
    ```

4.  **Error Management**: Implement robust error handling strategies in resolvers, especially for HTTP calls, using RxJS operators like `catchError` and `retry`.

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

5.  **Strong Typing**: Always use strong typing (`interface`, `type`) for data returned by APIs or manipulated in resolvers.

    ```typescript
    export interface Product {
      id: string;
      name: string;
      price: number;
    }
    // ...
    getProduct(id: string): Observable<Product> { /* ... */ }
    ```

## 📚 Modern Example

### User Data Resolver

```typescript
// user-data.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

export const userDataResolver: ResolveFn<User> = (route, state): Observable<User> => {
  const userService = inject(UserService);
  const userId = route.paramMap.get('id'); // Get ID from route

  if (!userId) {
    // Handle missing ID, perhaps redirect or throw an error
    throw new Error('User ID not provided in route parameters.');
  }

  return userService.getUser(userId);
};
```
