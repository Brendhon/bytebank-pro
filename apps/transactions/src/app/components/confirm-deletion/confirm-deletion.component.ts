import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ITransaction } from '@bytebank-pro/types';
import { ButtonComponent, DialogComponent } from '@bytebank-pro/ui';

/**
 * ConfirmDeletion component provides a reusable dialog for confirming deletion actions.
 * It follows ByteBank Pro design patterns and accessibility guidelines.
 *
 * @example
 * ```html
 * <bb-confirm-deletion
 *   [isOpen]="isDeleteDialogOpen"
 *   [transaction]="transactionToDelete"
 *   (confirm)="handleDeleteConfirm($event)"
 *   (cancel)="handleDeleteCancel()"
 * ></bb-confirm-deletion>
 * ```
 */
@Component({
  selector: 'bb-confirm-deletion',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.css'],
  host: {
    '[class.bb-confirm-deletion-wrapper]': 'true'
  }
})
export class ConfirmDeletionComponent {
  /**
   * Controls whether the confirmation dialog is open.
   */
  isOpen = input.required<boolean>();

  /**
   * The transaction to be deleted. Used for displaying context information.
   */
  transaction = input<ITransaction | null>(null);

  /**
   * Event emitted when the user confirms the deletion.
   * Emits the transaction that should be deleted.
   */
  confirm = output<ITransaction>();

  /**
   * Event emitted when the user cancels the deletion.
   */
  cancel = output<void>();

  /**
   * Handles the confirmation action.
   * Emits the transaction to be deleted and closes the dialog.
   */
  onConfirm(): void {
    if (this.transaction()) {
      this.confirm.emit(this.transaction()!);
    }
  }

  /**
   * Handles the cancellation action.
   * Emits cancel event and closes the dialog.
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Gets the transaction alias for display purposes.
   * Returns a fallback message if no alias is available.
   */
  getTransactionAlias(): string {
    const transaction = this.transaction();
    return transaction?.alias || 'esta transação';
  }
}
