import { TestBed } from '@angular/core/testing';
import { MfeToastListenerService } from './mfe-toast-listener.service';
import { ToastService } from './toast.service';

describe('MfeToastListenerService', () => {
  let service: MfeToastListenerService;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    const toastServiceSpy = jasmine.createSpyObj('ToastService', [
      'showSuccess',
      'showError',
      'showInfo'
    ]);

    TestBed.configureTestingModule({
      providers: [MfeToastListenerService, { provide: ToastService, useValue: toastServiceSpy }]
    });

    service = TestBed.inject(MfeToastListenerService);
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeEventListener', () => {
    beforeEach(() => {
      service.initializeEventListener();
    });

    it('should initialize event listener', () => {
      expect(service).toBeTruthy();
    });

    it('should handle success toast events', () => {
      const event = new CustomEvent('bytebank:toast', {
        detail: {
          type: 'success',
          message: 'Success message',
          duration: 3000
        }
      });

      window.dispatchEvent(event);

      expect(toastService.showSuccess).toHaveBeenCalledWith('Success message', 3000);
    });

    it('should handle error toast events', () => {
      const event = new CustomEvent('bytebank:toast', {
        detail: {
          type: 'error',
          message: 'Error message',
          duration: 5000
        }
      });

      window.dispatchEvent(event);

      expect(toastService.showError).toHaveBeenCalledWith('Error message', 5000);
    });

    it('should handle info toast events', () => {
      const event = new CustomEvent('bytebank:toast', {
        detail: {
          type: 'info',
          message: 'Info message'
        }
      });

      window.dispatchEvent(event);

      expect(toastService.showInfo).toHaveBeenCalledWith('Info message', undefined);
    });

    it('should handle unknown toast types', () => {
      const consoleSpy = spyOn(console, 'warn');
      const event = new CustomEvent('bytebank:toast', {
        detail: {
          type: 'unknown',
          message: 'Unknown message'
        }
      });

      window.dispatchEvent(event);

      expect(consoleSpy).toHaveBeenCalledWith('Unknown toast type: unknown');
      expect(toastService.showSuccess).not.toHaveBeenCalled();
      expect(toastService.showError).not.toHaveBeenCalled();
      expect(toastService.showInfo).not.toHaveBeenCalled();
    });

    it('should handle events without duration', () => {
      const event = new CustomEvent('bytebank:toast', {
        detail: {
          type: 'success',
          message: 'Success message'
        }
      });

      window.dispatchEvent(event);

      expect(toastService.showSuccess).toHaveBeenCalledWith('Success message', undefined);
    });
  });

  describe('ngOnDestroy', () => {
    it('should remove event listener on destroy', () => {
      const removeEventListenerSpy = spyOn(window, 'removeEventListener');

      service.initializeEventListener();
      service.ngOnDestroy();

      expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    it('should not throw error if event listener is not initialized', () => {
      expect(() => service.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Service Structure', () => {
    it('should be injectable', () => {
      expect(service).toBeInstanceOf(MfeToastListenerService);
    });

    it('should have initializeEventListener method', () => {
      expect(typeof service.initializeEventListener).toBe('function');
    });

    it('should have ngOnDestroy method', () => {
      expect(typeof service.ngOnDestroy).toBe('function');
    });
  });

  describe('Event Handling', () => {
    beforeEach(() => {
      service.initializeEventListener();
    });

    it('should only handle bytebank:toast events', () => {
      const otherEvent = new CustomEvent('other:event', {
        detail: { message: 'Other message' }
      });

      window.dispatchEvent(otherEvent);

      expect(toastService.showSuccess).not.toHaveBeenCalled();
      expect(toastService.showError).not.toHaveBeenCalled();
      expect(toastService.showInfo).not.toHaveBeenCalled();
    });

    it('should handle multiple events correctly', () => {
      const successEvent = new CustomEvent('bytebank:toast', {
        detail: { type: 'success', message: 'Success' }
      });
      const errorEvent = new CustomEvent('bytebank:toast', {
        detail: { type: 'error', message: 'Error' }
      });

      window.dispatchEvent(successEvent);
      window.dispatchEvent(errorEvent);

      expect(toastService.showSuccess).toHaveBeenCalledWith('Success', undefined);
      expect(toastService.showError).toHaveBeenCalledWith('Error', undefined);
    });
  });
});
