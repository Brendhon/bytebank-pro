---
applyTo: '**/*.component.ts,**/*.component.html'
---

# 📋 Component Creation Best Practices Guide for ByteBank Pro

This comprehensive guide defines the guidelines and best practices for component development in ByteBank Pro, covering structure, style, organization, modern Angular practices, and accessibility.

## 🎨 General Component and Style Guidelines

### 🖼️ Icons

- **Only use official Lucide icons.** Do not use custom SVGs or other icon libraries.
- **Import only necessary icons** for each component.
- **Use `lucide-angular` via the `i-lucide` component with the `[img]` property.** This ensures visual standardization, accessibility, and performance.
- Do not create custom icon components. Import the desired icon from `lucide-angular` and use it directly in the template with `i-lucide`.
- **Usage Example (TypeScript):**

  ```typescript
  import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';

  @Component({
    selector: 'bb-component-name',
    templateUrl: './component-name.component.html',
    standalone: true,
    imports: [LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ComponentNameComponent {
    // ..

    arrowLeft = ArrowLeft; // Left arrow icon
    arrowRight = ArrowRight; // Right arrow icon

    // ...
  }
  ```

- **Usage Example (Template):**

  ```html
  <i-lucide [img]="ArrowLeft" [size]="20" aria-hidden="true"></i-lucide>
  <i-lucide [img]="ArrowRight" [size]="20" aria-hidden="true"></i-lucide>
  ```

### 📏 Component Size

### 🌈 Colors

To ensure visual consistency and ByteBank brand standardization, **always use colors defined in shared design tokens**.
You can import and use these colors directly in your TypeScript components or integrate them via TailwindCSS. For complete details on the color palette and how to use them, consult the [`README.md`](packages/shared-design-tokens/README.md) file of the `@bytebank-pro/shared-design-tokens` package.

### 📁 Structure and Naming Conventions

- **Standard Structure:**
  ```
  src/
  └── component-name/
    ├── component-name.component.ts
    ├── component-name.component.spec.ts // Create a simple test file with one basic test
    ├── component-name.component.html
    └── component-name.component.css
  ```
- **Naming Conventions:**

  - **Folder**: `kebab-case` (e.g., `date-picker`)
  - **File**: `kebab-case.component.{ext}` (e.g., `date-picker.component.ts`)
  - **Class**: `PascalCaseComponent` (e.g., `DatePickerComponent`)
  - **Selector**: `bb-kebab-case` (e.g., `bb-date-picker`)

- **Style File**: Always create a separate CSS file for component-specific styles, avoiding global styles. Use `styleUrls` in the `@Component` decorator to reference the CSS file.

  ```typescript
  @Component({
    selector: 'bb-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'], // Use component-specific CSS
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class DatePickerComponent {
    // Component logic
  }
  ```

---

## 🏗️ Angular Modern Best Practices (Angular 20)

Always use the latest officially recommended Angular APIs and approaches to ensure performance, security, and maintainability.

1.  **Code Comments**: All comments (inline, JSDoc, annotations) must be written in **English**.
2.  **Tests**: Use `data-testid="name"` on elements to facilitate selection in tests, making them more resilient to class or structure changes.
3.  **Template Syntax (Angular 17+)**: Prefer `@if`, `@for`, `@empty`, `@switch` control flow blocks for better clarity, performance, and type safety. **Avoid `*ngIf`, `*ngFor`, `ngSwitch`**.
4.  **Standalone Components**: **Always use standalone components** to eliminate unnecessary `NgModules`, reduce boilerplate, and improve tree-shaking.
    ```typescript
    @Component({
      selector: 'bb-component',
      imports: [CommonModule]
    })
    export class ComponentComponent {}
    ```
5.  **Signal-Based APIs (Angular 16+)**: Use `signal()` and `computed()` for reactive state, better performance, and more declarative code.
    ```typescript
    counter = signal(0);
    doubled = computed(() => this.counter() * 2);
    ```
6.  **Dependency Injection with `inject()` (Angular 14+)**: For cleaner and more testable code, use `inject()`.
    ```typescript
    private router = inject(Router);
    ```
7.  **Required Inputs**: Use `input.required<Type>()` for mandatory inputs, ensuring safety and conciseness.
    ```typescript
    name = input.required<string>();
    ```
8.  **Modern Outputs**: Prefer `output<Type>()` instead of `@Output() EventEmitter` for greater simplicity and type-safety.
    ```typescript
    click = output<MouseEvent>();
    ```
