import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Check, ChevronDown, ChevronUp, LucideAngularModule, X } from 'lucide-angular';

// Type definitions for select variants and states
export type SelectVariant = 'default' | 'success' | 'error' | 'warning';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

@Component({
  selector: 'bb-select',
  templateUrl: './select.component.html',
  styleUrls: ['../styles/index.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-select-wrapper]': 'true',
    '[class.disabled]': 'disabled()',
    '[class.readonly]': 'readonly()',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.role]': '"combobox"'
  }
})
export class SelectComponent<T = any> {
  private destroyRef = inject(DestroyRef);

  // Core select properties using modern input() API
  value = input<T | T[] | undefined>(undefined);
  options = input<SelectOption<T>[]>([]);
  groups = input<SelectGroup[] | undefined>(undefined);
  multiple = input<boolean>(false);
  searchable = input<boolean>(false);
  clearable = input<boolean>(false);
  variant = input<SelectVariant>('default');
  size = input<SelectSize>('sm');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  loading = input<boolean>(false);
  maxHeight = input<string>('200px');
  placeholder = input<string>('Select an option');
  searchPlaceholder = input<string>('Search...');
  noOptionsText = input<string>('No options available');
  noResultsText = input<string>('No results found');
  className = input<string>('');

  // Label and helper text
  label = input<string | undefined>(undefined);
  helperText = input<string | undefined>(undefined);
  errorMessage = input<string | undefined>(undefined);
  successMessage = input<string | undefined>(undefined);

  // Accessibility properties using modern input() API
  ariaLabel = input<string | undefined>(undefined);
  ariaLabelledBy = input<string | undefined>(undefined);
  ariaDescribedBy = input<string | undefined>(undefined);
  ariaInvalid = input<boolean | undefined>(undefined);
  ariaRequired = input<boolean | undefined>(undefined);

  // Event emitters using modern output() API
  valueChange = output<T | T[] | undefined>();
  selectFocus = output<FocusEvent>();
  selectBlur = output<FocusEvent>();
  selectKeydown = output<KeyboardEvent>();
  searchChange = output<string>();
  optionSelect = output<SelectOption<T>>();
  dropdownOpen = output<void>();
  dropdownClose = output<void>();

  // ViewChild references
  @ViewChild('selectElement') selectElement!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;

  // Icons from Lucide
  public chevronDownIcon = ChevronDown;
  public chevronUpIcon = ChevronUp;
  public checkIcon = Check;
  public xIcon = X;

  // Internal state management
  isOpen = signal(false);
  focused = signal(false);
  searchTerm = signal('');
  focusedOptionIndex = signal(-1);
  hoveredOptionIndex = signal(-1);

  // Computed properties for better organization
  filteredOptions = computed(() => {
    const search = this.searchTerm().toLowerCase();
    if (!search || !this.searchable()) {
      return this.options();
    }

    return this.options().filter((option) => option.label.toLowerCase().includes(search));
  });

  selectedOptions = computed(() => {
    const value = this.value();
    if (!value) return [];

    if (this.multiple() && Array.isArray(value)) {
      return this.options().filter((option) => value.includes(option.value));
    }

    const selectedOption = this.options().find((option) => option.value === value);
    return selectedOption ? [selectedOption] : [];
  });

  hasSelection = computed(() => {
    const value = this.value();
    if (this.multiple() && Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null;
  });

  displayValue = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) {
      return this.placeholder();
    }

    if (this.multiple()) {
      return selected.length === 1 ? selected[0].label : `${selected.length} items selected`;
    }

