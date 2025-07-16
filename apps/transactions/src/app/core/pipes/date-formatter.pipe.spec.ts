import { TestBed } from '@angular/core/testing';
import { DateFormatterPipe } from './date-formatter.pipe';

describe('DateFormatterPipe', () => {
  let pipe: DateFormatterPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateFormatterPipe]
    }).compileComponents();

    pipe = new DateFormatterPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid Date object', () => {
    const testDate = new Date('2024-01-15');

    const result = pipe.transform(testDate);

    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('should format a valid date string', () => {
    const testDateString = '15/01/2024';

    const result = pipe.transform(testDateString);

    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('should return empty string for null value', () => {
    const result = pipe.transform(null);

    expect(result).toBe('');
  });

  it('should return empty string for undefined value', () => {
    const result = pipe.transform(undefined);

    expect(result).toBe('');
  });

  it('should return empty string for invalid date string', () => {
    const invalidDateString = 'invalid-date';

    const result = pipe.transform(invalidDateString);

    expect(result).toBe('');
  });

  it('should return empty string for invalid Date object', () => {
    const invalidDate = new Date('invalid-date');

    const result = pipe.transform(invalidDate);

    expect(result).toBe('');
  });
});
