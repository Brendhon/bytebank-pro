# 📋 Directive Creation Best Practices Guide for ByteBank Pro

This guide defines best practices for directive development in ByteBank Pro, covering structure, style, organization, and modern Angular practices.

## 📁 Structure and Naming Conventions

### Custom Directives

Directives should be placed in a `directives` folder within the module/feature they serve, or in `shared/directives` for broader use.

- **Standard Structure:** `src/feature-name/directives/directive-name.directive.{ts,spec.ts}`
- **Naming Conventions:** Folder (`kebab-case`), File (`kebab-case.directive.{ext}`), Class (`PascalCaseDirective`), Selector (`[bbCamelCase]` or `bb-kebab-case`).

## 🏗️ Modern Angular Practices (Angular 20) for Directives

Always use the latest recommended Angular APIs for performance, security, and maintainability:

- **Code Comments**: All comments must be in **English**.
- **Standalone Directives**: Always use standalone directives.
- **Dependency Injection**: Use `inject()` for services and other dependencies.
- **Inputs/Outputs**: Use modern syntaxes for `@Input()` and `output()`.
- **DOM Manipulation**: Prefer `Renderer2` for safe manipulation; use `ElementRef` with caution.
- **Host Bindings**: Use the `host` property in `@Directive` or `@HostBinding`/`@HostListener`.
- **Subscription Cleanup**: Use `takeUntilDestroyed(this.destroyRef)` for automatic cleanup.
- **Reusability**: Directives should be small, focused, and highly reusable.

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
