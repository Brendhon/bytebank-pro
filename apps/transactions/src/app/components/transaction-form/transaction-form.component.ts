import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITransaction, TransactionDescKey, TransactionTypeKey } from '@bytebank-pro/types';
import {
  ButtonComponent,
  DialogComponent,
  ImgComponent,
  InputComponent,
  SelectComponent
} from '@bytebank-pro/ui';
import { Calendar, DollarSign, FileText, LucideAngularModule } from 'lucide-angular';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

interface FormData {
  date: string;
  alias: string;
  type: TransactionTypeKey;
  desc: TransactionDescKey;
  value: number;
}

interface FormErrors {
  date: string;
  alias: string;
  type: string;
  desc: string;
  value: string;
}

/**
 * Transaction form component that provides a complete interface for creating and editing transactions.
 * Uses components from the ByteBank Pro UI library and follows modern Angular patterns.
 */
@Component({
  selector: 'bb-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    DialogComponent,
    ImgComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-transaction-form-wrapper]': 'true',
    '[class.bb-transaction-form-loading]': 'isLoading()'
  }
})
export class TransactionFormComponent {
  // Icons from Lucide
  readonly calendarIcon = Calendar;
  readonly dollarIcon = DollarSign;
  readonly fileTextIcon = FileText;

  // Dialog state - controlled externally
  isOpen = input.required<boolean>();

  // Transaction data for editing mode
  transaction = input<ITransaction | null>(null);

  // Form state using signals
  formData = signal<FormData>({
    date: '',
    alias: '',
    type: 'inflow',
    desc: 'deposit',
    value: 0
  });

  // Form error state using signals
  formErrors = signal<FormErrors>({
    date: '',
    alias: '',
    type: '',
    desc: '',
    value: ''
  });

  // Loading state
  isLoading = signal(false);

  // Event emitters using modern output() API
  transactionSubmit = output<ITransaction>();
  dialogClose = output<void>();

  // Computed properties for form validation
  isFormValid = computed(() => {
    const data = this.formData();
    return Boolean(data.date && data.type && data.desc && data.value > 0);
  });

  // Computed properties for input variants
  dateVariant = computed(() => (this.formErrors().date ? 'error' : 'default'));
  aliasVariant = computed(() => (this.formErrors().alias ? 'error' : 'default'));
  typeVariant = computed(() => (this.formErrors().type ? 'error' : 'default'));
  descVariant = computed(() => (this.formErrors().desc ? 'error' : 'default'));
  valueVariant = computed(() => (this.formErrors().value ? 'error' : 'default'));

  // Map transaction description to type
  private readonly descToTypeMap: Record<TransactionDescKey, TransactionTypeKey> = {
    deposit: 'inflow',
    transfer: 'outflow',
    withdrawal: 'outflow',
    payment: 'outflow'
  };

  // Illustration
  readonly illustration = ILLUSTRATIONS.TRANSACTION;

  // Transaction type options
  readonly transactionTypes = [
    { value: 'inflow', label: 'Entrada' },
    { value: 'outflow', label: 'Saída' }
  ];

  // Transaction description options
  readonly transactionDescriptions = [
    { value: 'deposit', label: 'Depósito' },
    { value: 'transfer', label: 'Transferência' },
    { value: 'withdrawal', label: 'Saque' },
    { value: 'payment', label: 'Pagamento' }
  ];

  // Effect to update form data when transaction input changes
  private readonly transactionEffect = effect(() => this.resetForm());

  /**
   * Function to update errors
   * @param {keyof FormErrors} key - Key of the error to update
   * @param {string} message Message to set for the error
   */
  private updateError(key: keyof FormErrors, message: string): void {
    this.formErrors.update((errors) => ({ ...errors, [key]: message }));
  }

  /**
   * Function to update form data
   * @param {keyof FormData} key Key of the form data to update
   * @param {string|number} value value to set for the form data key
   */
  private updateFormData(key: keyof FormData, value: string | number): void {
    this.formData.update((data) => ({ ...data, [key]: value }));
  }

  /**
   * Handles dialog close event
   */
  onDialogClose(): void {
    this.dialogClose.emit();
    this.resetForm();
  }

  /**
   * Handles date input changes
   */
  onDateChange(date: string): void {
    this.updateFormData('date', date);
    this.validateDate();
  }

  /**
   * Handles alias input changes
   */
  onAliasChange(alias: string): void {
    this.updateFormData('alias', alias);
    this.validateAlias();
  }

