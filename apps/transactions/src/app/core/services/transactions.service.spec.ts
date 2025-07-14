import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';
import { TransactionsService } from './transactions.service';
import { ITransaction } from '@bytebank-pro/types';
import { TransactionInput, TransactionUpdateInput } from '../models/transaction.model';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let apollo: jasmine.SpyObj<Apollo>;

  const mockTransaction: ITransaction = {
    _id: '1',
    date: '2024-01-15',
    alias: 'Test transaction',
    type: 'inflow',
    desc: 'deposit',
    value: 100,
    user: 'user1'
  };

  const mockPaginatedTransactions = {
    items: [mockTransaction],
    total: 1,
    page: 1,
    totalInPage: 1,
    hasMore: false,
    totalPages: 1
  };

  beforeEach(() => {
    const apolloSpy = jasmine.createSpyObj('Apollo', ['query', 'mutate']);

    TestBed.configureTestingModule({
      providers: [TransactionsService, { provide: Apollo, useValue: apolloSpy }]
    });

    service = TestBed.inject(TransactionsService);
    apollo = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with empty transactions', () => {
      expect(service.transactions).toEqual([]);
    });

    it('should initialize with loading false', () => {
      expect(service.loading).toBe(false);
    });

    it('should expose transactions observable', () => {
      expect(service.transactions$).toBeDefined();
    });

    it('should expose loading observable', () => {
      expect(service.loading$).toBeDefined();
    });
  });

  describe('loadTransactions', () => {
    it('should load transactions successfully', (done) => {
      const mockResult = {
        data: { transactions: mockPaginatedTransactions },
        loading: false,
        networkStatus: 7
      };

      apollo.query.and.returnValue(of(mockResult));

      service.loadTransactions(10, 1).subscribe({
        next: (result) => {
          expect(result).toEqual(mockPaginatedTransactions);
          expect(service.transactions).toEqual([mockTransaction]);
          expect(service.loading).toBe(false);
          done();
        },
        error: done.fail
      });

      expect(service.loading).toBe(true);
    });

    it('should handle error when loading transactions', (done) => {
      const error = new Error('Network error');
      apollo.query.and.returnValue(throwError(() => error));

      service.loadTransactions().subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toContain('Error loading transactions');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });

    it('should handle missing data in response', (done) => {
      const mockResult = {
        data: { transactions: null },
        loading: false,
        networkStatus: 7
      };

      apollo.query.and.returnValue(of(mockResult));

      service.loadTransactions().subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('Failed to load transactions');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });

    it('should use default parameters', () => {
      const mockResult = {
        data: { transactions: mockPaginatedTransactions },
        loading: false,
        networkStatus: 7
      };

      apollo.query.and.returnValue(of(mockResult));

      service.loadTransactions();

      expect(apollo.query).toHaveBeenCalledWith(
        jasmine.objectContaining({
          variables: { limit: 10, page: 1 }
        })
      );
    });
  });

  describe('createTransaction', () => {
    const transactionInput: TransactionInput = {
      alias: 'New transaction',
      value: 200,
      type: 'outflow',
      desc: 'payment',
      date: '2024-01-16'
    };

    it('should create transaction successfully', (done) => {
      const newTransaction = { ...mockTransaction, _id: '2', ...transactionInput };
      const mockResult = {
        data: { createTransaction: newTransaction },
        loading: false
      };

      apollo.mutate.and.returnValue(of(mockResult));

      service.createTransaction(transactionInput).subscribe({
        next: (result) => {
          expect(result).toEqual(newTransaction);
          expect(service.transactions).toContain(newTransaction);
          expect(service.loading).toBe(false);
          done();
        },
        error: done.fail
      });

      expect(service.loading).toBe(true);
    });

    it('should handle error when creating transaction', (done) => {
      const error = new Error('Creation failed');
      apollo.mutate.and.returnValue(throwError(() => error));

      service.createTransaction(transactionInput).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toContain('Error creating transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });

    it('should handle missing data in creation response', (done) => {
      const mockResult = {
        data: { createTransaction: null },
        loading: false
      };

      apollo.mutate.and.returnValue(of(mockResult));

      service.createTransaction(transactionInput).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('Failed to create transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });
  });

  describe('updateTransaction', () => {
    const updateInput: TransactionUpdateInput = {
      alias: 'Updated transaction',
      value: 150
    };

    it('should update transaction successfully', (done) => {
      const updatedTransaction = { ...mockTransaction, ...updateInput };
      const mockResult = {
        data: { updateTransaction: updatedTransaction },
        loading: false
      };

      // Set initial state
      service['_transactions'].next([mockTransaction]);

      apollo.mutate.and.returnValue(of(mockResult));

      service.updateTransaction('1', updateInput).subscribe({
        next: (result) => {
          expect(result).toEqual(updatedTransaction);
          expect(service.transactions).toContain(updatedTransaction);
          expect(service.transactions).not.toContain(mockTransaction);
          expect(service.loading).toBe(false);
          done();
        },
        error: done.fail
      });
    });

    it('should handle error when updating transaction', (done) => {
      const error = new Error('Update failed');
      apollo.mutate.and.returnValue(throwError(() => error));

      service.updateTransaction('1', updateInput).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toContain('Error updating transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });

    it('should handle missing data in update response', (done) => {
      const mockResult = {
        data: { updateTransaction: null },
        loading: false
      };

      apollo.mutate.and.returnValue(of(mockResult));

      service.updateTransaction('1', updateInput).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('Failed to update transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });
  });

  describe('deleteTransaction', () => {
    it('should delete transaction successfully', (done) => {
      const mockResult = {
        data: { deleteTransaction: true },
        loading: false
      };

      // Set initial state
      service['_transactions'].next([mockTransaction]);

      apollo.mutate.and.returnValue(of(mockResult));

      service.deleteTransaction('1').subscribe({
        next: (result) => {
          expect(result).toBe(true);
          expect(service.transactions).not.toContain(mockTransaction);
          expect(service.transactions.length).toBe(0);
          expect(service.loading).toBe(false);
          done();
        },
        error: done.fail
      });
    });

    it('should handle error when deleting transaction', (done) => {
      const error = new Error('Deletion failed');
      apollo.mutate.and.returnValue(throwError(() => error));

      service.deleteTransaction('1').subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toContain('Error deleting transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });

    it('should handle missing data in delete response', (done) => {
      const mockResult = {
        data: { deleteTransaction: null },
        loading: false
      };

      apollo.mutate.and.returnValue(of(mockResult));

      service.deleteTransaction('1').subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('Failed to delete transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });

    it('should handle false result in delete response', (done) => {
      const mockResult = {
        data: { deleteTransaction: false },
        loading: false
      };

      apollo.mutate.and.returnValue(of(mockResult));

      service.deleteTransaction('1').subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('Failed to delete transaction');
          expect(service.loading).toBe(false);
          done();
        }
      });
    });
  });

  describe('Service Structure', () => {
    it('should be injectable', () => {
      expect(service).toBeInstanceOf(TransactionsService);
    });

    it('should have loadTransactions method', () => {
      expect(typeof service.loadTransactions).toBe('function');
    });

    it('should have createTransaction method', () => {
      expect(typeof service.createTransaction).toBe('function');
    });

    it('should have updateTransaction method', () => {
      expect(typeof service.updateTransaction).toBe('function');
    });

    it('should have deleteTransaction method', () => {
      expect(typeof service.deleteTransaction).toBe('function');
    });
  });
});
