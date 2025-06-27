import {
  formatDateToLong,
  formatDateToShort,
  formatCurrency,
  isNumber,
  parseDate,
  sortByDate,
  removeEmptyFields
} from './index';

describe('Utils Functions', () => {
  describe('formatDateToLong', () => {
    test('should format date to long format in Portuguese', () => {
      const date = new Date(2025, 5, 27); // June 27, 2025
      const result = formatDateToLong(date);
      expect(result).toMatch(/^[a-záéíóúç-]+, \d{2}\/\d{2}\/\d{4}$/i);
      expect(result).toContain('27/06/2025');
    });
  });

  describe('formatDateToShort', () => {
    test('should format date to short format', () => {
      const date = new Date(2025, 5, 27); // June 27, 2025
      const result = formatDateToShort(date);
      expect(result).toBe('27/06/2025');
    });

    test('should format different date correctly', () => {
      const date = new Date(2024, 11, 25); // December 25, 2024
      const result = formatDateToShort(date);
      expect(result).toBe('25/12/2024');
    });
  });

  describe('formatCurrency', () => {
    test('should format positive number as Brazilian currency', () => {
      const result = formatCurrency(1234.56);
      expect(result).toMatch(/^R\$\s1\.234,56$/);
      expect(result).toContain('1.234,56');
    });

    test('should format zero as currency', () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/^R\$\s0,00$/);
      expect(result).toContain('0,00');
    });

    test('should format negative number as currency', () => {
      const result = formatCurrency(-500.75);
      expect(result).toMatch(/^-R\$\s500,75$/);
      expect(result).toContain('500,75');
    });

    test('should format large number as currency', () => {
      const result = formatCurrency(1000000);
      expect(result).toMatch(/^R\$\s1\.000\.000,00$/);
      expect(result).toContain('1.000.000,00');
    });
  });

  describe('isNumber', () => {
    test('should return true for valid numbers', () => {
      expect(isNumber(42)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-10)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
    });

    test('should return false for invalid numbers', () => {
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber('42')).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
    });
  });

  describe('parseDate', () => {
    test('should parse date string to Date object', () => {
      const result = parseDate('27/06/2025');
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5); // 0-based month (June = 5)
      expect(result.getDate()).toBe(27);
    });

    test('should parse different date format', () => {
      const result = parseDate('01/01/2000');
      expect(result.getFullYear()).toBe(2000);
      expect(result.getMonth()).toBe(0); // January = 0
      expect(result.getDate()).toBe(1);
    });
  });

  describe('sortByDate', () => {
    test('should sort array by date property in descending order', () => {
      const transactions = [
        { id: 1, date: '25/06/2025', amount: 100 },
        { id: 2, date: '27/06/2025', amount: 200 },
        { id: 3, date: '26/06/2025', amount: 150 }
      ];

      const sorted = sortByDate(transactions, 'date');

      expect(sorted[0].date).toBe('27/06/2025');
      expect(sorted[1].date).toBe('26/06/2025');
      expect(sorted[2].date).toBe('25/06/2025');
    });

    test('should handle empty array', () => {
      const result = sortByDate([], 'date');
      expect(result).toEqual([]);
    });

    test('should handle single item array', () => {
      const items = [{ date: '01/01/2025', value: 'test' }];
      const result = sortByDate(items, 'date');
      expect(result).toEqual(items);
    });
  });

  describe('removeEmptyFields', () => {
    test('should remove empty string fields', () => {
      const obj = {
        name: 'John',
        email: '',
        age: 30,
        address: ''
      };

      const result = removeEmptyFields(obj);

      expect(result).toEqual({
        name: 'John',
        age: 30
      });
    });

    test('should remove null and undefined fields', () => {
      const obj = {
        name: 'John',
        email: null,
        age: 30,
        phone: undefined,
        active: true
      };

      const result = removeEmptyFields(obj);

      expect(result).toEqual({
        name: 'John',
        age: 30,
        active: true
      });
    });

    test('should keep falsy values that are not empty', () => {
      const obj = {
        name: 'John',
        age: 0,
        active: false,
        empty: '',
        nullValue: null
      };

      const result = removeEmptyFields(obj);

      expect(result).toEqual({
        name: 'John',
        age: 0,
        active: false
      });
    });

    test('should handle empty object', () => {
      const result = removeEmptyFields({});
      expect(result).toEqual({});
    });
  });
});
