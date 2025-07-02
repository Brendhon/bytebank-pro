import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ApplicationRef, EnvironmentInjector } from '@angular/core';

describe('ToastService', () => {
  let service: ToastService;
  let appRef: jasmine.SpyObj<ApplicationRef>;

  beforeEach(() => {
    const appRefSpy = jasmine.createSpyObj('ApplicationRef', ['attachView', 'detachView']);

    TestBed.configureTestingModule({
      providers: [ToastService, { provide: ApplicationRef, useValue: appRefSpy }]
    });

    service = TestBed.inject(ToastService);
    appRef = TestBed.inject(ApplicationRef) as jasmine.SpyObj<ApplicationRef>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Basic test to ensure service exists
  it('should provide methods for showing different toast types', () => {
    expect(service.showSuccess).toBeDefined();
    expect(service.showError).toBeDefined();
    expect(service.showInfo).toBeDefined();
  });
});
