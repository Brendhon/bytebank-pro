# How to Use the ByteBank Pro Checkbox

The `bb-checkbox` component is a versatile form control that allows users to make a binary selection. It follows ByteBank Pro's design and accessibility guidelines, offering a modern and flexible API based on Signals.

## Importing

The `CheckboxComponent` is standalone, so you can import it directly into your component:

```typescript
import { CheckboxComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [CheckboxComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

The simplest use of the checkbox requires only the `bb-checkbox` selector. The state is controlled by the `checked` and `checkedChange` properties.

```html
<bb-checkbox [checked]="isConfirmed" (checkedChange)="isConfirmed = $event" />
```

## States

### Indeterminate

For scenarios like a "select all" selection, you can use the `indeterminate` state.

```html
<bb-checkbox [indeterminate]="true" />
```

### Disabled and Read-Only

You can disable the checkbox to prevent user interaction or make it read-only.

```html
<!-- Disabled -->
<bb-checkbox [disabled]="true" [checked]="true" />

<!-- Read-Only -->
<bb-checkbox [readonly]="true" [checked]="false" />
```

## Variants

The checkbox supports multiple color variants to reflect different states, such as success or error.

```html
<bb-checkbox variant="default" [checked]="true" />
<bb-checkbox variant="success" [checked]="true" />
<bb-checkbox variant="error" [checked]="true" />
<bb-checkbox variant="warning" [checked]="true" />
```

## Sizes

The component is available in three sizes: `sm`, `md` (default), and `lg`.

```html
<bb-checkbox size="sm" [checked]="true" />
<bb-checkbox size="md" [checked]="true" />
<bb-checkbox size="lg" [checked]="true" />
```

## Labels and Helper Texts

For a better user experience, associate a `label` and, optionally, a `helperText`.

```html
<bb-checkbox
  label="I accept the terms of service"
  helperText="Read the terms before accepting."
  [checked]="termsAccepted"
  (checkedChange)="termsAccepted = $event"
/>
```

### Error and Success Messages

Display validation messages directly with the component.

```html
<!-- Error State -->
<bb-checkbox
  variant="error"
  label="You must accept the privacy policy"
  errorMessage="This field is required."
  [checked]="false"
/>

<!-- Success State -->
<bb-checkbox
  variant="success"
  label="Privacy policy accepted"
  successMessage="All set!"
  [checked]="true"
/>
```

## Accessibility

The `bb-checkbox` component is built with accessibility in mind. It automatically manages ARIA attributes such as `aria-checked`, `aria-disabled`, and `aria-invalid`.

For more complex scenarios, you can use the following properties:

- `ariaLabel`: Provides an accessible label when a visual `label` is not present.
- `ariaLabelledBy`: Associates the checkbox with an external label element.
- `ariaDescribedBy`: Associates the checkbox with descriptive elements.

```html
<span id="external-label">Email Notifications</span> <bb-checkbox ariaLabelledBy="external-label" />
```

## Property API

### Inputs

| Property          | Type (`input()`)  | Default     | Description                                                          |
| ----------------- | ----------------- | ----------- | -------------------------------------------------------------------- |
| `checked`         | `boolean`         | `false`     | Controls the selection state of the checkbox.                        |
| `indeterminate`   | `boolean`         | `false`     | Sets the state to indeterminate.                                     |
| `variant`         | `CheckboxVariant` | `'default'` | The color variant: `'default'`, `'success'`, `'error'`, `'warning'`. |
| `size`            | `CheckboxSize`    | `'md'`      | The size: `'sm'`, `'md'`, `'lg'`.                                    |
| `disabled`        | `boolean`         | `false`     | Disables the checkbox.                                               |
| `readonly`        | `boolean`         | `false`     | Makes the checkbox read-only.                                        |
| `required`        | `boolean`         | `false`     | Sets the checkbox as required (for accessibility).                   |
| `label`           | `string`          | `undefined` | The associated label text.                                           |
| `helperText`      | `string`          | `undefined` | Help text displayed below the label.                                 |
| `errorMessage`    | `string`          | `undefined` | Error message (visible when `variant` is `'error'`).                 |
| `successMessage`  | `string`          | `undefined` | Success message (visible when `variant` is `'success'`).             |
| `className`       | `string`          | `''`        | Additional CSS classes for the container.                            |
| `ariaLabel`       | `string`          | `undefined` | Accessible label for screen readers.                                 |
| `ariaLabelledBy`  | `string`          | `undefined` | ID of the element that labels the checkbox.                          |
| `ariaDescribedBy` | `string`          | `undefined` | ID of the element that describes the checkbox.                       |
| `ariaInvalid`     | `boolean`         | `undefined` | Sets the `aria-invalid` state.                                       |
| `ariaRequired`    | `boolean`         | `undefined` | Sets the `aria-required` state.                                      |

### Outputs

| Property          | Type (`output()`) | Description                                    |
| ----------------- | ----------------- | ---------------------------------------------- |
| `checkedChange`   | `boolean`         | Emitted when the `checked` state changes.      |
| `checkboxFocus`   | `FocusEvent`      | Emitted when the checkbox receives focus.      |
| `checkboxBlur`    | `FocusEvent`      | Emitted when the checkbox loses focus.         |
| `checkboxKeydown` | `KeyboardEvent`   | Emitted when a key is pressed on the checkbox. |
