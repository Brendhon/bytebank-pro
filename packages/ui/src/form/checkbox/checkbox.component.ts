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
  styleUrls: ['./checkbox.component.css'],
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
    return ['bb-checkbox-container', this.className()].filter(Boolean).join(' ');
  }

  get checkboxClasses(): string {
    return [this.baseClasses, this.variantClasses, this.sizeClasses, this.stateClasses]
      .filter(Boolean)
      .join(' ');
  }

  private get baseClasses(): string {
    return 'checkbox-base';
  }

  private get variantClasses(): string {
    const isChecked = this.checked() || this.indeterminate();
    const variant = this.variant();

    if (isChecked) {
      return `checkbox-${variant}-checked`;
    }
    return `checkbox-${variant}-unchecked`;
  }

  private get sizeClasses(): string {
    const sizes: Record<CheckboxSize, string> = {
      sm: 'checkbox-size-sm',
      md: 'checkbox-size-md',
      lg: 'checkbox-size-lg'
    };

    return sizes[this.size()] || sizes.md;
  }

  private get stateClasses(): string {
    if (this.disabled()) {
      return 'checkbox-disabled';
    }
    if (this.readonly()) {
      return 'checkbox-readonly';
    }
    return '';
  }

  get labelClasses(): string {
    const baseClasses = 'checkbox-label-base';
    const variantClasses =
      this.variant() === 'error' ? 'checkbox-label-error' : 'checkbox-label-normal';
    const disabledClasses = this.disabled() ? 'checkbox-label-disabled' : '';
    return `${baseClasses} ${variantClasses} ${disabledClasses}`.trim();
  }

  get helperTextClasses(): string {
    const baseClasses = 'checkbox-helper-base';
    const variants: Record<CheckboxVariant, string> = {
      default: 'checkbox-helper-default',
      success: 'checkbox-helper-success',
      error: 'checkbox-helper-error',
      warning: 'checkbox-helper-warning'
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
