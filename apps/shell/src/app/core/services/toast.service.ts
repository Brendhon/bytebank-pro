import { Injectable, inject, signal } from '@angular/core';
import { ComponentRef, createComponent } from '@angular/core';
import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import { ToastComponent, ToastVariant } from '@bytebank-pro/ui';

/**
 * Service for displaying toast notifications in the application
 * using the ToastComponent from the UI library.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  private activeToasts = signal<ComponentRef<ToastComponent>[]>([]);

  /**
   * Shows a success toast message
   * @param message - The message to display
   * @param duration - The duration in milliseconds (default: 3000)
   * @returns A function to manually close the toast
   */
  showSuccess(message: string, duration: number = 3000): () => void {
    return this.showToast(message, 'success', duration);
  }

  /**
   * Shows an error toast message
   * @param message - The message to display
   * @param duration - The duration in milliseconds (default: 5000)
   * @returns A function to manually close the toast
   */
  showError(message: string, duration: number = 5000): () => void {
    return this.showToast(message, 'error', duration);
  }

  /**
   * Shows an info toast message
   * @param message - The message to display
   * @param duration - The duration in milliseconds (default: 4000)
   * @returns A function to manually close the toast
   */
  showInfo(message: string, duration: number = 4000): () => void {
    return this.showToast(message, 'info', duration);
  }

  /**
   * Shows a custom toast message
   * @param message - The message to display
   * @param variant - The toast variant (success, error, info)
   * @param duration - The duration in milliseconds
   * @returns A function to manually close the toast
   */
  private showToast(message: string, variant: ToastVariant, duration: number): () => void {
    // Create the toast component dynamically
    const toastComponentRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    // Configure toast properties using the new input functions
    toastComponentRef.setInput('message', message);
    toastComponentRef.setInput('variant', variant);
    toastComponentRef.setInput('duration', duration);
    toastComponentRef.setInput('show', true);

    // Append the toast to the DOM
    document.body.appendChild(toastComponentRef.location.nativeElement);

    // Attach to the application change detection
    this.appRef.attachView(toastComponentRef.hostView);

    // Track the toast
    this.activeToasts.update((toasts) => [...toasts, toastComponentRef]);

    // Setup close handling
    toastComponentRef.instance.toastClose.subscribe(() => {
      this.removeToast(toastComponentRef);
    });

    // Return a function to manually close the toast
    return () => {
      toastComponentRef.setInput('show', false);
      setTimeout(() => this.removeToast(toastComponentRef), 300); // Allow animation to complete
    };
  }

  /**
   * Removes a toast from the DOM and cleans up resources
   */
  private removeToast(toastRef: ComponentRef<ToastComponent>): void {
    const index = this.activeToasts().findIndex((ref) => ref === toastRef);

    if (index >= 0) {
      // Remove from DOM
      const element = toastRef.location.nativeElement;
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }

      // Detach and destroy component
      this.appRef.detachView(toastRef.hostView);
      toastRef.destroy();

      // Update active toasts list
      this.activeToasts.update((toasts) => toasts.filter((t) => t !== toastRef));
    }
  }
}
