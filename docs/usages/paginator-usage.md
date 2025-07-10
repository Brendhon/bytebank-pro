# How to Use the ByteBank Pro Paginator

The `bb-paginator` component is used for navigation between content pages. It displays page numbers, including ellipses (`...`) for a large number of pages, and navigation arrows.

## Importing

The `PaginatorComponent` is standalone, so you can import it directly into your component:

```typescript
import { PaginatorComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [PaginatorComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

To use the paginator, you need to provide the current page (`currentPage`), the total number of pages (`totalPages`), and listen to the `onPageChange` event to update the page.

```typescript
// in your component.ts
currentPage = 1;
totalPages = 10;

handlePageChange(page: number) {
  this.currentPage = page;
  // Logic to fetch data for the new page
}
```

```html
<bb-paginator
  [currentPage]="currentPage"
  [totalPages]="totalPages"
  (onPageChange)="handlePageChange($event)"
/>
```

## Integration with Generic Table

Normally, `bb-paginator` is used internally by `bb-generic-table`. You do not need to use it directly when working with the table; simply provide the `pageSize` property to the table.

However, if you need a decoupled paginator, the usage above is recommended.

## Behavior

- The paginator intelligently displays page numbers and ellipses to save space.
- Navigation arrows allow you to go to the previous or next page.
- Buttons are appropriately disabled when on the first or last page.

## Property API

### Inputs

| Property      | Type (`input()`) | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| `currentPage` | `number`         | Yes      | The active page number.              |
| `totalPages`  | `number`         | Yes      | The total number of available pages. |

### Outputs

| Property       | Type (`output()`) | Description                                               |
| -------------- | ----------------- | --------------------------------------------------------- |
| `onPageChange` | `number`          | Emitted when the page changes. Emits the new page number. |
