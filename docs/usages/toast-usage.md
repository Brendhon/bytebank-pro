# How to Use the ToastService in ByteBank Pro

The `ToastService` allows displaying temporary notifications throughout the Shell application in a simple and standardized way.

## Important: Service Availability

> **Note**: The `ToastService` is available **only** in the **Shell** project. Micro Frontends (MFEs) must use the CustomEvents approach described below to display toasts.

## For the Shell: Direct Service Usage

### Importing

```typescript
import { ToastService } from '../../core/services/toast.service';
```

### Basic Usage

Inject the service into your component using Angular's modern API:

```typescript
private toast = inject(ToastService);
```

### Usage Examples

#### Display success message:

```typescript
// Displays a success toast that disappears after 3 seconds
this.toast.showSuccess('Operation performed successfully!');

// Specify custom duration (in milliseconds)
this.toast.showSuccess('Operation completed!', 5000);
```

#### Display error message:

```typescript
// Displays an error toast that disappears after 5 seconds (default)
this.toast.showError('Failed to process the operation.');
```

#### Display informational message:

```typescript
// Displays an informational toast that disappears after 4 seconds (default)
this.toast.showInfo('Your session expires in 5 minutes.');
```

#### Close manually:

```typescript
// The method returns a function to close the toast manually
const closeToast = this.toastService.showInfo('Processing...');

// Close the toast when needed
someOperation.pipe(finalize(() => closeToast())).subscribe();
```

## For Micro Frontends: Usage via CustomEvents

MFEs must create their own service to use CustomEvents to trigger toasts that will be displayed by the Shell:

### Event structure

```typescript
interface ToastEventDetail {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // in milliseconds, optional
}
```

### Usage Examples for MFEs

#### Display success message:

```typescript
// Event for success toast (default duration: 3 seconds)
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'success',
      message: 'Operation performed successfully!'
    }
  })
);

// With custom duration
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'success',
      message: 'Operation completed!',
      duration: 5000 // 5 seconds
    }
  })
);
```

#### Display error message:

```typescript
// Event for error toast (default duration: 5 seconds)
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'error',
      message: 'Failed to process the operation.'
    }
  })
);
```

#### Display informational message:

```typescript
// Event for informational toast (default duration: 4 seconds)
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'info',
      message: 'Your session expires in 5 minutes.'
    }
  })
);
```

## Features

- Each toast is positioned at the top right of the screen
- Smooth entry and exit animations
- Colors follow ByteBank Pro design tokens
- Support for different types: success, error, and information
- Manual or automatic closing based on time

## Example ToastService for MFEs

```typescript
@Injectable({ providedIn: 'root' })
export class MfeToastService {
  showSuccess(message: string, duration?: number): void {
    window.dispatchEvent(
      new CustomEvent('bytebank:toast', {
        detail: {
          type: 'success',
          message,
          duration
        }
      })
    );
  }

  showError(message: string, duration?: number): void {
    window.dispatchEvent(
      new CustomEvent('bytebank:toast', {
        detail: {
          type: 'error',
          message,
          duration
        }
      })
    );
  }

  showInfo(message: string, duration?: number): void {
    window.dispatchEvent(
      new CustomEvent('bytebank:toast', {
        detail: {
          type: 'info',
          message,
          duration
        }
      })
    );
  }
}
```
