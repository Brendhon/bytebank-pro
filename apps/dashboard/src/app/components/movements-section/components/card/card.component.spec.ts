import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { CardVariant } from '@bytebank-pro/types';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="card-component"]')).nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.variant()).toBe('dark');

      expect(component.className()).toBe('');

      expect(component.label()).toBe('Pagamentos');
    });
  });

  describe('Input Properties', () => {
    it('should apply variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'blue');
      fixture.detectChanges();

      expect(element.classList).toContain('bg-bytebank-blue');
    });

    it('should apply all variant classes correctly', () => {
      const variants: CardVariant[] = ['dark', 'blue', 'green', 'orange'];

      variants.forEach((variant) => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        expect(element.classList).toContain(`bg-bytebank-${variant}`);
      });
    });

    it('should include custom className', () => {
      fixture.componentRef.setInput('className', 'custom-class');
      fixture.detectChanges();

      expect(element.classList).toContain('custom-class');
    });

    it('should update label text', () => {
      fixture.componentRef.setInput('label', 'Custom Label');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="card-label"]')
      ).nativeElement;

      expect(component.label()).toBe('Custom Label');

      expect(labelElement.textContent?.trim()).toBe('Custom Label');
    });

    it('should display formatted currency value when value is a number', () => {
      fixture.componentRef.setInput('value', 1234.56);
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

      expect(valueElement).not.toBeNull();

      expect(valueElement.nativeElement.textContent?.trim()).toMatch(/^R\$\s1\.234,56$/);
    });

    it('should handle zero value correctly', () => {
      fixture.componentRef.setInput('value', 0);
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

      expect(valueElement).not.toBeNull();

      expect(valueElement.nativeElement.textContent?.trim()).toMatch(/^R\$\s0,00$/);
    });

    it('should handle negative values correctly', () => {
      fixture.componentRef.setInput('value', -500.25);
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

      expect(valueElement).not.toBeNull();

      expect(valueElement.nativeElement.textContent?.trim()).toMatch(/^-R\$\s500,25$/);
    });
  });

  describe('Loading State', () => {
    it('should display loading spinner when value is null', () => {
      fixture.componentRef.setInput('value', null);
      fixture.detectChanges();

      const loaderElement = fixture.debugElement.query(By.css('[data-testid="card-loader"]'));
      const loadingContainer = fixture.debugElement.query(By.css('[data-testid="card-loading"]'));

      expect(loaderElement).not.toBeNull();

      expect(loadingContainer).not.toBeNull();

      expect(loadingContainer.nativeElement.getAttribute('role')).toBe('status');

      expect(loadingContainer.nativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should display loading spinner when value is undefined', () => {
      fixture.componentRef.setInput('value', undefined);
      fixture.detectChanges();

      const loaderElement = fixture.debugElement.query(By.css('[data-testid="card-loader"]'));
      const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

      expect(loaderElement).not.toBeNull();

      expect(valueElement).toBeNull();
    });

    it('should not display value when in loading state', () => {
      fixture.componentRef.setInput('value', null);
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

      expect(valueElement).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('should have proper host role attribute', () => {
      const hostElement = fixture.nativeElement;

      expect(hostElement.getAttribute('role')).toBe('article');
    });

    it('should have proper aria-label with value', () => {
      fixture.componentRef.setInput('value', 1234.56);
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const hostElement = fixture.nativeElement;

      expect(hostElement.getAttribute('aria-label')).toMatch(/^Test Label: R\$\s1\.234,56$/);
    });

    it('should have proper aria-label when loading', () => {
      fixture.componentRef.setInput('value', null);
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const hostElement = fixture.nativeElement;

      expect(hostElement.getAttribute('aria-label')).toBe('Test Label: Loading');
    });

    it('should have proper value aria-label', () => {
      fixture.componentRef.setInput('value', 1234.56);
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('[data-testid="card-value"]'));

      expect(valueElement.nativeElement.getAttribute('aria-label')).toMatch(
        /^Value: R\$\s1\.234,56$/
      );
    });

    it('should have proper label aria-label', () => {
      fixture.componentRef.setInput('label', 'Custom Label');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="card-label"]'));

      expect(labelElement.nativeElement.getAttribute('aria-label')).toBe('Label: Custom Label');
    });

    it('should have proper loading aria attributes', () => {
      fixture.componentRef.setInput('value', null);
      fixture.componentRef.setInput('label', 'Custom Label');
      fixture.detectChanges();

      const loadingContainer = fixture.debugElement.query(By.css('[data-testid="card-loading"]'));
      const loaderIcon = fixture.debugElement.query(By.css('[data-testid="card-loader"]'));

      expect(loadingContainer.nativeElement.getAttribute('aria-label')).toBe(
        'Loading Custom Label'
      );

      expect(loaderIcon.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('CSS Classes', () => {
    it('should have base CSS classes', () => {
      expect(element.classList).toContain('w-[200px]');

      expect(element.classList).toContain('h-[160px]');

      expect(element.classList).toContain('rounded-sm');

      expect(element.classList).toContain('text-white');

      expect(element.classList).toContain('flex');

      expect(element.classList).toContain('flex-col');
    });

    it('should combine custom className with base classes', () => {
      fixture.componentRef.setInput('className', 'custom-test-class another-class');
      fixture.detectChanges();

      expect(element.classList).toContain('custom-test-class');

      expect(element.classList).toContain('another-class');

      expect(element.classList).toContain('w-[200px]'); // Base class should still be present
    });
  });

  describe('Computed Properties', () => {
    it('should correctly compute isLoading state', () => {
      fixture.componentRef.setInput('value', 123);
      fixture.detectChanges();

      expect(component['isLoading']()).toBeFalsy();

      fixture.componentRef.setInput('value', null);
      fixture.detectChanges();

      expect(component['isLoading']()).toBeTruthy();
    });

    it('should correctly compute cardClasses', () => {
      fixture.componentRef.setInput('variant', 'green');
      fixture.componentRef.setInput('className', 'extra-class');
      fixture.detectChanges();

      const classes = component['cardClasses']();

      expect(classes).toContain('bg-bytebank-green');

      expect(classes).toContain('extra-class');

      expect(classes).toContain('w-[200px]');
    });
  });
});
