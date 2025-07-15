# How to Use the ByteBank Pro Logo

The `bb-logo` component is used to display the ByteBank Pro logo. It can render the full version of the logo or just the icon, with customizable sizes and classes.

## Importing

The `LogoComponent` is standalone, so you can import it directly into your component:

```typescript
import { LogoComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [LogoComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

By default, the component renders the full logo in the medium size.

```html
<bb-logo />
```

## Variants

There are two variants: `full` (default) and `icon`.

```html
<!-- Full logo -->
<bb-logo variant="full" />

<!-- Icon only -->
<bb-logo variant="icon" />
```

## Sizes

The logo is available in several predefined sizes.

```html
<bb-logo size="sm" />
<bb-logo size="md" />
<bb-logo size="lg" />
```

## Accessibility

The component automatically generates a descriptive alternative text. If the logo is purely decorative, use the `isDecorative` property.

```html
<bb-logo [isDecorative]="true" />
```

You can also provide a custom `ariaLabel` for the icon.

```html
<bb-logo variant="icon" ariaLabel="Go to homepage" />
```

## Colors

The logo component now supports color inheritance for SVGs. You can apply any Tailwind color class to change the logo color:

```html
<!-- Red logo -->
<bb-logo variant="full" size="md" className="text-red-500"></bb-logo>

<!-- Blue logo -->
<bb-logo variant="icon" size="sm" className="text-blue-600"></bb-logo>

<!-- Green logo -->
<bb-logo variant="full" size="lg" className="text-green-500"></bb-logo>

<!-- Purple logo -->
<bb-logo variant="icon" size="md" className="text-purple-600"></bb-logo>
```

The SVG will inherit the color from the `className` property, allowing for dynamic color changes based on your design system.

## Property API

### Inputs

| Property       | Type (`input()`) | Default     | Description                                                                                                   |
| -------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `variant`      | `LogoVariant`    | `'full'`    | The logo variant: `'full'` or `'icon'`.                                                                       |
| `size`         | `ImgSize`        | `'md'`      | The logo size: `'xs'`, `'xsl'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'full'`. |
| `className`    | `string`         | `''`        | Additional CSS classes for the logo element.                                                                  |
| `ariaLabel`    | `string`         | `undefined` | A custom `aria-label`.                                                                                        |
| `isDecorative` | `boolean`        | `false`     | Indicates if the logo is decorative, hiding it from screen readers.                                           |
