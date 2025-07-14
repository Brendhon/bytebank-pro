# MFE User Update Integration

This document explains how the user data update integration between Micro Frontends (MFEs) and the Shell works using CustomEvents.

## Architecture

```
Settings MFE → CustomEvent → Shell → AuthService → localStorage
```

## Components

### 1. MfeUserUpdateService (Settings MFE)

Located at: `apps/settings/src/app/core/services/mfe-user-update.service.ts`

Responsible for dispatching CustomEvents for the Shell to update the user data in localStorage.

**Available methods:**

- `notifyUserUpdated(user: IUser)` - Notifies of user data updates
- `notifyUserDeleted()` - Notifies of user account deletion

### 2. MfeUserUpdateListenerService (Shell)

Located at: `apps/shell/src/app/core/services/mfe-user-update-listener.service.ts`

Responsible for listening to CustomEvents from MFEs and updating the AuthService.

### 3. AuthService (Shell)

Located at: `apps/shell/src/app/core/services/auth.service.ts`

The main service that manages the user state and localStorage.

## How to Use

### In the Settings MFE

```typescript
import { MfeUserUpdateService } from '@/core/services/mfe-user-update.service';

export class SettingsComponent {
  private readonly userUpdateService = inject(MfeUserUpdateService);

  handleUserUpdate(updatedUser: IUser): void {
    // After successfully updating in the API
    this.userUpdateService.notifyUserUpdated(updatedUser);
  }

  handleUserDeletion(): void {
    // After successfully deleting in the API
    this.userUpdateService.notifyUserDeleted();
  }
}
```

### CustomEvent Event

The MfeUserUpdateService dispatches events with the following structure:

```typescript
interface UserUpdateEventDetail {
  type: 'userUpdated' | 'userDeleted';
  user: IUser | null;
}
```

Event dispatched for an update:

```typescript
window.dispatchEvent(
  new CustomEvent('bytebank:user-update', {
    detail: {
      type: 'userUpdated',
      user: updatedUserData
    }
  })
);
```

Event dispatched for a deletion:

```typescript
window.dispatchEvent(
  new CustomEvent('bytebank:user-update', {
    detail: {
      type: 'userDeleted',
      user: null
    }
  })
);
```

## Current Integration

### Settings MFE

The `SettingsPageComponent` component is already integrated with the MfeUserUpdateService and notifies the Shell about:

- ✅ User data updates (name, email, password)
- ✅ User account deletion

### Shell

The `MfeUserUpdateListenerService` is automatically initialized in the Shell's main component (`App`) and listens for events from the Settings MFE.

## Behavior

### User Update

1. **Settings MFE** updates the data via API
2. **Settings MFE** dispatches a `userUpdated` event with the new data
3. **Shell** receives the event and updates localStorage
4. **Shell** preserves the authentication token
5. **Shell** updates only the name and email in the StoredUser

### User Deletion

1. **Settings MFE** deletes the account via API
2. **Settings MFE** dispatches a `userDeleted` event
3. **Shell** receives the event and performs a logout
4. **Shell** clears localStorage and redirects to the login page

## Advantages

1. **Synchronization**: User data remains synchronized between the MFE and the Shell
2. **Consistency**: localStorage always reflects the most recent data
3. **Decoupling**: MFEs do not need to know the implementation of the AuthService
4. **Security**: The authentication token is preserved during updates
5. **Maintainability**: Changes in the AuthService are applied automatically

## Complete Usage Example

```typescript
// In the Settings MFE
this.settingsService.updateUser(userData).subscribe({
  next: (updatedUser: IUser) => {
    this.currentUser.set(updatedUser);
    this.toastService.showSuccess('Data updated successfully!');

    // Notify the Shell about the update
    this.userUpdateService.notifyUserUpdated(updatedUser);
  },
  error: (error) => {
    console.error('Error:', error);
    this.toastService.showError('Failed to update data.');
  }
});
```

The Shell's localStorage will be updated automatically through the CustomEvents mechanism, maintaining data synchronization.
