import { inject, Injectable } from '@angular/core';
import { ITransaction } from '@bytebank-pro/types';
import { Apollo, MutationResult } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import {
  CREATE_TRANSACTION_MUTATION,
  DELETE_TRANSACTION_MUTATION,
  GET_TRANSACTIONS_QUERY,
  UPDATE_TRANSACTION_MUTATION
} from '../graphql/transactions.queries';
import {
  PaginatedTransactions,
  TransactionInput,
  TransactionUpdateInput
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apollo = inject(Apollo);

  // State management with BehaviorSubject following project guidelines
  private _transactions = new BehaviorSubject<ITransaction[]>([]);
  readonly transactions$ = this._transactions.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  constructor() {}

  /**
   * Gets the current transactions value
   */
  get transactions(): ITransaction[] {
    return this._transactions.getValue();
  }

  /**
   * Gets the current loading state
   */
  get loading(): boolean {
    return this._loading.getValue();
  }

  /**
   * Loads transactions with pagination
   * @param limit Maximum number of items per page (default: 10)
   * @param page Page number (default: 1)
   * @returns Observable that emits PaginatedTransactions
   */
  loadTransactions(limit: number = 10, page: number = 1): Observable<PaginatedTransactions> {
    this._loading.next(true);

    return this.apollo
      .query<{ transactions: PaginatedTransactions }>({
        query: GET_TRANSACTIONS_QUERY,
        variables: { limit, page },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map((result: ApolloQueryResult<{ transactions: PaginatedTransactions }>) => {
          const paginatedTransactions = result.data?.transactions;

          if (!paginatedTransactions) throw new Error('Failed to load transactions');

          this._transactions.next(paginatedTransactions.items);
          this._loading.next(false);
          return paginatedTransactions;
        }),
        catchError((error: Error) => {
          console.error('Error loading transactions:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error loading transactions'));
        })
      );
  }

  /**
   * Creates a new transaction
   * @param transaction Transaction data
   * @returns Observable that emits the created ITransaction
   */
  createTransaction(transaction: TransactionInput): Observable<ITransaction> {
    this._loading.next(true);

    return this.apollo
      .mutate<{ createTransaction: ITransaction }>({
        mutation: CREATE_TRANSACTION_MUTATION,
        variables: {
          input: transaction
        }
      })
      .pipe(
        map((result: MutationResult<{ createTransaction: ITransaction }>) => {
          const createdTransaction = result.data?.createTransaction;
          if (!createdTransaction) {
            throw new Error('Failed to create transaction');
          }

          // Update local state
          const currentTransactions = this._transactions.getValue();
          this._transactions.next([createdTransaction, ...currentTransactions]);
          this._loading.next(false);

          return createdTransaction;
        }),
        catchError((error: Error) => {
          console.error('Error creating transaction:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error creating transaction'));
        })
      );
  }

  /**
   * Updates an existing transaction
   * @param id Transaction ID
   * @param updates Transaction update data
   * @returns Observable that emits the updated ITransaction
   */
  updateTransaction(id: string, updates: TransactionUpdateInput): Observable<ITransaction> {
    this._loading.next(true);

    return this.apollo
      .mutate<{ updateTransaction: ITransaction }>({
        mutation: UPDATE_TRANSACTION_MUTATION,
        variables: {
          id,
          input: updates
        }
      })
      .pipe(
        map((result: MutationResult<{ updateTransaction: ITransaction }>) => {
          const updatedTransaction = result.data?.updateTransaction;
          if (!updatedTransaction) {
            throw new Error('Failed to update transaction');
          }

          // Update local state
          const currentTransactions = this._transactions.getValue();
          const updatedTransactions = currentTransactions.map((t: ITransaction) =>
            t._id === id ? updatedTransaction : t
          );
          this._transactions.next(updatedTransactions);
          this._loading.next(false);

          return updatedTransaction;
        }),
        catchError((error: Error) => {
          console.error('Error updating transaction:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error updating transaction'));
        })
      );
  }

  /**
   * Deletes a transaction
   * @param id Transaction ID
   * @returns Observable that emits boolean indicating success
   */
  deleteTransaction(id: string): Observable<boolean> {
    this._loading.next(true);

    return this.apollo
      .mutate<{ deleteTransaction: boolean }>({
        mutation: DELETE_TRANSACTION_MUTATION,
        variables: { id }
      })
      .pipe(
        map((result: MutationResult<{ deleteTransaction: boolean }>) => {
          const success = result.data?.deleteTransaction;
          if (!success) {
            throw new Error('Failed to delete transaction');
          }

          // Update local state
          const currentTransactions = this._transactions.getValue();
          const filteredTransactions = currentTransactions.filter(
            (t: ITransaction) => t._id !== id
          );
          this._transactions.next(filteredTransactions);
          this._loading.next(false);

          return success;
        }),
        catchError((error: Error) => {
          console.error('Error deleting transaction:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error deleting transaction'));
        })
      );
  }
}