    return selected[0].label;
  });

  showClearButton = computed(() => {
    return this.clearable() && this.hasSelection() && !this.disabled() && !this.readonly();
  });

  // Generate unique ID for accessibility
  get selectId(): string {
    return `bb-select-${Math.random().toString(36).substring(2, 9)}`;
  }

  get listboxId(): string {
    return `${this.selectId}-listbox`;
  }

  // Computed ARIA attributes
  get computedAriaLabel(): string | undefined {
    return this.ariaLabel() || (this.label() ? undefined : 'Select');
  }

  get computedAriaDescribedBy(): string {
    const describedBy: string[] = [];

    if (this.ariaDescribedBy()) {
      describedBy.push(this.ariaDescribedBy()!);
    }

    if (this.helperText()) {
      describedBy.push(`${this.selectId}-helper`);
    }

    if (this.errorMessage() && this.variant() === 'error') {
      describedBy.push(`${this.selectId}-error`);
    }

    if (this.successMessage() && this.variant() === 'success') {
      describedBy.push(`${this.selectId}-success`);
    }

    return describedBy.join(' ') || '';
  }

  get computedAriaInvalid(): boolean {
    return this.ariaInvalid() ?? this.variant() === 'error';
  }

  get computedAriaRequired(): boolean {
    return this.ariaRequired() ?? this.required();
  }

  // CSS class builders following the guidelines
  get wrapperClasses(): string {
    return ['bb-select-container', 'relative', this.className()].filter(Boolean).join(' ');
  }

  get selectClasses(): string {
    return [this.baseClasses, this.variantClasses, this.sizeClasses, this.stateClasses]
      .filter(Boolean)
      .join(' ');
  }

  private get baseClasses(): string {
    return 'relative w-full cursor-pointer rounded-md border bg-white px-3 py-2 text-left shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  }

  private get variantClasses(): string {
    const variants: Record<SelectVariant, string> = {
      default:
        'border-gray-300 hover:border-bytebank-blue focus:border-bytebank-blue focus:ring-bytebank-blue',
      success: 'border-bytebank-green focus:border-bytebank-green focus:ring-bytebank-green',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      warning: 'border-bytebank-orange focus:border-bytebank-orange focus:ring-bytebank-orange'
    };

    return variants[this.variant()] || variants.default;
  }

  private get sizeClasses(): string {
    const sizes: Record<SelectSize, string> = {
      sm: 'min-h-[32px] text-sm',
      md: 'min-h-[40px] text-sm',
      lg: 'min-h-[48px] text-base'
    };

    return sizes[this.size()] || sizes.md;
  }

  private get stateClasses(): string {
    if (this.disabled()) {
      return 'bg-gray-100 text-gray-500 cursor-not-allowed';
    }
    if (this.readonly()) {
      return 'bg-gray-50 cursor-default';
    }
    return 'text-gray-900';
  }

  get dropdownClasses(): string {
    return [
      'absolute z-50 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
      this.sizeClasses
    ].join(' ');
  }

  get optionClasses(): string {
    return 'relative cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-gray-100';
  }

  get labelClasses(): string {
    const baseClasses = 'block text-sm font-medium mb-1';
    const variantClasses = this.variant() === 'error' ? 'text-red-700' : 'text-gray-700';
    const disabledClasses = this.disabled() ? 'opacity-60' : '';
    return `${baseClasses} ${variantClasses} ${disabledClasses}`.trim();
  }

  get helperTextClasses(): string {
    const baseClasses = 'text-xs mt-1';
    const variants: Record<SelectVariant, string> = {
      default: 'text-gray-500',
      success: 'text-bytebank-green',
      error: 'text-red-600',
      warning: 'text-bytebank-orange'
    };

    return `${baseClasses} ${variants[this.variant()]}`;
  }

  get iconSize(): number {
    const sizes: Record<SelectSize, number> = {
      sm: 16,
      md: 20,
      lg: 24
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

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen()) {
          this.selectFocusedOption();
        } else {
          this.open();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (this.isOpen()) {
          this.focusNextOption();
        } else {
          this.open();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.focusPreviousOption();
        } else {
          this.open();
        }
        break;

      case 'Home':
        if (this.isOpen()) {
          event.preventDefault();
          this.focusFirstOption();
        }
        break;

      case 'End':
        if (this.isOpen()) {
          event.preventDefault();
          this.focusLastOption();
        }
        break;
    }

    this.selectKeydown.emit(event);
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.selectFocus.emit(event);
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: FocusEvent): void {
    // Delay to allow for focus to move to dropdown
    setTimeout(() => {
      if (!this.dropdown?.nativeElement?.contains(document.activeElement)) {
        this.focused.set(false);
        this.close();
        this.selectBlur.emit(event);
      }
    }, 0);
  }

  // Public methods
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.disabled() || this.readonly() || this.isOpen()) {
      return;
    }

    this.isOpen.set(true);
    this.dropdownOpen.emit();

    // Focus first option or search input
    setTimeout(() => {
      if (this.searchable() && this.searchInput?.nativeElement) {
        this.searchInput.nativeElement.focus();
      } else {
        this.focusFirstOption();
      }
    }, 0);
  }

  close(): void {
    if (!this.isOpen()) {
      return;
    }

    this.isOpen.set(false);
    this.searchTerm.set('');
    this.focusedOptionIndex.set(-1);
    this.dropdownClose.emit();
  }

  clear(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const newValue = this.multiple() ? [] : undefined;
    this.valueChange.emit(newValue);
  }

  selectOption(option: SelectOption<T>): void {
    if (option.disabled || this.disabled() || this.readonly()) {
      return;
    }

    let newValue: T | T[] | undefined;

    if (this.multiple()) {
      const currentValue = (this.value() as T[]) || [];
      const isSelected = currentValue.includes(option.value);

      if (isSelected) {
        newValue = currentValue.filter((v) => v !== option.value);
      } else {
        newValue = [...currentValue, option.value];
      }
    } else {
      newValue = option.value;
      this.close();
    }

    this.valueChange.emit(newValue);
    this.optionSelect.emit(option);
  }

  isOptionSelected(option: SelectOption<T>): boolean {
    const value = this.value();

    if (this.multiple() && Array.isArray(value)) {
      return value.includes(option.value);
    }

    return value === option.value;
  }

  trackByOption(index: number, option: SelectOption<T>): any {
    return option.value;
  }

  // Focus management methods
  private focusNextOption(): void {
    const options = this.filteredOptions();
    const currentIndex = this.focusedOptionIndex();
    const nextIndex = Math.min(currentIndex + 1, options.length - 1);
    this.focusedOptionIndex.set(nextIndex);
  }

  private focusPreviousOption(): void {
    const currentIndex = this.focusedOptionIndex();
    const previousIndex = Math.max(currentIndex - 1, 0);
    this.focusedOptionIndex.set(previousIndex);
  }

  private focusFirstOption(): void {
    this.focusedOptionIndex.set(0);
  }

  private focusLastOption(): void {
    const options = this.filteredOptions();
    this.focusedOptionIndex.set(options.length - 1);
  }

  private selectFocusedOption(): void {
    const options = this.filteredOptions();
    const focusedIndex = this.focusedOptionIndex();

    if (focusedIndex >= 0 && focusedIndex < options.length) {
      this.selectOption(options[focusedIndex]);
    }
  }

  // Search functionality
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    this.searchTerm.set(searchTerm);
    this.searchChange.emit(searchTerm);
    this.focusedOptionIndex.set(0); // Reset focus to first option
  }

  // Focus method for external control
  focus(): void {
    if (this.selectElement?.nativeElement) {
      this.selectElement.nativeElement.focus();
    }
  }

  // Blur method for external control
  blur(): void {
    if (this.selectElement?.nativeElement) {
      this.selectElement.nativeElement.blur();
    }
  }
}
