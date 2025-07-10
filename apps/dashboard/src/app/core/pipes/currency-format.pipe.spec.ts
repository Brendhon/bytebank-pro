import { CurrencyFormatPipe } from './currency-format.pipe';
import { formatCurrency } from '@bytebank-pro/utils';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  describe('Basic Functionality', () => {
    it('should create the pipe', () => {
      expect(pipe).toBeTruthy();
    });

    it('should transform input correctly', () => {
      const result = pipe.transform(100);

      expect(result).toBe(formatCurrency(100));
    });
  });

  describe('BRL Currency Formatting', () => {
    it('should use formatCurrency utility for default BRL formatting', () => {
      const testValue = 1234.56;
      const expected = formatCurrency(testValue);

      const result = pipe.transform(testValue);

      expect(result).toBe(expected);
    });

    it('should use formatCurrency utility when explicitly setting BRL and symbol', () => {
      const testValue = 1000;
      const expected = formatCurrency(testValue);

      const result = pipe.transform(testValue, 'BRL', 'symbol');

      expect(result).toBe(expected);
    });

    it('should handle zero value with formatCurrency', () => {
      const testValue = 0;
      const expected = formatCurrency(testValue);

      const result = pipe.transform(testValue);

      expect(result).toBe(expected);
    });

    it('should handle negative values with formatCurrency', () => {
      const testValue = -500;
      const expected = formatCurrency(testValue);

      const result = pipe.transform(testValue);

      expect(result).toBe(expected);
    });

    it('should format large BRL values correctly', () => {
      const testValue = 1000000;
      const expected = formatCurrency(testValue);

      const result = pipe.transform(testValue);

      expect(result).toBe(expected);

      expect(result).toMatch(/R\$\s*1\.000\.000,00/);
    });
  });

  describe('Other Currency Formatting', () => {
    it('should format USD currency with symbol display', () => {
      const result = pipe.transform(1234.56, 'USD', 'symbol');

      expect(result).toMatch(/\$\s*1\.234,56/);
    });

    it('should format USD currency with code display', () => {
      const result = pipe.transform(1234.56, 'USD', 'code');

      expect(result).toContain('USD');

      expect(result).toMatch(/1\.234,56/);
    });

    it('should format EUR currency with name display', () => {
      const result = pipe.transform(1000, 'EUR', 'name');

      expect(result).toMatch(/[Ee]uros/);

      expect(result).toMatch(/1\.000,00/);
    });

    it('should handle large numbers with other currencies', () => {
      const result = pipe.transform(1000000, 'USD');

      expect(result).toMatch(/1\.000\.000,00/);
    });

    it('should not use formatCurrency for non-BRL currencies', () => {
      const brlResult = pipe.transform(100, 'BRL', 'symbol');
      const usdResult = pipe.transform(100, 'USD', 'symbol');

      expect(brlResult).toBe(formatCurrency(100));

      expect(usdResult).not.toBe(formatCurrency(100));
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

    it('should return empty string for null value with currency parameters', () => {
      const result = pipe.transform(null, 'USD', 'code');

      expect(result).toBe('');
    });

    it('should return empty string for undefined value with currency parameters', () => {
      const result = pipe.transform(undefined, 'EUR', 'name');

      expect(result).toBe('');
    });
  });
});
