import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Loader2, LucideAngularModule } from 'lucide-angular';

// Type definitions for button variants and sizes
export type ButtonVariant = 'dark' | 'blue' | 'green' | 'orange' | 'outlineGreen' | 'outlineOrange';
export type ButtonType = HTMLButtonElement['type'];
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bb-button',
  templateUrl: './button.component.html',
  styleUrls: ['../styles/index.css'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  // Core button properties using modern input() API
  type = input<ButtonType>('button');
  variant = input<ButtonVariant>('blue');
  size = input<ButtonSize>('md');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  className = input<string>(''); // Additional classes from outside

  // Accessibility properties using modern input() API
  ariaLabel = input<string | undefined>(undefined); // Accessible label for screen readers
  ariaDescribedBy = input<string | undefined>(undefined); // Reference to describedby element
  ariaPressed = input<boolean | undefined>(undefined); // For toggle buttons
  role = input<string | undefined>(undefined); // Custom role if needed

  // Loading state properties using modern input() API
  loadingText = input<string>('Carregando...'); // Text for screen readers during loading

  // Event emitters using modern output() API
  buttonClick = output<Event>();

  // Loading icon from Lucide
  public loadingIcon = Loader2;

  // Computed properties for better organization
  get isInteractive(): boolean {
    return !this.disabled() && !this.loading();
  }

  // Computed properties for ARIA attributes and CSS classes
  get computedAriaLabel(): string {
    return this.loading() ? this.loadingText() : this.ariaLabel() || '';
  }

  get computedRole(): string {
    return this.role() || 'button';
  }

  // CSS class builders following the guidelines
  get buttonClasses(): string {
    return [
      this.baseClasses,
      this.variantClasses,
      this.sizeClasses,
      this.stateClasses,
      this.className()
    ]
      .filter(Boolean)
      .join(' ');
  }

  private get baseClasses(): string {
    return 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 relative';
  }

  private get variantClasses(): string {
    const variants: Record<ButtonVariant, string> = {
      dark: 'bg-bytebank-dark text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500',
      blue: 'bg-bytebank-blue text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500',
      green:
        'bg-bytebank-green text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-500',
      orange:
        'bg-bytebank-orange text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-500',
      outlineGreen:
        'bg-transparent border border-bytebank-green text-bytebank-green hover:bg-green-50 focus:ring-green-500',
      outlineOrange:
        'bg-transparent border border-bytebank-orange text-bytebank-orange hover:bg-orange-50 focus:ring-orange-500'
    };

    return variants[this.variant()] || variants.blue;
  }

  private get sizeClasses(): string {
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    return sizes[this.size()] || sizes.md;
  }

  private get stateClasses(): string {
    if (this.disabled() || this.loading()) {
      return 'opacity-60 cursor-not-allowed pointer-events-none';
    }
    return '';
  }

  // Event handler following the guidelines
  handleClick(event: Event): void {
    if (!this.isInteractive) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }
}
