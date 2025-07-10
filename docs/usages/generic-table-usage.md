# How to Use the ByteBank Pro Generic Table

The `bb-generic-table` component offers a robust and flexible way to display tabular data. It is designed to be highly reusable, with support for customizable columns, pagination, and custom templates for cell rendering.

## Importing

The `GenericTableComponent` is standalone, so you can import it directly into your component:

```typescript
import { GenericTableComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [GenericTableComponent]
  // ...
})
export class MyComponent {}
```

## Basic Usage

To use the table, you need to provide the data (`data`) and the column definitions (`columns`).

```typescript
// in your component.ts
import { TableColumn } from '@bytebank-pro/types';

// ...

users = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' },
];

columns: TableColumn<any>[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Name', accessor: 'name' },
  { label: 'Email', accessor: 'email' },
];
```

```html
<bb-generic-table [data]="users" [columns]="columns" />
```

## Pagination

Pagination is automatically enabled when the `pageSize` property is provided.

```html
<bb-generic-table [data]="largeDataset" [columns]="columns" [pageSize]="5" />
```

The `bb-paginator` component is used internally and does not need to be invoked directly in most cases.

## Custom Rendering

For more complex cell rendering, you can use custom templates. The recommended pattern is to define the templates in the HTML and pass them via a method.

### Recommended Pattern: Inline Templates

This is the most efficient and recommended pattern for custom rendering:

```html
<!-- in your template -->
<ng-template #statusTemplate let-value let-row="row">
  <span [ngClass]="value === 'active' ? 'text-green-500' : 'text-red-500'">
    {{ value === 'active' ? '✓ Active' : '✗ Inactive' }}
  </span>
</ng-template>

<ng-template #actionTemplate let-value let-row="row">
  <div class="flex gap-2">
    <button class="btn-edit" (click)="onEdit(row)">
      <i-lucide [img]="editIcon" [size]="16"></i-lucide>
    </button>
    <button class="btn-delete" (click)="onDelete(row)">
      <i-lucide [img]="deleteIcon" [size]="16"></i-lucide>
    </button>
  </div>
</ng-template>

<bb-generic-table
  [data]="usersWithStatus"
  [columns]="getColumnsWithTemplates(statusTemplate, actionTemplate)"
/>
```

```typescript
// in your component.ts
import { TemplateRef } from '@angular/core';
import { Edit, Trash } from 'lucide-angular';

export class MyComponent {
  // Icons for the action buttons
  editIcon = Edit;
  deleteIcon = Trash;

  // Method to create columns with templates
  getColumnsWithTemplates(
    statusTemplate: TemplateRef<any>,
    actionTemplate: TemplateRef<any>
  ): TableColumn<any>[] {
    return [
      { label: 'ID', accessor: 'id' },
      { label: 'Name', accessor: 'name' },
      { label: 'Status', accessor: 'status', render: statusTemplate },
      { label: 'Actions', accessor: 'id', render: actionTemplate }
    ];
  }

  onEdit(user: any) {
    console.log('Edit user:', user);
  }

  onDelete(user: any) {
    console.log('Delete user:', user);
  }
}
```

### Alternative Pattern: ViewChild (Less Recommended)

If you prefer to use `@ViewChild`, you can do it like this:

```html
<!-- in your template -->
<ng-template #statusTemplate let-value>
  <span [ngClass]="value === 'active' ? 'text-green-500' : 'text-red-500'"> {{ value }} </span>
</ng-template>

<bb-generic-table [data]="usersWithStatus" [columns]="columnsWithTemplate" />
```

```typescript
// in your component.ts
import { ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

export class MyComponent implements AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  columnsWithTemplate: TableColumn<any>[] = [];

  ngAfterViewInit() {
    this.columnsWithTemplate = [
      { label: 'Name', accessor: 'name' },
      {
        label: 'Status',
        accessor: 'status',
        render: this.statusTemplate
      }
    ];
  }
}
```

### Template Context

In the custom template, you have access to these variables:

- `let-value`: The value of the property accessed by the column
- `let-row="row"`: The complete data row object
- `let-index`: The row index (optional)

### Practical Example: Transactions Table

Here is a complete example of a transactions table with custom rendering:

```html
<!-- Templates for custom rendering -->
<ng-template #typeTemplate let-value let-row="row">
  <span class="transaction-type">{{ getTransactionDesc(value) }}</span>
</ng-template>

<ng-template #valueTemplate let-value let-row="row">
  <span [class]="getValueClasses(row.type)">
    @if (row.type === 'outflow') { - } {{ value | currencyFormat }}
  </span>
</ng-template>

<ng-template #actionsTemplate let-value let-row="row">
  <div class="action-buttons">
    <button (click)="onEdit(row)" aria-label="Edit transaction">
      <i-lucide [img]="editIcon" [size]="12"></i-lucide>
    </button>
    <button (click)="onDelete(row)" aria-label="Delete transaction">
      <i-lucide [img]="deleteIcon" [size]="12"></i-lucide>
    </button>
  </div>
</ng-template>

<!-- Table with custom templates -->
<bb-generic-table
  [data]="transactions"
  [columns]="getTransactionColumns(typeTemplate, valueTemplate, actionsTemplate)"
  [pageSize]="10"
/>
```

```typescript
export class TransactionsComponent {
  editIcon = Edit;
  deleteIcon = Trash;

  getTransactionColumns(
    typeTemplate: TemplateRef<any>,
    valueTemplate: TemplateRef<any>,
    actionsTemplate: TemplateRef<any>
  ): TableColumn<ITransaction>[] {
    return [
      { label: 'Date', accessor: 'date' },
      { label: 'Description', accessor: 'desc', render: typeTemplate },
      { label: 'Value', accessor: 'value', render: valueTemplate },
      { label: 'Actions', accessor: '_id', render: actionsTemplate }
    ];
  }

  getTransactionDesc(type: string): string {
    return TransactionDesc[type] || type;
  }

  getValueClasses(type: string): string {
    return type === 'outflow' ? 'text-red-600' : 'text-green-600';
  }

  onEdit(transaction: ITransaction) {
    // Edit logic
  }

  onDelete(transaction: ITransaction) {
    // Delete logic
  }
}
```

## Property API

### Inputs

| Property   | Type (`input()`)   | Required | Description                                                                   |
| ---------- | ------------------ | -------- | ----------------------------------------------------------------------------- |
| `data`     | `T[]`              | Yes      | The array of data objects to be displayed.                                    |
| `columns`  | `TableColumn<T>[]` | Yes      | The column definitions, including `label`, `accessor`, and optional `render`. |
| `pageSize` | `number`           | No       | The number of items per page. Enables pagination if provided.                 |

### `TableColumn<T>`

The `TableColumn` interface defines the structure of each column:

```typescript
export interface TableColumn<T> {
  label: string; // The column header text
  accessor: keyof T; // The key of the data object
  render?: TemplateRef<any>; // Template for custom cell rendering
}
```

## Best Practices

1.  **Use the inline templates pattern** for better performance and readability
2.  **Define reusable templates** when possible
3.  **Use Lucide icons** with `i-lucide` and the `[img]` property
4.  **Maintain accessibility** with `aria-label` and `data-testid`
5.  **Organize CSS** into semantic classes instead of inline Tailwind classes
6.  **Use strong typing** with generics for better type safety
