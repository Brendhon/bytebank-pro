# How to Use the ByteBank Pro Img

The `bb-img` component is responsible for rendering images, whether they are SVGs from shared assets or images from external sources. It manages loading and error states and follows accessibility best practices.

## Importing

The `ImgComponent` is standalone, so you can import it directly into your component:

```typescript
import { ImgComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [ImgComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

To use the component, provide the asset path or image URL in the `src` property and alternative text in `alt`.

```html
<!-- Image from shared assets -->
<bb-img src="logo/bytebank.svg" alt="ByteBank Logo" />

<!-- Image from an external URL -->
<bb-img src="https://picsum.photos/200" alt="Random image" />
```

## Sizes

The component offers several predefined sizes for standardization.

```html
<bb-img src="logo/bytebank.svg" alt="Logo" size="sm" />
<bb-img src="logo/bytebank.svg" alt="Logo" size="md" />
<bb-img src="logo/bytebank.svg" alt="Logo" size="lg" />
```

## Accessibility

### Decorative Images

If the image is purely decorative and does not convey any important information, use the `isDecorative` property to hide it from screen readers.

```html
<bb-img src="icons/background-pattern.svg" [isDecorative]="true" />
```

This will apply `aria-hidden="true"` and an empty `alt`.

### Loading and Error States

The component automatically manages loading and error states, displaying appropriate icons and text for screen readers.

- During loading, `aria-busy="true"` is set.
- In case of an error, an error icon is displayed, and the `alt` is updated to the error text.

## Property API

### Inputs

| Property       | Type (`input()`) | Required | Default                 | Description                                                                                                    |
| -------------- | ---------------- | -------- | ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `src`          | `string`         | Yes      | -                       | The asset path (e.g., `logo/bytebank.svg`) or the image URL.                                                   |
| `alt`          | `string`         | No       | `''`                    | The alternative text for the image. Required if `isDecorative` is `false`.                                     |
| `size`         | `ImgSize`        | No       | `'md'`                  | The image size: `'xs'`, `'xsl'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'full'`. |
| `className`    | `string`         | No       | `''`                    | Additional CSS classes for the image element.                                                                  |
| `isDecorative` | `boolean`        | No       | `false`                 | Indicates if the image is decorative, hiding it from screen readers.                                           |
| `loadingText`  | `string`         | No       | `'Loading image...'`    | Text for screen readers during loading.                                                                        |
| `errorText`    | `string`         | No       | `'Error loading image'` | Text for screen readers when the image fails to load.                                                          |
