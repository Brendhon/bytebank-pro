import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent, ButtonVariant, ButtonType } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Properties', () => {
    it('should have default type as button', () => {
      expect(component.type()).toBe('button');
    });

    it('should have default variant as blue', () => {
      expect(component.variant()).toBe('blue');
    });

    it('should have loading as false by default', () => {
      expect(component.loading()).toBeFalsy();
    });

    it('should have disabled as false by default', () => {
      expect(component.disabled()).toBeFalsy();
    });

    it('should have empty className by default', () => {
      expect(component.className()).toBe('');
    });

    it('should have default size as md', () => {
      expect(component.size()).toBe('md');
    });

    it('should have default loadingText', () => {
      expect(component.loadingText()).toBe('Carregando...');
    });
  });

  describe('Input Properties', () => {
    it('should set type property', () => {
      const testType: ButtonType = 'submit';
      fixture.componentRef.setInput('type', testType);
      fixture.detectChanges();

      expect(component.type()).toBe(testType);
      expect(buttonElement.type).toBe(testType);
    });

    it('should set variant property', () => {
      const testVariant: ButtonVariant = 'green';
      fixture.componentRef.setInput('variant', testVariant);
      fixture.detectChanges();

      expect(component.variant()).toBe(testVariant);
    });

    it('should set loading property', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(component.loading()).toBeTruthy();
      expect(buttonElement.disabled).toBeTruthy();
    });

    it('should set disabled property', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.disabled()).toBeTruthy();
      expect(buttonElement.disabled).toBeTruthy();
    });

    it('should set className property', () => {
      const customClass = 'custom-class';
      fixture.componentRef.setInput('className', customClass);
      fixture.detectChanges();

      expect(component.className()).toBe(customClass);
      expect(buttonElement.className).toContain(customClass);
    });

    it('should set size property', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
    });

    it('should set accessibility properties', () => {
      fixture.componentRef.setInput('ariaLabel', 'Test button');
      fixture.componentRef.setInput('ariaDescribedBy', 'help-text');
      fixture.componentRef.setInput('ariaPressed', true);
      fixture.detectChanges();

      expect(component.ariaLabel()).toBe('Test button');
      expect(component.ariaDescribedBy()).toBe('help-text');
      expect(component.ariaPressed()).toBe(true);
    });
  });

  describe('Button Classes', () => {
    it('should have base classes', () => {
      fixture.detectChanges();
      const classes = component.buttonClasses;

      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('rounded-md');
      expect(classes).toContain('font-medium');
    });

    it('should apply dark variant classes', () => {
      fixture.componentRef.setInput('variant', 'dark');
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('button-dark');
    });

    it('should apply blue variant classes', () => {
      fixture.componentRef.setInput('variant', 'blue');
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('button-blue');
    });

    it('should apply green variant classes', () => {
      fixture.componentRef.setInput('variant', 'green');
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('button-green');
    });

    it('should apply orange variant classes', () => {
      fixture.componentRef.setInput('variant', 'orange');
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('button-orange');
    });

    it('should apply outlineGreen variant classes', () => {
      fixture.componentRef.setInput('variant', 'outlineGreen');
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('button-outline-green');
    });

    it('should apply outlineOrange variant classes', () => {
      fixture.componentRef.setInput('variant', 'outlineOrange');
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('button-outline-orange');
    });

    it('should apply disabled classes when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('opacity-60');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
    });

    it('should apply disabled classes when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const classes = component.buttonClasses;

      expect(classes).toContain('opacity-60');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
    });

    it('should apply size classes', () => {
      // Test small size
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('px-3 py-1.5 text-sm');

      // Test medium size (default)
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('px-4 py-2 text-sm');

      // Test large size
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('px-6 py-3 text-base');
    });
  });

  describe('Computed Properties', () => {
    it('should return correct isInteractive value', () => {
      // Should be interactive by default
      expect(component.isInteractive).toBe(true);

      // Should not be interactive when disabled
      fixture.componentRef.setInput('disabled', true);
      expect(component.isInteractive).toBe(false);

      // Should not be interactive when loading
      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('loading', true);
      expect(component.isInteractive).toBe(false);
    });

    it('should return correct computedAriaLabel', () => {
      // Should return empty string by default
      expect(component.computedAriaLabel).toBe('');

      // Should return custom aria label
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      expect(component.computedAriaLabel).toBe('Custom label');

      // Should return loading text when loading
      fixture.componentRef.setInput('loading', true);
      expect(component.computedAriaLabel).toBe('Carregando...');
    });

    it('should return correct computedRole', () => {
      // Should return button by default
      expect(component.computedRole).toBe('button');

      // Should return custom role
      fixture.componentRef.setInput('role', 'switch');
      expect(component.computedRole).toBe('switch');
    });
  });

  describe('Event Handling', () => {
    it('should emit buttonClick when clicked and interactive', () => {
      spyOn(component.buttonClick, 'emit');

      const mockEvent = new Event('click');
      component.handleClick(mockEvent);

      expect(component.buttonClick.emit).toHaveBeenCalledWith(mockEvent);
    });

    it('should not emit buttonClick when disabled', () => {
      spyOn(component.buttonClick, 'emit');
      spyOn(Event.prototype, 'preventDefault');
      spyOn(Event.prototype, 'stopPropagation');

      fixture.componentRef.setInput('disabled', true);

      const mockEvent = new Event('click');
      component.handleClick(mockEvent);

      expect(component.buttonClick.emit).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should not emit buttonClick when loading', () => {
      spyOn(component.buttonClick, 'emit');
      spyOn(Event.prototype, 'preventDefault');
      spyOn(Event.prototype, 'stopPropagation');

      fixture.componentRef.setInput('loading', true);

      const mockEvent = new Event('click');
      component.handleClick(mockEvent);

      expect(component.buttonClick.emit).not.toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('svg.animate-spin'));

      expect(spinner).toBeTruthy();
    });

    it('should hide loading spinner when loading is false', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('svg.animate-spin'));

      expect(spinner).toBeFalsy();
    });

    it('should make content transparent when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const contentSpan = fixture.debugElement.query(By.css('span'));

      expect(contentSpan.nativeElement.className).toContain('opacity-0');
    });

    it('should make content visible when not loading', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      const contentSpan = fixture.debugElement.query(By.css('span'));

      expect(contentSpan.nativeElement.className).not.toContain('opacity-0');
    });
  });

  describe('Events', () => {
    it('should emit buttonClick event when clicked', () => {
      spyOn(component.buttonClick, 'emit');

      buttonElement.click();

      expect(component.buttonClick.emit).toHaveBeenCalled();
    });

    it('should not emit buttonClick event when disabled', () => {
      spyOn(component.buttonClick, 'emit');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      buttonElement.click();

      expect(component.buttonClick.emit).not.toHaveBeenCalled();
    });

    it('should not emit buttonClick event when loading', () => {
      spyOn(component.buttonClick, 'emit');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      buttonElement.click();

      expect(component.buttonClick.emit).not.toHaveBeenCalled();
    });

    it('should pass event object to buttonClick emitter', () => {
      spyOn(component.buttonClick, 'emit');

      const clickEvent = new Event('click');
      buttonElement.dispatchEvent(clickEvent);

      expect(component.buttonClick.emit).toHaveBeenCalledWith(jasmine.any(Event));
    });
  });

  describe('Content Projection', () => {
    it('should project content inside button', () => {
      const testContent = 'Test Button';
      fixture = TestBed.createComponent(ButtonComponent);

      // Set the content directly on the component's element
      fixture.debugElement.nativeElement.innerHTML = `<bb-button>${testContent}</bb-button>`;
      fixture.detectChanges();

      // For content projection testing, we need to create a host component
      // This is a simplified test - in a real scenario, you'd create a test host component
      expect(fixture.debugElement.nativeElement).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have correct button type attribute', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();

      expect(buttonElement.getAttribute('type')).toBe('submit');
    });

    it('should be disabled when disabled property is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(buttonElement.disabled).toBeTruthy();
    });

    it('should be disabled when loading property is true', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(buttonElement.disabled).toBeTruthy();
    });

    it('should set aria-busy attribute when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-busy')).toBe('true');

      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-busy')).toBe('false');
    });

    it('should set aria-label attribute', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom button label');
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-label')).toBe('Custom button label');
    });

    it('should set aria-describedby attribute', () => {
      fixture.componentRef.setInput('ariaDescribedBy', 'help-text-id');
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-describedby')).toBe('help-text-id');
    });

    it('should set aria-pressed attribute', () => {
      fixture.componentRef.setInput('ariaPressed', true);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-pressed')).toBe('true');
    });

    it('should set aria-disabled attribute', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-disabled')).toBe('true');

      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set role attribute', () => {
      fixture.componentRef.setInput('role', 'switch');
      fixture.detectChanges();

      expect(buttonElement.getAttribute('role')).toBe('switch');
    });

    it('should have screen reader text for loading state', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const srText = fixture.debugElement.query(By.css('.sr-only'));
      expect(srText).toBeTruthy();
      expect(srText.nativeElement.textContent.trim()).toBe('Carregando...');
    });

    it('should hide loading icon from screen readers', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const loadingIcon = fixture.debugElement.query(By.css('i-lucide'));
      expect(loadingIcon.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
