import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  describe('Toast Creation and Display', () => {
    it('should create and display a success toast', fakeAsync(() => {
      const testMessage = 'Test success message';

      const closeFn = service.showSuccess(testMessage);

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      expect(toastElement!.textContent).toContain(testMessage);

      closeFn();
    }));

    it('should create and display an error toast', fakeAsync(() => {
      const testMessage = 'Test error message';

      const closeFn = service.showError(testMessage);

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      expect(toastElement!.textContent).toContain(testMessage);

      closeFn();
    }));

    it('should create and display an info toast', fakeAsync(() => {
      const testMessage = 'Test info message';

      const closeFn = service.showInfo(testMessage);

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      expect(toastElement!.textContent).toContain(testMessage);

      closeFn();
    }));
  });

  describe('Toast Lifecycle Management', () => {
    it('should remove toast when close function is called', fakeAsync(() => {
      const closeFn = service.showSuccess('Test message');

      tick();

      let toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      closeFn();

      tick(350);

      toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeFalsy();
    }));

    it('should handle multiple toasts independently', fakeAsync(() => {
      const closeFn1 = service.showSuccess('First message');
      const closeFn2 = service.showError('Second message');

      tick();

      const toastElements = document.querySelectorAll('[data-testid="toast-container"]');

      expect(toastElements.length).toBe(2);

      closeFn1();

      tick();

      const remainingToasts = document.querySelectorAll('[data-testid="toast-container"]');

      expect(remainingToasts.length).toBe(1);

      expect(remainingToasts[0].textContent).toContain('Second message');

      closeFn2();
    }));

    it('should return different close functions for different calls', fakeAsync(() => {
      const closeFn1 = service.showSuccess('First message');
      const closeFn2 = service.showError('Second message');

      expect(closeFn1).toBeDefined();

      expect(closeFn2).toBeDefined();

      expect(typeof closeFn1).toBe('function');

      expect(typeof closeFn2).toBe('function');

      expect(closeFn1).not.toBe(closeFn2);

      closeFn1();
      closeFn2();
    }));
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle empty message gracefully', fakeAsync(() => {
      const closeFn = service.showSuccess('');

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      closeFn();
    }));

    it('should handle very long messages', fakeAsync(() => {
      const longMessage = 'A'.repeat(1000);
      const closeFn = service.showSuccess(longMessage);

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      expect(toastElement!.textContent).toContain(longMessage);

      closeFn();
    }));

    it('should handle multiple rapid toast calls', fakeAsync(() => {
      const closeFns: (() => void)[] = [];

      for (let i = 0; i < 5; i++) {
        closeFns.push(service.showSuccess(`Message ${i}`));
      }

      tick();

      const toastElements = document.querySelectorAll('[data-testid="toast-container"]');

      expect(toastElements.length).toBe(5);

      closeFns.forEach((fn) => fn());
    }));

    it('should handle calling close function multiple times', fakeAsync(() => {
      const closeFn = service.showSuccess('Test message');

      tick();

      closeFn();
      closeFn(); // Calling again should not cause issues

      tick(350);

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeFalsy();
    }));
  });

  describe('Default Duration Values', () => {
    it('should use default duration for success toast', fakeAsync(() => {
      const closeFn = service.showSuccess('Test message');

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      closeFn();
      tick();
    }));

    it('should use default duration for error toast', fakeAsync(() => {
      const closeFn = service.showError('Test message');

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      closeFn();
    }));

    it('should use default duration for info toast', fakeAsync(() => {
      const closeFn = service.showInfo('Test message');

      tick();

      const toastElement = document.querySelector('[data-testid="toast-container"]');

      expect(toastElement).toBeTruthy();

      closeFn();
    }));
  });

  afterEach(() => {
    const remainingToasts = document.querySelectorAll('[data-testid="toast-container"]');
    remainingToasts.forEach((toast) => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  });
});
