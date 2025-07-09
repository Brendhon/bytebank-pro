// Re-using types from previous components or defining new ones if not present
export type ButtonVariant = 'dark' | 'blue' | 'green' | 'orange' | 'outlineGreen' | 'outlineOrange';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'dark' | 'blue' | 'green' | 'orange';

export type InputTypes = 'text' | 'email' | 'password' | 'number' | 'date';

export interface IToast {
  id?: string;
  message: string;
  variant: 'success' | 'error' | 'info';
  duration?: number; // Duration in milliseconds, 0 for persistent
}

export interface CardProps {
  key: string | number;
  variant?: CardVariant;
  label?: string;
  value?: number;
  className?: string;
}

/**
 * Defines the structure for a column in a generic table component.
 * `T` is the type of the data row.
 */
export interface TableColumn<T> {
  /**
   * The display label for the column header.
   */
  label: string;
  /**
   * The key of the property in the data row to access the value for this column.
   */
  accessor: keyof T;
  /**
   * An optional Angular TemplateRef to render custom content for the cell.
   * The context provided to the template will include `{ $implicit: value, row: T, index: number }`.
   */
  render?: any;
}

export interface ICreditCard {
  name: string;
  number?: string;
  expiration?: string;
  cvv?: string;
}
