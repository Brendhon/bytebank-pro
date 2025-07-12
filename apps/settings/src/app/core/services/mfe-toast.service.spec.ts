import { TestBed } from '@angular/core/testing';
import { MfeToastService } from './mfe-toast.service';

describe('MfeToastService', () => {
  let service: MfeToastService;
  let dispatchEventSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MfeToastService]
    });

    service = TestBed.inject(MfeToastService);
    dispatchEventSpy = spyOn(window, 'dispatchEvent');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showSuccess', () => {
    it('should dispatch success toast event with correct parameters', () => {
      const message = 'Test success message';
      const duration = 5000;

      service.showSuccess(message, duration);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'success',
            message,
            duration
          }
        })
      );
    });

    it('should dispatch success toast event without duration', () => {
      const message = 'Test success message';

      service.showSuccess(message);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'success',
            message,
            duration: undefined
          }
        })
      );
    });
  });

  describe('showError', () => {
    it('should dispatch error toast event with correct parameters', () => {
      const message = 'Test error message';
      const duration = 8000;

      service.showError(message, duration);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'error',
            message,
            duration
          }
        })
      );
    });

    it('should dispatch error toast event without duration', () => {
      const message = 'Test error message';

      service.showError(message);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'error',
            message,
            duration: undefined
          }
        })
      );
    });
  });

  describe('showInfo', () => {
    it('should dispatch info toast event with correct parameters', () => {
      const message = 'Test info message';
      const duration = 4000;

      service.showInfo(message, duration);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'info',
            message,
            duration
          }
        })
      );
    });

    it('should dispatch info toast event without duration', () => {
      const message = 'Test info message';

      service.showInfo(message);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:toast',
          detail: {
            type: 'info',
            message,
            duration: undefined
          }
        })
      );
    });
  });

  describe('event structure', () => {
    it('should create CustomEvent with correct structure', () => {
      const message = 'Test message';

      service.showSuccess(message);

      const callArgs = dispatchEventSpy.calls.mostRecent().args[0];
      expect(callArgs).toBeInstanceOf(CustomEvent);
      expect(callArgs.type).toBe('bytebank:toast');
      expect(callArgs.detail).toEqual({
        type: 'success',
        message,
        duration: undefined
      });
    });
  });
});
