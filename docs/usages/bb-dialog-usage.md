# How to Use the ByteBank Pro Dialog

The `bb-dialog` component is a modal window that can be used to display important information, request user input, or confirm actions. It is designed with a focus on accessibility, including focus management, keyboard navigation, and page scroll locking.

## Importing

The `DialogComponent` is standalone, so you can import it directly into your component:

```typescript
import { DialogComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [DialogComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

To use the dialog, you need to control its visibility state with the `isOpen` property. The dialog content is projected using `ng-content`.

```typescript
// in your component.ts
isDialogOpen = false;

openDialog() {
  this.isDialogOpen = true;
}

closeDialog() {
  this.isDialogOpen = false;
}
```

```html
<button (click)="openDialog()">Open Dialog</button>

<bb-dialog [isOpen]="isDialogOpen" (dialogClose)="closeDialog()" title="Dialog Title">
  <p>This is the content of the dialog.</p>
  <footer class="flex justify-end gap-2 mt-4">
    <bb-button variant="outlineGreen" (click)="closeDialog()">Cancel</bb-button>
    <bb-button (click)="closeDialog()">Confirm</bb-button>
  </footer>
</bb-dialog>
```

## Features

### Closing

The dialog can be closed in several ways, which can be configured:

- **Close Button:** Displayed by default in the upper right corner. Control with `[showCloseButton]="false"`.
- **Backdrop Click:** Enabled by default. Control with `[closeOnBackdropClick]="false"`.
- **Escape Key:** Enabled by default. Control with `[closeOnEscape]="false"`.

### Maximum Width

The maximum width of the dialog can be adjusted with the `maxWidth` property.

```html
<bb-dialog [isOpen]="true" maxWidth="48rem">...</bb-dialog>
```

## Accessibility

The `bb-dialog` implements several accessibility features automatically:

- **Focus Management:** Focus is moved to the dialog when it opens and returns to the previously focused element when it closes.
- **Focus Trap:** Keyboard focus is trapped within the dialog, preventing interaction with the underlying page content.
- **ARIA Attributes:** Attributes such as `aria-modal`, `aria-labelledby`, and `role="dialog"` are managed automatically.
- **Scroll Locking:** The main page scroll is disabled while the dialog is open.

For finer control, you can use the `ariaLabel` property to describe the purpose of the dialog.

## Property API

### Inputs

| Property               | Type (`input()`) | Default   | Description                                                        |
| ---------------------- | ---------------- | --------- | ------------------------------------------------------------------ |
| `isOpen`               | `boolean`        | `false`   | Controls the visibility of the dialog.                             |
| `title`                | `string`         | `''`      | The title displayed in the dialog header.                          |
| `showCloseButton`      | `boolean`        | `true`    | Displays the close button in the upper right corner.               |
| `closeOnBackdropClick` | `boolean`        | `true`    | Closes the dialog when clicking on the backdrop.                   |
| `closeOnEscape`        | `boolean`        | `true`    | Closes the dialog when pressing the Escape key.                    |
| `maxWidth`             | `string`         | `'32rem'` | The maximum width of the dialog (e.g., '400px', '50rem').          |
| `ariaLabel`            | `string`         | `''`      | An ARIA label for the dialog, used if the title is not sufficient. |

### Outputs

| Property      | Type (`output()`) | Description                                    |
| ------------- | ----------------- | ---------------------------------------------- |
| `dialogClose` | `void`            | Emitted when the dialog requests to be closed. |
