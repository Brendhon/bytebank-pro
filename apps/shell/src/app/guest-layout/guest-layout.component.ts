import { FooterComponent } from '@/components/footer/footer.component';
import { HeaderComponent } from '@/components/header/header.component';
import { LoginFormComponent } from '@/components/login-form/login-form.component';
import { RegisterFormComponent } from '@/components/register-form/register-form.component';
import { StoredUser } from '@/core/models/user.model';
import { AuthService } from '@/core/services/auth.service';
import { ToastService } from '@/core/services/toast.service';
import { LoginFormData, RegisterFormData } from '@/core/types/form';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router'; // For routing
import { catchError, Observable, of } from 'rxjs';

/**
 * Guest layout component provides the layout for non-authenticated users
 * including a header, main content area, footer, and modals for login and registration.
 *
 * @example
 * ```html
 * <!-- In your app.component.html or a specific route's component -->
 * <bb-guest-layout>
 * <router-outlet></router-outlet>
 * </bb-guest-layout>
 * ```
 */
@Component({
  selector: 'bb-guest-layout', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './guest-layout.component.html', // Separated template for clarity
  styleUrls: ['./guest-layout.component.css'] // Use CSS specific to component
})
export class GuestLayoutComponent {
  // Inject services
  private router = inject(Router);
  private authService = inject(AuthService);
  private toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  /**
   * Signal to control the visibility of the registration modal.
   */
  isRegisterOpen = signal(false);

  /**
   * Signal to control the visibility of the login modal.
   */
  isLoginOpen = signal(false);

  /**
   * Handles the submission of the login form.
   * Attempts to log in the user and handles success/failure with toasts and navigation.
   * @param loginData The login form data with remember me option.
   */
  onLoginSubmit(loginData: LoginFormData): void {
    this.authService
      .login(loginData.email, loginData.password)
      .pipe(
        catchError((error) => this.handleError(error, 'Credenciais inválidas.')),
        takeUntilDestroyed(this.destroyRef) // Automatically unsubscribe on destroy
      )
      .subscribe((user) => this.handleSuccess(user, 'Login realizado com sucesso!'));
  }

  /**
   * Handles the submission of the registration form.
   * Registers the user and attempts to log them in automatically upon successful registration.
   * @param formData The registration form data.
   */
  onRegisterSubmit(formData: RegisterFormData): void {
    this.authService
      .register(formData.name, formData.email, formData.password)
      .pipe(
        catchError((error) => this.handleError(error, 'Erro ao registrar usuário.')),
        takeUntilDestroyed(this.destroyRef) // Automatically unsubscribe on destroy
      )
      .subscribe((user) => this.handleSuccess(user, 'Usuário registrado com sucesso!'));
  }

  /**
   * Handles successful authentication (login or register)
   * @param {StoredUser | null} user The authenticated user
   * @param {string} message The success message to display
   */
  private handleSuccess(user: StoredUser | null, message: string): void {
    // Check if user is valid
    if (!user) return;

    // Close the appropriate modal
    this.closeLoginModal();
    this.closeRegisterModal();

    // Show success toast message
    this.toast.showSuccess(message);

    // Navigate to dashboard or another protected page
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handles authentication errors (login or register)
   * @param error The error object
   * @returns An Observable of null to continue the rxjs chain
   */
  private handleError(error: Error, message: string): Observable<null> {
    // Get the error message or use a default one
    const errorMessage = message || 'Ocorreu um erro. Tente novamente.';

    // User feedback
    this.toast.showError(errorMessage);
    console.error(errorMessage, error);

    // Return an observable of null to continue the rxjs chain
    return of(null);
  }

  /**
   * Opens the login modal
   */
  openLoginModal(): void {
    this.isLoginOpen.set(true);
  }

  /**
   * Closes the login modal
   */
  closeLoginModal(): void {
    this.isLoginOpen.set(false);
  }

  /**
   * Opens the registration modal
   */
  openRegisterModal(): void {
    this.isRegisterOpen.set(true);
  }

  /**
   * Closes the registration modal
   */
  closeRegisterModal(): void {
    this.isRegisterOpen.set(false);
  }
}
