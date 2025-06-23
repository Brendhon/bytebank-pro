// Enums
export enum TransactionDesc {
  deposit = "Depósito",
  transfer = "Transferência",
  withdrawal = "Saque",
  payment = "Pagamento",
}

export enum TransactionType {
  outflow = "Entrada",
  inflow = "Saída"
}

// Types
type TransactionDescKey = keyof typeof TransactionDesc;
type TransactionTypeKey = keyof typeof TransactionType;
export type TransactionBreakdown = Record<TransactionDescKey, number>;

// Interface for transaction
export interface ITransaction {
  _id?: string;
  date: string;
  alias?: string;
  type: TransactionTypeKey;
  desc: TransactionDescKey;
  value: number;
  user?: string;
}

export interface TransactionSummary {
  balance: number;
  breakdown: TransactionBreakdown;
}