9.  **OnPush Change Detection Strategy**: Set `changeDetection: ChangeDetectionStrategy.OnPush` to optimize performance, reducing unnecessary checks.
    ```typescript
    @Component({
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    ```
10. **TrackBy Functions in Loops**: Always use `trackBy` in `@for` loops to improve performance in dynamic lists.
    ```html
    @for (item of items; track trackById(item)) { ... }
    ```
11. **Async Pipe and Reactive Patterns**: Use `async pipe` (`| async`) in the template to automatically manage observable subscriptions.
    ```typescript
    data$ = this.service.getData();
    // {{ data$ | async }}
    ```
12. **Cleanup with DestroyRef (Angular 16+)**: Use `takeUntilDestroyed(this.destroyRef)` to automatically clean up subscriptions.
    ```typescript
    .pipe(takeUntilDestroyed(this.destroyRef))
    ```
13. **Type Safety with Generics**: Employ generics in components to make them more reusable and safe.
    ```typescript
    export class SelectComponent<T = any> { ... }
    ```
14. **Content Projection**: Use `ng-content` with selectors (`[slot=header]`) to allow multiple content projection points.
    ```typescript
    <ng-content select="[slot=header]"></ng-content>
    ```
15. **Host Bindings**: Use the `host` property in `@Component` to apply properties and events directly to the host element.
    ```typescript
    @Component({
      host: {
        '[class.disabled]': 'disabled',
        '(click)': 'onClick($event)'
      }
    })
    ```
16. **Lazy Loading**: Reduce the initial bundle with dynamic imports (`import().then(...)`).
    ```typescript
    private heavyComponent = import('./heavy-component').then(m => m.HeavyComponent);
    ```
17. **Error Handling (Error Boundaries)**: Implement `error-boundary` components to display a fallback UI in case of errors, improving user experience.
    ```typescript
    @Component({
      selector: 'bb-error-boundary',
      template: `
        @if (hasError) {
          <div>{{ errorMessage }}</div>
          <button (click)="resetError()">Retry</button>
        } @else {
          <ng-content></ng-content>
        }
      `
    })
    ```
18. **Internationalization (i18n)**: Prepare components for i18n using `$localize` and `i18n` attributes.
    ```typescript
    closeButtonLabel = $localize`:@@close-button-aria:Close date picker`;
    ```
19. **ViewChild with Type Safety**: Safely access DOM elements using typed `ElementRef` with `@ViewChild`.
    ```typescript
    @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
    ```
20. **Custom Validators**: Create reusable validation functions for forms.
    ```typescript
    export function customEmailValidator(): ValidatorFn { ... }
    ```
21. Use reactive forms for complex forms, leveraging reactivity and advanced validation.
    ```typescript
    this.form = this.fb.group({
      email: ['', [Validators.required, customEmailValidator()]]
    });
    ```
22. **Memoization**: Use memoization for expensive computations, avoiding unnecessary recalculations and optimizing performance.
    ```typescript
    get expensiveComputation() { ... }
    ```

---

## ♿ Accessibility Guidelines

Ensure that all ByteBank Pro UI components are usable by everyone, including people with disabilities.

### 1. Fundamental Principles

- **Perceivable**: Provide text alternatives, captions, and flexible content presentation.
- **Operable**: Ensure keyboard access, sufficient time for interactions, and easy navigation.
- **Understandable**: Use clear text, create predictable pages, and implement error prevention/correction.
- **Robust**: Ensure compatibility with different user agents and assistive technologies.

### 2. Accessibility Implementation

- **ARIA Attributes**: Use `aria-label`, `aria-describedby`, `aria-expanded`, `role` to make content accessible to assistive technologies.
  ```html
  <button
    [attr.aria-label]="ariaLabel"
    [attr.aria-expanded]="ariaExpanded"
    [role]="role || 'button'"
  ></button>
  ```
- **Dynamic States**: Correctly reflect component states (e.g., loading) for assistive technologies.
  ```html
  <button [attr.aria-busy]="loading ? 'true' : 'false'">
    @if (loading) {
    <span class="sr-only">Loading...</span>
    }
  </button>
  ```
- **Keyboard Navigation**:
  - Maintain a logical DOM order.
  - Use `tabindex="0"` for interactive custom elements.
  - Ensure a visible focus indicator.
  <!-- end list -->
  ```typescript
  @HostListener('keydown.enter', ['$event'])
  onKeyActivate(event: KeyboardEvent): void {
    event.preventDefault();
    this.activate.emit();
  }
  ```
