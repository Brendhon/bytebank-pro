import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Loader2, LucideAngularModule } from 'lucide-angular';

// You can define the variants as a type for safety
export type ButtonVariant = 'dark' | 'blue' | 'green' | 'orange' | 'outlineGreen' | 'outlineOrange';
export type ButtonType = HTMLButtonElement['type'];

@Component({
  selector: 'bb-button', // Your custom prefix
  templateUrl: './button.component.html',
  styleUrls: ['../styles/index.css'], // Make sure you have a corresponding CSS file
  standalone: true,
  imports: [CommonModule, LucideAngularModule]
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() variant: ButtonVariant = 'blue';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() className: string = ''; // For additional classes passed from outside
  @Input() ariaLabel?: string; // Optional accessible label
  @Input() loadingAriaLabel?: string; // Label during loading
  @Input() loadingText: string = 'Carregando...'; // Text for screen readers

  @Output() buttonClick = new EventEmitter<Event>();

  // Loading icon
  public loadingIcon = Loader2;

  // Method to get CSS classes based on the variant
  get buttonClasses(): string {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium px-4 py-2 text-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
    let variantClasses = '';

    switch (this.variant) {
      case 'dark':
        variantClasses =
          'bg-bytebank-dark text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500';
        break;
      case 'blue':
        variantClasses =
          'bg-bytebank-blue text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500';
        break;
      case 'green':
        variantClasses =
          'bg-bytebank-green text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-500';
        break;
      case 'orange':
        variantClasses =
          'bg-bytebank-orange text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-500';
        break;
      case 'outlineGreen':
        variantClasses =
          'bg-transparent border border-bytebank-green text-bytebank-green hover:bg-green-50 focus:ring-green-500';
        break;
      case 'outlineOrange':
        variantClasses =
          'bg-transparent border border-bytebank-orange text-bytebank-orange hover:bg-orange-50 focus:ring-orange-500';
        break;
      default:
        variantClasses =
          'bg-bytebank-blue text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500'; // Default
    }

    const disabledClasses =
      this.disabled || this.loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';

    // Combine all classes. The `className` allows you to override or add external classes.
    return `${baseClasses} ${variantClasses} ${disabledClasses} ${this.className}`;
  }
}
