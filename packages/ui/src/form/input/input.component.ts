import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  LucideAngularModule,
  LucideIconData
} from 'lucide-angular';

// Type definitions for input variants and states
export type InputVariant = 'default' | 'success' | 'error' | 'warning';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-input-wrapper]': 'true'
  }
})
export class InputComponent {
  // Core input properties using modern input() API
  type = input<InputType>('text');
  variant = input<InputVariant>('default');
  size = input<InputSize>('sm');
  placeholder = input<string>('');
  value = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  className = input<string>(''); // Additional classes from outside

  // Input validation and state
  maxLength = input<number | undefined>(undefined);
  minLength = input<number | undefined>(undefined);
  pattern = input<string | undefined>(undefined);

  // Label and helper text
  label = input<string | undefined>(undefined);
  helperText = input<string | undefined>(undefined);
  errorMessage = input<string | undefined>(undefined);
  successMessage = input<string | undefined>(undefined);

  // Accessibility properties using modern input() API
  ariaLabel = input<string | undefined>(undefined); // Accessible label for screen readers
  ariaDescribedBy = input<string | undefined>(undefined); // Reference to describedby element
  ariaInvalid = input<boolean | undefined>(undefined); // For validation states
  ariaRequired = input<boolean | undefined>(undefined); // Required state for screen readers

  // Password visibility toggle
  showPasswordToggle = input<boolean>(false);

  // Icons
  prefixIcon = input<LucideIconData | undefined>(undefined);
  suffixIcon = input<LucideIconData | undefined>(undefined);

  // Event emitters using modern output() API
  valueChange = output<string>();
  inputFocus = output<FocusEvent>();
  inputBlur = output<FocusEvent>();
  inputKeydown = output<KeyboardEvent>();
  inputKeyup = output<KeyboardEvent>();

  // ViewChild for direct input access
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  // Icons from Lucide
  public eyeIcon = Eye;
  public eyeOffIcon = EyeOff;
  public alertIcon = AlertCircle;
  public checkIcon = CheckCircle;

  // Password visibility state
  passwordVisible = signal(false);

  // Computed properties for better organization
  get isPasswordField(): boolean {
    return this.type() === 'password';
  }

  get showPasswordButton(): boolean {
    return this.isPasswordField && this.showPasswordToggle();
  }

  get effectiveInputType(): string {
    if (this.isPasswordField && this.passwordVisible()) {
      return 'text';
    }
    return this.type();
  }

  get hasPrefix(): boolean {
    return !!this.prefixIcon();
  }

  get hasSuffix(): boolean {
    return !!this.suffixIcon() || this.showPasswordButton;
  }

  get showSuccessIcon(): boolean {
    return this.variant() === 'success' && !this.hasSuffix;
  }

  get showErrorIcon(): boolean {
    return this.variant() === 'error' && !this.hasSuffix;
  }

  // Computed ARIA attributes
  get computedAriaLabel(): string | undefined {
    return this.ariaLabel() || (this.label() ? undefined : this.placeholder());
  }

  get computedAriaDescribedBy(): string {
    const describedBy: string[] = [];

    if (this.ariaDescribedBy()) {
      describedBy.push(this.ariaDescribedBy()!);
    }

    if (this.helperText()) {
      describedBy.push(`${this.inputId}-helper`);
    }

    if (this.errorMessage() && this.variant() === 'error') {
      describedBy.push(`${this.inputId}-error`);
    }

    if (this.successMessage() && this.variant() === 'success') {
      describedBy.push(`${this.inputId}-success`);
    }

    return describedBy.join(' ') || '';
  }

  get computedAriaInvalid(): boolean {
    return this.ariaInvalid() ?? this.variant() === 'error';
  }

  get computedAriaRequired(): boolean {
    return this.ariaRequired() ?? this.required();
  }

  // Generate unique ID for accessibility
  get inputId(): string {
    return `bb-input-${Math.random().toString(36).substring(2, 9)}`;
  }

  // CSS class builders following the guidelines
  get wrapperClasses(): string {
    return ['bb-input-container', this.className()].filter(Boolean).join(' ');
  }

  get inputClasses(): string {
    return [
      this.baseClasses,
      this.variantClasses,
      this.sizeClasses,
      this.stateClasses,
      this.spacingClasses
    ]
      .filter(Boolean)
      .join(' ');
  }

  private get baseClasses(): string {
    return 'w-full rounded-md border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 placeholder:text-gray-400';
  }

  private get variantClasses(): string {
    const variants: Record<InputVariant, string> = {
      default:
        'border-gray-300 bg-white text-gray-900 focus:border-bytebank-blue focus:ring-bytebank-blue',
      success:
        'border-bytebank-green bg-white text-gray-900 focus:border-bytebank-green focus:ring-bytebank-green',
      error: 'border-red-500 bg-white text-gray-900 focus:border-red-500 focus:ring-red-500',
      warning:
        'border-bytebank-orange bg-white text-gray-900 focus:border-bytebank-orange focus:ring-bytebank-orange'
    };

    return variants[this.variant()] || variants.default;
  }

  private get sizeClasses(): string {
    const sizes: Record<InputSize, string> = {
      sm: 'px-3 py-1.5 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-sm min-h-[40px]',
      lg: 'px-4 py-3 text-base min-h-[44px]'
    };

    return sizes[this.size()] || sizes.md;
  }

  private get stateClasses(): string {
    if (this.disabled()) {
      return 'opacity-60 cursor-not-allowed bg-gray-50';
    }
    if (this.readonly()) {
      return 'bg-gray-50 cursor-default';
    }
    return '';
  }

  private get spacingClasses(): string {
    let classes = '';

    if (this.hasPrefix) {
      classes += ' pl-10';
    }

    if (this.hasSuffix || this.showPasswordButton || this.showSuccessIcon || this.showErrorIcon) {
      classes += ' pr-10';
    }

    return classes;
  }

  get labelClasses(): string {
    const baseClasses = 'block text-base font-semibold mb-3 text-bytebank-dark-gray';
    const variantClasses = this.variant() === 'error' ? 'text-red-700' : 'text-gray-700';
    return `${baseClasses} ${variantClasses}`;
  }

  get helperTextClasses(): string {
    const baseClasses = 'text-xs mt-1';
    const variants: Record<InputVariant, string> = {
      default: 'text-gray-500',
      success: 'text-bytebank-green',
      error: 'text-red-600',
      warning: 'text-bytebank-orange'
    };

    return `${baseClasses} ${variants[this.variant()]}`;
  }

  // Event handlers following the guidelines
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  handleFocus(event: FocusEvent): void {
    this.inputFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.inputBlur.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    this.inputKeydown.emit(event);
  }

  handleKeyup(event: KeyboardEvent): void {
    this.inputKeyup.emit(event);
  }

  // Password visibility toggle
  togglePasswordVisibility(): void {
    if (!this.showPasswordButton) return;

    this.passwordVisible.set(!this.passwordVisible());

    // Maintain focus on input after toggle
    setTimeout(() => {
      this.inputElement?.nativeElement?.focus();
    }, 0);
  }

  // Focus method for external control
  focus(): void {
    this.inputElement?.nativeElement?.focus();
  }

  // Blur method for external control
  blur(): void {
    this.inputElement?.nativeElement?.blur();
  }
}
