# 📋 UI Component-Specific Guidelines for ByteBank Pro

These requirements apply **exclusively** to components within the `@bytebank-pro/ui` package.

### 📝 Usage Documentation and Storybook

- **When creating a new component in `@bytebank-pro/ui`:**

  - You must create a corresponding usage documentation file named after the component's selector. For example, if your component selector is `bb-button`, the documentation file must be `docs/usages/bb-button-usage.md`.
  - You must also create a Storybook story file for the component in the same folder as the component itself, following the pattern `button.component.stories.ts` (e.g., for `bb-button`, create `src/button/button.component.stories.ts`).

- **When modifying an existing component in `@bytebank-pro/ui`:**

  - Any changes to its API (`@Input`, `@Output`, etc.) or behavior must be immediately reflected in the usage documentation file that matches the component's selector (e.g., for selector `bb-button`, update `docs/usages/bb-button-usage.md`).
  - You must also update the Storybook story file in the component's folder (e.g., `src/button/button.component.stories.ts`) to reflect the new or changed API, usage, or behavior.

- **When deleting a component from `@bytebank-pro/ui`:**

  - The usage documentation file with the same selector name must also be deleted (e.g., if deleting a component with selector `bb-button`, also delete `docs/usages/bb-button-usage.md`).
  - The Storybook story file in the component's folder must also be deleted (e.g., if deleting `bb-button`, also delete `src/button/button.component.stories.ts`).

- **Storybook Standards**: All Storybook stories, whether new or modified, must adhere to the patterns and best practices defined in the [Storybook Guidelines](./storybook-guidelines.md).

**Example:**
If you create, update, or delete a component with selector `bb-button`, you must perform the same action for both:

- The usage documentation file: `docs/usages/bb-button-usage.md`
- The Storybook story file: `src/button/button.component.stories.ts`

This ensures that both the documentation and interactive examples for each component in the `@bytebank-pro/ui` package are always accurate, up to date, and directly associated with the component's selector.
