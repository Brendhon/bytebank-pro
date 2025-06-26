import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
  HostListener
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Check, Minus, LucideAngularModule } from 'lucide-angular';

// Type definitions for checkbox variants and states
export type CheckboxVariant = 'default' | 'success' | 'error' | 'warning';
export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

@Component({
  selector: 'bb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../styles/index.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-checkbox-wrapper]': 'true',
    '[class.disabled]': 'disabled()'
  }
})
export class CheckboxComponent {
  // Core checkbox properties using modern input() API
  checked = input<boolean>(false);
  indeterminate = input<boolean>(false);
  variant = input<CheckboxVariant>('default');
  size = input<CheckboxSize>('md');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  className = input<string>(''); // Additional classes from outside

  // Label and helper text
  label = input<string | undefined>(undefined);
  helperText = input<string | undefined>(undefined);
  errorMessage = input<string | undefined>(undefined);
  successMessage = input<string | undefined>(undefined);

  // Accessibility properties using modern input() API
  ariaLabel = input<string | undefined>(undefined); // Accessible label for screen readers
  ariaLabelledBy = input<string | undefined>(undefined); // Reference to labelledby element
  ariaDescribedBy = input<string | undefined>(undefined); // Reference to describedby element
  ariaInvalid = input<boolean | undefined>(undefined); // For validation states
  ariaRequired = input<boolean | undefined>(undefined); // Required state for screen readers

  // Event emitters using modern output() API
  checkedChange = output<boolean>();
  checkboxFocus = output<FocusEvent>();
  checkboxBlur = output<FocusEvent>();
  checkboxKeydown = output<KeyboardEvent>();

  // ViewChild for direct checkbox access
  @ViewChild('checkboxElement') checkboxElement!: ElementRef<HTMLInputElement>;

  // Icons from Lucide
  public checkIcon = Check;
  public minusIcon = Minus;

  // Internal state for focus management
  focused = signal(false);

  // Computed properties for better organization
  get checkboxState(): CheckboxState {
    if (this.indeterminate()) {
      return 'indeterminate';
    }
    return this.checked() ? 'checked' : 'unchecked';
  }

  get showCheckIcon(): boolean {
    return this.checked() && !this.indeterminate();
  }

  get showIndeterminateIcon(): boolean {
    return this.indeterminate();
  }

  // Computed ARIA attributes
  get computedAriaLabel(): string | undefined {
    return this.ariaLabel() || (this.label() ? undefined : 'Checkbox');
  }

  get computedAriaDescribedBy(): string {
    const describedBy: string[] = [];

    if (this.ariaDescribedBy()) {
      describedBy.push(this.ariaDescribedBy()!);
    }

    if (this.helperText()) {
      describedBy.push(`${this.checkboxId}-helper`);
    }

    if (this.errorMessage() && this.variant() === 'error') {
      describedBy.push(`${this.checkboxId}-error`);
    }

    if (this.successMessage() && this.variant() === 'success') {
      describedBy.push(`${this.checkboxId}-success`);
    }

    return describedBy.join(' ') || '';
  }

  get computedAriaInvalid(): boolean {
    return this.ariaInvalid() ?? this.variant() === 'error';
  }

  get computedAriaRequired(): boolean {
    return this.ariaRequired() ?? this.required();
  }

  get ariaChecked(): string {
    if (this.indeterminate()) {
      return 'mixed';
    }
    return this.checked() ? 'true' : 'false';
  }

  // Generate unique ID for accessibility
  get checkboxId(): string {
    return `bb-checkbox-${Math.random().toString(36).substring(2, 9)}`;
  }

  // CSS class builders following the guidelines
  get wrapperClasses(): string {
    return ['bb-checkbox-container', 'flex', 'items-start', 'gap-2', this.className()]
      .filter(Boolean)
      .join(' ');
  }

