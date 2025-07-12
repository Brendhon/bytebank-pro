import { Injectable, inject, OnDestroy } from '@angular/core';
import { IUser, StoredUser } from '@bytebank-pro/types';
import { AuthService } from './auth.service';

/**
 * Interface for user update event details from MFEs
 */
interface UserUpdateEventDetail {
  type: 'userUpdated' | 'userDeleted';
  user: IUser | null;
}

/**
 * Service that listens for user update events from Micro Frontends
 * and updates the Shell's AuthService localStorage accordingly.
 */
@Injectable({
  providedIn: 'root'
})
export class MfeUserUpdateListenerService implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly EVENT_NAME = 'bytebank:user-update';
  private eventListener?: (event: CustomEvent<UserUpdateEventDetail>) => void;

  /**
   * Initializes the event listener for MFE user update events
   */
  public initializeEventListener(): void {
    this.eventListener = (event: CustomEvent<UserUpdateEventDetail>) => {
      const { type, user } = event.detail;

      switch (type) {
        case 'userUpdated':
          if (user) {
            this.handleUserUpdate(user);
          }
          break;
        case 'userDeleted':
          this.handleUserDeletion();
          break;
        default:
          console.warn(`Unknown user update type: ${type}`);
      }
    };

    // Add event listener
    window.addEventListener(this.EVENT_NAME, this.eventListener as EventListener);
  }

  /**
   * Handles user update events by updating the stored user data
   * @param user - The updated user data from the MFE
   */
  private handleUserUpdate(user: IUser): void {
    // Get current stored user to preserve the token
    const currentStoredUser = this.authService.user;

    if (currentStoredUser) {
      // Create updated StoredUser with new data but preserve the token
      const updatedStoredUser: StoredUser = {
        _id: user._id || currentStoredUser._id,
        name: user.name,
        email: user.email,
        token: currentStoredUser.token // Preserve the authentication token
      };

      // Update the AuthService with new user data
      this.authService.updateStoredUser(updatedStoredUser);
    }
  }

  /**
   * Handles user deletion events by logging out the user
   */
  private handleUserDeletion(): void {
    // Log out the user when account is deleted
    this.authService.logout();
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
