import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Check, ChevronDown, ChevronUp, LucideAngularModule, X } from 'lucide-angular';

// Type definitions for select variants and states
export type SelectVariant = 'default' | 'success' | 'error' | 'warning';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption<T = unknown> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

/**
 * ByteBank Pro Select Component
 *
 * Performance optimized select component with the following enhancements:
 * - Map/Set-based lookups for O(1) operations
 * - Memoized CSS class generation with computed signals
 * - Static ID generation to prevent unnecessary re-renders
 * - Debounced search functionality
 * - Virtual scrolling support for large datasets
 * - Proper cleanup to prevent memory leaks
 */
@Component({
  selector: 'bb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
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
export class SelectComponent<T = unknown> implements OnDestroy {
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

  // Performance optimization: Search debouncing
  private searchDebounceTime = 300;
  private searchTimeout: NodeJS.Timeout | undefined;

  // Click outside listener for closing dropdown
  private clickOutsideListener?: (event: Event) => void;

  // Performance optimization: Generate IDs only once using signals
  private readonly _selectId = signal(`bb-select-${Math.random().toString(36).substring(2, 9)}`);

  // Performance optimization: Create maps for O(1) lookups
  private optionsMap = computed(() => {
    const map = new Map<T, SelectOption<T>>();
    this.options().forEach((option) => map.set(option.value, option));
    return map;
  });

  private selectedValuesSet = computed(() => {
    const value = this.value();
    if (this.multiple() && Array.isArray(value)) {
      return new Set(value);
    }
    return new Set(value !== undefined ? [value] : []);
  });

  // Computed properties for better organization
  filteredOptions = computed(() => {
    const search = this.searchTerm().toLowerCase();
    if (!search || !this.searchable()) {
      return this.options();
    }

    return this.options().filter((option) => option.label.toLowerCase().includes(search));
  });

  // Performance optimization: Use Map lookup for better performance
  selectedOptions = computed(() => {
    const selectedSet = this.selectedValuesSet();
    const optionsMap = this.optionsMap();
    const result: SelectOption<T>[] = [];

    selectedSet.forEach((value) => {
      const option = optionsMap.get(value as T);
      if (option) {
        result.push(option);
      }
    });

    return result;
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

  // Performance optimization: Virtual scrolling support for large lists
  shouldUseVirtualScrolling = computed(() => {
    return this.filteredOptions().length > 100;
  });

  // Generate unique ID for accessibility - optimized to prevent regeneration
  get selectId(): string {
    return this._selectId();
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

  // CSS class builders following the guidelines - optimized with computed signals
  private wrapperClassesComputed = computed(() =>
    ['bb-select-container', this.className()].filter(Boolean).join(' ')
  );

  private selectClassesComputed = computed(() => {
    const baseClass = 'bb-select-trigger';
    const variantClass = `bb-select-trigger-${this.variant()}`;
    const sizeClass = `bb-select-size-${this.size()}`;

    let stateClass = 'bb-select-trigger-normal';
    if (this.disabled()) {
      stateClass = 'bb-select-trigger-disabled';
    } else if (this.readonly()) {
      stateClass = 'bb-select-trigger-readonly';
    }

    return [baseClass, variantClass, sizeClass, stateClass].join(' ');
  });

  private dropdownClassesComputed = computed(() => {
    const baseClass = 'bb-select-dropdown';
    const sizeClass = `bb-select-size-${this.size()}`;
    return [baseClass, sizeClass].join(' ');
  });

  private labelClassesComputed = computed(() => {
    const baseClasses = 'select-label-base';
    const variantClasses =
      this.variant() === 'error' ? 'select-label-error' : 'select-label-normal';
    const disabledClasses = this.disabled() ? 'select-label-disabled' : '';
    return `${baseClasses} ${variantClasses} ${disabledClasses}`.trim();
  });

  private helperTextClassesComputed = computed(() => {
    const baseClasses = 'select-helper-base';
    const variantClass = `select-helper-${this.variant()}`;
    return `${baseClasses} ${variantClass}`;
  });

  private iconSizeComputed = computed(() => {
    const sizes: Record<SelectSize, number> = {
      sm: 16,
      md: 20,
      lg: 24
    };
    return sizes[this.size()] || sizes['md'];
  });

  // Replace getters with computed signals
  get wrapperClasses(): string {
    return this.wrapperClassesComputed();
  }

  get selectClasses(): string {
    return this.selectClassesComputed();
  }

  get dropdownClasses(): string {
    return this.dropdownClassesComputed();
  }

  get labelClasses(): string {
    return this.labelClassesComputed();
  }

  get helperTextClasses(): string {
    return this.helperTextClassesComputed();
  }

  get iconSize(): number {
    return this.iconSizeComputed();
  }

  get optionClasses(): string {
    return 'select-option';
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

    // Add click outside listener
    this.addClickOutsideListener();

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

    // Remove click outside listener
    this.removeClickOutsideListener();
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

      // Get new value based on selection state
      newValue = isSelected
        ? currentValue.filter((v) => v !== option.value)
        : [...currentValue, option.value];
    } else {
      newValue = option.value;
      this.close();
    }

    this.valueChange.emit(newValue);
    this.optionSelect.emit(option);
  }

  isOptionSelected(option: SelectOption<T>): boolean {
    const selectedSet = this.selectedValuesSet();
    return selectedSet.has(option.value as never);
  }

  trackByOption(index: number, option: SelectOption<T>): T {
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

  // Search functionality - optimized with debouncing
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Debounce search
    this.searchTimeout = setTimeout(() => {
      this.searchTerm.set(searchTerm);
      this.searchChange.emit(searchTerm);
      this.focusedOptionIndex.set(0);
    }, this.searchDebounceTime);
  }

  // Keyboard event handlers for accessibility
  onTagKeydown(event: KeyboardEvent, option: SelectOption<T>): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectOption(option);
    }
  }

  onClearKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.clear();
    }
  }

  onOptionKeydown(event: KeyboardEvent, option: SelectOption<T>): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectOption(option);
    }
  }

  // Click outside listener management
  private addClickOutsideListener(): void {
    // Remove existing listener if any
    this.removeClickOutsideListener();

    // Create new listener
    this.clickOutsideListener = (event: Event) => {
      const target = event.target as HTMLElement;
      const selectElement = this.selectElement?.nativeElement;
      const dropdownElement = this.dropdown?.nativeElement;

      // Check if click is outside both select trigger and dropdown
      if (selectElement && dropdownElement) {
        const isOutsideSelect = !selectElement.contains(target);
        const isOutsideDropdown = !dropdownElement.contains(target);

        if (isOutsideSelect && isOutsideDropdown) {
          this.close();
        }
      }
    };

    // Add listener with capture to ensure it runs before other click handlers
    document.addEventListener('click', this.clickOutsideListener, true);
  }

  private removeClickOutsideListener(): void {
    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener, true);
      this.clickOutsideListener = undefined;
    }
  }

  // Cleanup method for proper resource management
  ngOnDestroy(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.removeClickOutsideListener();
  }
}
