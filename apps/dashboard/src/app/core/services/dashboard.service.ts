import { Injectable, inject } from '@angular/core';
import { TransactionSummary } from '@bytebank-pro/types';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GET_TRANSACTION_SUMMARY } from '../graphql/dashboard.queries';
import { GetTransactionSummaryResponse } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apollo = inject(Apollo);

  constructor() {}

  /**
   * Loads transaction summary (balance and breakdown) from the API
   * @returns Observable that emits TransactionSummary on success
   */
  loadTransactionSummary(): Observable<TransactionSummary> {
    return this.apollo
      .query<GetTransactionSummaryResponse>({
        query: GET_TRANSACTION_SUMMARY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map((result) => {
          const summary = result.data?.getTransactionSummary;
          if (!summary) throw new Error('Failed to load transaction summary');
          return summary;
        }),
        catchError((error) => {
          console.error('Error loading transaction summary:', error);
          return throwError(() => new Error(error.message || 'Failed to load transaction summary'));
        })
      );
  }
}
