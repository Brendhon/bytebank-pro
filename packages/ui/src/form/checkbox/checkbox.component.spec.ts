import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="checkbox-wrapper"]')).nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.checked()).toBe(false);

      expect(component.indeterminate()).toBe(false);

      expect(component.variant()).toBe('default');

      expect(component.size()).toBe('md');

      expect(component.disabled()).toBe(false);

      expect(component.required()).toBe(false);
    });
  });

  describe('Input Properties', () => {
    it('should update checked state', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);

      const checkIcon = fixture.debugElement.query(By.css('[data-testid="checkbox-check-icon"]'));

      expect(checkIcon).not.toBeNull();
    });

    it('should update indeterminate state', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(component.indeterminate()).toBe(true);

      const indeterminateIcon = fixture.debugElement.query(
        By.css('[data-testid="checkbox-indeterminate-icon"]')
      );

      expect(indeterminateIcon).not.toBeNull();
    });

    it('should handle disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.disabled()).toBe(true);

      expect(element.getAttribute('aria-disabled')).toBe('true');

      expect(element.getAttribute('tabindex')).toBe('-1');
    });

    it('should apply variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(component.variant()).toBe('error');

      const visualCheckbox = fixture.debugElement.query(By.css('[data-testid="checkbox-visual"]'));

      expect(visualCheckbox.nativeElement.classList).toContain('border-red-500');
    });

    it('should update size correctly', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
    });

    it('should handle required state', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(component.required()).toBe(true);

      expect(element.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('Events', () => {
    it('should emit checkedChange when clicked', () => {
      spyOn(component.checkedChange, 'emit');

      element.click();

      expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit checkedChange when space key is pressed', () => {
      spyOn(component.checkedChange, 'emit');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeydown(event);

      expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit checkedChange when enter key is pressed', () => {
      spyOn(component.checkedChange, 'emit');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeydown(event);

      expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should not emit when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      spyOn(component.checkedChange, 'emit');

      element.click();

      expect(component.checkedChange.emit).not.toHaveBeenCalled();
    });

    it('should emit focus event', () => {
      spyOn(component.checkboxFocus, 'emit');

      const focusEvent = new FocusEvent('focus');
      component.handleFocus(focusEvent);

      expect(component.checkboxFocus.emit).toHaveBeenCalledWith(focusEvent);
    });

    it('should emit blur event', () => {
      spyOn(component.checkboxBlur, 'emit');

      const blurEvent = new FocusEvent('blur');
      component.handleBlur(blurEvent);

      expect(component.checkboxBlur.emit).toHaveBeenCalledWith(blurEvent);
    });
  });

  describe('Label and Helper Text', () => {
    it('should display label when provided', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="checkbox-label"]'));

      expect(labelElement).not.toBeNull();

      expect(labelElement.nativeElement.textContent.trim()).toBe('Test Label');
    });

    it('should show required asterisk when required', () => {
      fixture.componentRef.setInput('label', 'Required Field');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="checkbox-label"]'));

      expect(labelElement.nativeElement.textContent).toContain('*');
    });

    it('should display helper text', () => {
      fixture.componentRef.setInput('helperText', 'This is helper text');
      fixture.detectChanges();

      const helperElement = fixture.debugElement.query(
        By.css('[data-testid="checkbox-helper-text"]')
      );

      expect(helperElement).not.toBeNull();

      expect(helperElement.nativeElement.textContent.trim()).toBe('This is helper text');
    });

    it('should show error message when variant is error', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.componentRef.setInput('errorMessage', 'Error message');
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(
        By.css('[data-testid="checkbox-error-message"]')
      );

      expect(errorElement).not.toBeNull();

      expect(errorElement.nativeElement.textContent.trim()).toBe('Error message');

      expect(errorElement.nativeElement.getAttribute('role')).toBe('alert');
    });

    it('should show success message when variant is success', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('successMessage', 'Success message');
      fixture.detectChanges();

      const successElement = fixture.debugElement.query(
        By.css('[data-testid="checkbox-success-message"]')
      );

      expect(successElement).not.toBeNull();

      expect(successElement.nativeElement.textContent.trim()).toBe('Success message');

      expect(successElement.nativeElement.getAttribute('role')).toBe('status');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      expect(element.getAttribute('role')).toBe('checkbox');

      expect(element.getAttribute('aria-checked')).toBe('false');

      expect(element.getAttribute('aria-disabled')).toBe('false');

      expect(element.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked when state changes', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(element.getAttribute('aria-checked')).toBe('true');

      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(element.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should have aria-label when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom aria label');
      fixture.detectChanges();

      expect(element.getAttribute('aria-label')).toBe('Custom aria label');
    });

    it('should have aria-invalid when variant is error', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(element.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have proper aria-describedby', () => {
      fixture.componentRef.setInput('helperText', 'Helper text');
      fixture.detectChanges();

      const ariaDescribedBy = element.getAttribute('aria-describedby');

      expect(ariaDescribedBy).toContain('helper');
    });
  });

  describe('State Management', () => {
    it('should show check icon when checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      const checkIcon = fixture.debugElement.query(By.css('[data-testid="checkbox-check-icon"]'));

      expect(checkIcon).not.toBeNull();

      const indeterminateIcon = fixture.debugElement.query(
        By.css('[data-testid="checkbox-indeterminate-icon"]')
      );

      expect(indeterminateIcon).toBeNull();
    });

    it('should show indeterminate icon when indeterminate', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      const indeterminateIcon = fixture.debugElement.query(
        By.css('[data-testid="checkbox-indeterminate-icon"]')
      );

      expect(indeterminateIcon).not.toBeNull();

      const checkIcon = fixture.debugElement.query(By.css('[data-testid="checkbox-check-icon"]'));

      expect(checkIcon).toBeNull();
    });

    it('should prioritize indeterminate over checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      const indeterminateIcon = fixture.debugElement.query(
        By.css('[data-testid="checkbox-indeterminate-icon"]')
      );

      expect(indeterminateIcon).not.toBeNull();

      const checkIcon = fixture.debugElement.query(By.css('[data-testid="checkbox-check-icon"]'));

      expect(checkIcon).toBeNull();
    });
  });

  describe('Focus Management', () => {
    it('should be focusable when not disabled', () => {
      expect(element.getAttribute('tabindex')).toBe('0');
    });

    it('should not be focusable when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(element.getAttribute('tabindex')).toBe('-1');
    });

    it('should have focus method', () => {
      expect(typeof component.focus).toBe('function');
    });

    it('should have blur method', () => {
      expect(typeof component.blur).toBe('function');
    });
  });
});
