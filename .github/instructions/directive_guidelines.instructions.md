---
applyTo: '**/*.directive.ts'
---

# 📋 Directive Creation Best Practices Guide for ByteBank Pro

This guide defines the guidelines and best practices for directive development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### ⚙️ Custom Directives

Directives should be placed in a `directives` folder within the module or feature they serve, or in a `shared/directives` folder if they are for broader use.

- **Standard Structure:**
  ```
  src/
  └── feature-name/
    └── directives/
      ├── directive-name.directive.ts
      └── directive-name.directive.spec.ts // Create a simple test file with a basic test
  ```
  Or, for shared directives:
  ```
  src/
  └── shared/
    └── directives/
      ├── directive-name.directive.ts
      └── directive-name.directive.spec.ts
  ```
- **Naming Conventions:**
  - **Folder**: `kebab-case` (e.g., `click-outside`)
  - **File**: `kebab-case.directive.{ext}` (e.g., `highlight.directive.ts`)
  - **Class**: `PascalCaseDirective` (e.g., `HighlightDirective`)
  - **Selector**: Prefer project-specific prefixes to avoid conflicts. Use `camelCase` for attribute selectors (e.g., `[bbHighlight]`) or `kebab-case` for element selectors (if the directive is used as its own element, which is less common for attribute directives). E.g., `bb-tooltip` or `[bbTooltip]`.

## 🏗️ Angular Modern Best Practices (Angular 20) for Directives

Always use the latest officially recommended Angular APIs and approaches to ensure performance, security, and maintainability.

1.  **Code Comments**: All comments (inline, JSDoc, annotations) must be written in **English**.
2.  **Standalone Directives**: **Always use standalone directives** to eliminate unnecessary `NgModules`, reduce boilerplate, and improve tree-shaking.
    ```typescript
    @Directive({
      selector: '[bbHighlight]', // Attribute selector is most common
      standalone: true
    })
    export class HighlightDirective {
      /* ... */
    }
    ```
3.  **Dependency Injection with `inject()` (Angular 14+)**: Use `inject()` to inject services and other dependencies in the constructor.

    ```typescript
    import { Directive, ElementRef, inject } from '@angular/core';

    @Directive({
      selector: '[bbHighlight]',
      standalone: true
    })
    export class HighlightDirective {
      private el = inject(ElementRef);
      // private renderer = inject(Renderer2); // If you need to manipulate the DOM more safely

      constructor() {
        this.el.nativeElement.style.backgroundColor = 'yellow';
      }
    }
    ```

4.  **Inputs (`@Input()`) and Outputs (`output()`)**: Use modern syntaxes for `Input` and `Output`.

    ```typescript
    import { Directive, Input, output, HostListener } from '@angular/core';

    @Directive({
      selector: '[bbClickOutside]',
      standalone: true
    })
    export class ClickOutsideDirective {
      // Modern Input
      @Input({ required: true }) bbClickOutsideEnabled!: boolean;

      // Modern Output
      clickOutside = output<MouseEvent>();

      @HostListener('document:click', ['$event'])
      onClick(event: MouseEvent): void {
        if (this.bbClickOutsideEnabled && !this.isInside(event.target as Node)) {
          this.clickOutside.emit(event);
        }
      }

      private isInside(target: Node): boolean {
        // Logic to check if the click was inside the directive's element
        return false; // Implement as needed
      }
    }
    ```

5.  **DOM Manipulation**:

    - **Prefer `Renderer2`**: To manipulate the DOM safely and platform-independently, use `Renderer2`.
    - **Use `ElementRef` with caution**: `ElementRef` allows direct access to the native DOM element, but should be used sparingly and only when `Renderer2` is not sufficient, as it can hinder testability and portability (e.g., server-side rendering, web workers).
    <!-- end list -->

    ```typescript
    import { Directive, ElementRef, Renderer2, Input, OnInit, inject } from '@angular/core';

    @Directive({
      selector: '[bbSetBackgroundColor]',
      standalone: true
    })
    export class SetBackgroundColorDirective implements OnInit {
      @Input() bbSetBackgroundColor: string = 'blue';

      private el = inject(ElementRef);
      private renderer = inject(Renderer2);

      ngOnInit(): void {
        this.renderer.setStyle(
          this.el.nativeElement,
          'background-color',
          this.bbSetBackgroundColor
        );
      }
    }
    ```