  /**
   * Handles transaction type changes
   */
  onTypeChange(type: string | string[] | undefined): void {
    if (typeof type === 'string') {
      this.updateFormData('type', type as TransactionTypeKey);
      this.validateType();
    }
  }

  /**
   * Handles transaction description changes
   */
  onDescChange(desc: string | string[] | undefined): void {
    if (typeof desc === 'string') {
      this.updateFormData('desc', desc as TransactionDescKey);
      this.validateDesc();

      // Automatically set the type based on the selected description
      const newType = this.descToTypeMap[desc as TransactionDescKey];
      if (newType) {
        this.updateFormData('type', newType);
        this.validateType();
      }
    }
  }

  /**
   * Handles value input changes
   */
  onValueChange(value: number): void {
    this.updateFormData('value', value);
    this.validateValue();
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) return;

    // Set loading state to true
    this.isLoading.set(true);

    // Create transaction object
    const transactionData: ITransaction = {
      ...this.formData(),
      _id: this.transaction()?._id,
      user: this.transaction()?.user
    };

    // Emit the transaction data
    this.transactionSubmit.emit(transactionData);

    // Reset loading state after a short delay (parent component should handle this)
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  /**
   * Validates the date field
   */
  private validateDate(): boolean {
    const date = this.formData().date.trim();

    switch (true) {
      case !date:
        this.updateError('date', 'Data é obrigatória');
        return false;
      case !this.isValidDate(date):
        this.updateError('date', 'Data inválida');
        return false;
      default:
        this.updateError('date', '');
        return true;
    }
  }

  /**
   * Validates the alias field
   */
  private validateAlias(): boolean {
    const alias = this.formData().alias.trim();

    // Alias is optional, so only validate if it's not empty
    if (alias && alias.length > 0) {
      if (alias.length < 3) {
        this.updateError('alias', 'Alias deve ter pelo menos 3 caracteres');
        return false;
      }
      if (alias.length > 100) {
        this.updateError('alias', 'Alias deve ter no máximo 100 caracteres');
        return false;
      }
    }

    this.updateError('alias', '');
    return true;
  }

  /**
   * Validates the type field
   */
  private validateType(): boolean {
    const type = this.formData().type;

    if (!type) {
      this.updateError('type', 'Tipo é obrigatório');
      return false;
    }

    this.updateError('type', '');
    return true;
  }

  /**
   * Validates the description field
   */
  private validateDesc(): boolean {
    const desc = this.formData().desc;

    if (!desc) {
      this.updateError('desc', 'Descrição é obrigatória');
      return false;
    }

    this.updateError('desc', '');
    return true;
  }

  /**
   * Validates the value field
   */
  private validateValue(): boolean {
    const value = this.formData().value;

    switch (true) {
      case !value || value <= 0:
        this.updateError('value', 'Valor deve ser maior que zero');
        return false;
      case value > 999999999.99:
        this.updateError('value', 'Valor muito alto');
        return false;
      default:
        this.updateError('value', '');
        return true;
    }
  }

  /**
   * Validates the entire form
   */
  private validateForm(): boolean {
    const isDateValid = this.validateDate();
    const isAliasValid = this.validateAlias();
    const isTypeValid = this.validateType();
    const isDescValid = this.validateDesc();
    const isValueValid = this.validateValue();

    return isDateValid && isAliasValid && isTypeValid && isDescValid && isValueValid;
  }

  /**
   * Resets the form to initial state
   */
  private resetForm(): void {
    // Get transaction data
    const transaction = this.transaction();

    // Default form data values
    const data: FormData = {
      date: '',
      alias: '',
      type: 'inflow',
      desc: 'deposit',
      value: 0
    };

    // If editing, set form data to transaction values
    if (transaction) {
      // Set form data to transaction values
      data.date = transaction.date;
      data.alias = transaction.alias || '';
      data.type = transaction.type;
      data.desc = transaction.desc;
      data.value = transaction.value;
    }

    // Set form data
    this.formData.set(data);

    // Reset loading state
    this.isLoading.set(false);
  }

  /**
   * Checks if a date string is valid
   */
  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  /**
   * Gets the dialog title based on whether we're editing or creating
   */
  getDialogTitle(): string {
    return this.transaction() ? 'Editar Transação' : 'Nova Transação';
  }

  /**
   * Gets the submit button text based on whether we're editing or creating
   */
  getSubmitButtonText(): string {
    if (this.isLoading()) {
      return this.transaction() ? 'Salvando...' : 'Criando...';
    }
    return this.transaction() ? 'Salvar' : 'Criar Transação';
  }
}
