import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import {
  LucideAngularModule,
  LucideCheckCircle,
  LucideInfo,
  LucideX,
  LucideXCircle
} from 'lucide-angular';

export type ToastVariant = 'success' | 'error' | 'info';

/**
 * Toast component for displaying notification messages to users.
 *
 * AIDEV-NOTE: After making ANY changes to this component, update the `docs/usages/bb-toast-usage.md` file with usage examples and documentation.
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
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnDestroy {
  /**
   * The message to be displayed in the toast.
   */
  message = input.required<string>();

  /**
   * The visual variant of the toast (success, error, info).
   * @default 'info'
   */
  variant = input<ToastVariant>('info');

  /**
   * Controls the visibility of the toast.
   * @default true
   */
  show = input<boolean>(true);

  /**
   * Duration in milliseconds for the toast to close automatically.
   * Set to 0 to not auto close.
   * @default 0
   */
  duration = input<number>(0);

  /**
   * Event emitted when the toast is closed.
   */
  toastClose = output<void>();

  isVisible = signal<boolean>(false);
  private autoCloseTimeout: NodeJS.Timeout | null = null;

  // Icon mapping
  readonly icons = {
    success: LucideCheckCircle,
    error: LucideXCircle,
    info: LucideInfo,
    close: LucideX
  };

  // Effect to handle show input changes
  private readonly showEffect = effect(() => {
    const shouldShow = this.show();
    this.isVisible.set(shouldShow);
    shouldShow ? this.setupAutoClose() : this.clearAutoCloseTimeout();
  });

  // Effect to handle duration input changes
  private readonly durationEffect = effect(() => this.isVisible() && this.setupAutoClose());

  /**
   * Computed property to obtain the Lucide icon corresponding to the variant.
   */
  currentIcon = computed(() => this.icons[this.variant()]);

  /**
   * Computed CSS classes based on the variant and visibility state.
   */
  toastClasses = computed(() => {
    const baseClasses = 'toast-base';
    const variant = this.variant();
    const isVisible = this.isVisible();

    let variantClasses = '';
    switch (variant) {
      case 'success':
        variantClasses = 'toast-variant-success';
        break;
      case 'error':
        variantClasses = 'toast-variant-error';
        break;
      case 'info':
        variantClasses = 'toast-variant-info';
        break;
    }

    const visibilityClasses = isVisible ? 'toast-visible' : 'toast-hidden';

    return `${baseClasses} ${variantClasses} ${visibilityClasses}`;
  });

  ngOnDestroy(): void {
    this.clearAutoCloseTimeout();
  }

  /**
   * Closes the toast and emits the `toastClose` event.
   */
  handleClose(): void {
    this.isVisible.set(false);
    this.clearAutoCloseTimeout();
    this.toastClose.emit();
  }

  private setupAutoClose(): void {
    this.clearAutoCloseTimeout();
    if (this.isVisible() && this.duration() > 0) {
      this.autoCloseTimeout = setTimeout(() => this.handleClose(), this.duration());
    }
  }

  private clearAutoCloseTimeout(): void {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
  }
}
