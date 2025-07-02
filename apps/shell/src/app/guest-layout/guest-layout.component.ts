import { LoginFormData, RegisterFormData } from '@/core/types/form';
import { FooterComponent } from '@/components/footer/footer.component';
import { HeaderComponent } from '@/components/header/header.component';
import { LoginFormComponent } from '@/components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router'; // For routing
import { RegisterFormComponent } from '@/components/register-form/register-form.component';
import { AuthService } from '@/core/services/auth.service';
import { catchError, finalize, of } from 'rxjs';

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
export class GuestLayoutComponent implements OnInit {
  // Inject services
  private router = inject(Router);
  private authService = inject(AuthService);

  /**
   * Signal to control the visibility of the registration modal.
   */
  isRegisterOpen = signal(false);

  /**
   * Signal to control the visibility of the login modal.
   */
  isLoginOpen = signal(false);

  /**
   * Lifecycle hook called after component initialization.
   * Ensures initial state setup.
   */
  ngOnInit(): void {
    // Any initial setup for the guest layout if needed
  }

  /**
   * Handles the submission of the login form.
   * Attempts to log in the user and handles success/failure with toasts and navigation.
   * @param loginData The login form data with remember me option.
   */
  onLoginSubmit(loginData: LoginFormData): void {
    console.log('Logging in user:', loginData);

    this.authService
      .login(loginData.email, loginData.password)
      .pipe(
        catchError((error) => {
          console.error('Login error:', error.message);
          return of(null);
        })
      )
      .subscribe((user) => {
        if (user) {
          // Successful login
          this.closeLoginModal();

          // Navigate to dashboard or another protected page
          this.router.navigate(['/dashboard']);

          // You could also show a success message here
          console.log('User logged in successfully:', user);
        }
      });
  }

  /**
   * Handles the submission of the registration form.
   * Registers the user and attempts to log them in automatically upon successful registration.
   * @param formData The registration form data.
   */
  onRegisterSubmit(formData: RegisterFormData): void {
    console.log('Registering user:', formData);

    this.authService
      .register(formData.name, formData.email, formData.password)
      .pipe(
        catchError((error) => {
          console.error('Error registering user:', error.message);
          return of(null);
        }),
        finalize(() => {
          // Regardless of the result, finalize any loading state in the child component
          // If using refs for child components, you could reset here
        })
      )
      .subscribe((user) => {
        if (user) {
          // Registration successful
          this.closeRegisterModal();

          // Navigate to dashboard or another protected page
          this.router.navigate(['/dashboard']);

          // You could also show a success message here
          console.log('User registered successfully:', user);
        }
      });
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
