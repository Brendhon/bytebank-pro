import { LoginFormData } from '@/core/types/form';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';
import { ButtonComponent, DialogComponent, ImgComponent, InputComponent } from '@bytebank-pro/ui';
import { Mail, LucideAngularModule } from 'lucide-angular';

/**
 * Login form component that provides a complete login interface
 * with email, password fields and remember me option.
 * Uses components from the ByteBank Pro UI library.
 */
@Component({
  selector: 'bb-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    DialogComponent,
    InputComponent,
    ButtonComponent,
    ImgComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  // Icons from Lucide
  readonly mailIcon = Mail;

  // Icon to page illustration. This image is displayed on the page.
  readonly illustrationSrc = ILLUSTRATIONS.LOGIN;

  // Dialog state - controlled externally
  isOpen = input.required<boolean>();

  // Form state using signals
  formData = signal<LoginFormData>({
    email: '',
    password: ''
  });

  // Form validation state
  emailError = signal<string>('');
  passwordError = signal<string>('');

  // Loading state
  isLoading = signal(false);

  // Event emitters using modern output() API
  loginSubmit = output<LoginFormData>();
  dialogClose = output<void>();

  /**
   * Handles dialog close event
   */
  onDialogClose(): void {
    this.dialogClose.emit();
    this.resetForm();
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
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading.set(true);

    // Emit the login data
    this.loginSubmit.emit(this.formData());

    // Reset loading state after a short delay (parent component should handle this)
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Validates the email field
   */
  private validateEmail(): boolean {
    const email = this.formData().email;

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

    if (password.length < 6) {
      this.passwordError.set('Senha deve ter pelo menos 6 caracteres');
      return false;
    }

    this.passwordError.set('');
    return true;
  }

  /**
   * Validates the entire form
   */
  private validateForm(): boolean {
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    return isEmailValid && isPasswordValid;
  }

  /**
   * Resets the form to initial state
   */
  private resetForm(): void {
    this.formData.set({ email: '', password: '' });
    this.emailError.set('');
    this.passwordError.set('');
    this.isLoading.set(false);
  }

  /**
   * Computed properties for form state
   */
  isFormValid = computed(() => {
    const data = this.formData();
    return (
      data.email.length > 0 &&
      data.password.length > 0 &&
      !this.emailError() &&
      !this.passwordError()
    );
  });

  emailVariant = computed(() => (this.emailError() ? 'error' : 'default'));

  passwordVariant = computed(() => (this.passwordError() ? 'error' : 'default'));
}
