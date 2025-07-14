import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastService]
    }).compileComponents();

    service = TestBed.inject(ToastService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('Public Interface', () => {
    it('should have showSuccess method', () => {
      expect(typeof service.showSuccess).toBe('function');
    });

    it('should have showError method', () => {
      expect(typeof service.showError).toBe('function');
    });

    it('should have showInfo method', () => {
      expect(typeof service.showInfo).toBe('function');
    });

    it('should return a function from showSuccess', () => {
      const result = service.showSuccess('Test message');

      expect(typeof result).toBe('function');
    });

    it('should return a function from showError', () => {
      const result = service.showError('Test message');

      expect(typeof result).toBe('function');
    });

    it('should return a function from showInfo', () => {
      const result = service.showInfo('Test message');

      expect(typeof result).toBe('function');
    });
  });

  describe('Method Signatures', () => {
    it('should accept message parameter in showSuccess', () => {
      const closeFn = service.showSuccess('Test message');

      expect(typeof closeFn).toBe('function');
    });

    it('should accept message and duration parameters in showSuccess', () => {
      const closeFn = service.showSuccess('Test message', 5000);

      expect(typeof closeFn).toBe('function');
    });

    it('should accept message parameter in showError', () => {
      const closeFn = service.showError('Test message');

      expect(typeof closeFn).toBe('function');
    });

    it('should accept message and duration parameters in showError', () => {
      const closeFn = service.showError('Test message', 7000);

      expect(typeof closeFn).toBe('function');
    });

    it('should accept message parameter in showInfo', () => {
      const closeFn = service.showInfo('Test message');

      expect(typeof closeFn).toBe('function');
    });

    it('should accept message and duration parameters in showInfo', () => {
      const closeFn = service.showInfo('Test message', 6000);

      expect(typeof closeFn).toBe('function');
    });
  });

  describe('Component Creation and Configuration', () => {
    it('should create toast component with correct inputs', () => {
      const testMessage = 'Test success message';
      const testDuration = 3000;

      const closeFn = service.showSuccess(testMessage, testDuration);

      // Get the created component from DOM
      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();
      expect(toastElement!.textContent).toContain(testMessage);

      // Clean up
      closeFn();
    });

    it('should create error toast with correct variant', () => {
      const testMessage = 'Test error message';

      const closeFn = service.showError(testMessage);

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();
      expect(toastElement!.classList).toContain('toast-variant-error');

      // Clean up
      closeFn();
    });

    it('should create info toast with correct variant', () => {
      const testMessage = 'Test info message';

      const closeFn = service.showInfo(testMessage);

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();
      expect(toastElement!.classList).toContain('toast-variant-info');

      // Clean up
      closeFn();
    });

    it('should create success toast with correct variant', () => {
      const testMessage = 'Test success message';

      const closeFn = service.showSuccess(testMessage);

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();
      expect(toastElement!.classList).toContain('toast-variant-success');

      // Clean up
      closeFn();
    });
  });

  describe('Toast Lifecycle', () => {
    it('should remove toast when close function is called', () => {
      const closeFn = service.showSuccess('Test message');

      // Verify toast is created
      let toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      // Close the toast
      closeFn();

      // Wait for animation to complete
      setTimeout(() => {
        toastElement = document.querySelector('[data-testid="toast-container"]');

        expect(toastElement).toBeFalsy();
      }, 350);
    });

    it('should handle multiple toasts independently', () => {
      const closeFn1 = service.showSuccess('First message');
      const closeFn2 = service.showError('Second message');

      // Verify both toasts are created
      const toastElements = document.querySelectorAll('[data-testid="toast-container"]');

      expect(toastElements.length).toBe(2);

      // Close first toast
      closeFn1();

      setTimeout(() => {
        const remainingToasts = document.querySelectorAll('[data-testid="toast-container"]');

        expect(remainingToasts.length).toBe(1);
        expect(remainingToasts[0].textContent).toContain('Second message');

        // Close second toast
        closeFn2();
      }, 350);
    });
  });

  describe('Return Values', () => {
    it('should return different close functions for different calls', () => {
      const closeFn1 = service.showSuccess('First message');
      const closeFn2 = service.showError('Second message');

      expect(closeFn1).toBeDefined();
      expect(closeFn2).toBeDefined();
      expect(typeof closeFn1).toBe('function');
      expect(typeof closeFn2).toBe('function');
      expect(closeFn1).not.toBe(closeFn2);

      // Clean up
      closeFn1();
      closeFn2();
    });
  });

  afterEach(() => {
    // Clean up any remaining toasts
    const remainingToasts = document.querySelectorAll('[data-testid="toast-container"]');
    remainingToasts.forEach((toast) => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  });
});
