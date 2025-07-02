import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  LucideAngularModule,
  LucideCheckCircle,
  LucideIconData,
  LucideInfo,
  LucideX,
  LucideXCircle
} from 'lucide-angular'; // Import specific icons

export type ToastVariant = 'success' | 'error' | 'info';

/**
 * Toast component for displaying notification messages to users.
 *
 * AIDEV-NOTE: After making ANY changes to this component, update the `docs/toast_usage.md` file with usage examples and documentation.
 *
 * @example
 * ```html
 * <bb-toast
 *   message="Operation completed successfully!"
 *   variant="success"
 *   [show]="true"
 *   [duration]="3000"
 *   (toastClose)="handleClose()">
 * </bb-toast>
 * ```
 */
@Component({
  selector: 'bb-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule]
})
export class ToastComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * The message to be displayed in the toast.
   */
  @Input() message: string = '';
  /**
   * The visual variant of the toast (success, error, info).
   * @default 'info'
   */
  @Input() variant: ToastVariant = 'info';
  /**
   * Controls the visibility of the toast.
   * @default true
   */
  @Input() show: boolean = true;
  /**
   * Duration in milliseconds for the toast to close automatically.
   * Set to 0 to not auto close.
   * @default 0
   */
  @Input() duration: number = 0; // Default to 0 (no auto close)

  /**
   * Event emitted when the toast is closed.
   */
  @Output() toastClose = new EventEmitter<void>();

  isVisible: boolean = false;
  private autoCloseTimeout: NodeJS.Timeout | null = null; // Timeout for auto close

  // Icon mapping
  readonly icons = {
    success: LucideCheckCircle,
    error: LucideXCircle,
    info: LucideInfo,
    close: LucideX // Icon for the close button
  };

  /**
   * Getter to obtain the Lucide icon corresponding to the variant.
   */
  get currentIcon(): LucideIconData {
    return this.icons[this.variant];
  }

  ngOnInit(): void {
    this.isVisible = this.show;
    this.setupAutoClose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      this.isVisible = changes['show'].currentValue;
      this.setupAutoClose();
    }
    if (changes['duration'] && this.isVisible) {
      this.setupAutoClose();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoCloseTimeout();
  }

  /**
   * Closes the toast and emits the `toastClose` event.
   */
  handleClose(): void {
    this.isVisible = false;
    this.clearAutoCloseTimeout();
    this.toastClose.emit();
  }

  private setupAutoClose(): void {
    this.clearAutoCloseTimeout();
    if (this.isVisible && this.duration > 0) {
      this.autoCloseTimeout = setTimeout(() => this.handleClose(), this.duration);
    }
  }

  private clearAutoCloseTimeout(): void {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
  }

  /**
   * Getter for computed CSS classes based on the variant and other states.
   */
  get toastClasses(): string {
    const baseClasses =
      'fixed top-20 right-4 z-50 h-12 flex gap-3 rounded-md p-3 shadow-lg text-white min-w-[250px] flex-row justify-between items-center transition-all duration-200 ease-out transform';

    let variantClasses = '';
    switch (this.variant) {
      case 'success':
        variantClasses = 'bg-bytebank-green'; // Example using design token
        break;
      case 'error':
        variantClasses = 'bg-bytebank-red'; // Example using design token
        break;
      case 'info':
        variantClasses = 'bg-bytebank-blue'; // Example using design token
        break;
    }

    const visibilityClasses = this.isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-2 opacity-0';

    return `${baseClasses} ${variantClasses} ${visibilityClasses}`;
  }
}