6.  **Host Bindings (`host` property or `@HostBinding`/`@HostListener`)**: Use the `host` property in the `@Directive` decorator to bind properties, attributes, or events directly to the directive's host element. This is more concise and "treeshakeable" than using `@HostBinding` and `@HostListener` individually, although these are still valid.

    ```typescript
    import { Directive, Input } from '@angular/core';

    @Directive({
      selector: '[bbToggleClass]',
      standalone: true,
      host: {
        '[class.active]': 'isActive', // Binds the 'active' class based on the 'isActive' property
        '(click)': 'onClick()' // Binds the 'click' event to the 'onClick' method
      }
    })
    export class ToggleClassDirective {
      @Input() isActive: boolean = false;

      onClick(): void {
        this.isActive = !this.isActive;
        console.log('Class toggled:', this.isActive);
      }
    }
    ```

7.  **Subscription Cleanup**: If your directive subscribes to Observables or sets up listeners that need to be cleaned up, use `takeUntilDestroyed(this.destroyRef)` (available via the injectable `DestroyRef`) for automatic lifecycle management.

    ```typescript
    import { Directive, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';
    import { fromEvent } from 'rxjs';
    import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

    @Directive({
      selector: '[bbTrackMouse]',
      standalone: true
    })
    export class TrackMouseDirective implements OnInit {
      private destroyRef = inject(DestroyRef);

      ngOnInit(): void {
        fromEvent<MouseEvent>(document, 'mousemove')
          .pipe(
            takeUntilDestroyed(this.destroyRef) // Automatically cleans up when the directive is destroyed
          )
          .subscribe((event) => {
            console.log(`Mouse at: ${event.clientX}, ${event.clientY}`);
          });
      }
    }
    ```

8.  **Reusability and Simplicity**: Directives should be small, focused on a single functionality, and highly reusable. If the logic is too complex, consider whether a component or a service would be better.

## 📚 Modern Examples

### AutoFocus Directive

```typescript
// auto-focus.directive.ts
import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[bbAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit(): void {
    // Ensures focus is applied after initial rendering
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
```

**Usage Example in Template:**

```html
<input type="text" bbAutoFocus placeholder="This field will autofocus" />
```

### Input Validation Directive

```typescript
// input-validation.directive.ts
import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { NgControl } from '@angular/forms'; // To access FormControl state

@Directive({
  selector: '[bbInputValidation]',
  standalone: true
})
export class InputValidationDirective implements OnInit, OnChanges {
  @Input() bbInputValidation: boolean = false; // Input to control external validation, if needed

  private el = inject(ElementRef);
  private ngControl = inject(NgControl, { optional: true }); // Injects NgControl, can be null

  @HostBinding('class.is-invalid') isValid = false;

  ngOnInit(): void {
    if (this.ngControl && this.ngControl.statusChanges) {
      this.ngControl.statusChanges.subscribe((status) => {
        this.isValid =
          (this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched)) ||
          this.bbInputValidation;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bbInputValidation']) {
      // Updates class state if external input changes
      this.isValid =
        (this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched)) ||
        this.bbInputValidation;
    }
  }
}
```

**Usage Example in Template (with Reactive Forms):**

```html
<form [formGroup]="myForm">
  <input type="email" formControlName="email" bbInputValidation placeholder="Email" />
  <div
    *ngIf="myForm.get('email')?.invalid && (myForm.get('email')?.dirty || myForm.get('email')?.touched)"
    class="error-message"
  >
    Invalid email.
  </div>
</form>
```
