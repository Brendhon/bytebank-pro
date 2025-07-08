import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  ViewChild
} from '@angular/core';

export type PopoverPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

/**
 * Popover component for displaying contextual information or actions.
 * Provides a floating content panel that appears relative to a trigger element.
 * Supports various positions, keyboard navigation, and accessibility features.
 *
 * @example
 * ```html
 * <bb-popover
 *   [isOpen]="isOpen"
 *   position="bottom-start"
 *   [closeOnClickOutside]="true"
 *   (openChange)="handleOpenChange($event)"
 * >
 *   <button slot="trigger">Open Popover</button>
 *   <div slot="content">Popover content here</div>
 * </bb-popover>
 * ```
 */
@Component({
  selector: 'bb-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-popover]': 'true',
    '[attr.aria-expanded]': 'isOpen()',
    role: 'button',
    tabindex: '0',
    '[attr.aria-haspopup]': '"menu"'
  }
})
export class PopoverComponent {
  // ViewChild references
  @ViewChild('popoverContent') popoverContent!: ElementRef<HTMLDivElement>;
  @ViewChild('triggerElement') triggerElement!: ElementRef<HTMLElement>;

  // Inputs
  isOpen = input<boolean>(false);
  position = input<PopoverPosition>('bottom-start');
  offset = input<number>(8);
  disabled = input<boolean>(false);
  closeOnClickOutside = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  ariaLabel = input<string>('');
  popoverClass = input<string>('');

  // Outputs
  openChange = output<boolean>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  private _isOpen = signal(false);

  // Computed properties
  isOpenState = computed(() => this.isOpen() || this._isOpen());
  popoverClasses = computed(() => {
    const baseClasses = 'bb-popover-content';
    const positionClass = `bb-popover-${this.position()}`;
    const customClass = this.popoverClass();
    return [baseClasses, positionClass, customClass].filter(Boolean).join(' ');
  });

  constructor() {
    effect(() => {
      if (this.isOpen() === false) this._isOpen.set(false);
    });
  }

  /**
   * Toggle popover visibility
   */
  toggle(): void {
    if (this.disabled()) return;

    this._isOpen.set(!this.isOpenState());
    this.openChange.emit(this._isOpen());
    this._isOpen() ? this.opened.emit() : this.closed.emit();
  }

  /**
   * Open the popover
   */
  open(): void {
    if (this.disabled() || this.isOpenState()) return;

    this._isOpen.set(true);
    this.openChange.emit(true);
    this.opened.emit();
  }

  /**
   * Close the popover
   */
  close(): void {
    if (!this.isOpenState()) return;

    this._isOpen.set(false);
    this.openChange.emit(false);
    this.closed.emit();
  }

  /**
   * Handle click on trigger element
   */
  onTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  /**
   * Handle keyboard events on trigger
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  /**
   * Handle escape key to close popover
   */
  @HostListener('keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.closeOnEscape() && this.isOpenState()) {
      event.preventDefault();
      event.stopPropagation();
      this.close();
    }
  }

  /**
   * Handle clicks outside the popover
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.closeOnClickOutside() || !this.isOpenState()) return;

    const target = event.target as Element;
    const popoverElement = this.popoverContent?.nativeElement;
    const triggerElement = this.triggerElement?.nativeElement;

    if (popoverElement && triggerElement) {
      const isClickInsidePopover = popoverElement.contains(target);
      const isClickOnTrigger = triggerElement.contains(target);

      if (!isClickInsidePopover && !isClickOnTrigger) {
        this.close();
      }
    }
  }

  /**
   * Track function for content projection
   */
  trackByIndex(index: number): number {
    return index;
  }
}
