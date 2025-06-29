import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loader2, LucideAngularModule } from 'lucide-angular';
import { formatCurrency, isNumber } from '@bytebank-pro/utils';

/**
 * Defines the possible visual variants for the Card component.
 */
export type CardVariant = 'dark' | 'blue' | 'green' | 'orange';

/**
 * Card component to display a value (e.g., currency) and a label, with different visual variants.
 * It can show a formatted number or a loading spinner.
 *
 * @example
 * ```html
 * <bb-card variant="blue" [value]="1234.56" label="Total Sales"></bb-card>
 * <bb-card variant="dark" [value]="null" label="Loading Data"></bb-card>
 * ```
 */
@Component({
  selector: 'bb-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  host: {
    role: 'article',
    '[attr.aria-label]': 'ariaLabel()'
  }
})
export class CardComponent {
  /**
   * The visual variant of the card, affecting its background color.
   * @default 'dark'
   */
  variant = input<CardVariant>('dark');

  /**
   * Additional CSS classes to apply to the card's root element.
   * @default ''
   */
  className = input<string>('');

  /**
   * The numeric value to display. If not a number, a loading spinner will be shown.
   */
  value = input<number | null | undefined>();

  /**
   * The label text displayed below the value or loading spinner.
   * @default 'Pagamentos'
   */
  label = input<string>('Pagamentos');

  /**
   * Icon for loading state, using Lucide icons.
   * This will be displayed while the logo is being loaded.
   */
  loadingIcon = Loader2;

  /**
   * Provides the `formatCurrency` utility function to the template.
   */
  protected formatCurrency = formatCurrency;

  /**
   * Provides the `isNumber` utility function to the template.
   */
  protected isNumber = isNumber;

  /**
   * Computed aria-label for accessibility
   */
  protected ariaLabel = computed(() => {
    const currentValue = this.value();
    const currentLabel = this.label();

    if (this.isNumber(currentValue)) {
      return `${currentLabel}: ${this.formatCurrency(currentValue!)}`;
    }
    return `${currentLabel}: Loading`;
  });

  /**
   * Computed property that determines if the component is in loading state
   */
  protected isLoading = computed(() => !this.isNumber(this.value()));

  /**
   * Computes the combined CSS classes for the card's root element.
   * This replaces the `cva` and `cn` utilities from the React component.
   */
  protected cardClasses = computed(() => {
    // Base classes for the card
    const baseClasses =
      'w-[200px] h-[160px] rounded-sm text-white transition-colors flex flex-col gap-7 items-center justify-center shadow-sm text-sm font-normal rounded-sm p-7 shadow-sm';

    // Variant classes, mapping to the global CSS variables via Tailwind
    const variantClasses: Record<CardVariant, string> = {
      dark: 'bg-bytebank-dark',
      blue: 'bg-bytebank-blue',
      green: 'bg-bytebank-green',
      orange: 'bg-bytebank-orange'
    };

    const currentVariant = this.variant();
    const selectedVariantClass = variantClasses[currentVariant] || variantClasses.dark;

    // Combine all classes, including the custom className input
    return `${baseClasses} ${selectedVariantClass} ${this.className()}`.trim();
  });
}
