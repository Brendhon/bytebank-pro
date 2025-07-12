import { Injectable } from '@angular/core';

/**
 * Interface for toast event details
 */
interface ToastEventDetail {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // in milliseconds, optional
}

/**
 * Service for displaying toast notifications in Settings Micro Frontend
 * using CustomEvents to communicate with the Shell application.
 */
@Injectable({
  providedIn: 'root'
})
export class MfeToastService {
  private readonly EVENT_NAME = 'bytebank:toast';

  /**
   * Shows a success toast message
   * @param message - The message to display
   * @param duration - The duration in milliseconds (default: 3000)
   */
  showSuccess(message: string, duration?: number): void {
    this.dispatchToastEvent('success', message, duration);
  }

  /**
   * Shows an error toast message
   * @param message - The message to display
   * @param duration - The duration in milliseconds (default: 5000)
   */
  showError(message: string, duration?: number): void {
    this.dispatchToastEvent('error', message, duration);
  }

  /**
   * Shows an info toast message
   * @param message - The message to display
   * @param duration - The duration in milliseconds (default: 4000)
   */
  showInfo(message: string, duration?: number): void {
    this.dispatchToastEvent('info', message, duration);
  }

  /**
   * Dispatches a toast event to the Shell application
   * @param type - The toast type (success, error, info)
   * @param message - The message to display
   * @param duration - The duration in milliseconds
   */
  private dispatchToastEvent(
    type: ToastEventDetail['type'],
    message: string,
    duration?: number
  ): void {
    const eventDetail: ToastEventDetail = {
      type,
      message,
      duration
    };

    window.dispatchEvent(
      new CustomEvent(this.EVENT_NAME, {
        detail: eventDetail
      })
    );
  }
}
