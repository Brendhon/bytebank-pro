import { ITransaction } from '@bytebank-pro/types';

/**
 * Transaction input for creating new transactions
 */
export interface TransactionInput {
  alias?: string;
  date: string;
  desc: 'deposit' | 'payment' | 'transfer' | 'withdrawal';
  type: 'inflow' | 'outflow';
  value: number;
  user?: string;
}

/**
 * Transaction update input for updating existing transactions
 */
export interface TransactionUpdateInput {
  alias?: string;
  date?: string;
  desc?: 'deposit' | 'payment' | 'transfer' | 'withdrawal';
  type?: 'inflow' | 'outflow';
  value?: number;
}

/**
 * Paginated transactions response
 */
export interface PaginatedTransactions {
  hasMore: boolean;
  items: ITransaction[];
  page: number;
  total: number;
  totalInPage: number;
  totalPages: number;
}

/**
 * Transaction summary breakdown
 */
export interface TransactionSummaryBreakdown {
  deposit: number;
  payment: number;
  transfer: number;
  withdrawal: number;
}

/**
 * Transaction summary response
 */
export interface TransactionSummary {
  balance: number;
  breakdown: TransactionSummaryBreakdown;
}
