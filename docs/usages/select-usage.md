# How to Use the ByteBank Pro Select

The `bb-select` component is an advanced and performant form control for selecting options, built with the latest Angular practices, including Signals for reactive and efficient state management.

## Importing

The `SelectComponent` is standalone, allowing direct import into your component:

```typescript
import { SelectComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [SelectComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

For basic usage, provide a list of `options` and control the selected value with `value` and `valueChange`.

```typescript
// in your component.ts
options = [
  { value: '1', label: 'Checking Account' },
  { value: '2', label: 'Savings Account' },
  { value: '3', label: 'Investment Account' }
];
selectedValue = '1';
```

```html
<bb-select
  [options]="options"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
  placeholder="Select an account type"
/>
```

## Multiple Selection

Enable multiple selection with the `multiple` property. The value will be an array.

```html
<bb-select [options]="options" [multiple]="true" [(value)]="selectedValues" />
```

## Search and Clear

Make the select searchable with `searchable` and allow clearing the selection with `clearable`.

```html
<bb-select
  [options]="options"
  [searchable]="true"
  [clearable]="true"
  [(value)]="selectedValue"
  searchPlaceholder="Search for product..."
/>
```

## Variants and Sizes

The component supports color variants and sizes to adapt to different UI contexts.

```html
<!-- Variants -->
<bb-select variant="success" [options]="options" />
<bb-select variant="error" [options]="options" />

<!-- Sizes -->
<bb-select size="sm" [options]="options" />
<bb-select size="lg" [options]="options" />
```

## Labels and Helper Texts

Provide additional context with `label`, `helperText`, and validation messages.

```html
<bb-select label="Category" helperText="Choose the transaction category." [options]="options" />

<!-- With error message -->
<bb-select
  variant="error"
  label="Category"
  errorMessage="This field is required."
  [options]="options"
/>
```

## Loading State

Indicate that options are being loaded with the `loading` property.

```html
<bb-select [loading]="true" placeholder="Loading data..." />
```

## Grouped Options

For clearer organization, you can group options using the `groups` property.

```typescript
// in your component.ts
groupedOptions = [
  {
    label: 'Accounts',
    options: [
      { value: '1', label: 'Checking Account' },
      { value: '2', label: 'Savings Account' }
    ]
  },
  {
    label: 'Investments',
    options: [{ value: '3', label: 'Stocks' }]
  }
];
```

```html
<bb-select [groups]="groupedOptions" [(value)]="selectedValue" />
```

## Accessibility

The `bb-select` is designed to be accessible, managing ARIA attributes such as `aria-expanded` and `role="combobox"`. For custom scenarios, use `ariaLabel`, `ariaLabelledBy`, and `ariaDescribedBy`.

## Property API

### Inputs

| Property            | Type (`input()`)    | Default              | Description                                                          |
| ------------------- | ------------------- | -------------------- | -------------------------------------------------------------------- | ----------------------------- |
| `value`             | `T                  | T[]`                 | `undefined`                                                          | The selected value or values. |
| `options`           | `SelectOption<T>[]` | `[]`                 | The list of options for the select.                                  |
| `groups`            | `SelectGroup[]`     | `undefined`          | The list of option groups.                                           |
| `multiple`          | `boolean`           | `false`              | Allows selection of multiple values.                                 |
| `searchable`        | `boolean`           | `false`              | Enables search functionality.                                        |
| `clearable`         | `boolean`           | `false`              | Displays a button to clear the selection.                            |
| `variant`           | `SelectVariant`     | `'default'`          | The color variant: `'default'`, `'success'`, `'error'`, `'warning'`. |
| `size`              | `SelectSize`        | `'md'`               | The size: `'sm'`, `'md'`, `'lg'`.                                    |
| `disabled`          | `boolean`           | `false`              | Disables the select.                                                 |
| `readonly`          | `boolean`           | `false`              | Makes the select read-only.                                          |
| `loading`           | `boolean`           | `false`              | Displays a loading indicator.                                        |
| `placeholder`       | `string`            | `'Select an option'` | The text displayed when no value is selected.                        |
| `searchPlaceholder` | `string`            | `'Search...'`        | The placeholder for the search field.                                |
| `noResultsText`     | `string`            | `'No results found'` | Text displayed when the search returns no results.                   |
| `label`             | `string`            | `undefined`          | The associated label text.                                           |
| `helperText`        | `string`            | `undefined`          | Help text displayed below the select.                                |
| `errorMessage`      | `string`            | `undefined`          | Error message (visible when `variant` is `'error'`).                 |

### Outputs

| Property        | Type (`output()`) | Description                                           |
| --------------- | ----------------- | ----------------------------------------------------- | ---------------------------------------- |
| `valueChange`   | `T                | T[]`                                                  | Emitted when the selected value changes. |
| `searchChange`  | `string`          | Emitted when the search term changes (with debounce). |
| `optionSelect`  | `SelectOption<T>` | Emitted when an option is selected.                   |
| `dropdownOpen`  | `void`            | Emitted when the dropdown is opened.                  |
| `dropdownClose` | `void`            | Emitted when the dropdown is closed.                  |
