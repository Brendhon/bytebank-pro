import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@bytebank-pro/utils';

/**
 * Pipe to format numeric values as Brazilian Real (BRL) currency.
 *
 * @example
 * ```html
 * <p>{{ 1234.56 | currencyFormat }}</p>
 * <!-- Output: R$ 1.234,56 -->
 *
 * <p>{{ 1234.56 | currencyFormat:'USD':'code' }}</p>
 * <!-- Output: USD 1,234.56 -->
 * ```
 */
@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
   * Transforms a numeric value into a formatted currency string.
   *
   * @param value - The numeric value to format
   * @param currencyCode - The currency code (default: 'BRL')
   * @param display - How to display the currency ('symbol' | 'code' | 'name')
   * @returns Formatted currency string or empty string if value is null/undefined
   */
  transform(
    value: number | null | undefined,
    currencyCode: string = 'BRL',
    display: string = 'symbol'
  ): string {
    if (value === null || value === undefined) return '';

    // If using default BRL currency, use the utility function
    if (currencyCode === 'BRL' && display === 'symbol') {
      return formatCurrency(value);
    }

    // For other currencies, use Intl.NumberFormat directly
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: display as 'symbol' | 'code' | 'name'
    }).format(value);
  }
}
