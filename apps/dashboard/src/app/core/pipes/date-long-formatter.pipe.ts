import { Pipe, PipeTransform } from '@angular/core';
import { formatDateToLong } from '@bytebank-pro/utils';

/**
 * A pipe to format a Date object into a long date string.
 *
 * @example
 * ```html
 * <span>{{ todayDate | dateLongFormatter }}</span>
 * ```
 */
@Pipe({
  name: 'dateLongFormatter',
  standalone: true
})
export class DateLongFormatterPipe implements PipeTransform {
  /**
   * Transforms a Date object into a long formatted date string.
   * @param value The Date object to format.
   * @returns The formatted date string or empty string if value is null/undefined.
   */
  transform(value: Date | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    return formatDateToLong(value);
  }
}
