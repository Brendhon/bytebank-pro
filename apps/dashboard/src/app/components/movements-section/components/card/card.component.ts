import { CurrencyFormatPipe } from '@/core/pipes/currency-format.pipe';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CardVariant } from '@bytebank-pro/types';
import { isNumber } from '@bytebank-pro/utils';
import { Loader2, LucideAngularModule } from 'lucide-angular';

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
  imports: [CommonModule, LucideAngularModule, CurrencyFormatPipe],
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
   * Provides the `isNumber` utility function to the template.
   */
  protected isNumber = isNumber;

  /**
   * Instance of CurrencyFormatPipe for use in TypeScript code
   */
  private currencyPipe = new CurrencyFormatPipe();

  /**
   * Computed aria-label for accessibility
   */
  protected ariaLabel = computed(() => {
    const currentValue = this.value();
    const currentLabel = this.label();

    if (this.isNumber(currentValue)) {
      return `${currentLabel}: ${this.currencyPipe.transform(currentValue!)}`;
    }
    return `${currentLabel}: Loading`;
  });

  /**
   * Computed property that determines if the component is in loading state
   */
  protected isLoading = computed(() => !this.isNumber(this.value()));

  /**
   * Computes the combined CSS classes for the card's root element.
   * Returns semantic class names instead of concatenating Tailwind classes.
   */
  protected cardClasses = computed(() => {
    const currentVariant = this.variant();
    const variantClass = `card-variant-${currentVariant}`;
    const customClass = this.className();

    return `card-base ${variantClass} ${customClass}`.trim();
  });
}
