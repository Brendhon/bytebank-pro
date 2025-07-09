import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { TableColumn } from '@bytebank-pro/types';
import { PaginatorComponent } from '../paginator/paginator.component';

/**
 * GenericTable component displays tabular data with customizable columns and optional pagination.
 * It supports displaying a message when no data is found.
 *
 * @template T - The type of data rows in the table.
 * @example
 * ```html
 * <bb-generic-table
 * [data]="myTransactions"
 * [columns]="transactionColumns"
 * [pageSize]="10"
 * ></bb-generic-table>
 *
 * * // myTransactions = [{ id: 1, description: 'Buy', amount: 100 }];
 * // transactionColumns = [
 * //   { label: 'ID', accessor: 'id' },
 * //   { label: 'Description', accessor: 'description' },
 * //   { label: 'Amount', accessor: 'amount', render: myAmountTemplateRef } // For custom rendering
 * // ];
 *
 * * // <ng-template #myAmountTemplateRef let-value let-row="row">
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
   * The current page number for pagination. Initialized to 1.
   */
  currentPage = signal(1);

  /**
   * Calculates the total number of pages based on the data length and page size.
   * If `pageSize` is not defined, returns 1.
   */
  totalPages = computed(() => {
    const size = this.pageSize();
    if (!size) return 1;
    return Math.ceil(this.data().length / size);
  });

  /**
   * Returns the data subset for the current page.
   * This acts as the memoized `pagedData` from the React component.
   */
  pagedData = computed(() => {
    const size = this.pageSize();
    const current = this.currentPage();
    const dataArray = this.data();

    if (!size) return dataArray;

    const start = (current - 1) * size;
    const end = start + size;
    return dataArray.slice(start, end);
  });

  /**
   * Handles the page change event from the Paginator component.
   * Updates the `currentPage`.
   * @param page The new page number.
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Returns the combined CSS classes for a table cell (<th> or <td>).
   * @param baseClass - The base CSS class string (e.g., 'px-8 w-[200px] h-[50px] text-dark text-left').
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
  trackByRowIndex = (index: number, item: T): number => index;

  /**
   * Track function for column items in the columns array.
   * @param index The index of the column.
   * @param column The column object.
   * @returns A unique identifier for the column.
   */
  trackByColumnIndex = (index: number, column: TableColumn<T>): number => index;
}
