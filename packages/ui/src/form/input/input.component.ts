import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  computed,
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
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date';
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

  // Computed properties for better performance using computed()
  isPasswordField = computed(() => this.type() === 'password');

  isDateField = computed(() => this.type() === 'date');

  showPasswordButton = computed(() => this.isPasswordField() && this.showPasswordToggle());

  effectiveInputType = computed(() => {
    if (this.isPasswordField() && this.passwordVisible()) {
      return 'text';
    }
    return this.type();
  });

  hasPrefix = computed(() => !!this.prefixIcon());

  hasSuffix = computed<boolean>(
    () =>
      !!this.suffixIcon() || this.showPasswordButton() || (this.isDateField() && !this.suffixIcon())
  );

  showSuccessIcon = computed<boolean>(() => this.variant() === 'success' && !this.hasSuffix());

  showErrorIcon = computed<boolean>(() => this.variant() === 'error' && !this.hasSuffix());

  // Computed ARIA attributes
  computedAriaLabel = computed(
    () => this.ariaLabel() || (this.label() ? undefined : this.placeholder())
  );

  computedAriaDescribedBy = computed(() => {
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
  });

  computedAriaInvalid = computed(() => this.ariaInvalid() ?? this.variant() === 'error');

  computedAriaRequired = computed(() => this.ariaRequired() ?? this.required());

  // Generate unique ID for accessibility
  get inputId(): string {
    return `bb-input-${Math.random().toString(36).substring(2, 9)}`;
  }

  // CSS class builders optimized with computed()
  wrapperClasses = computed(() => {
    return ['bb-input-container', this.className()].filter(Boolean).join(' ');
  });

  inputClasses = computed(() => {
    return [
      this.baseClasses,
      this.variantClasses(),
      this.sizeClasses(),
      this.stateClasses(),
      this.spacingClasses()
    ]
      .filter(Boolean)
      .join(' ');
  });

  private get baseClasses(): string {
    return 'input-base';
  }

  private variantClasses = computed(() => {
    const variants: Record<InputVariant, string> = {
      default: 'input-default',
      success: 'input-success',
      error: 'input-error',
      warning: 'input-warning'
    };

    return variants[this.variant()] || variants.default;
  });

  private sizeClasses = computed(() => {
    const sizes: Record<InputSize, string> = {
      sm: 'input-size-sm',
      md: 'input-size-md',
      lg: 'input-size-lg'
    };

    return sizes[this.size()] || sizes.md;
  });

  private stateClasses = computed(() => {
    if (this.disabled()) {
      return 'input-disabled';
    }
    if (this.readonly()) {
      return 'input-readonly';
    }
    return '';
  });

  private spacingClasses = computed(() => {
    let classes = '';

    if (this.hasPrefix()) {
      classes += ' input-with-prefix';
    }

    if (
      this.hasSuffix() ||
      this.showPasswordButton() ||
      this.showSuccessIcon() ||
      this.showErrorIcon()
    ) {
      classes += ' input-with-suffix';
    }

    return classes;
  });

  labelClasses = computed(() => {
    const baseClasses = 'input-label-base';
    const variantClasses = this.variant() === 'error' ? 'input-label-error' : 'input-label-normal';
    return `${baseClasses} ${variantClasses}`;
  });

  helperTextClasses = computed(() => {
    const baseClasses = 'input-helper-base';
    const variants: Record<InputVariant, string> = {
      default: 'input-helper-default',
      success: 'input-helper-success',
      error: 'input-helper-error',
      warning: 'input-helper-warning'
    };

    return `${baseClasses} ${variants[this.variant()]}`;
  });

  // Event handlers following the guidelines
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Special handling for date inputs
    if (this.isDateField()) {
      value = this.validateAndFormatDateInput(value);
    }

    this.valueChange.emit(value);
  }

  handleFocus(event: FocusEvent): void {
    this.inputFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.inputBlur.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    // Prevent non-numeric input for date fields (except allowed characters)
    if (this.isDateField()) {
      this.handleDateKeydown(event);
    }

    this.inputKeydown.emit(event);
  }

  handleKeyup(event: KeyboardEvent): void {
    this.inputKeyup.emit(event);
  }

  // Date input specific validation and formatting
  private validateAndFormatDateInput(value: string): string {
    // Remove any non-digit characters except hyphens
    const cleaned = value.replace(/[^\d-]/g, '');

    // Ensure proper date format YYYY-MM-DD
    if (cleaned.length > 10) {
      return cleaned.substring(0, 10);
    }

    return cleaned;
  }

  private handleDateKeydown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End'
    ];

    const key = event.key;

    // Allow allowed keys
    if (allowedKeys.includes(key)) {
      return;
    }

    // Allow digits and hyphens
    if (/[\d-]/.test(key)) {
      return;
    }

    // Prevent all other keys
    event.preventDefault();
  }

  // Password visibility toggle
  togglePasswordVisibility(): void {
    if (!this.showPasswordButton()) return;

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
