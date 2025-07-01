import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.title()).toBe('');

      expect(component.showCloseButton()).toBe(true);

      expect(component.closeOnBackdropClick()).toBe(true);

      expect(component.closeOnEscape()).toBe(true);

      expect(component.maxWidth()).toBe('32rem');

      expect(component.ariaLabel()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should display dialog when isOpen is true', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      expect(element.style.display).toBe('block');

      expect(element.getAttribute('aria-hidden')).toBe('false');
    });

    it('should hide dialog when isOpen is false', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();

      expect(element.style.display).toBe('none');

      expect(element.getAttribute('aria-hidden')).toBe('true');
    });

    it('should display title when provided', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('title', 'Test Dialog Title');
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(By.css('[data-testid="dialog-title"]'));

      expect(titleElement).not.toBeNull();

      expect(titleElement.nativeElement.textContent.trim()).toBe('Test Dialog Title');
    });

    it('should not display title when not provided', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(By.css('[data-testid="dialog-title"]'));

      expect(titleElement).toBeNull();
    });

    it('should show close button by default', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('[data-testid="dialog-close-button"]'));

      expect(closeButton).not.toBeNull();
    });

    it('should hide close button when showCloseButton is false', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('showCloseButton', false);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('[data-testid="dialog-close-button"]'));

      expect(closeButton).toBeNull();
    });

    it('should apply custom maxWidth', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('maxWidth', '800px');
      fixture.detectChanges();

      const dialogContainer = fixture.debugElement.query(
        By.css('[data-testid="dialog-container"]')
      );

      expect(dialogContainer.nativeElement.style.maxWidth).toBe('800px');
    });
  });

  describe('Events', () => {
    it('should emit close event when close button is clicked', () => {
      spyOn(component.close, 'emit');
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('[data-testid="dialog-close-button"]'));
      closeButton.nativeElement.click();

      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should emit close event when backdrop is clicked', () => {
      spyOn(component.close, 'emit');
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('closeOnBackdropClick', true);
      fixture.detectChanges();

      const backdrop = fixture.debugElement.query(By.css('[data-testid="dialog-backdrop"]'));
      backdrop.nativeElement.click();

      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should not emit close event when backdrop is clicked and closeOnBackdropClick is false', () => {
      spyOn(component.close, 'emit');
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('closeOnBackdropClick', false);
      fixture.detectChanges();

      const backdrop = fixture.debugElement.query(By.css('[data-testid="dialog-backdrop"]'));
      backdrop.nativeElement.click();

      expect(component.close.emit).not.toHaveBeenCalled();
    });

    it('should emit close event when escape key is pressed', () => {
      spyOn(component.close, 'emit');
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('closeOnEscape', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should not emit close event when escape key is pressed and closeOnEscape is false', () => {
      spyOn(component.close, 'emit');
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('closeOnEscape', false);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(component.close.emit).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('ariaLabel', 'Custom dialog label');
      fixture.detectChanges();

      const dialogContainer = fixture.debugElement.query(
        By.css('[data-testid="dialog-container"]')
      );

      expect(dialogContainer.nativeElement.getAttribute('role')).toBe('dialog');

      expect(dialogContainer.nativeElement.getAttribute('aria-modal')).toBe('true');

      expect(dialogContainer.nativeElement.getAttribute('aria-label')).toBe('Custom dialog label');
    });

    it('should use title as aria-label when ariaLabel is not provided', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('title', 'Test Dialog');
      fixture.detectChanges();

      const dialogContainer = fixture.debugElement.query(
        By.css('[data-testid="dialog-container"]')
      );

      expect(dialogContainer.nativeElement.getAttribute('aria-label')).toBe('Test Dialog');
    });

    it('should use default aria-label when neither title nor ariaLabel are provided', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const dialogContainer = fixture.debugElement.query(
        By.css('[data-testid="dialog-container"]')
      );

      expect(dialogContainer.nativeElement.getAttribute('aria-label')).toBe('Dialog');
    });

    it('should have proper close button aria-label', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('title', 'Test Dialog');
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('[data-testid="dialog-close-button"]'));

      expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('Close Test Dialog dialog');
    });

    it('should have default close button aria-label when no title is provided', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('[data-testid="dialog-close-button"]'));

      expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('Close dialog');
    });
  });

  describe('Content Projection', () => {
    it('should project content correctly', () => {
      TestBed.resetTestingModule();

      @Component({
        standalone: true,
        imports: [DialogComponent],
        template: `
          <bb-dialog [isOpen]="true">
            <div data-testid="projected-content">Projected Content</div>
          </bb-dialog>
        `
      })
      class TestHostComponent {}

      TestBed.configureTestingModule({
        imports: [TestHostComponent]
      }).compileComponents();

      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();

      const projectedContent = hostFixture.debugElement.query(
        By.css('[data-testid="projected-content"]')
      );

      expect(projectedContent).not.toBeNull();

      expect(projectedContent.nativeElement.textContent.trim()).toBe('Projected Content');
    });
  });

  describe('Host Bindings', () => {
    it('should apply host classes correctly when open', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      expect(element.classList).toContain('bb-dialog-overlay');

      expect(element.getAttribute('aria-hidden')).toBe('false');

      expect(element.style.display).toBe('block');
    });

    it('should apply host classes correctly when closed', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();

      expect(element.classList).not.toContain('bb-dialog-overlay');

      expect(element.getAttribute('aria-hidden')).toBe('true');

      expect(element.style.display).toBe('none');
    });
  });
});
