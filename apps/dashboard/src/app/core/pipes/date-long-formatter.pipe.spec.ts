import { DateLongFormatterPipe } from './date-long-formatter.pipe';
import { formatDateToLong } from '@bytebank-pro/utils';

describe('DateLongFormatterPipe', () => {
  let pipe: DateLongFormatterPipe;

  beforeEach(() => {
    pipe = new DateLongFormatterPipe();
  });

  describe('Basic Functionality', () => {
    it('should create the pipe', () => {
      expect(pipe).toBeTruthy();
    });

    it('should transform input correctly', () => {
      const testDate = new Date(2025, 5, 27); // June 27, 2025
      const result = pipe.transform(testDate);

      expect(result).toBe(formatDateToLong(testDate));
    });
  });

  describe('Date Formatting', () => {
    it('should use formatDateToLong utility for date formatting', () => {
      const testDate = new Date(2025, 5, 27); // June 27, 2025
      const expected = formatDateToLong(testDate);

      const result = pipe.transform(testDate);

      expect(result).toBe(expected);
    });

    it('should format different dates correctly', () => {
      const testDate = new Date(2024, 11, 25); // December 25, 2024
      const expected = formatDateToLong(testDate);

      const result = pipe.transform(testDate);

      expect(result).toBe(expected);
    });

    it('should format current date correctly', () => {
      const testDate = new Date();
      const expected = formatDateToLong(testDate);

      const result = pipe.transform(testDate);

      expect(result).toBe(expected);
    });

    it('should format date with specific time correctly', () => {
      const testDate = new Date(2025, 0, 1, 12, 30, 45); // January 1, 2025 at 12:30:45
      const expected = formatDateToLong(testDate);

      const result = pipe.transform(testDate);

      expect(result).toBe(expected);
    });
  });

  describe('Null and Undefined Values', () => {
    it('should return empty string for null value', () => {
      const result = pipe.transform(null);

      expect(result).toBe('');
    });

    it('should return empty string for undefined value', () => {
      const result = pipe.transform(undefined);

      expect(result).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid date objects gracefully', () => {
      const invalidDate = new Date('invalid-date');

      // formatDateToLong should handle invalid dates, so we test the pipe behavior
      const result = pipe.transform(invalidDate);

      expect(result).toBe('');
    });

    it('should handle date with timezone correctly', () => {
      const testDate = new Date('2025-06-27T10:30:00.000Z');
      const expected = formatDateToLong(testDate);

      const result = pipe.transform(testDate);

      expect(result).toBe(expected);
    });
  });
});
