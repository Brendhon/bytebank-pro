# bb-toast Usage Guide

The `bb-toast` component is a notification component that displays temporary messages to users, with support for different variant types (success, error, info) and automatic or manual closing.

## Basic Usage

```html
<bb-toast
  message="Operation completed successfully!"
  variant="success"
  [show]="true"
  [duration]="3000"
  (toastClose)="handleClose()"
>
</bb-toast>
```

## Input Properties

### `message` (required)

- **Type**: `string`
- **Description**: The message to be displayed in the toast
- **Required**: Yes

```html
<bb-toast message="Your message here"></bb-toast>
```

### `variant`

- **Type**: `'success' | 'error' | 'info'`
- **Default**: `'info'`
- **Description**: Defines the visual variant of the toast

```html
<!-- Success variant -->
<bb-toast message="Success!" variant="success"></bb-toast>

<!-- Error variant -->
<bb-toast message="Error occurred!" variant="error"></bb-toast>

<!-- Info variant -->
<bb-toast message="Information" variant="info"></bb-toast>
```

### `show`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls the visibility of the toast

```html
<bb-toast message="Conditional toast" [show]="isToastVisible"> </bb-toast>
```

### `duration`

- **Type**: `number`
- **Default**: `0`
- **Description**: Duration in milliseconds for the toast to close automatically. Set to 0 to disable auto-close

```html
<!-- Auto-close after 5 seconds -->
<bb-toast message="Auto-closing toast" [duration]="5000"> </bb-toast>

<!-- Manual close only -->
<bb-toast message="Manual close only" [duration]="0"> </bb-toast>
```

## Output Events

### `toastClose`

- **Type**: `EventEmitter<void>`
- **Description**: Event emitted when the toast is closed (either manually or automatically)

```html
<bb-toast message="Toast with close handler" (toastClose)="handleToastClose()"> </bb-toast>
```

## Examples

### Success Toast with Auto-close

```html
<bb-toast
  message="Operation completed successfully!"
  variant="success"
  [duration]="3000"
  (toastClose)="onSuccessToastClose()"
>
</bb-toast>
```

### Error Toast with Manual Close

```html
<bb-toast
  message="An error occurred while processing your request."
  variant="error"
  [duration]="0"
  (toastClose)="onErrorToastClose()"
>
</bb-toast>
```

### Info Toast with Conditional Display

```html
<bb-toast
  message="Important information for the user."
  variant="info"
  [show]="showInfoToast"
  [duration]="5000"
  (toastClose)="hideInfoToast()"
>
</bb-toast>
```

### Multiple Toasts

```html
<div class="toast-container">
  <bb-toast
    message="Success message"
    variant="success"
    [show]="showSuccessToast"
    (toastClose)="hideSuccessToast()"
  >
  </bb-toast>

  <bb-toast
    message="Error message"
    variant="error"
    [show]="showErrorToast"
    (toastClose)="hideErrorToast()"
  >
  </bb-toast>
</div>
```

## Accessibility Features

The component includes several accessibility features:

- **ARIA Live Regions**: Uses `role="status"` with appropriate `aria-live` attributes
- **Keyboard Navigation**: Close button is keyboard accessible
- **Screen Reader Support**: Proper labels and descriptions for assistive technologies
- **Focus Management**: Maintains logical tab order

## Styling

The component uses Tailwind CSS classes with semantic naming:

- `.toast-base`: Base container styles
- `.toast-variant-success`: Success variant styling
- `.toast-variant-error`: Error variant styling
- `.toast-variant-info`: Info variant styling
- `.toast-visible`: Visible state styles
- `.toast-hidden`: Hidden state styles

## Best Practices

1. **Use appropriate variants**: Use `success` for positive feedback, `error` for errors, and `info` for general information
2. **Set reasonable durations**: Use auto-close for temporary notifications, manual close for important messages
3. **Handle close events**: Always handle the `toastClose` event to update your component state
4. **Avoid multiple toasts**: Limit the number of simultaneous toasts to avoid overwhelming the user
5. **Test with screen readers**: Ensure your toast messages are clear and concise for assistive technology users
