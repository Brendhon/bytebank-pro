# How to Use the ByteBank Pro Popover

The `bb-popover` component is used to display floating content relative to a trigger element. It is ideal for menus, contextual information, or secondary actions.

## Importing

The `PopoverComponent` is standalone, so you can import it directly into your component:

```typescript
import { PopoverComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [PopoverComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

The popover uses content projection with `slot` for the trigger and the content. The visibility state is controlled by `isOpen` and `openChange`.

```typescript
// in your component.ts
isPopoverOpen = false;

handleOpenChange(isOpen: boolean) {
  this.isPopoverOpen = isOpen;
}
```

```html
<bb-popover [isOpen]="isPopoverOpen" (openChange)="handleOpenChange($event)">
  <button slot="trigger">Open Popover</button>

  <div slot="content" class="p-4">
    <p>This is the content of the popover.</p>
  </div>
</bb-popover>
```

## Positions

You can control the position of the popover relative to the trigger with the `position` property.

```html
<bb-popover position="top-start"> ... </bb-popover>
<bb-popover position="bottom-end"> ... </bb-popover>
```

Available positions are: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.

## Automatic Closing

The popover can be configured to close automatically:

- **On click outside:** `[closeOnClickOutside]="true"` (default)
- **On Escape key press:** `[closeOnEscape]="true"` (default)

## Accessibility

The `bb-popover` manages ARIA attributes such as `aria-haspopup` and `aria-expanded`. Focus is managed to ensure a cohesive keyboard experience.

## Property API

### Inputs

| Property              | Type (`input()`)  | Default          | Description                                                 |
| --------------------- | ----------------- | ---------------- | ----------------------------------------------------------- |
| `isOpen`              | `boolean`         | `false`          | Controls the visibility of the popover.                     |
| `position`            | `PopoverPosition` | `'bottom-start'` | The position of the popover relative to the trigger.        |
| `offset`              | `number`          | `8`              | The distance in pixels between the popover and the trigger. |
| `disabled`            | `boolean`         | `false`          | Disables the popover, preventing it from being opened.      |
| `closeOnClickOutside` | `boolean`         | `true`           | Closes the popover when clicking outside of it.             |
| `closeOnEscape`       | `boolean`         | `true`           | Closes the popover when pressing the Escape key.            |
| `popoverClass`        | `string`          | `''`             | Additional CSS classes for the popover content container.   |

### Outputs

| Property     | Type (`output()`) | Description                                |
| ------------ | ----------------- | ------------------------------------------ |
| `openChange` | `boolean`         | Emitted when the visibility state changes. |
| `opened`     | `void`            | Emitted when the popover is opened.        |
| `closed`     | `void`            | Emitted when the popover is closed.        |
