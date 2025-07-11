import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ITransaction } from '@bytebank-pro/types';
import { ButtonComponent } from '@bytebank-pro/ui';
import { TransactionsPageComponent } from './transactions.component';
import { TransactionsService } from '@/core/services/transactions.service';
import { TransactionsTableComponent } from '@/components/transactions-table/transactions-table.component';
import { TransactionFormComponent } from '@/components/transaction-form/transaction-form.component';
import { ConfirmDeletionComponent } from '@/components/confirm-deletion/confirm-deletion.component';

describe('TransactionsPageComponent', () => {
  let component: TransactionsPageComponent;
  let fixture: ComponentFixture<TransactionsPageComponent>;
  let element: HTMLElement;
  let transactionsServiceSpy: jasmine.SpyObj<TransactionsService>;

  // Mock data
  const mockTransactions: ITransaction[] = [
    {
      _id: '1',
      date: '2024-01-15',
      alias: 'Salary',
      type: 'inflow',
      desc: 'deposit',
      value: 5000,
      user: 'user1'
    },
    {
      _id: '2',
      date: '2024-01-16',
      alias: 'Shopping',
      type: 'outflow',
      desc: 'payment',
      value: 150,
      user: 'user1'
    }
  ];

  const mockPaginatedTransactions = {
    hasMore: false,
    items: mockTransactions,
    page: 1,
    total: 2,
    totalInPage: 2,
    totalPages: 1
  };

  beforeEach(async () => {
    // Create spy for TransactionsService
    transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', [
      'loadTransactions',
      'createTransaction',
      'updateTransaction',
      'deleteTransaction'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        TransactionsPageComponent,
        ButtonComponent,
        TransactionsTableComponent,
        TransactionFormComponent,
        ConfirmDeletionComponent
      ],
      providers: [{ provide: TransactionsService, useValue: transactionsServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  afterEach(() => {
    // Clean up spies
    transactionsServiceSpy.loadTransactions.calls.reset();
    transactionsServiceSpy.createTransaction.calls.reset();
    transactionsServiceSpy.updateTransaction.calls.reset();
    transactionsServiceSpy.deleteTransaction.calls.reset();
  });

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have initial state', () => {
      expect(component.isDialogOpen()).toBe(false);
      expect(component.editingTransaction()).toBe(null);
      expect(component.isDeleteDialogOpen()).toBe(false);
      expect(component.transactionToDelete()).toBe(null);
      expect(component.transactions()).toEqual([]);
      expect(component.hasTransactions()).toBe(false);
    });
  });

  describe('Initialization', () => {
    it('should load transactions on init', () => {
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      component.ngOnInit();

      expect(transactionsServiceSpy.loadTransactions).toHaveBeenCalledWith(10, 1);
    });

    it('should update transactions state after successful load', () => {
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      component.ngOnInit();

      expect(component.transactions()).toEqual(mockTransactions);
      expect(component.hasTransactions()).toBe(true);
    });

    it('should handle error when loading transactions fails', () => {
      const consoleSpy = spyOn(console, 'error');
      const error = new Error('Failed to load transactions');
      transactionsServiceSpy.loadTransactions.and.returnValue(throwError(() => error));

      component.ngOnInit();

      expect(consoleSpy).toHaveBeenCalledWith('Error loading transactions:', error);
    });
  });

  describe('Dialog Management', () => {
    it('should open dialog when openDialog is called', () => {
      component.openDialog();

      expect(component.isDialogOpen()).toBe(true);
    });

    it('should close dialog and reset editing state when closeDialog is called', () => {
      // Set initial state
      component.isDialogOpen.set(true);
      component.editingTransaction.set(mockTransactions[0]);

      component.closeDialog();

      expect(component.isDialogOpen()).toBe(false);
      expect(component.editingTransaction()).toBe(null);
    });

    it('should open dialog and set editing transaction when handleEditTransaction is called', () => {
      const transactionToEdit = mockTransactions[0];

      component.handleEditTransaction(transactionToEdit);

      expect(component.isDialogOpen()).toBe(true);
      expect(component.editingTransaction()).toBe(transactionToEdit);
    });
  });

  describe('Transaction Creation', () => {
    it('should create new transaction successfully', () => {
      const newTransaction: ITransaction = {
        date: '2024-01-17',
        alias: 'New Transaction',
        type: 'inflow',
        desc: 'deposit',
        value: 1000
      };

      const createdTransaction = { ...newTransaction, _id: '3', user: 'user1' };
      transactionsServiceSpy.createTransaction.and.returnValue(of(createdTransaction));
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      component.handleTransactionSubmit(newTransaction);

      expect(transactionsServiceSpy.createTransaction).toHaveBeenCalledWith({
        date: '2024-01-17',
        alias: 'New Transaction',
        type: 'inflow',
        desc: 'deposit',
        value: 1000
      });
    });

    it('should handle error when creating transaction fails', () => {
      const consoleSpy = spyOn(console, 'error');
      const error = new Error('Failed to create transaction');
      const newTransaction: ITransaction = {
        date: '2024-01-17',
        type: 'inflow',
        desc: 'deposit',
        value: 1000
      };

      transactionsServiceSpy.createTransaction.and.returnValue(throwError(() => error));

      component.handleTransactionSubmit(newTransaction);

      expect(consoleSpy).toHaveBeenCalledWith('Error creating transaction:', error);
    });
  });

  describe('Transaction Update', () => {
    it('should update existing transaction successfully', () => {
      const transactionToUpdate = mockTransactions[0];
      const updatedData: ITransaction = {
        date: '2024-01-18',
        alias: 'Updated Transaction',
        type: 'outflow',
        desc: 'payment',
        value: 200
      };

      const updatedTransaction = { ...updatedData, _id: '1', user: 'user1' };
      transactionsServiceSpy.updateTransaction.and.returnValue(of(updatedTransaction));
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      // Set editing state
      component.editingTransaction.set(transactionToUpdate);

      component.handleTransactionSubmit(updatedData);

      expect(transactionsServiceSpy.updateTransaction).toHaveBeenCalledWith('1', {
        date: '2024-01-18',
        alias: 'Updated Transaction',
        type: 'outflow',
        desc: 'payment',
        value: 200
      });
    });

    it('should handle error when updating transaction fails', () => {
      const consoleSpy = spyOn(console, 'error');
      const error = new Error('Failed to update transaction');
      const transactionToUpdate = mockTransactions[0];
      const updatedData: ITransaction = {
        date: '2024-01-18',
        type: 'outflow',
        desc: 'payment',
        value: 200
      };

      transactionsServiceSpy.updateTransaction.and.returnValue(throwError(() => error));

      // Set editing state
      component.editingTransaction.set(transactionToUpdate);

      component.handleTransactionSubmit(updatedData);

      expect(consoleSpy).toHaveBeenCalledWith('Error updating transaction:', error);
    });
  });

  describe('Transaction Success Handling', () => {
    it('should reload transactions and close dialog on success', () => {
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      // Set dialog open state
      component.isDialogOpen.set(true);

      component.handleTransactionSuccess();

      expect(transactionsServiceSpy.loadTransactions).toHaveBeenCalled();
      expect(component.isDialogOpen()).toBe(false);
      expect(component.editingTransaction()).toBe(null);
    });
  });

  describe('Delete Transaction Flow', () => {
    it('should open delete dialog when handleDeleteTransaction is called', () => {
      const transactionToDelete = mockTransactions[0];

      component.handleDeleteTransaction(transactionToDelete);

      expect(component.isDeleteDialogOpen()).toBe(true);
      expect(component.transactionToDelete()).toBe(transactionToDelete);
    });

    it('should delete transaction successfully', () => {
      const transactionToDelete = mockTransactions[0];
      transactionsServiceSpy.deleteTransaction.and.returnValue(of(true));
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      component.handleDeleteConfirm(transactionToDelete);

      expect(transactionsServiceSpy.deleteTransaction).toHaveBeenCalledWith('1');
    });

    it('should handle error when deleting transaction fails', () => {
      const consoleSpy = spyOn(console, 'error');
      const error = new Error('Failed to delete transaction');
      const transactionToDelete = mockTransactions[0];

      transactionsServiceSpy.deleteTransaction.and.returnValue(throwError(() => error));

      component.handleDeleteConfirm(transactionToDelete);

      expect(consoleSpy).toHaveBeenCalledWith('Error deleting transaction:', error);
    });

    it('should close delete dialog when handleDeleteCancel is called', () => {
      // Set delete dialog open state
      component.isDeleteDialogOpen.set(true);
      component.transactionToDelete.set(mockTransactions[0]);

      component.handleDeleteCancel();

      expect(component.isDeleteDialogOpen()).toBe(false);
      expect(component.transactionToDelete()).toBe(null);
    });

    it('should reload transactions and close delete dialog on successful deletion', () => {
      transactionsServiceSpy.loadTransactions.and.returnValue(of(mockPaginatedTransactions));

      // Set delete dialog open state
      component.isDeleteDialogOpen.set(true);
      component.transactionToDelete.set(mockTransactions[0]);

      component.handleDeleteSuccess();

      expect(transactionsServiceSpy.loadTransactions).toHaveBeenCalled();
      expect(component.isDeleteDialogOpen()).toBe(false);
      expect(component.transactionToDelete()).toBe(null);
    });
  });

  describe('Computed Properties', () => {
    it('should return true when hasTransactions is called with transactions', () => {
      // Set transactions
      component['_transactions'].set(mockTransactions);

      expect(component.hasTransactions()).toBe(true);
    });

    it('should return false when hasTransactions is called with empty transactions', () => {
      // Set empty transactions
      component['_transactions'].set([]);

      expect(component.hasTransactions()).toBe(false);
    });
  });

  describe('Template Integration', () => {
    it('should display "Nova Transação" button', () => {
      const button = element.querySelector('bb-button');

      expect(button).toBeTruthy();
    });

    it('should call openDialog when "Nova Transação" button is clicked', () => {
      const openDialogSpy = spyOn(component, 'openDialog');
      const button = element.querySelector('bb-button');

      button?.dispatchEvent(new Event('buttonClick'));

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should pass transactions to transactions table', () => {
      // Set transactions
      component['_transactions'].set(mockTransactions);
      fixture.detectChanges();

      const transactionsTable = fixture.debugElement.query(
        By.directive(TransactionsTableComponent)
      );

      expect(transactionsTable).toBeTruthy();
    });

    it('should handle edit event from transactions table', () => {
      const handleEditSpy = spyOn(component, 'handleEditTransaction');
      const transactionsTable = fixture.debugElement.query(
        By.directive(TransactionsTableComponent)
      );
      const transactionToEdit = mockTransactions[0];

      transactionsTable?.componentInstance.edit.emit(transactionToEdit);

      expect(handleEditSpy).toHaveBeenCalledWith(transactionToEdit);
    });

    it('should handle delete event from transactions table', () => {
      const handleDeleteSpy = spyOn(component, 'handleDeleteTransaction');
      const transactionsTable = fixture.debugElement.query(
        By.directive(TransactionsTableComponent)
      );
      const transactionToDelete = mockTransactions[0];

      transactionsTable?.componentInstance.delete.emit(transactionToDelete);

      expect(handleDeleteSpy).toHaveBeenCalledWith(transactionToDelete);
    });
  });
});
