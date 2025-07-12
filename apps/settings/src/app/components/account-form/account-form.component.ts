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
import { IUser } from '@bytebank-pro/types';
import { ButtonComponent, DialogComponent, ImgComponent, InputComponent } from '@bytebank-pro/ui';
import { Mail, User, Lock, Trash2, LucideAngularModule } from 'lucide-angular';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

interface FormData {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Account form component that provides a complete interface for updating user account information.
 * Uses components from the ByteBank Pro UI library and follows modern Angular patterns.
 */
@Component({
  selector: 'bb-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    DialogComponent,
    ImgComponent,
    InputComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-account-form-wrapper]': 'true',
    '[class.bb-account-form-loading]': 'isLoading()'
  }
})
export class AccountFormComponent {
  // Icons from Lucide
  readonly userIcon = User;
  readonly mailIcon = Mail;
  readonly lockIcon = Lock;
  readonly trashIcon = Trash2;

  // User data for editing mode
  user = input<IUser | null>(null);

  // Form state using signals
  formData = signal<FormData>({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Form error state using signals
  formErrors = signal<FormErrors>({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Loading state
  isLoading = signal(false);

  // Delete modal state
  isDeleteModalOpen = signal(false);

  // Delete password state
  deletePassword = signal('');

  // Event emitters using modern output() API
  accountUpdate = output<Partial<IUser>>();
  accountDelete = output<string>();

  // Computed properties for form validation
  isFormValid = computed(() => {
    const data = this.formData();
    return Boolean(data.name && data.email);
  });

  isPasswordFormValid = computed(() => {
    const data = this.formData();
    return Boolean(
      data.newPassword && data.confirmPassword && data.newPassword === data.confirmPassword
    );
  });

  // Computed properties for input variants
  nameVariant = computed(() => (this.formErrors().name ? 'error' : 'default'));
  emailVariant = computed(() => (this.formErrors().email ? 'error' : 'default'));
  passwordVariant = computed(() => (this.formErrors().password ? 'error' : 'default'));
  newPasswordVariant = computed(() => (this.formErrors().newPassword ? 'error' : 'default'));
  confirmPasswordVariant = computed(() =>
    this.formErrors().confirmPassword ? 'error' : 'default'
  );

  // Illustration
  readonly illustration = ILLUSTRATIONS.SETTINGS;

  // Effect to update form data when user input changes
  private readonly userEffect = effect(() => this.resetForm());

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
   * @param {string} value value to set for the form data key
   */
  private updateFormData(key: keyof FormData, value: string): void {
    this.formData.update((data) => ({ ...data, [key]: value }));
  }

  /**
   * Handles name input changes
   */
  onNameChange(name: string): void {
    this.updateFormData('name', name);
    this.validateName();
  }

  /**
   * Handles email input changes
   */
  onEmailChange(email: string): void {
    this.updateFormData('email', email);
    this.validateEmail();
  }

  /**
   * Handles password input changes
   */
  onPasswordChange(password: string): void {
    this.updateFormData('password', password);
    this.validatePassword();
  }

  /**
   * Handles new password input changes
   */
  onNewPasswordChange(newPassword: string): void {
    this.updateFormData('newPassword', newPassword);
    this.validateNewPassword();
  }

  /**
   * Handles confirm password input changes
   */
  onConfirmPasswordChange(confirmPassword: string): void {
    this.updateFormData('confirmPassword', confirmPassword);
    this.validateConfirmPassword();
  }

  /**
   * Handles delete password input changes
   */
  onDeletePasswordChange(password: string): void {
    this.deletePassword.set(password);
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) return;

    // Set loading state to true
    this.isLoading.set(true);

    // Create account update object
    const accountData: Partial<IUser> = {
      name: this.formData().name,
      email: this.formData().email
    };

    // Add password if provided
    if (this.formData().newPassword) {
      accountData.password = this.formData().newPassword;
    }

    // Emit the account data
    this.accountUpdate.emit(accountData);

    // Reset form and close dialog
    setTimeout(() => {
      this.resetForm();
    }, 1000);
  }

  /**
   * Handles account deletion
   */
  onDeleteAccount(): void {
    const password = this.deletePassword();

    if (!password || password.length < 6) {
      return;
    }

    // Set loading state to true
    this.isLoading.set(true);

    // Emit the delete event with password
    this.accountDelete.emit(password);

    // Close delete modal
    this.isDeleteModalOpen.set(false);
    this.deletePassword.set('');

    // Reset form and close dialog
    setTimeout(() => {
      this.resetForm();
    }, 1000);
  }

  /**
   * Opens the delete account modal
   */
  openDeleteModal(): void {
    this.isDeleteModalOpen.set(true);
  }

  /**
   * Closes the delete account modal
   */
  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.deletePassword.set('');
  }

  /**
   * Validates the name field
   */
  private validateName(): boolean {
    const name = this.formData().name.trim();

    switch (true) {
      case !name:
        this.updateError('name', 'Nome é obrigatório');
        return false;
      case name.length < 2:
        this.updateError('name', 'Nome deve ter pelo menos 2 caracteres');
        return false;
      case name.length > 100:
        this.updateError('name', 'Nome deve ter no máximo 100 caracteres');
        return false;
      default:
        this.updateError('name', '');
        return true;
    }
  }

  /**
   * Validates the email field
   */
  private validateEmail(): boolean {
    const email = this.formData().email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (true) {
      case !email:
        this.updateError('email', 'Email é obrigatório');
        return false;
      case !emailRegex.test(email):
        this.updateError('email', 'Email inválido');
        return false;
      default:
        this.updateError('email', '');
        return true;
    }
  }

  /**
   * Validates the password field
   */
  private validatePassword(): boolean {
    const password = this.formData().password;

    // Password is optional for updates, so only validate if provided
    if (password && password.length > 0) {
      if (password.length < 6) {
        this.updateError('password', 'Senha deve ter pelo menos 6 caracteres');
        return false;
      }
    }

    this.updateError('password', '');
    return true;
  }

  /**
   * Validates the new password field
   */
  private validateNewPassword(): boolean {
    const newPassword = this.formData().newPassword;

    // New password is optional, so only validate if provided
    if (newPassword && newPassword.length > 0) {
      if (newPassword.length < 6) {
        this.updateError('newPassword', 'Nova senha deve ter pelo menos 6 caracteres');
        return false;
      }
    }

    this.updateError('newPassword', '');
    return true;
  }

  /**
   * Validates the confirm password field
   */
  private validateConfirmPassword(): boolean {
    const newPassword = this.formData().newPassword;
    const confirmPassword = this.formData().confirmPassword;

    // Confirm password is optional, so only validate if provided
    if (confirmPassword && confirmPassword.length > 0) {
      if (confirmPassword !== newPassword) {
        this.updateError('confirmPassword', 'Senhas não coincidem');
        return false;
      }
    }

    this.updateError('confirmPassword', '');
    return true;
  }

  /**
   * Validates the entire form
   */
  private validateForm(): boolean {
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    const isNewPasswordValid = this.validateNewPassword();
    const isConfirmPasswordValid = this.validateConfirmPassword();

    return (
      isNameValid && isEmailValid && isPasswordValid && isNewPasswordValid && isConfirmPasswordValid
    );
  }

  /**
   * Resets the form to initial state
   */
  private resetForm(): void {
    // Get user data
    const user = this.user();

    // Default form data values
    const data: FormData = {
      name: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    };

    // If editing, set form data to user values
    if (user) {
      data.name = user.name;
      data.email = user.email;
    }

    // Set form data
    this.formData.set(data);

    // Reset loading state
    this.isLoading.set(false);
  }

  /**
   * Gets the dialog title
   */
  getDialogTitle(): string {
    return 'Minha Conta';
  }

  /**
   * Gets the submit button text
   */
  getSubmitButtonText(): string {
    if (this.isLoading()) {
      return 'Salvando...';
    }
    return 'Salvar Alterações';
  }

  /**
   * Gets the delete button text
   */
  getDeleteButtonText(): string {
    return 'Excluir Conta';
  }

  /**
   * Checks if delete button should be disabled
   */
  isDeleteDisabled(): boolean {
    return this.deletePassword().length < 6;
  }
}
