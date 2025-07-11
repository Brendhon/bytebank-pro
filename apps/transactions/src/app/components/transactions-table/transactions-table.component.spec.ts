import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ITransaction, TransactionDescKey, TransactionTypeKey } from '@bytebank-pro/types';
import { GenericTableComponent } from '@bytebank-pro/ui';
import { TransactionsTableComponent } from './transactions-table.component';
import { TemplateRef } from '@angular/core';

describe('TransactionsTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;
  let element: HTMLElement;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsTableComponent, GenericTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;

    // Set required input before detectChanges
    fixture.componentRef.setInput('transactions', []);

    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have required inputs defined', () => {
      expect(component.transactions).toBeDefined();

      expect(component.pageSize).toBeDefined();
    });

    it('should have output emitters defined', () => {
      expect(component.edit).toBeDefined();

      expect(component.delete).toBeDefined();
    });

    it('should have icons defined', () => {
      expect(component.icons).toBeDefined();

      expect(component.icons.pencil).toBeDefined();

      expect(component.icons.trash).toBeDefined();
    });
  });

  describe('Input Handling', () => {
    it('should set transactions input correctly', () => {
      fixture.componentRef.setInput('transactions', mockTransactions);
      fixture.detectChanges();

      expect(component.transactions()).toEqual(mockTransactions);
    });

    it('should set pageSize input correctly', () => {
      const customPageSize = 5;
      fixture.componentRef.setInput('pageSize', customPageSize);
      fixture.detectChanges();

      expect(component.pageSize()).toBe(customPageSize);
    });

    it('should use default pageSize when not provided', () => {
      expect(component.pageSize()).toBe(10);
    });
  });

  describe('Method Testing', () => {
    describe('getTransactionDesc', () => {
      it('should return correct description for valid transaction type', () => {
        const result = component.getTransactionDesc('deposit');

        expect(result).toBe('Depósito');
      });

      it('should return original type when description not found', () => {
        const invalidType = 'invalid_type' as TransactionDescKey;
        const result = component.getTransactionDesc(invalidType);

        expect(result).toBe(invalidType);
      });

      it('should return correct description for payment type', () => {
        const result = component.getTransactionDesc('payment');

        expect(result).toBe('Pagamento');
      });
    });

    describe('getValueClasses', () => {
      it('should return correct classes for outflow transaction', () => {
        const result = component.getValueClasses('outflow');

        expect(result).toContain('transaction-value');

        expect(result).toContain('transaction-value-outflow');
      });

      it('should return correct classes for inflow transaction', () => {
        const result = component.getValueClasses('inflow');

        expect(result).toContain('transaction-value');

        expect(result).toContain('transaction-value-inflow');
      });
    });

    describe('getActionButtonClassName', () => {
      it('should return correct action button class name', () => {
        const result = component.getActionButtonClassName();

        expect(result).toBe('action-button');
      });
    });

    describe('trackByTransactionId', () => {
      it('should return transaction id when available', () => {
        const transaction = mockTransactions[0];
        const result = component.trackByTransactionId(0, transaction);

        expect(result).toBe('1');
      });

      it('should return empty string when id is not available', () => {
        const transactionWithoutId = { ...mockTransactions[0] };
        delete transactionWithoutId._id;
        const result = component.trackByTransactionId(0, transactionWithoutId);

        expect(result).toBe('');
      });
    });

    describe('getColumnsWithTemplates', () => {
      it('should return correct columns configuration', () => {
        const typeTemplate = {} as TemplateRef<unknown>;
        const valueTemplate = {} as TemplateRef<unknown>;
        const actionsTemplate = {} as TemplateRef<unknown>;
        const dateTemplate = {} as TemplateRef<unknown>;

        const result = component.getColumnsWithTemplates(
          typeTemplate,
          valueTemplate,
          actionsTemplate,
          dateTemplate
        );

        expect(result.length).toBe(5);

        expect(result[0]).toEqual({
          label: 'Data',
          accessor: 'date',
          render: dateTemplate
        });

        expect(result[1]).toEqual({
          label: 'Alias',
          accessor: 'alias'
        });

        expect(result[2]).toEqual({
          label: 'Descrição',
          accessor: 'desc',
          render: typeTemplate
        });

        expect(result[3]).toEqual({
          label: 'Valor',
          accessor: 'value',
          render: valueTemplate
        });

        expect(result[4]).toEqual({
          label: 'Ações',
          accessor: '_id',
          render: actionsTemplate
        });
      });
    });
  });

  describe('Output Event Testing', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('transactions', mockTransactions);
      fixture.detectChanges();
    });

    it('should emit edit event when edit button is clicked', () => {
      spyOn(component.edit, 'emit');
      const editButton = element.querySelector(
        '[data-testid="edit-transaction-button"]'
      ) as HTMLElement;

      editButton?.click();

      expect(component.edit.emit).toHaveBeenCalledWith(mockTransactions[0]);
    });

    it('should emit delete event when delete button is clicked', () => {
      spyOn(component.delete, 'emit');
      const deleteButton = element.querySelector(
        '[data-testid="delete-transaction-button"]'
      ) as HTMLElement;

      deleteButton?.click();

      expect(component.delete.emit).toHaveBeenCalledWith(mockTransactions[0]);
    });
  });

  describe('Template Integration', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('transactions', mockTransactions);
      fixture.detectChanges();
    });

    it('should render transactions table section', () => {
      const tableSection = element.querySelector('[data-testid="transactions-table-section"]');

      expect(tableSection).toBeTruthy();
    });

    it('should render generic table component', () => {
      const genericTable = element.querySelector('[data-testid="transactions-table"]');

      expect(genericTable).toBeTruthy();
    });

    it('should render edit button with correct attributes', () => {
      const editButton = element.querySelector(
        '[data-testid="edit-transaction-button"]'
      ) as HTMLElement;

      expect(editButton).toBeTruthy();

      expect(editButton.getAttribute('aria-label')).toBe('Edit transaction');

      expect(editButton.getAttribute('type')).toBe('button');
    });

    it('should render delete button with correct attributes', () => {
      const deleteButton = element.querySelector(
        '[data-testid="delete-transaction-button"]'
      ) as HTMLElement;

      expect(deleteButton).toBeTruthy();

      expect(deleteButton.getAttribute('aria-label')).toBe('Delete transaction');

      expect(deleteButton.getAttribute('type')).toBe('button');
    });

    it('should render action buttons container', () => {
      const actionButtonsContainer = element.querySelector('.action-buttons-container');

      expect(actionButtonsContainer).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('transactions', mockTransactions);
      fixture.detectChanges();
    });

    it('should have proper ARIA labels on action buttons', () => {
      const editButton = element.querySelector('[data-testid="edit-transaction-button"]');
      const deleteButton = element.querySelector('[data-testid="delete-transaction-button"]');

      expect(editButton?.getAttribute('aria-label')).toBe('Edit transaction');

      expect(deleteButton?.getAttribute('aria-label')).toBe('Delete transaction');
    });

    it('should have hidden icons for screen readers', () => {
      const icons = element.querySelectorAll('i-lucide[aria-hidden="true"]');

      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty transactions array', () => {
      fixture.componentRef.setInput('transactions', []);
      fixture.detectChanges();

      expect(component.transactions()).toEqual([]);
    });

    it('should handle transactions without alias', () => {
      const transactionWithoutAlias = {
        _id: '3',
        date: '2024-01-17',
        type: 'inflow' as TransactionTypeKey,
        desc: 'deposit' as TransactionDescKey,
        value: 1000,
        user: 'user1'
      };

      fixture.componentRef.setInput('transactions', [transactionWithoutAlias]);
      fixture.detectChanges();

      expect(component.transactions()).toEqual([transactionWithoutAlias]);
    });

    it('should handle transactions with null values', () => {
      const transactionWithNullValues = {
        _id: '4',
        date: '2024-01-18',
        alias: undefined,
        type: 'outflow' as TransactionTypeKey,
        desc: 'payment' as TransactionDescKey,
        value: 0,
        user: undefined
      };

      fixture.componentRef.setInput('transactions', [transactionWithNullValues]);
      fixture.detectChanges();

      expect(component.transactions()).toEqual([transactionWithNullValues]);
    });
  });
});
