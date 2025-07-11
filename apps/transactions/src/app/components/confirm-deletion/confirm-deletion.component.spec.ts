import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ITransaction } from '@bytebank-pro/types';

import { ConfirmDeletionComponent } from './confirm-deletion.component';
import { BrowserModule } from '@angular/platform-browser';

describe('ConfirmDeletionComponent', () => {
  let component: ConfirmDeletionComponent;
  let fixture: ComponentFixture<ConfirmDeletionComponent>;

  const mockTransaction: ITransaction = {
    _id: '1',
    date: '2024-01-15',
    alias: 'Salário Janeiro',
    type: 'inflow',
    desc: 'deposit',
    value: 5000.0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeletionComponent, BrowserModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeletionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with required inputs', () => {
      expect(component.isOpen).toBeDefined();
      expect(component.transaction).toBeDefined();
    });

    it('should initialize with output emitters', () => {
      expect(component.deletionConfirmed).toBeDefined();
      expect(component.deletionCancelled).toBeDefined();
    });
  });

  describe('Dialog Management', () => {
    beforeEach(() => {
      spyOn(component.deletionCancelled, 'emit');
    });

    it('should emit deletionCancelled event when onCancel is called', () => {
      component.onCancel();

      expect(component.deletionCancelled.emit).toHaveBeenCalled();
    });

    it('should emit deletionConfirmed event with transaction when onConfirm is called', () => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      spyOn(component.deletionConfirmed, 'emit');
      fixture.detectChanges();

      component.onConfirm();

      expect(component.deletionConfirmed.emit).toHaveBeenCalledWith(mockTransaction);
    });

    it('should not emit deletionConfirmed event when no transaction is set', () => {
      fixture.componentRef.setInput('transaction', null);
      spyOn(component.deletionConfirmed, 'emit');
      fixture.detectChanges();

      component.onConfirm();

      expect(component.deletionConfirmed.emit).not.toHaveBeenCalled();
    });
  });

  describe('Transaction Display', () => {
    it('should return transaction alias when transaction has alias', () => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      expect(component.getTransactionAlias()).toBe('Salário Janeiro');
    });

    it('should return fallback message when transaction has no alias', () => {
      const transactionWithoutAlias: ITransaction = {
        _id: '1',
        date: '2024-01-15',
        alias: '',
        type: 'inflow',
        desc: 'deposit',
        value: 5000.0
      };

      fixture.componentRef.setInput('transaction', transactionWithoutAlias);
      fixture.detectChanges();

      expect(component.getTransactionAlias()).toBe('esta transação');
    });

    it('should return fallback message when transaction is null', () => {
      fixture.componentRef.setInput('transaction', null);
      fixture.detectChanges();

      expect(component.getTransactionAlias()).toBe('esta transação');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should have proper ARIA labels', () => {
      const compiled = fixture.nativeElement;

      const cancelButton = compiled.querySelector('[data-testid="confirm-deletion-cancel-button"]');

      expect(cancelButton?.getAttribute('ariaLabel')).toBe('Cancelar exclusão');

      const confirmButton = compiled.querySelector(
        '[data-testid="confirm-deletion-confirm-button"]'
      );

      expect(confirmButton?.getAttribute('ariaLabel')).toBe('Confirmar exclusão');
    });

    it('should have proper test IDs', () => {
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('[data-testid="confirm-deletion-dialog"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="confirm-deletion-cancel-button"]')).toBeTruthy();
      expect(
        compiled.querySelector('[data-testid="confirm-deletion-confirm-button"]')
      ).toBeTruthy();
    });

    it('should have proper button variants', () => {
      const compiled = fixture.nativeElement;

      const cancelButton = compiled.querySelector('[data-testid="confirm-deletion-cancel-button"]');

      expect(cancelButton?.getAttribute('variant')).toBe('dark');

      const confirmButton = compiled.querySelector(
        '[data-testid="confirm-deletion-confirm-button"]'
      );

      expect(confirmButton?.getAttribute('variant')).toBe('outlineOrange');
    });
  });
});