- **Semantic Roles**: Use appropriate ARIA roles (`button`, `dialog`, `tablist`, `alert`, `combobox`, `listbox`, `tabpanel`).
  ```html
  <div role="combobox" [attr.aria-expanded]="isOpen">
    <input type="text" [attr.aria-controls]="listboxId" />
    <div [id]="listboxId" role="listbox"></div>
  </div>
  ```
- **Text Alternatives**: Provide alternative texts (`alt`) for images and icons. Use `aria-hidden="true"` for purely decorative elements.
  ```html
  <img src="chart.png" alt="Sales chart" />
  <LucideIcon name="chevron-right" aria-hidden="true" />
  <button aria-label="Close dialog"></button>
  ```
- **Live Regions**: Use `role="status"` or `role="alert"` with `aria-live="polite"`/`assertive` to announce dynamic content updates.
  ```html
  <div role="status" aria-live="polite">{{ message }}</div>
  ```
- **Contrast and Readability**:
  - Normal text: minimum 4.5:1
  - Large text: minimum 3:1
- **Accessible Forms**:
  - Always use explicit `<label>` associated with inputs.
  - Provide clear validation feedback.
  - Group related fields.
  <!-- end list -->
  ```html
  <label for="username">Username</label> <input id="username" type="text" />
  ```
- **Touch Targets**: Interactive elements must have a minimum size of 44x44px.
  ```html
  <button class="min-h-[44px] min-w-[44px]">Save</button>
  ```

### 3. Accessibility Checklist and Tests

#### Quick Checklist

- Semantic structure (`<header>`, `<nav>`, `<main>`, etc.).
- Keyboard-accessible controls (all interactive elements).
- Visible and clear focus indicator.
- Text alternatives for images and icons.
- Adequate contrast between text and background.
- Explicit labels for all form fields.
- Use of live regions for dynamic content.

#### Tools and Testing Methods

- **Automated Tools**: Lighthouse, axe (browser extension).
- **Manual Tests**:
  - Keyboard-only navigation.
  - Use of screen readers (NVDA, VoiceOver).
  - Contrast and zoom verification.

---

## 📚 Accessible Component Examples

### Modal

```typescript
@Component({
  selector: 'bb-modal',
  template: `
    <div role="dialog" [attr.aria-modal]="'true'">
      <h2>{{ title }}</h2>
      <button aria-label="Close dialog"></button>
      <ng-content></ng-content>
    </div>
  `
})
export class ModalComponent {}
```

### Dropdown

```typescript
@Component({
  selector: 'bb-dropdown',
  template: `
    <button [attr.aria-expanded]="isOpen">{{ label }}</button>
    <div role="menu" [class.hidden]="!isOpen">
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownComponent {}
```

### Tabs

```typescript
@Component({
  selector: 'bb-tabs',
  template: `
    <div role="tablist">
      <button role="tab" [attr.aria-selected]="activeIndex === i"></button>
    </div>
    <div role="tabpanel"></div>
  `
})
export class TabsComponent {}
```

---

## 📦 Specific Guidelines for ByteBank UI Package (`@bytebank-pro/ui`)

> ⚠️ **IMPORTANT**: The guidelines in this section apply **EXCLUSIVELY** to components developed within the `@bytebank-pro/ui` package (located in `packages/ui/`).
> 
> **They do not apply to application components** (`apps/dashboard`, `apps/settings`, `apps/shell`, `apps/transactions`).

### 📖 Storybook Documentation

For UI package components, **always** include a Storybook story file in the component structure:

```
src/
└── component-name/
  ├── component-name.component.ts
  ├── component-name.component.spec.ts
  ├── component-name.component.html
  ├── component-name.component.css
  └── component-name.component.stories.ts // create a simple story file
```

**Basic story example:**

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentNameComponent } from './component-name.component';

const meta: Meta<ComponentNameComponent> = {
  title: 'Components/ComponentNameFolder/ComponentName',
  component: ComponentNameComponent
};

export default meta;
type Story = StoryObj<ComponentNameComponent>;

export const Default: Story = {
  args: {
    // default component properties
  }
};
```

### 🎨 Global Style Import

**Always import global styles** from ByteBank Pro UI at the beginning of the component's CSS file (`component-name.component.css`):

```css
@import '../../../styles/global.css';

/* 
 * Component-specific styles (avoid when possible)
 * Prefer using TailwindCSS utility classes
 */
```

This import ensures that:

- The component maintains the ByteBank brand visual identity
- CSS variables and design tokens are available
- Visual consistency is maintained throughout the component library

### 📦 Component Export

To ensure the component is available for use in other applications and packages, **export it in the `public-api.ts` file of the `@bytebank-pro/ui` package**:

```typescript
export * from './component-name/component-name.component';
```

---
