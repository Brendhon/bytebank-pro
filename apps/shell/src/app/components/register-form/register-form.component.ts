import { RegisterFormData } from '@/core/types/form';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';
import {
  ButtonComponent,
  CheckboxComponent,
  DialogComponent,
  ImgComponent,
  InputComponent
} from '@bytebank-pro/ui';
import { Eye, EyeOff, Lock, Mail, User, LucideAngularModule } from 'lucide-angular';

interface FormData extends RegisterFormData {
  passwordConfirmation: string;
}

interface FormErrors extends Omit<FormData, 'acceptPrivacy'> {
  acceptPrivacy: string;
}

/**
 * Register form component that provides a complete registration interface
 * with name, email, password, password confirmation fields and privacy policy checkbox.
 * Uses components from the ByteBank Pro UI library.
 */
@Component({
  selector: 'bb-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    DialogComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    ImgComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bb-register-form-wrapper]': 'true',
    '[class.bb-register-form-loading]': 'isLoading()'
  }
})
export class RegisterFormComponent {
  // Icons from Lucide
  readonly mailIcon = Mail;
  readonly userIcon = User;
  readonly lockIcon = Lock;
  readonly eyeIcon = Eye;
  readonly eyeOffIcon = EyeOff;

  // Icon to page illustration. This image is displayed on the page.
  readonly illustrationSrc = ILLUSTRATIONS.REGISTER;

  // Dialog state - controlled externally
  isOpen = input.required<boolean>();

  // Form state using signals
  formData = signal<FormData>({
    name: '',
    email: '',
    password: '',
    acceptPrivacy: false,
    passwordConfirmation: ''
  });

  // Form error state using signals
  formErrors = signal<FormErrors>({
    name: '',
    email: '',
    password: '',
    acceptPrivacy: '',
    passwordConfirmation: ''
  });

  // Loading state
  isLoading = signal(false);

  // Event emitters using modern output() API
  registerSubmit = output<RegisterFormData>();
  dialogClose = output<void>();

  /**
   * Function to update errors
   * @param { key: keyof FormErrors, message: string } - Key of the error to update and the message
   */
  private updateError(key: keyof FormErrors, message: string): void {
    this.formErrors.update((errors) => ({ ...errors, [key]: message }));
  }

  /**
   * Function to update form data
   * @param { key: keyof FormData, value: string | boolean } - Key of the form data to update and the new value
   */
  private updateFormData(key: keyof FormData, value: string | boolean): void {
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
    // Re-validate password confirmation if it has been entered
    if (this.formData().passwordConfirmation) {
      this.validatePasswordConfirmation();
    }
  }

  /**
   * Handles password confirmation input changes
   */
  onPasswordConfirmationChange(passwordConfirmation: string): void {
    this.updateFormData('passwordConfirmation', passwordConfirmation);
    this.validatePasswordConfirmation();
  }

  /**
   * Handles privacy policy checkbox changes
   */
  onPrivacyChange(acceptPrivacy: boolean): void {
    this.updateFormData('acceptPrivacy', acceptPrivacy);
    this.validatePrivacy();
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) return;

    // Set loading state to true
    this.isLoading.set(true);

    // Extract RegisterFormData from FormData (remove passwordConfirmation)
    const { passwordConfirmation, ...registerData } = this.formData();

    // Emit the registration data
    this.registerSubmit.emit(registerData);

    // Reset loading state after a short delay (parent component should handle this)
    setTimeout(() => this.isLoading.set(false), 1000);
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
      case name.length < 6:
        this.updateError('name', 'Nome deve ter pelo menos 6 caracteres');
        return false;
      case name.length > 50:
        this.updateError('name', 'Nome deve ter no máximo 50 caracteres');
        return false;
      case !/^[a-zA-ZÀ-ÿ\s]+$/.test(name):
        this.updateError('name', 'Nome deve conter apenas letras e espaços');
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

    switch (true) {
      case !email:
        this.updateError('email', 'Email é obrigatório');
        return false;
      case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
        this.updateError('email', 'Digite um email válido');
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

    switch (true) {
      case !password:
        this.updateError('password', 'Senha é obrigatória');
        return false;
      case password.length < 6:
        this.updateError('password', 'Senha deve ter pelo menos 6 caracteres');
        return false;
      default:
        this.updateError('password', '');
        return true;
    }
  }

  /**
   * Validates the password confirmation field
   */
  private validatePasswordConfirmation(): boolean {
    const { passwordConfirmation, password } = this.formData();

    switch (true) {
      case !passwordConfirmation:
        this.updateError('passwordConfirmation', 'Confirmação de senha é obrigatória');
        return false;
      case passwordConfirmation !== password:
        this.updateError('passwordConfirmation', 'As senhas não coincidem');
        return false;
      default:
        this.updateError('passwordConfirmation', '');
        return true;
    }
  }

  /**
   * Validates the privacy policy checkbox
   */
  private validatePrivacy(): boolean {
    switch (true) {
      case !this.formData().acceptPrivacy:
        this.updateError(
          'acceptPrivacy',
          'Você deve aceitar a Política de Privacidade para continuar'
        );
        return false;
      default:
        this.updateError('acceptPrivacy', '');
        return true;
    }
  }

  /**
   * Validates the entire form
   */
  private validateForm(): boolean {
    // Execute all validations to update all error messages at once
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    const isPasswordConfirmationValid = this.validatePasswordConfirmation();
    const isPrivacyValid = this.validatePrivacy();

    return (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmationValid &&
      isPrivacyValid
    );
  }

  /**
   * Resets the form to initial state
   */
  private resetForm(): void {
    this.formData.set({
      name: '',
      email: '',
      password: '',
      acceptPrivacy: false,
      passwordConfirmation: ''
    });

    // Reset all errors
    this.updateError('name', '');
    this.updateError('email', '');
    this.updateError('password', '');
    this.updateError('acceptPrivacy', '');
    this.updateError('passwordConfirmation', '');

    this.isLoading.set(false);
  }

  /**
   * Computed properties for form state
   */
  isFormValid = computed(() => {
    const data = this.formData();
    const errors = this.formErrors();
    return (
      Object.values(errors).every((error) => !error) &&
      Object.values(data).every((value) => !!value)
    );
  });

  nameVariant = computed(() => (this.formErrors().name ? 'error' : 'default'));
  emailVariant = computed(() => (this.formErrors().email ? 'error' : 'default'));
  passwordVariant = computed(() => (this.formErrors().password ? 'error' : 'default'));
  passwordConfirmationVariant = computed(() =>
    this.formErrors().passwordConfirmation ? 'error' : 'default'
  );
  privacyVariant = computed(() => (this.formErrors().acceptPrivacy ? 'error' : 'success'));
}
