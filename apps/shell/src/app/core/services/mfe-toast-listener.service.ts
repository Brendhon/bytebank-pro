import { Injectable, inject, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';

/**
 * Interface for toast event details from MFEs
 */
interface ToastEventDetail {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // in milliseconds, optional
}

/**
 * Service that listens for toast events from Micro Frontends
 * and displays them using the Shell's ToastService.
 */
@Injectable({
  providedIn: 'root'
})
export class MfeToastListenerService implements OnDestroy {
  private readonly toastService = inject(ToastService);
  private readonly EVENT_NAME = 'bytebank:toast';
  private eventListener?: (event: CustomEvent<ToastEventDetail>) => void;

  /**
   * Initializes the event listener for MFE toast events
   */
  public initializeEventListener(): void {
    this.eventListener = (event: CustomEvent<ToastEventDetail>) => {
      const { type, message, duration } = event.detail;

      switch (type) {
        case 'success':
          this.toastService.showSuccess(message, duration);
          break;
        case 'error':
          this.toastService.showError(message, duration);
          break;
        case 'info':
          this.toastService.showInfo(message, duration);
          break;
        default:
          console.warn(`Unknown toast type: ${type}`);
      }
    };

    // Add event listener
    window.addEventListener(this.EVENT_NAME, this.eventListener as EventListener);
  }

  /**
   * Cleans up the event listener when the service is destroyed
   */
  ngOnDestroy(): void {
    if (this.eventListener) {
      window.removeEventListener(this.EVENT_NAME, this.eventListener as EventListener);
    }
  }
}
