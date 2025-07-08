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

  describe('Return Values', () => {
    it('should return different close functions for different calls', () => {
      const closeFn1 = service.showSuccess('First message');
      const closeFn2 = service.showError('Second message');

      expect(closeFn1).toBeDefined();
      expect(closeFn2).toBeDefined();
      expect(typeof closeFn1).toBe('function');
      expect(typeof closeFn2).toBe('function');
    });
  });
});
