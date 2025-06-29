import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  OnInit,
  output,
  ViewChild
} from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'bb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-dialog-overlay]': 'isOpen()',
    '[attr.aria-hidden]': '!isOpen()',
    '[style.display]': 'isOpen() ? "flex" : "none"'
  }
})
export class DialogComponent implements OnInit, AfterViewInit {
  // Icons
  readonly xIcon = X;

  // Inputs
  isOpen = input.required<boolean>();
  title = input<string>('');
  showCloseButton = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  maxWidth = input<string>('32rem'); // 512px default
  ariaLabel = input<string>('');

  // Outputs
  close = output<void>();

  // Internal state
  private focusedElementBeforeOpen: HTMLElement | null = null;

  // ViewChild
  @ViewChild('dialogElement') dialogElement!: ElementRef<HTMLElement>;
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

  // Computed properties
  ariaLabelValue = computed(() => {
    if (this.ariaLabel()) {
      return this.ariaLabel();
    }
    return this.title() || 'Dialog';
  });

  closeButtonAriaLabel = computed(() =>
    this.title() ? `Close ${this.title()} dialog` : 'Close dialog'
  );

  ngOnInit(): void {
    // Store the currently focused element when dialog opens
    if (this.isOpen()) {
      this.focusedElementBeforeOpen = document.activeElement as HTMLElement;
    }
  }

  ngAfterViewInit(): void {
    // Focus management when dialog opens
    if (this.isOpen()) {
      this.focusDialog();
    }
  }

  /**
   * Handle backdrop click
   */
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick() && event.target === event.currentTarget) {
      this.handleClose();
    }
  }

  /**
   * Handle close button click
   */
  onCloseClick(): void {
    this.handleClose();
  }

  /**
   * Handle escape key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeyDown(event: KeyboardEvent): void {
    if (this.isOpen() && this.closeOnEscape()) {
      event.preventDefault();
      this.handleClose();
    }
  }

  /**
   * Trap focus within the dialog
   */
  @HostListener('keydown.tab', ['$event'])
  onTabKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handle dialog close
   */
  private handleClose(): void {
    this.close.emit();
    this.restoreFocus();
  }

  /**
   * Focus the dialog when it opens
   */
  private focusDialog(): void {
    // Focus the close button if available, otherwise focus the dialog itself
    if (this.showCloseButton() && this.closeButton?.nativeElement) {
      this.closeButton.nativeElement.focus();
    } else if (this.dialogElement?.nativeElement) {
      this.dialogElement.nativeElement.focus();
    }
  }

  /**
   * Restore focus to the element that was focused before the dialog opened
   */
  private restoreFocus(): void {
    if (this.focusedElementBeforeOpen) {
      this.focusedElementBeforeOpen.focus();
      this.focusedElementBeforeOpen = null;
    }
  }

  /**
   * Get all focusable elements within the dialog
   */
  private getFocusableElements(): HTMLElement[] {
    if (!this.dialogElement?.nativeElement) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(
      this.dialogElement.nativeElement.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  }
}
