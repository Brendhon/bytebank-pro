import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata uma data para o padrão: 'quinta-feira, 18/04/2025'
 * @param date Date padrão
 */
export const formatDateToLong = (date: Date): string => {
  return format(date, 'EEEE, dd/MM/yyyy', { locale: ptBR });
};

/**
 * Formata uma data para o padrão: '18/04/2025'
 * @param date Date padrão
 */
export const formatDateToShort = (date: Date): string => {
  return format(date, 'dd/MM/yyyy', { locale: ptBR });
};

/**
 * Formata um valor monetário no padrão brasileiro (R$)
 * @param value número a ser formatado
 */
export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol'
  }).format(value);
};

// Check if value is a number
export const isNumber = (value: any): value is number => typeof value === 'number' && !isNaN(value);

// Parse date from string format 'dd/mm/yyyy' to Date object
export const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // month é 0-based
};

// Sort an array of objects by a specific date (dd/mm/yyyy) property
export const sortByDate = <T>(arr: T[], dateKey: keyof T) => {
  return arr.sort((a, b) => {
    const dateA = parseDate(a[dateKey] as unknown as string);
    const dateB = parseDate(b[dateKey] as unknown as string);
    return dateB.getTime() - dateA.getTime(); // Descending order
  });
};

/**
 * Removes empty fields from an object
 * @param {T} obj - The object to clean
 * @returns {Partial<T>} - The cleaned object
 */
export const removeEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== '' && value !== undefined && value !== null
    )
  ) as Partial<T>;
};
