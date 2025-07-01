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
  formData = signal<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    acceptPrivacy: false
  });

  // Additional password confirmation state
  passwordConfirmation = signal<string>('');

  // Form validation state
  nameError = signal<string>('');
  emailError = signal<string>('');
  passwordError = signal<string>('');
  passwordConfirmationError = signal<string>('');
  privacyError = signal<string>('');

  // Loading state
  isLoading = signal(false);

  // Event emitters using modern output() API
  registerSubmit = output<RegisterFormData>();
  dialogClose = output<void>();

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
    this.formData.update((data) => ({ ...data, name }));
    this.validateName();
  }

  /**
   * Handles email input changes
   */
  onEmailChange(email: string): void {
    this.formData.update((data) => ({ ...data, email }));
    this.validateEmail();
  }

  /**
   * Handles password input changes
   */
  onPasswordChange(password: string): void {
    this.formData.update((data) => ({ ...data, password }));
    this.validatePassword();
    // Re-validate password confirmation if it has been entered
    if (this.passwordConfirmation()) {
      this.validatePasswordConfirmation();
    }
  }

  /**
   * Handles password confirmation input changes
   */
  onPasswordConfirmationChange(passwordConfirmation: string): void {
    this.passwordConfirmation.set(passwordConfirmation);
    this.validatePasswordConfirmation();
  }

  /**
   * Handles privacy policy checkbox changes
   */
  onPrivacyChange(acceptPrivacy: boolean): void {
    this.formData.update((data) => ({ ...data, acceptPrivacy }));
    this.validatePrivacy();
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading.set(true);

    // Emit the registration data
    this.registerSubmit.emit(this.formData());

    // Reset loading state after a short delay (parent component should handle this)
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Validates the name field
   */
  private validateName(): boolean {
    const name = this.formData().name.trim();

    if (!name) {
      this.nameError.set('Nome é obrigatório');
      return false;
    }

    if (name.length < 2) {
      this.nameError.set('Nome deve ter pelo menos 2 caracteres');
      return false;
    }

    if (name.length > 100) {
      this.nameError.set('Nome deve ter no máximo 100 caracteres');
      return false;
    }

    // Basic name validation (letters, spaces, and common accented characters)
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nameRegex.test(name)) {
      this.nameError.set('Nome deve conter apenas letras e espaços');
      return false;
    }

    this.nameError.set('');
    return true;
  }

  /**
   * Validates the email field
   */
  private validateEmail(): boolean {
    const email = this.formData().email.trim();

    if (!email) {
      this.emailError.set('Email é obrigatório');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.emailError.set('Digite um email válido');
      return false;
    }

    this.emailError.set('');
    return true;
  }

  /**
   * Validates the password field
   */
  private validatePassword(): boolean {
    const password = this.formData().password;

    if (!password) {
      this.passwordError.set('Senha é obrigatória');
      return false;
    }

    if (password.length < 8) {
      this.passwordError.set('Senha deve ter pelo menos 8 caracteres');
      return false;
    }

    if (password.length > 128) {
      this.passwordError.set('Senha deve ter no máximo 128 caracteres');
      return false;
    }

    // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      this.passwordError.set(
        'Senha deve conter ao menos: 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial'
      );
      return false;
    }

    this.passwordError.set('');
    return true;
  }

  /**
   * Validates the password confirmation field
   */
  private validatePasswordConfirmation(): boolean {
    const passwordConfirmation = this.passwordConfirmation();
    const password = this.formData().password;

    if (!passwordConfirmation) {
      this.passwordConfirmationError.set('Confirmação de senha é obrigatória');
      return false;
    }

    if (passwordConfirmation !== password) {
      this.passwordConfirmationError.set('As senhas não coincidem');
      return false;
    }

    this.passwordConfirmationError.set('');
    return true;
  }

  /**
   * Validates the privacy policy checkbox
   */
  private validatePrivacy(): boolean {
    if (!this.formData().acceptPrivacy) {
      this.privacyError.set('Você deve aceitar a Política de Privacidade para continuar');
      return false;
    }

    this.privacyError.set('');
    return true;
  }

  /**
   * Validates the entire form
   */
  private validateForm(): boolean {
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
    this.formData.set({ name: '', email: '', password: '', acceptPrivacy: false });
    this.passwordConfirmation.set('');
    this.nameError.set('');
    this.emailError.set('');
    this.passwordError.set('');
    this.passwordConfirmationError.set('');
    this.privacyError.set('');
    this.isLoading.set(false);
  }

  /**
   * Computed properties for form state
   */
  isFormValid = computed(() => {
    const data = this.formData();
    const passwordConfirmation = this.passwordConfirmation();
    return (
      data.name.length > 0 &&
      data.email.length > 0 &&
      data.password.length > 0 &&
      passwordConfirmation.length > 0 &&
      data.acceptPrivacy &&
      !this.nameError() &&
      !this.emailError() &&
      !this.passwordError() &&
      !this.passwordConfirmationError() &&
      !this.privacyError()
    );
  });

  nameVariant = computed(() => (this.nameError() ? 'error' : 'default'));
  emailVariant = computed(() => (this.emailError() ? 'error' : 'default'));
  passwordVariant = computed(() => (this.passwordError() ? 'error' : 'default'));
  passwordConfirmationVariant = computed(() =>
    this.passwordConfirmationError() ? 'error' : 'default'
  );
  privacyVariant = computed(() => (this.privacyError() ? 'error' : 'default'));
}
