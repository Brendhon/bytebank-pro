import { TestBed } from '@angular/core/testing';
import { MfeToastService } from './mfe-toast.service';

describe('MfeToastService', () => {
  let service: MfeToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MfeToastService]
    });
    service = TestBed.inject(MfeToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showSuccess', () => {
    it('should dispatch success toast event', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Success message';
      const duration = 3000;

      service.showSuccess(message, duration);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'success',
            message: message,
            duration: duration
          }
        })
      );
    });

    it('should dispatch success toast event without duration', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Success message';

      service.showSuccess(message);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'success',
            message: message,
            duration: undefined
          }
        })
      );
    });
  });

  describe('showError', () => {
    it('should dispatch error toast event', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Error message';
      const duration = 5000;

      service.showError(message, duration);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'error',
            message: message,
            duration: duration
          }
        })
      );
    });

    it('should dispatch error toast event without duration', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Error message';

      service.showError(message);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'error',
            message: message,
            duration: undefined
          }
        })
      );
    });
  });

  describe('showInfo', () => {
    it('should dispatch info toast event', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Info message';
      const duration = 4000;

      service.showInfo(message, duration);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'info',
            message: message,
            duration: duration
          }
        })
      );
    });

    it('should dispatch info toast event without duration', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Info message';

      service.showInfo(message);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'info',
            message: message,
            duration: undefined
          }
        })
      );
    });
  });

  describe('Event Structure', () => {
    it('should create events with correct structure', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Test message';
      const duration = 2000;

      service.showSuccess(message, duration);

      const eventCall = dispatchEventSpy.calls.first();
      const event = eventCall.args[0] as CustomEvent;

      expect(event.type).toBe('bytebank:toast');
      expect(event.detail).toEqual({
        type: 'success',
        message: message,
        duration: duration
      });
    });

    it('should create events with correct type values', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');
      const message = 'Test message';

      service.showSuccess(message);
      service.showError(message);
      service.showInfo(message);

      const calls = dispatchEventSpy.calls.all();

      expect((calls[0].args[0] as CustomEvent).detail.type).toBe('success');
      expect((calls[1].args[0] as CustomEvent).detail.type).toBe('error');
      expect((calls[2].args[0] as CustomEvent).detail.type).toBe('info');
    });
  });

  describe('Service Structure', () => {
    it('should be injectable', () => {
      expect(service).toBeInstanceOf(MfeToastService);
    });

    it('should have showSuccess method', () => {
      expect(typeof service.showSuccess).toBe('function');
    });

    it('should have showError method', () => {
      expect(typeof service.showError).toBe('function');
    });

    it('should have showInfo method', () => {
      expect(typeof service.showInfo).toBe('function');
    });
  });

  describe('Method Parameters', () => {
    it('should handle empty message', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');

      service.showSuccess('');

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          detail: jasmine.objectContaining({
            message: ''
          })
        })
      );
    });

    it('should handle zero duration', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');

      service.showSuccess('Test message', 0);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          detail: jasmine.objectContaining({
            duration: 0
          })
        })
      );
    });

    it('should handle negative duration', () => {
      const dispatchEventSpy = spyOn(window, 'dispatchEvent');

      service.showSuccess('Test message', -1000);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          detail: jasmine.objectContaining({
            duration: -1000
          })
        })
      );
    });
  });
});
