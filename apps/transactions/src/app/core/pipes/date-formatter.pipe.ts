import { Pipe, PipeTransform } from '@angular/core';
import { formatDateToShort, parseDate } from '@bytebank-pro/utils';

/**
 * A pipe to format a Date object or string into a short date string.
 *
 * @example
 * ```html
 * <span>{{ todayDate | dateFormatter }}</span>
 * ```
 */
@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {
  /**
   * Transforms a Date object or string into a short formatted date string.
   * @param value The Date object to format.
   * @returns The formatted date string or empty string if value is null/undefined.
   */
  transform(value: Date | null | undefined | string): string {
    if (typeof value === 'string') value = parseDate(value);
    return value && !isNaN(value.getTime()) ? formatDateToShort(value) : '';
  }
}
