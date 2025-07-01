import { LoginFormData, RegisterFormData } from '@/core/types/form';
import { FooterComponent } from '@/components/footer/footer.component';
import { HeaderComponent } from '@/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router'; // For routing

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
  imports: [CommonModule, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './guest-layout.component.html', // Separated template for clarity
  styleUrls: ['./guest-layout.component.css'] // Use CSS specific to component
})
export class GuestLayoutComponent implements OnInit {
  // Inject services
  private router = inject(Router);
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
   * Handles the submission of the login form. [cite: DOCUMENTATION_GUIDELINES.md]
   * Attempts to log in the user and handles success/failure with toasts and navigation.
   * @param data The login form data.
   * @param hideToast Optional. If true, suppresses success toast on login.
   */
  onLoginSubmit(data: LoginFormData, hideToast: boolean = false): void {
    console.log('Logging in user:', data);
  }

  /**
   * Handles the submission of the registration form. [cite: DOCUMENTATION_GUIDELINES.md]
   * Registers the user and attempts to log them in automatically upon successful registration.
   * @param formData The registration form data.
   */
  onRegisterSubmit(formData: RegisterFormData): void {
    console.log('Registering user:', formData);
  }
}
