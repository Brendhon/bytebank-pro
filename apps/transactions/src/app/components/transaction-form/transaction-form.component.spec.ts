import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ITransaction } from '@bytebank-pro/types';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

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
      imports: [TransactionFormComponent, BrowserModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default form data', () => {
      expect(component.formData()).toEqual({
        date: '',
        alias: '',
        type: 'inflow',
        desc: 'deposit',
        value: 0
      });
    });

    it('should initialize with empty form errors', () => {
      expect(component.formErrors()).toEqual({
        date: '',
        alias: '',
        type: '',
        desc: '',
        value: ''
      });
    });

    it('should initialize with loading state as false', () => {
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should validate required date field', () => {
      component.onDateChange('');

      expect(component.formErrors().date).toBe('Data é obrigatória');
    });

    it('should validate invalid date format', () => {
      component.onDateChange('invalid-date');

      expect(component.formErrors().date).toBe('Data inválida');
    });

    it('should validate valid date', () => {
      component.onDateChange('2024-01-15');

      expect(component.formErrors().date).toBe('');
    });

    it('should validate required alias field', () => {
      component.onAliasChange('');

      expect(component.formErrors().alias).toBe('Descrição é obrigatória');
    });

    it('should validate alias minimum length', () => {
      component.onAliasChange('ab');

      expect(component.formErrors().alias).toBe('Descrição deve ter pelo menos 3 caracteres');
    });

    it('should validate alias maximum length', () => {
      const longAlias = 'a'.repeat(101);
      component.onAliasChange(longAlias);

      expect(component.formErrors().alias).toBe('Descrição deve ter no máximo 100 caracteres');
    });

    it('should validate valid alias', () => {
      component.onAliasChange('Valid Description');

      expect(component.formErrors().alias).toBe('');
    });

    it('should validate required type field', () => {
      component.onTypeChange('');

      expect(component.formErrors().type).toBe('Tipo é obrigatório');
    });

    it('should validate valid type', () => {
      component.onTypeChange('inflow');

      expect(component.formErrors().type).toBe('');
    });

    it('should validate required desc field', () => {
      component.onDescChange('');

      expect(component.formErrors().desc).toBe('Descrição é obrigatória');
    });

    it('should validate valid desc', () => {
      component.onDescChange('deposit');

      expect(component.formErrors().desc).toBe('');
    });

    it('should validate required value field', () => {
      component.onValueChange(0);

      expect(component.formErrors().value).toBe('Valor deve ser maior que zero');
    });

    it('should validate negative value', () => {
      component.onValueChange(-100);

      expect(component.formErrors().value).toBe('Valor deve ser maior que zero');
    });

    it('should validate maximum value', () => {
      component.onValueChange(1000000000);

      expect(component.formErrors().value).toBe('Valor muito alto');
    });

    it('should validate valid value', () => {
      component.onValueChange(100.5);

      expect(component.formErrors().value).toBe('');
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      spyOn(component.transactionSubmit, 'emit');
      fixture.detectChanges();
    });

    it('should not submit form when validation fails', () => {
      component.onSubmit();

      expect(component.transactionSubmit.emit).not.toHaveBeenCalled();
    });

    it('should submit form when all validations pass', () => {
      // Fill form with valid data
      component.onDateChange('2024-01-15');
      component.onAliasChange('Test Transaction');
      component.onTypeChange('inflow');
      component.onDescChange('deposit');
      component.onValueChange(100.5);

      component.onSubmit();

      expect(component.transactionSubmit.emit).toHaveBeenCalledWith({
        date: '2024-01-15',
        alias: 'Test Transaction',
        type: 'inflow',
        desc: 'deposit',
        value: 100.5
      });
    });

    it('should set loading state during submission', () => {
      // Fill form with valid data
      component.onDateChange('2024-01-15');
      component.onAliasChange('Test Transaction');
      component.onTypeChange('inflow');
      component.onDescChange('deposit');
      component.onValueChange(100.5);

      component.onSubmit();

      expect(component.isLoading()).toBe(true);
    });
  });

  describe('Dialog Management', () => {
    beforeEach(() => {
      spyOn(component.dialogClose, 'emit');
    });

    it('should emit close event and reset form', () => {
      // Fill form with data
      component.onDateChange('2024-01-15');
      component.onAliasChange('Test Transaction');

      component.onDialogClose();

      expect(component.dialogClose.emit).toHaveBeenCalled();
      expect(component.formData().date).toBe('');
      expect(component.formData().alias).toBe('');
    });
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should return correct dialog title for edit mode', () => {
      expect(component.getDialogTitle()).toBe('Editar Transação');
    });

    it('should return correct submit button text for edit mode', () => {
      expect(component.getSubmitButtonText()).toBe('Salvar');
    });

    it('should return loading text when in edit mode and loading', () => {
      // Simulate loading state by calling onSubmit which sets loading to true
      component.onSubmit();

      expect(component.getSubmitButtonText()).toBe('Salvando...');
    });
  });

  describe('Create Mode', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('transaction', null);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should return correct dialog title for create mode', () => {
      expect(component.getDialogTitle()).toBe('Nova Transação');
    });

    it('should return correct submit button text for create mode', () => {
      expect(component.getSubmitButtonText()).toBe('Criar Transação');
    });

    it('should return loading text when in create mode and loading', () => {
      // Simulate loading state by calling onSubmit which sets loading to true
      component.onSubmit();

      expect(component.getSubmitButtonText()).toBe('Criando...');
    });
  });

  describe('Computed Properties', () => {
    it('should return false for form validity when form is empty', () => {
      expect(component.isFormValid()).toBe(false);
    });

    it('should return true for form validity when all fields are valid', () => {
      component.formData.set({
        date: '2024-01-15',
        alias: 'Test Transaction',
        type: 'inflow',
        desc: 'deposit',
        value: 100.5
      });

      expect(component.isFormValid()).toBe(true);
    });

    it('should return correct variant for date input when there is an error', () => {
      component.formErrors.set({ ...component.formErrors(), date: 'Error message' });

      expect(component.dateVariant()).toBe('error');
    });

    it('should return default variant for date input when there is no error', () => {
      component.formErrors.set({ ...component.formErrors(), date: '' });

      expect(component.dateVariant()).toBe('default');
    });
  });

  describe('Transaction Options', () => {
    it('should have correct transaction types', () => {
      expect(component.transactionTypes).toEqual([
        { value: 'inflow', label: 'Entrada' },
        { value: 'outflow', label: 'Saída' }
      ]);
    });

    it('should have correct transaction descriptions', () => {
      expect(component.transactionDescriptions).toEqual([
        { value: 'deposit', label: 'Depósito' },
        { value: 'transfer', label: 'Transferência' },
        { value: 'withdrawal', label: 'Saque' },
        { value: 'payment', label: 'Pagamento' }
      ]);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should have proper ARIA labels', () => {
      const compiled = fixture.nativeElement;

      const dateInput = compiled.querySelector('[data-testid="date-input"]');

      expect(dateInput?.getAttribute('ariaLabel')).toBe('Selecione a data da transação');

      const aliasInput = compiled.querySelector('[data-testid="alias-input"]');

      expect(aliasInput?.getAttribute('ariaLabel')).toBe('Digite a descrição da transação');

      const valueInput = compiled.querySelector('[data-testid="value-input"]');

      expect(valueInput?.getAttribute('ariaLabel')).toBe('Digite o valor da transação');
    });

    it('should have proper test IDs', () => {
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('[data-testid="transaction-dialog"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="transaction-form"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="date-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="alias-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="type-select"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="desc-select"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="value-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="transaction-cancel-button"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="transaction-submit-button"]')).toBeTruthy();
    });
  });
});
