# 📋 Component Creation Best Practices Guide for ByteBank Pro

This guide outlines best practices for Angular component development in ByteBank Pro, focusing on structure, style, modern Angular features, and accessibility.

## 🎨 General Guidelines

### 📝 Documentation

- **When using existing components:** Always consult the usage documentation in `docs/usages` to understand the correct API and implementation patterns. For example, if creating a logo component that uses `bb-img`, check the `bb-img-usage.md` file for proper usage guidelines.

This ensures that the documentation is always a reliable source of information for all developers.

### Icons

- Use only official Lucide icons via `lucide-angular`'s `i-lucide` component with the `[img]` property. Do not use custom SVGs or other icon libraries. Import only necessary icons.

### Colors

- Always use colors defined in shared design tokens (`@bytebank-pro/shared-design-tokens`).

### Structure and Naming

- **Standard Structure:** `src/component-name/component-name.component.{ts,spec.ts,html,css}`
- **Naming Conventions:** Folder (`kebab-case`), File (`kebab-case.component.{ext}`), Class (`PascalCaseComponent`), Selector (`bb-kebab-case`).
- **Style File**: Use a separate CSS file for component-specific styles (`styleUrls`). Avoid global styles.
- **CSS**: Use Tailwind CSS classes with `@apply` for better performance.
- **Tailwind Classes**: Never use Tailwind classes inline in HTML templates or directly in TypeScript code. Always organize them into semantic CSS classes using `@apply` directive for better maintainability and readability. All styling logic should be centralized in the component's CSS file.

### ✅ Unit Testing

- **Test File**: Every component must have a corresponding test file (`component-name.component.spec.ts`) in the same directory.
- **Testing Guidelines**: All tests must adhere to the practices outlined in the [Testing Guidelines](./testing-guidelines.md).
- **Test Validation**: After any change to a component or its dependencies, you must run all related tests to ensure that the component continues to function as expected. To run the test for a specific component (for example, `input.component.spec.ts`), use the following command:

  ```
  npm run test -- --include="**/input.component.spec.ts"
  ```

  This command should be executed in the root of the project where the component is located. For example, if the `input` component is inside `packages/ui`, you must run the command in the `packages/ui` directory. Never consider a change complete until all tests pass successfully.

#### ⚠️ AI Test Modification Policy

- **No Automated Test Changes**: The AI must never modify, create, or remove any test files or test code without explicit user permission. All test-related changes must be directly requested and authorized by the user.

### Responsive Design and Sizing

- **Responsive Sizing**: Always use responsive Tailwind classes (e.g., `w-48`, `h-32`) instead of fixed pixel values (e.g., `w-[44px]`, `h-[100px]`) for better screen adaptation across different devices.
- **Flexible Layouts**: Prefer flexible sizing that adapts to different screen sizes and orientations.
- **Breakpoint Considerations**: **Always prioritize Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) over custom `@media` queries for responsive design.** Use these prefixes when specific sizing adjustments are needed for different screen sizes.
- **Media Queries**: Only use custom `@media` queries for non-standard responsive behaviors (e.g., `prefers-contrast: high`, `prefers-reduced-motion`, print styles) that cannot be achieved with Tailwind's responsive utilities.

---

## 🏗️ Modern Angular Practices (Angular 20)

Always use the latest recommended Angular APIs for performance, security, and maintainability:

- **Code Comments**: All comments must be in **English**.
- **Standalone Components**: Always use standalone components.
- **Template Syntax (Angular 17+)**: Prefer `@if`, `@for`, `@empty`, `@switch` control flow blocks. Avoid `*ngIf`, `*ngFor`, `ngSwitch`.
- **Signal-Based APIs (Angular 16+)**: Use `signal()` and `computed()` for reactive state.
- **Dependency Injection**: Use `inject()`.
- **Inputs/Outputs**: Use `input.required<Type>()` for mandatory inputs and `output<Type>()` for events.
- **Change Detection**: Use `ChangeDetectionStrategy.OnPush`.
- **Loops**: Use `trackBy` in `@for` loops.
- **Reactive Patterns**: Use `async pipe` (`| async`).
- **Cleanup**: Use `takeUntilDestroyed(this.destroyRef)`.
- **Type Safety**: Employ generics.
- **Content Projection**: Use `ng-content` with selectors.
- **Host Bindings**: Use the `host` property in `@Component`.
- **Lazy Loading**: Use dynamic imports.
- **Error Handling**: Implement `error-boundary` components.
- **Internationalization (i18n)**: Use `$localize` and `i18n` attributes.
- **DOM Access**: Use typed `ElementRef` with `@ViewChild`.
- **Forms**: Use reactive forms and custom validators.
- **Performance**: Use memoization.

---

## ♿ Accessibility Guidelines

Ensure all UI components are usable by everyone, including people with disabilities.

### Principles

- **Perceivable**: Provide text alternatives, captions, and flexible content presentation.
- **Operable**: Ensure keyboard access, sufficient interaction time, and easy navigation.
- **Understandable**: Use clear text, predictable pages, and implement error prevention/correction.
- **Robust**: Ensure compatibility with different user agents and assistive technologies.

### Implementation

- **ARIA Attributes**: Use `aria-label`, `aria-describedby`, `aria-expanded`, `role` for assistive technologies.
- **Dynamic States**: Correctly reflect component states (e.g., loading) for assistive technologies.
- **Keyboard Navigation**: Maintain logical DOM order, use `tabindex="0"` for custom interactive elements, and ensure visible focus indicators.
- **Semantic Roles**: Use appropriate ARIA roles (`button`, `dialog`, `tablist`, `alert`, `combobox`, `listbox`, `tabpanel`).
- **Text Alternatives**: Provide `alt` text for images/icons. Use `aria-hidden="true"` for decorative elements.
- **Live Regions**: Use `role="status"` or `role="alert"` with `aria-live="polite"`/`assertive` for dynamic content updates.
- **Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text.
- **Forms**: Use explicit `<label>`s, clear validation feedback, and group related fields.
- **Touch Targets**: Interactive elements should be at least 44x44px.

### Checklist and Tests

- **Quick Checklist**: Semantic structure, keyboard-accessible controls, visible focus indicator, text alternatives, adequate contrast, explicit form labels, live regions.
- **Tools**: Automated (Lighthouse, axe), Manual (keyboard navigation, screen readers, contrast/zoom verification).

---
