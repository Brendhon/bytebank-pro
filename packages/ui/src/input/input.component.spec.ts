import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let element: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="input-field"]'))
      .nativeElement as HTMLInputElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.type()).toBe('text');

      expect(component.variant()).toBe('default');

      expect(component.size()).toBe('md');

      expect(component.disabled()).toBeFalsy();

      expect(component.required()).toBeFalsy();
    });
  });

  describe('Input Properties', () => {
    it('should apply variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(element.classList).toContain('border-red-500');
    });

    it('should handle disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(element.disabled).toBeTruthy();
    });

    it('should update placeholder text', () => {
      fixture.componentRef.setInput('placeholder', 'Enter your email');
      fixture.detectChanges();

      expect(element.placeholder).toBe('Enter your email');
    });

    it('should apply size classes correctly', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(element.classList).toContain('min-h-[44px]');
    });

    it('should set input type correctly', () => {
      fixture.componentRef.setInput('type', 'email');
      fixture.detectChanges();

      expect(element.type).toBe('email');
    });
  });

  describe('Events', () => {
    it('should emit valueChange when input value changes', () => {
      spyOn(component.valueChange, 'emit');

      element.value = 'test value';
      element.dispatchEvent(new Event('input'));

      expect(component.valueChange.emit).toHaveBeenCalledWith('test value');
    });

    it('should emit inputFocus when input is focused', () => {
      spyOn(component.inputFocus, 'emit');

      element.dispatchEvent(new FocusEvent('focus'));

      expect(component.inputFocus.emit).toHaveBeenCalled();
    });

    it('should emit inputBlur when input loses focus', () => {
      spyOn(component.inputBlur, 'emit');

      element.dispatchEvent(new FocusEvent('blur'));

      expect(component.inputBlur.emit).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      fixture.componentRef.setInput('ariaLabel', 'Email input');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(element.getAttribute('aria-label')).toBe('Email input');

      expect(element.getAttribute('aria-required')).toBe('true');
    });

    it('should set aria-invalid when variant is error', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(element.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Password Toggle', () => {
    it('should show password toggle button when type is password and showPasswordToggle is true', () => {
      fixture.componentRef.setInput('type', 'password');
      fixture.componentRef.setInput('showPasswordToggle', true);
      fixture.detectChanges();

      const toggleButton = fixture.debugElement.query(By.css('[data-testid="password-toggle"]'));

      expect(toggleButton).not.toBeNull();
    });

    it('should toggle password visibility when toggle button is clicked', () => {
      fixture.componentRef.setInput('type', 'password');
      fixture.componentRef.setInput('showPasswordToggle', true);
      fixture.detectChanges();

      const toggleButton = fixture.debugElement.query(
        By.css('[data-testid="password-toggle"]')
      ).nativeElement;

      expect(element.type).toBe('password');

      toggleButton.click();
      fixture.detectChanges();

      expect(element.type).toBe('text');
    });
  });

  describe('Messages', () => {
    it('should show helper text when provided', () => {
      fixture.componentRef.setInput('helperText', 'This is helper text');
      fixture.detectChanges();

      const helperElement = fixture.debugElement.query(By.css('[data-testid="helper-text"]'));

      expect(helperElement).not.toBeNull();

      expect(helperElement.nativeElement.textContent.trim()).toBe('This is helper text');
    });

    it('should show error message when variant is error', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.componentRef.setInput('errorMessage', 'This field is required');
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('[data-testid="error-message"]'));

      expect(errorElement).not.toBeNull();

      expect(errorElement.nativeElement.textContent.trim()).toBe('This field is required');
    });

    it('should show success message when variant is success', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('successMessage', 'Valid input');
      fixture.detectChanges();

      const successElement = fixture.debugElement.query(By.css('[data-testid="success-message"]'));

      expect(successElement).not.toBeNull();

      expect(successElement.nativeElement.textContent.trim()).toBe('Valid input');
    });
  });
});
