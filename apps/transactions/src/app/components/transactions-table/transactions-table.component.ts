import { CurrencyFormatPipe } from '@/core/pipes/currency-format.pipe';
import { DateFormatterPipe } from '@/core/pipes/date-formatter.pipe';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';
import {
  ITransaction,
  TableColumn,
  TransactionDesc,
  TransactionDescKey,
  TransactionTypeKey
} from '@bytebank-pro/types';
import { GenericTableComponent } from '@bytebank-pro/ui';
import { LucideAngularModule, Pencil, Trash } from 'lucide-angular';

/**
 * TransactionTable component displays a list of financial transactions in a table format.
 * It provides custom rendering for transaction types, values (with conditional colors), and action buttons (edit/delete).
 * It uses the `bb-generic-table` component for its base table structure.
 *
 * The component supports both client-side and server-side pagination:
 * - Client-side: When `totalItems` is not provided, pagination is calculated based on the transactions length
 * - Server-side: When `totalItems` is provided, pagination is calculated based on the total items count
 *
 * @example
 * ```html
 * <!-- Client-side pagination -->
 * <bb-transactions-table
 * [transactions]="myTransactions"
 * [pageSize]="5"
 * (edit)="handleEditTransaction($event)"
 * (delete)="handleDeleteTransaction($event)"
 * ></bb-transactions-table>
 *
 * <!-- Server-side pagination -->
 * <bb-transactions-table
 * [transactions]="myTransactions"
 * [pageSize]="10"
 * [totalItems]="totalTransactionCount"
 * (pageChange)="handlePageChange($event)"
 * (edit)="handleEditTransaction($event)"
 * (delete)="handleDeleteTransaction($event)"
 * ></bb-transactions-table>
 * ```
 */
@Component({
  selector: 'bb-transactions-table',
  standalone: true,
  imports: [
    CommonModule,
    GenericTableComponent,
    LucideAngularModule,
    CurrencyFormatPipe,
    DateFormatterPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {
  /**
   * The array of `ITransaction` objects to display in the table.
   */
  transactions = input.required<ITransaction[]>();

  /**
   * The number of transactions to display per page. If omitted, pagination is disabled.
   * @default 10
   */
  pageSize = input<number>(10);

  /**
   * The total number of transactions available (for server-side pagination).
   * When provided, pagination is calculated based on this value instead of the transactions length.
   * When not provided, pagination is calculated based on the transactions length (client-side pagination).
   */
  totalItems = input<number | undefined>(undefined);

  /**
   * Event emitted when the "Edit" button for a transaction is clicked.
   * Emits the `ITransaction` object to be edited.
   */
  edit = output<ITransaction>();

  /**
   * Event emitted when the "Delete" button for a transaction is clicked.
   * Emits the `ITransaction` object to be deleted.
   */
  delete = output<ITransaction>();

  /**
   * Event emitted when the page changes.
   * Emits the new page number for server-side pagination handling.
   */
  pageChange = output<number>();

  icons = {
    pencil: Pencil,
    trash: Trash
  };

  // Provide TransactionDesc constant to the template for lookup
  protected readonly TransactionDesc = TransactionDesc;

  /**
   * Safely gets the transaction description from the TransactionDesc enum.
   * This method provides type safety for template usage.
   * @param type The transaction type key.
   * @returns The transaction description or the original type if not found.
   */
  getTransactionDesc(type: TransactionDescKey): string {
    return TransactionDesc[type] || type;
  }

  /**
   * Creates columns configuration with custom render templates.
   * This method is called from the template to inject the template references.
   * @param typeTemplate Template for transaction type description
   * @param valueTemplate Template for transaction value with styling
   * @param actionsTemplate Template for action buttons
   * @param dateTemplate Template for transaction date
   * @returns Array of columns with render templates
   */
  getColumnsWithTemplates(
    typeTemplate: TemplateRef<unknown>,
    valueTemplate: TemplateRef<unknown>,
    actionsTemplate: TemplateRef<unknown>,
    dateTemplate: TemplateRef<unknown>
  ): TableColumn<ITransaction>[] {
    return [
      {
        label: 'Data',
        accessor: 'date',
        render: dateTemplate
      },
      {
        label: 'Alias',
        accessor: 'alias'
      },
      {
        label: 'Descrição',
        accessor: 'desc',
        render: typeTemplate
      },
      {
        label: 'Valor',
        accessor: 'value',
        render: valueTemplate
      },
      {
        label: 'Ações',
        accessor: '_id',
        render: actionsTemplate
      }
    ];
  }

  /**
   * Returns the CSS classes for the transaction value, applying red for outflow and green for inflow.
   * Updated to use organized CSS classes instead of inline Tailwind classes.
   * @param type The type of the transaction ('inflow' or 'outflow').
   * @returns A string of CSS classes.
   */
  getValueClasses(type: TransactionTypeKey): string {
    const baseClasses = 'transaction-value';
    const colorClass =
      type === 'outflow' ? 'transaction-value-outflow' : 'transaction-value-inflow';
    return `${baseClasses} ${colorClass}`;
  }

  /**
   * Returns the `className` for the action buttons (edit/delete).
   * Updated to use organized CSS classes instead of inline Tailwind classes.
   * @returns A string of CSS classes.
   */
  getActionButtonClassName(): string {
    return 'action-button';
  }

  /**
   * Tracks transactions in the `bb-generic-table`'s ngFor loop by their `id` property for better performance.
   * This function would be passed to `bb-generic-table` if it exposed a `trackBy` input,
   * but typically the `bb-generic-table` itself would define its own `trackBy` for rows.
   * For context, if `bb-generic-table` had `[trackByFn]="trackByTransactionId"`:
   * @param index The index of the item.
   * @param item The `ITransaction` item itself.
   * @returns The `id` of the transaction.
   */
  trackByTransactionId(index: number, item: ITransaction): string {
    return item._id || '';
  }
}