  get checkboxClasses(): string {
    return [this.baseClasses, this.variantClasses, this.sizeClasses, this.stateClasses]
      .filter(Boolean)
      .join(' ');
  }

  private get baseClasses(): string {
    return 'relative mt-0.5 shrink-0 rounded border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';
  }

  private get variantClasses(): string {
    const variants: Record<CheckboxVariant, string> = {
      default: this.getDefaultVariantClasses(),
      success: this.getSuccessVariantClasses(),
      error: this.getErrorVariantClasses(),
      warning: this.getWarningVariantClasses()
    };

    return variants[this.variant()] || variants.default;
  }

  private getDefaultVariantClasses(): string {
    if (this.checked() || this.indeterminate()) {
      return 'border-bytebank-blue bg-bytebank-blue text-white focus:ring-bytebank-blue';
    }
    return 'border-gray-300 bg-white text-gray-900 hover:border-bytebank-blue focus:ring-bytebank-blue';
  }

  private getSuccessVariantClasses(): string {
    if (this.checked() || this.indeterminate()) {
      return 'border-bytebank-green bg-bytebank-green text-white focus:ring-bytebank-green';
    }
    return 'border-gray-300 bg-white text-gray-900 hover:border-bytebank-green focus:ring-bytebank-green';
  }

  private getErrorVariantClasses(): string {
    if (this.checked() || this.indeterminate()) {
      return 'border-red-500 bg-red-500 text-white focus:ring-red-500';
    }
    return 'border-red-500 bg-white text-gray-900 hover:border-red-600 focus:ring-red-500';
  }

  private getWarningVariantClasses(): string {
    if (this.checked() || this.indeterminate()) {
      return 'border-bytebank-orange bg-bytebank-orange text-white focus:ring-bytebank-orange';
    }
    return 'border-gray-300 bg-white text-gray-900 hover:border-bytebank-orange focus:ring-bytebank-orange';
  }

  private get sizeClasses(): string {
    const sizes: Record<CheckboxSize, string> = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    return sizes[this.size()] || sizes.md;
  }

  private get stateClasses(): string {
    if (this.disabled()) {
      return 'opacity-60 cursor-not-allowed';
    }
    if (this.readonly()) {
      return 'cursor-default';
    }
    return '';
  }

  get labelClasses(): string {
    const baseClasses = 'text-sm font-medium cursor-pointer select-none';
    const variantClasses = this.variant() === 'error' ? 'text-red-700' : 'text-gray-700';
    const disabledClasses = this.disabled() ? 'cursor-not-allowed opacity-60' : '';
    return `${baseClasses} ${variantClasses} ${disabledClasses}`.trim();
  }

  get helperTextClasses(): string {
    const baseClasses = 'text-xs mt-1';
    const variants: Record<CheckboxVariant, string> = {
      default: 'text-gray-500',
      success: 'text-bytebank-green',
      error: 'text-red-600',
      warning: 'text-bytebank-orange'
    };

    return `${baseClasses} ${variants[this.variant()]}`;
  }

  get iconSize(): number {
    const sizes: Record<CheckboxSize, number> = {
      sm: 12,
      md: 14,
      lg: 16
    };

    return sizes[this.size()] || sizes.md;
  }

  // Event handlers following the guidelines
  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      return;
    }

    this.toggle();
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    // Handle space and enter keys
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }

    this.checkboxKeydown.emit(event);
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.checkboxFocus.emit(event);
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.checkboxBlur.emit(event);
  }

  // Toggle checkbox state
  private toggle(): void {
    const newCheckedState = !this.checked();
    this.checkedChange.emit(newCheckedState);
  }

  // Focus method for external control
  focus(): void {
    if (this.checkboxElement?.nativeElement) {
      this.checkboxElement.nativeElement.focus();
    }
  }

  // Blur method for external control
  blur(): void {
    if (this.checkboxElement?.nativeElement) {
      this.checkboxElement.nativeElement.blur();
    }
  }
}
