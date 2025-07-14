# MFE Toast Integration

This document explains how the toast integration between Micro Frontends (MFEs) and the Shell works using CustomEvents.

## Architecture

```
MFE (Transactions) → CustomEvent → Shell → ToastService → ToastComponent
```

## Components

### 1. MfeToastService (MFE)

Located at: `apps/transactions/src/app/core/services/mfe-toast.service.ts`

Responsible for dispatching CustomEvents for the Shell to display toasts.

**Available methods:**

- `showSuccess(message: string, duration?: number)`
- `showError(message: string, duration?: number)`
- `showInfo(message: string, duration?: number)`

### 2. MfeToastListenerService (Shell)

Located at: `apps/shell/src/app/core/services/mfe-toast-listener.service.ts`

Responsible for listening to CustomEvents from MFEs and calling the ToastService.

### 3. ToastService (Shell)

Located at: `apps/shell/src/app/core/services/toast.service.ts`

The main service that displays toasts using the ToastComponent.

## How to Use

### In the MFE (Transactions)

```typescript
import { MfeToastService } from '@/core/services/mfe-toast.service';

export class MyComponent {
  private readonly toastService = inject(MfeToastService);

  handleSuccess(): void {
    this.toastService.showSuccess('Operation completed successfully!');
  }

  handleError(): void {
    this.toastService.showError('Something went wrong!');
  }

  handleInfo(): void {
    this.toastService.showInfo('Processing your request...');
  }
}
```

### CustomEvent Event

The MfeToastService dispatches events with the following structure:

```typescript
interface ToastEventDetail {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // in milliseconds, optional
}
```

Event dispatched:

```typescript
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'success',
      message: 'Operation completed!',
      duration: 3000
    }
  })
);
```

## Current Integration

### Transactions MFE

The `TransactionsPageComponent` component is already integrated with the MfeToastService and displays toasts for:

- ✅ Successful transaction creation
- ✅ Successful transaction update
- ✅ Successful transaction deletion
- ❌ Error creating transaction
- ❌ Error updating transaction
- ❌ Error deleting transaction
- ❌ Error loading transactions

### Shell

The `MfeToastListenerService` is automatically initialized in the Shell's main component (`App`) and listens for events from all MFEs.

## Advantages

1. **Reusability**: The ToastComponent is reused across all MFEs
2. **Consistency**: All toasts follow the same visual pattern
3. **Decoupling**: MFEs do not need to know the toast implementation
4. **Maintainability**: Changes to the toast are automatically applied to all MFEs

## Complete Usage Example

```typescript
// In the MFE
this.transactionsService.createTransaction(data).subscribe({
  next: () => {
    this.toastService.showSuccess('Transaction created successfully!');
    this.loadTransactions();
  },
  error: (error) => {
    console.error('Error:', error);
    this.toastService.showError('Failed to create transaction. Please try again.');
  }
});
```

The toast will be displayed in the Shell automatically through the CustomEvents mechanism.
