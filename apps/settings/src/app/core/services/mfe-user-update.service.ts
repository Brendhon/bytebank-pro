import { Injectable } from '@angular/core';
import { IUser } from '@bytebank-pro/types';

/**
 * Interface for user update event details
 */
interface UserUpdateEventDetail {
  type: 'userUpdated' | 'userDeleted';
  user: IUser | null;
}

/**
 * Service for communicating user updates from Settings Micro Frontend
 * to the Shell application using CustomEvents.
 */
@Injectable({
  providedIn: 'root'
})
export class MfeUserUpdateService {
  private readonly EVENT_NAME = 'bytebank:user-update';

  /**
   * Notifies the Shell that user data has been updated
   * @param user - The updated user data
   */
  notifyUserUpdated(user: IUser): void {
    this.dispatchUserUpdateEvent('userUpdated', user);
  }

  /**
   * Notifies the Shell that user account has been deleted
   */
  notifyUserDeleted(): void {
    this.dispatchUserUpdateEvent('userDeleted', null);
  }

  /**
   * Dispatches a user update event to the Shell application
   * @param type - The event type (userUpdated, userDeleted)
   * @param user - The user data (null for deletion)
   */
  private dispatchUserUpdateEvent(type: UserUpdateEventDetail['type'], user: IUser | null): void {
    const eventDetail: UserUpdateEventDetail = {
      type,
      user
    };

    window.dispatchEvent(
      new CustomEvent(this.EVENT_NAME, {
        detail: eventDetail
      })
    );
  }
}
