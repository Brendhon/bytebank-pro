# How to Use the ByteBank Pro Input

The `bb-input` component is a form input field that offers a wide range of features, including different types, variants, sizes, and icons, all in compliance with ByteBank Pro's design and accessibility guidelines.

## Importing

The `InputComponent` is standalone, so you can import it directly into your component:

```typescript
import { InputComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [InputComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

The simplest use of the input requires the `bb-input` selector and controlling the value through `value` and `valueChange`.

```html
<bb-input [value]="inputValue" (valueChange)="inputValue = $event" placeholder="Enter your name" />
```

## Input Types

The component supports various HTML5 types, such as `text`, `password`, `email`, `number`, etc.

```html
<bb-input type="email" placeholder="your-email@example.com" />
<bb-input type="password" placeholder="Your password" />
<bb-input type="number" placeholder="0" />
```

### Password Visibility

For `password` type fields, you can enable a button to toggle password visibility.

```html
<bb-input type="password" [showPasswordToggle]="true" />
```

## Variants

Color variants help communicate the state of the input, such as success or error.

```html
<bb-input variant="default" value="Default" />
<bb-input variant="success" value="Success" />
<bb-input variant="error" value="Error" />
<bb-input variant="warning" value="Warning" />
```

## Sizes

The input is available in three sizes: `sm`, `md` (default), and `lg`.

```html
<bb-input size="sm" placeholder="Small" />
<bb-input size="md" placeholder="Medium" />
<bb-input size="lg" placeholder="Large" />
```

## Labels and Helper Texts

Associate a `label` and `helperText` to provide context to the user.

```html
<bb-input
  label="Username"
  helperText="Your public username."
  [value]="username"
  (valueChange)="username = $event"
/>
```

### Error and Success Messages

Use `errorMessage` and `successMessage` to provide validation feedback.

```html
<!-- Error State -->
<bb-input
  variant="error"
  label="Email"
  errorMessage="The provided email is invalid."
  value="invalid-email"
/>

<!-- Success State -->
<bb-input variant="success" label="Email" successMessage="Valid email!" value="valid@example.com" />
```

## Icons

You can add `lucide-angular` icons to the prefix or suffix of the input.

```typescript
import { Mail, User } from 'lucide-angular';

@Component({
  /* ... */
})
export class MyComponent {
  mailIcon = Mail;
  userIcon = User;
}
```

```html
<bb-input [prefixIcon]="userIcon" placeholder="Username" />
<bb-input [suffixIcon]="mailIcon" placeholder="Email" />
```

## Accessibility

The `bb-input` automatically manages essential ARIA attributes. For advanced use cases, you can use:

- `ariaLabel`: Provides an accessible label.
- `ariaLabelledBy`: Associates the input with an external label element.
- `ariaDescribedBy`: Associates the input with descriptive elements.

```html
<span id="search-label">Search the site</span> <bb-input ariaLabelledBy="search-label" />
```

## Property API

### Inputs

| Property             | Type (`input()`) | Default     | Description                                                          |
| -------------------- | ---------------- | ----------- | -------------------------------------------------------------------- |
| `type`               | `InputType`      | `'text'`    | The input type: `'text'`, `'password'`, `'email'`, etc.              |
| `variant`            | `InputVariant`   | `'default'` | The color variant: `'default'`, `'success'`, `'error'`, `'warning'`. |
| `size`               | `InputSize`      | `'md'`      | The size: `'sm'`, `'md'`, `'lg'`.                                    |
| `placeholder`        | `string`         | `''`        | The placeholder text.                                                |
| `value`              | `string`         | `''`        | The input value.                                                     |
| `disabled`           | `boolean`        | `false`     | Disables the input.                                                  |
| `readonly`           | `boolean`        | `false`     | Makes the input read-only.                                           |
| `required`           | `boolean`        | `false`     | Sets the input as required.                                          |
| `label`              | `string`         | `undefined` | The associated label text.                                           |
| `helperText`         | `string`         | `undefined` | Help text displayed below the input.                                 |
| `errorMessage`       | `string`         | `undefined` | Error message (visible when `variant` is `'error'`).                 |
| `successMessage`     | `string`         | `undefined` | Success message (visible when `variant` is `'success'`).             |
| `showPasswordToggle` | `boolean`        | `false`     | Displays a button to toggle password visibility.                     |
| `prefixIcon`         | `LucideIconData` | `undefined` | Icon to be displayed before the input text.                          |
| `suffixIcon`         | `LucideIconData` | `undefined` | Icon to be displayed after the input text.                           |
| `className`          | `string`         | `''`        | Additional CSS classes for the container.                            |
| `ariaLabel`          | `string`         | `undefined` | Accessible label for screen readers.                                 |

### Outputs

| Property       | Type (`output()`) | Description                                  |
| -------------- | ----------------- | -------------------------------------------- |
| `valueChange`  | `string`          | Emitted when the input value changes.        |
| `inputFocus`   | `FocusEvent`      | Emitted when the input receives focus.       |
| `inputBlur`    | `FocusEvent`      | Emitted when the input loses focus.          |
| `inputKeydown` | `KeyboardEvent`   | Emitted when a key is pressed on the input.  |
| `inputKeyup`   | `KeyboardEvent`   | Emitted when a key is released on the input. |
