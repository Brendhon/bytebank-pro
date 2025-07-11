import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TableColumn } from '@bytebank-pro/types';
import { PaginatorComponent } from '../paginator/paginator.component';

/**
 * GenericTable component displays tabular data with customizable columns and optional pagination.
 * It supports displaying a message when no data is found.
 *
 * The component supports both client-side and server-side pagination:
 * - Client-side: When `totalItems` is not provided, pagination is calculated based on the data length
 * - Server-side: When `totalItems` is provided, pagination is calculated based on the total items count
 *
 * @template T - The type of data rows in the table.
 * @example
 * ```html
 * <!-- Client-side pagination -->
 * <bb-generic-table
 * [data]="myTransactions"
 * [columns]="transactionColumns"
 * [pageSize]="10"
 * ></bb-generic-table>
 *
 * <!-- Server-side pagination -->
 * <bb-generic-table
 * [data]="myTransactions"
 * [columns]="transactionColumns"
 * [pageSize]="10"
 * [totalItems]="totalTransactionCount"
 * (pageChange)="handlePageChange($event)"
 * ></bb-generic-table>
 *
 * // myTransactions = [{ id: 1, description: 'Buy', amount: 100 }];
 * // transactionColumns = [
 * //   { label: 'ID', accessor: 'id' },
 * //   { label: 'Description', accessor: 'description' },
 * //   { label: 'Amount', accessor: 'amount', render: myAmountTemplateRef } // For custom rendering
 * // ];
 *
 * // <ng-template #myAmountTemplateRef let-value let-row="row">
 * //   <span [ngStyle]="{ color: value > 0 ? 'green' : 'red' }">{{ value | currency }}</span>
 * // </ng-template>
 * ```
 */
@Component({
  selector: 'bb-generic-table', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, PaginatorComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './generic-table.component.html', // Template file
  styleUrls: ['./generic-table.component.css'] // Component-specific CSS
})
export class GenericTableComponent<T> {
  /**
   * The array of data objects to be displayed in the table.
   */
  data = input.required<T[]>();

  /**
   * An array defining the columns of the table, including labels, accessors, and optional render templates.
   */
  columns = input.required<TableColumn<T>[]>();

  /**
   * The number of items to display per page. If not provided, pagination is omitted.
   * @default 10
   */
  pageSize = input<number | undefined>(10);

  /**
   * The total number of items available (for server-side pagination).
   * When provided, pagination is calculated based on this value instead of the data length.
   * When not provided, pagination is calculated based on the data length (client-side pagination).
   */
  totalItems = input<number | undefined>(undefined);

  /**
   * The current page number for pagination. Initialized to 1.
   */
  currentPage = signal(1);

  /**
   * Event emitted when the page changes.
   * Emits the new page number for server-side pagination handling.
   */
  pageChange = output<number>();

  /**
   * Calculates the total number of pages based on the data length and page size.
   * If `pageSize` is not defined, returns 1.
   * If `totalItems` is provided, uses that value for calculation (server-side pagination).
   * Otherwise, uses the data length for calculation (client-side pagination).
   */
  totalPages = computed(() => {
    const size = this.pageSize();
    if (!size) return 1;

    const total = this.totalItems();
    const dataLength = this.data().length;

    // Use totalItems if provided (server-side pagination), otherwise use data length (client-side pagination)
    const itemsCount = total !== undefined ? total : dataLength;

    return Math.ceil(itemsCount / size);
  });

  /**
   * Returns the data subset for the current page.
   * For client-side pagination: returns the sliced data based on current page and page size.
   * For server-side pagination: returns the data as-is (data is already paginated by the server).
   */
  pagedData = computed(() => {
    const size = this.pageSize();
    const current = this.currentPage();
    const dataArray = this.data();

    if (!size) return dataArray;

    // If totalItems is provided, this is server-side pagination
    // The data is already paginated by the server, so return it as-is
    if (this.totalItems() !== undefined) {
      return dataArray;
    }

    // Client-side pagination: slice the data based on current page
    const start = (current - 1) * size;
    const end = start + size;
    return dataArray.slice(start, end);
  });

  /**
   * Handles the page change event from the Paginator component.
   * Updates the `currentPage` and emits the `pageChange` event for server-side pagination.
   * @param page The new page number.
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.pageChange.emit(page);
  }

  /**
   * Returns the combined CSS classes for a table cell (<th> or <td>).
   * @param baseClass - The base CSS class string (e.g., 'px-8 w-48 h-12 text-dark text-left').
   * @param additionalClasses - Any additional CSS classes to apply.
   * @returns A single string of combined CSS classes.
   */
  getCellClasses(baseClass: string, additionalClasses: string = ''): string {
    return `${baseClass} ${additionalClasses}`.trim();
  }

  /**
   * Track function for row items in the data array.
   * @param index The index of the item.
   * @param item The item itself.
   * @returns A unique identifier for the item.
   */
  trackByRowIndex = (index: number): number => index;

  /**
   * Track function for column items in the columns array.
   * @param index The index of the column.
   * @param column The column object.
   * @returns A unique identifier for the column.
   */
  trackByColumnIndex = (index: number): number => index;
}
