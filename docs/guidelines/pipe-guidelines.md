# 📋 Pipe Creation Best Practices Guide for ByteBank Pro

This guide defines the guidelines and best practices for pipe development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### ⚙️ Pipes

Pipes should be placed in a `pipes` folder within the module or feature they serve.

- **Standard Structure:**
  ```
  src/
  └── feature-name/
    └── pipes/
      ├── pipe-name.pipe.ts
      └── pipe-name.pipe.spec.ts // Create a simple test file with a basic test
  ```
- **Naming Conventions:**
  - **Folder**: `kebab-case` (e.g., `currency-format`)
  - **File**: `kebab-case.pipe.{ext}` (e.g., `currency-format.pipe.ts`)
  - **Class**: `PascalCasePipe` (e.g., `CurrencyFormatPipe`)
  - **Pipe Name (in `@Pipe` decorator)**: `camelCase` (e.g., `currencyFormat`)

## 🏗️ Angular Modern Best Practices (Angular 20) for Pipes

Always use the latest officially recommended Angular APIs and approaches to ensure performance, security, and maintainability.

1.  **Code Comments**: All comments (inline, JSDoc, annotations) must be written in **English**.
2.  **Pure Pipes by Default**: By default, pipes are "pure" (`pure: true`). This means Angular will only re-execute the pipe if the pipe's input changes. For most cases, keep this setting for performance optimization.
    ```typescript
    @Pipe({
      name: 'myPurePipe',
      standalone: true, // Always use standalone
      pure: true // Default, but can be explicit
    })
    export class MyPurePipe implements PipeTransform {
      transform(value: any): any {
        // Pipe logic
        return value;
      }
    }
    ```
3.  **Impure Pipes (Use with Caution)**: If the pipe needs to be re-executed on every change detection cycle (e.g., for mutable data or data that depends on an external state that is not a direct input), set `pure: false`. **Use impure pipes with extreme caution**, as they can negatively impact performance.
    ```typescript
    @Pipe({
      name: 'myImpurePipe',
      standalone: true,
      pure: false // Re-executes on every change detection cycle
    })
    export class MyImpurePipe implements PipeTransform {
      transform(value: any): any {
        // Pipe logic that may depend on something external or mutation
        return Math.random(); // Example of something that changes every cycle
      }
    }
    ```
4.  **Standalone Pipes**: **Always use standalone pipes** to eliminate unnecessary `NgModules`, reduce boilerplate, and improve tree-shaking.
    ```typescript
    @Pipe({
      name: 'myPipe',
      standalone: true
    })
    export class MyPipe implements PipeTransform {
      /* ... */
    }
    ```
5.  **Strong Typing**: Always use strong typing for pipe inputs and outputs.
    ```typescript
    transform(value: string, maxLength: number): string { /* ... */ }
    ```
6.  **Simplicity and Reusability**: Pipes should be small, focused on a single transformation, and highly reusable. If the logic is complex, consider moving part of it to a service.
7.  **Performance**: Avoid computationally expensive operations within the pipe, especially if it's an impure pipe. If unavoidable, consider memoization.
8.  **Handling Null/Undefined Values**: Always add checks for `null` or `undefined` in pipe inputs to prevent errors.
    ```typescript
    transform(value: string | null | undefined): string {
      if (value === null || value === undefined) {
        return ''; // Or an appropriate default value
      }
      // ...
    }
    ```

## 📚 Modern Examples

### Currency Format Pipe

```typescript
// currency-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    currencyCode: string = 'BRL',
    display: string = 'symbol'
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Use Intl.NumberFormat for robust and internationalized formatting
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: display as 'symbol' | 'code' | 'name' // Type assertion for display
    }).format(value);
  }
}
```

**Usage Example in Template:**

```html
<p>{{ 1234.56 | currencyFormat }}</p>

<p>{{ 1234.56 | currencyFormat:'USD':'code' }}</p>
```

### Truncate Text Pipe

```typescript
// truncate-text.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    maxLength: number = 50,
    ellipsis: string = '...'
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (value.length <= maxLength) {
      return value;
    }

    return value.substring(0, maxLength) + ellipsis;
  }
}
```

**Usage Example in Template:**

```html
<p>{{ 'This is a long text that will be truncated.' | truncateText:30 }}</p>

<p>{{ 'This is a long text that will be truncated.' | truncateText:30:' ##' }}</p>
```
