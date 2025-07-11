# 📊 bb-generic-table Usage Guide

The `bb-generic-table` component displays tabular data with customizable columns and optional pagination. It supports both client-side and server-side pagination patterns.

## 🎯 Basic Usage

### Client-side Pagination

```html
<bb-generic-table
  [data]="transactions"
  [columns]="transactionColumns"
  [pageSize]="10"
></bb-generic-table>
```

### Server-side Pagination

```html
<bb-generic-table
  [data]="transactions"
  [columns]="transactionColumns"
  [pageSize]="10"
  [totalItems]="totalTransactionCount"
  (pageChange)="handlePageChange($event)"
></bb-generic-table>
```

## 📋 API Reference

### Inputs

| Input        | Type                  | Required | Default     | Description                                                                        |
| ------------ | --------------------- | -------- | ----------- | ---------------------------------------------------------------------------------- |
| `data`       | `T[]`                 | ✅       | -           | Array of data objects to display in the table                                      |
| `columns`    | `TableColumn<T>[]`    | ✅       | -           | Array defining table columns with labels, accessors, and optional render templates |
| `pageSize`   | `number \| undefined` | ❌       | `10`        | Number of items per page. If not provided, pagination is disabled                  |
| `totalItems` | `number \| undefined` | ❌       | `undefined` | Total number of items available (for server-side pagination)                       |

### Outputs

| Output       | Type     | Description                                                                                     |
| ------------ | -------- | ----------------------------------------------------------------------------------------------- |
| `pageChange` | `number` | Emitted when the page changes. Provides the new page number for server-side pagination handling |

## 🏗️ Column Configuration

### Basic Column

```typescript
{
  label: 'ID',
  accessor: 'id'
}
```

### Column with Custom Rendering

```typescript
{
  label: 'Amount',
  accessor: 'amount',
  render: amountTemplateRef
}
```

### Template for Custom Rendering

```html
<ng-template #amountTemplateRef let-value let-row="row">
  <span [ngClass]="value > 0 ? 'text-green-600' : 'text-red-600'"> {{ value | currency }} </span>
</ng-template>
```

## 📄 Pagination Modes

### Client-side Pagination

When `totalItems` is not provided, the component calculates pagination based on the data length:

- **Use case**: Small to medium datasets that can be loaded entirely
- **Behavior**: Data is sliced locally based on current page and page size
- **Performance**: Good for datasets under 1000 items

```typescript
// Component logic
const transactions = [
  { id: 1, description: 'Deposit', amount: 100 },
  { id: 2, description: 'Withdrawal', amount: -50 }
  // ... more items
];

const columns = [
  { label: 'ID', accessor: 'id' },
  { label: 'Description', accessor: 'description' },
  { label: 'Amount', accessor: 'amount' }
];
```

### Server-side Pagination

When `totalItems` is provided, the component expects the server to handle pagination:

- **Use case**: Large datasets that need to be paginated on the server
- **Behavior**: Data is already paginated by the server, component just displays current page
- **Performance**: Optimal for large datasets

```typescript
// Component logic
const transactions = [
  /* current page data */
];
const totalTransactionCount = 1500; // Total items from server

const handlePageChange = (page: number) => {
  // Fetch new page data from server
  this.loadTransactions(page);
};
```

## 🎨 Styling

The component uses semantic CSS classes organized in the component's CSS file. All styling follows the ByteBank Pro design system.

### CSS Classes

- `.generic-table-container` - Main container
- `.table-wrapper` - Table wrapper
- `.table` - Main table element
- `.table-header` - Table header section
- `.table-row` - Table row
- `.table-no-data-cell` - Cell for "no data" message
- `.table-no-data-message` - "No data" message text
- `.paginator-wrapper` - Paginator container

## ♿ Accessibility

- Uses semantic `<table>` structure with proper `role` attributes
- Includes `aria-label` for screen readers
- Maintains proper tab order for keyboard navigation
- Provides clear "no data" messaging

## 🧪 Testing

The component includes data-testid attributes for testing:

- `data-testid="generic-table-container"`
- `data-testid="table-wrapper"`
- `data-testid="table-header"`
- `data-testid="table-body"`
- `data-testid="no-data-row"`
- `data-testid="no-data-message"`
- `data-testid="paginator-wrapper"`

## 📝 Examples

### Complete Transaction Table

```typescript
// Component
export class TransactionListComponent {
  transactions = signal<ITransaction[]>([]);
  totalItems = signal<number>(0);
  currentPage = signal(1);

  loadTransactions(page: number = 1) {
    // Fetch paginated data from server
    this.transactionService.getTransactions(page).subscribe((response) => {
      this.transactions.set(response.data);
      this.totalItems.set(response.total);
      this.currentPage.set(page);
    });
  }

  handlePageChange(page: number) {
    this.loadTransactions(page);
  }
}
```

```html
<!-- Template -->
<bb-generic-table
  [data]="transactions()"
  [columns]="getColumnsWithTemplates(
    typeTemplate,
    valueTemplate,
    actionsTemplate,
    dateTemplate
  )"
  [pageSize]="10"
  [totalItems]="totalItems()"
  (pageChange)="handlePageChange($event)"
></bb-generic-table>

<ng-template #typeTemplate let-value> {{ getTransactionDesc(value) }} </ng-template>

<ng-template #valueTemplate let-value let-row="row">
  <span [ngClass]="getValueClasses(row.type)"> {{ value | currency }} </span>
</ng-template>

<ng-template #actionsTemplate let-value let-row="row">
  <button (click)="editTransaction(row)" class="action-button">
    <i-lucide name="pencil" class="w-4 h-4"></i-lucide>
  </button>
  <button (click)="deleteTransaction(row)" class="action-button">
    <i-lucide name="trash" class="w-4 h-4"></i-lucide>
  </button>
</ng-template>

<ng-template #dateTemplate let-value> {{ value | date:'short' }} </ng-template>
```

## ⚠️ Important Notes

1. **Data Consistency**: For server-side pagination, ensure the `data` array contains only the current page items
2. **Total Items**: Always provide accurate `totalItems` count for server-side pagination
3. **Page Size**: The `pageSize` should match the server's page size configuration
4. **Performance**: Use server-side pagination for datasets larger than 1000 items
5. **State Management**: Handle page state in the parent component for server-side pagination
