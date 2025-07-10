# How to Use the ByteBank Pro Button

The `bb-button` component is an interactive button that can be used for actions in forms, dialogs, and other interface elements. It offers several style variants, sizes, and states, such as loading and disabled.

## Importing

The `ButtonComponent` is standalone, so you can import it directly into your component:

```typescript
import { ButtonComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [ButtonComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

The simplest use of the button involves the `bb-button` selector and the `(buttonClick)` event.

```html
<bb-button (buttonClick)="onSave()">Save</bb-button>
```

## Variants

The button has several color variants for different semantic contexts.

```html
<bb-button variant="blue">Default (Blue)</bb-button>
<bb-button variant="dark">Dark</bb-button>
<bb-button variant="green">Green</bb-button>
<bb-button variant="orange">Orange</bb-button>
<bb-button variant="outlineGreen">Outline Green</bb-button>
<bb-button variant="outlineOrange">Outline Orange</bb-button>
```

## Sizes

The component is available in three sizes: `sm`, `md` (default), and `lg`.

```html
<bb-button size="sm">Small</bb-button>
<bb-button size="md">Medium</bb-button>
<bb-button size="lg">Large</bb-button>
```

## States

### Loading

Use the `loading` property to indicate an ongoing action. The button will be disabled and display a loading icon.

```html
<bb-button [loading]="isSubmitting" loadingText="Saving...">Save</bb-button>
```

### Disabled

Use the `disabled` property to deactivate the button.

```html
<bb-button [disabled]="form.invalid">Submit</bb-button>
```

## Accessibility

The `bb-button` is built with accessibility in mind. To provide a better experience for screen reader users, use `ariaLabel` when the button does not have descriptive text (e.g., an icon button).

```html
<bb-button ariaLabel="Close dialog">
  <!-- Close icon -->
</bb-button>
```

## Property API

### Inputs

| Property      | Type (`input()`) | Default        | Description                                          |
| ------------- | ---------------- | -------------- | ---------------------------------------------------- |
| `type`        | `ButtonType`     | `'button'`     | The button type (`'button'`, `'submit'`, `'reset'`). |
| `variant`     | `ButtonVariant`  | `'blue'`       | The color variant of the button.                     |
| `size`        | `ButtonSize`     | `'md'`         | The button size: `'sm'`, `'md'`, `'lg'`.             |
| `loading`     | `boolean`        | `false`        | Displays the loading state.                          |
| `disabled`    | `boolean`        | `false`        | Disables the button.                                 |
| `loadingText` | `string`         | `'Loading...'` | Text for screen readers during loading.              |
| `className`   | `string`         | `''`           | Additional CSS classes for the button.               |
| `ariaLabel`   | `string`         | `undefined`    | Accessible label for the button.                     |

### Outputs

| Property      | Type (`output()`) | Description                         |
| ------------- | ----------------- | ----------------------------------- |
| `buttonClick` | `Event`           | Emitted when the button is clicked. |
