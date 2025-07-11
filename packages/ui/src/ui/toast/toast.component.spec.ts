import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let element: HTMLElement | null;

  // Function to get the toast container element
  const getToastContainer = (fixture: ComponentFixture<ToastComponent>): HTMLElement | null => {
    return (
      fixture.debugElement.query(By.css('[data-testid="toast-container"]'))?.nativeElement ?? null
    );
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, LucideAngularModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('show', true);
    fixture.componentRef.setInput('message', 'Test message');
    fixture.detectChanges();

    element = getToastContainer(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible when show is true', () => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    element = getToastContainer(fixture);

    expect(element).toBeTruthy();
    expect(component.isVisible).toBeTrue();
    expect(element!.classList).toContain('toast-visible');
  });

  it('should not be visible when show is false', () => {
    fixture.componentRef.setInput('show', false);
    fixture.detectChanges();
    element = getToastContainer(fixture);

    expect(element).toBeFalsy();
    expect(component.isVisible).toBeFalse();
  });

  it('should display the correct message', () => {
    const testMessage = 'This is a test message.';
    fixture.componentRef.setInput('message', testMessage);
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    element = getToastContainer(fixture);

    expect(element!.textContent).toContain(testMessage);
  });

  describe('Input Properties', () => {
    it('should apply success variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element!.classList).toContain('toast-variant-success');
    });

    it('should apply error variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element!.classList).toContain('toast-variant-error');
    });

    it('should apply info variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'info');
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element!.classList).toContain('toast-variant-info');
    });
  });

  describe('Events', () => {
    it('should emit toastClose when the close button is clicked', () => {
      spyOn(component.toastClose, 'emit');
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(
        By.css('button[aria-label="Fechar notificação"]')
      ).nativeElement;
      closeButton.click();

      expect(component.toastClose.emit).toHaveBeenCalled();
      expect(component.isVisible).toBeFalse();
    });

    it('should close automatically after duration', fakeAsync(() => {
      fixture.componentRef.setInput('duration', 1000);
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(component.isVisible).toBeTrue();

      spyOn(component.toastClose, 'emit');

      tick(1000);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element).toBeFalsy();
      expect(component.isVisible).toBeFalse();
      expect(component.toastClose.emit).toHaveBeenCalled();
    }));

    it('should not close automatically if duration is 0', fakeAsync(() => {
      fixture.componentRef.setInput('duration', 0);
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(component.isVisible).toBeTrue();

      spyOn(component.toastClose, 'emit');

      tick(5000);
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element).toBeTruthy();
      expect(component.isVisible).toBeTrue();
      expect(component.toastClose.emit).not.toHaveBeenCalled();
    }));
  });

  describe('Accessibility', () => {
    it('should have role="status" for all variants', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('variant', 'info');
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element!.getAttribute('role')).toBe('status');
    });

    it('should have aria-live="assertive" for error variant', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element!.getAttribute('aria-live')).toBe('assertive');
    });

    it('should have aria-live="polite" for success variant', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();
      element = getToastContainer(fixture);

      expect(element!.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-label for close button', () => {
      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
      const closeButton = fixture.debugElement.query(
        By.css('button[aria-label="Fechar notificação"]')
      ).nativeElement;

      expect(closeButton.getAttribute('aria-label')).toBe('Fechar notificação');
    });
  });
});
