import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <bb-popover
      [isOpen]="isOpen"
      [position]="position"
      [disabled]="disabled"
      [offset]="offset"
      [closeOnClickOutside]="closeOnClickOutside"
      [closeOnEscape]="closeOnEscape"
      [ariaLabel]="ariaLabel"
      [popoverClass]="popoverClass"
      (openChange)="onOpenChange($event)"
      (opened)="onOpened()"
      (closed)="onClosed()"
    >
      <button slot="trigger" data-testid="trigger-button">Open Popover</button>
      <div slot="content" data-testid="projected-content">
        <p>Popover content here</p>
      </div>
    </bb-popover>
  `,
  standalone: true,
  imports: [PopoverComponent]
})
class TestHostComponent {
  isOpen = false;
  position = 'bottom-start';
  disabled = false;
  offset = 8;
  closeOnClickOutside = true;
  closeOnEscape = true;
  ariaLabel = '';
  popoverClass = '';

  onOpenChange(open: boolean): void {
    this.isOpen = open;
  }

  onOpened(): void {
    // Event handler for opened event
  }

  onClosed(): void {
    // Event handler for closed event
  }
}

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="popover-container"]')
    )?.nativeElement;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.isOpen()).toBe(false);

      expect(component.position()).toBe('bottom-start');

      expect(component.offset()).toBe(8);

      expect(component.disabled()).toBe(false);

      expect(component.closeOnClickOutside()).toBe(true);

      expect(component.closeOnEscape()).toBe(true);

      expect(component.ariaLabel()).toBe('');

      expect(component.popoverClass()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should apply isOpen state correctly', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();

      expect(component.isOpenState()).toBe(false);

      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      expect(component.isOpenState()).toBe(true);
    });

    it('should handle position variants', () => {
      fixture.componentRef.setInput('position', 'top');
      fixture.detectChanges();

      expect(component.position()).toBe('top');

      fixture.componentRef.setInput('position', 'bottom-end');
      fixture.detectChanges();

      expect(component.position()).toBe('bottom-end');
    });

    it('should handle disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.disabled()).toBe(true);
    });

    it('should update offset value', () => {
      fixture.componentRef.setInput('offset', 16);
      fixture.detectChanges();

      expect(component.offset()).toBe(16);
    });

    it('should handle closeOnClickOutside setting', () => {
      fixture.componentRef.setInput('closeOnClickOutside', false);
      fixture.detectChanges();

      expect(component.closeOnClickOutside()).toBe(false);
    });

    it('should handle closeOnEscape setting', () => {
      fixture.componentRef.setInput('closeOnEscape', false);
      fixture.detectChanges();

      expect(component.closeOnEscape()).toBe(false);
    });

    it('should set custom aria label', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      fixture.detectChanges();

      expect(component.ariaLabel()).toBe('Custom label');
    });

    it('should apply custom popover class', () => {
      fixture.componentRef.setInput('popoverClass', 'custom-class');
      fixture.detectChanges();

      expect(component.popoverClass()).toBe('custom-class');
    });
  });

  describe('Events', () => {
    it('should emit openChange when toggled', () => {
      spyOn(component.openChange, 'emit');
      component.toggle();

      expect(component.openChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit opened event when opening', () => {
      spyOn(component.opened, 'emit');
      component.open();

      expect(component.opened.emit).toHaveBeenCalled();
    });

    it('should emit closed event when closing', () => {
      component.open();
      spyOn(component.closed, 'emit');
      component.close();

      expect(component.closed.emit).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes on trigger', () => {
      hostFixture.detectChanges();
      const triggerElement = hostFixture.debugElement.query(
        By.css('[data-testid="popover-trigger"]')
      );

      expect(triggerElement.nativeElement.getAttribute('aria-expanded')).toBe('false');

      expect(triggerElement.nativeElement.getAttribute('aria-label')).toBe('Open menu');
    });

    it('should update aria-expanded when state changes', () => {
      hostFixture.detectChanges();
      const triggerElement = hostFixture.debugElement.query(
        By.css('[data-testid="popover-trigger"]')
      );

      expect(triggerElement.nativeElement.getAttribute('aria-expanded')).toBe('false');

      hostComponent.isOpen = true;
      hostFixture.detectChanges();

      expect(triggerElement.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set custom aria label when provided', () => {
      hostComponent.ariaLabel = 'Custom menu label';
      hostFixture.detectChanges();
      const triggerElement = hostFixture.debugElement.query(
        By.css('[data-testid="popover-trigger"]')
      );

      expect(triggerElement.nativeElement.getAttribute('aria-label')).toBe('Custom menu label');
    });

    it('should have proper role attributes', () => {
      hostComponent.isOpen = true;
      hostFixture.detectChanges();
      const popoverContent = hostFixture.debugElement.query(
        By.css('[data-testid="popover-content"]')
      );

      expect(popoverContent.nativeElement.getAttribute('role')).toBe('menu');
    });
  });

  describe('Behavior Conditional', () => {
    it('should show popover content when open', () => {
      hostFixture.detectChanges();
      let popoverContent = hostFixture.debugElement.query(
        By.css('[data-testid="popover-content"]')
      );

      expect(popoverContent).toBeNull();

      hostComponent.isOpen = true;
      hostFixture.detectChanges();
      popoverContent = hostFixture.debugElement.query(By.css('[data-testid="popover-content"]'));

      expect(popoverContent).not.toBeNull();
    });

    it('should hide popover content when closed', () => {
      hostComponent.isOpen = true;
      hostFixture.detectChanges();
      let popoverContent = hostFixture.debugElement.query(
        By.css('[data-testid="popover-content"]')
      );

      expect(popoverContent).not.toBeNull();

      hostComponent.isOpen = false;
      hostFixture.detectChanges();
      popoverContent = hostFixture.debugElement.query(By.css('[data-testid="popover-content"]'));

      expect(popoverContent).toBeNull();
    });

    it('should not toggle when disabled', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();
      const triggerElement = hostFixture.debugElement.query(
        By.css('[data-testid="popover-trigger"]')
      );

      expect(hostComponent.isOpen).toBe(false);

      triggerElement.nativeElement.click();
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(false);
    });
  });

  describe('State Changes', () => {
    it('should update UI when isOpen state changes', () => {
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(false);

      hostComponent.isOpen = true;
      hostFixture.detectChanges();
      const popoverContent = hostFixture.debugElement.query(
        By.css('[data-testid="popover-content"]')
      );

      expect(popoverContent).not.toBeNull();
    });

    it('should toggle state correctly', () => {
      hostFixture.detectChanges();
      const triggerElement = hostFixture.debugElement.query(
        By.css('[data-testid="popover-trigger"]')
      );

      expect(hostComponent.isOpen).toBe(false);

      triggerElement.nativeElement.click();
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(true);

      triggerElement.nativeElement.click();
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(false);
    });
  });

  describe('Content Projection', () => {
    it('should project trigger content correctly', () => {
      hostFixture.detectChanges();
      const triggerButton = hostFixture.debugElement.query(
        By.css('[data-testid="trigger-button"]')
      );

      expect(triggerButton).not.toBeNull();

      expect(triggerButton.nativeElement.textContent.trim()).toBe('Open Popover');
    });

    it('should project popover content correctly', () => {
      hostComponent.isOpen = true;
      hostFixture.detectChanges();
      const projectedContent = hostFixture.debugElement.query(
        By.css('[data-testid="projected-content"]')
      );

      expect(projectedContent).not.toBeNull();

      expect(projectedContent.nativeElement.textContent).toContain('Popover content here');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should toggle on Enter key', () => {
      hostFixture.detectChanges();
      const popoverElement = hostFixture.debugElement.query(By.css('bb-popover'));

      expect(hostComponent.isOpen).toBe(false);

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      popoverElement.nativeElement.dispatchEvent(enterEvent);
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(true);
    });

    it('should toggle on Space key', () => {
      hostFixture.detectChanges();
      const popoverElement = hostFixture.debugElement.query(By.css('bb-popover'));

      expect(hostComponent.isOpen).toBe(false);

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      popoverElement.nativeElement.dispatchEvent(spaceEvent);
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(true);
    });

    it('should close on Escape key when closeOnEscape is true', () => {
      hostComponent.isOpen = true;
      hostFixture.detectChanges();
      const popoverElement = hostFixture.debugElement.query(By.css('bb-popover'));

      expect(hostComponent.isOpen).toBe(true);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      popoverElement.nativeElement.dispatchEvent(escapeEvent);
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(false);
    });

    it('should not close on Escape key when closeOnEscape is false', () => {
      hostComponent.isOpen = true;
      hostComponent.closeOnEscape = false;
      hostFixture.detectChanges();
      const popoverElement = hostFixture.debugElement.query(By.css('bb-popover'));

      expect(hostComponent.isOpen).toBe(true);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      popoverElement.nativeElement.dispatchEvent(escapeEvent);
      hostFixture.detectChanges();

      expect(hostComponent.isOpen).toBe(true);
    });
  });
});
