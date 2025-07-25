import { IEnvironment, StoredUser } from '@bytebank-pro/types';
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
export const formatDateToShort = (
  date: Date | string,
  dateFormat: string = 'dd/MM/yyyy'
): string => {
  if (typeof date == 'string') date = parseDate(date);
  return format(date, dateFormat, { locale: ptBR });
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
  let day = 0;
  let month = 0;
  let year = 0;

  dateStr.includes('/')
    ? ([day, month, year] = dateStr.split('/').map(Number))
    : ([year, month, day] = dateStr.split('-').map(Number));

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

/**
 * Get user data from localStorage
 */
export const getUserDataFromLocalStorage = (): StoredUser | null => {
  const user = localStorage.getItem('bytebank_user');
  return user ? JSON.parse(user) : null;
};

/**
 * Store user data in localStorage
 */
export const storeUserDataInLocalStorage = (user: StoredUser): void => {
  localStorage.setItem('bytebank_user', JSON.stringify(user));
};

/**
 * Remove user data from localStorage
 */
export const removeUserDataFromLocalStorage = (): void => {
  localStorage.removeItem('bytebank_user');
};

/**
 * Set token in localStorage
 */
export const setTokenInLocalStorage = (token: string): void => {
  localStorage.setItem('bytebank_auth_token', token);
};

/**
 * Get token from localStorage
 */
export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('bytebank_auth_token');
};

/**
 * Remove token from localStorage
 */
export const removeTokenFromLocalStorage = (): void => {
  localStorage.removeItem('bytebank_auth_token');
};

/**
 * Builds an asset URL that works both locally and in the shell.
 * @param env - The environment.
 * @param path - The path to the asset.
 * @returns The full asset URL.
 */
export const buildAssetUrl = (env: IEnvironment, path: string): string =>
  env.baseUrl ? `${env.baseUrl}${path}` : path;
