import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogoComponent, LogoVariant, LogoSize } from './logo.component';

// Mock values for LOGOS to avoid import dependency issues
const MOCK_LOGOS = {
  MAIN: '/assets/logos/logo.svg',
  ICON: '/assets/logos/icon.svg'
};

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let element: HTMLImageElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent] // For standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="logo"]')).nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.variant).toBe('full');

      expect(component.size).toBe('md');

      expect(component.className).toBe('');

      expect(component.isDecorative).toBeFalsy();

      expect(component.ariaLabel).toBeUndefined();
    });

    it('should render image element with proper test id', () => {
      expect(element).toBeTruthy();

      expect(element.tagName.toLowerCase()).toBe('img');

      expect(element.getAttribute('data-testid')).toBe('logo');
    });
  });

  describe('Input Properties', () => {
    it('should apply variant correctly', () => {
      fixture.componentRef.setInput('variant', 'icon' as LogoVariant);
      fixture.detectChanges();

      expect(component.variant).toBe('icon');

      expect(element.src).toContain(MOCK_LOGOS.ICON);

      // Test full variant
      fixture.componentRef.setInput('variant', 'full' as LogoVariant);
      fixture.detectChanges();

      expect(component.variant).toBe('full');

      expect(element.src).toContain(MOCK_LOGOS.MAIN);
    });

    it('should apply size classes correctly', () => {
      fixture.componentRef.setInput('size', 'sm' as LogoSize);
      fixture.detectChanges();

      expect(element.classList).toContain('w-16');

      fixture.componentRef.setInput('size', 'lg' as LogoSize);
      fixture.detectChanges();

      expect(element.classList).toContain('w-42');
    });

    it('should apply custom className', () => {
      fixture.componentRef.setInput('className', 'custom-class another-class');
      fixture.detectChanges();

      expect(element.classList).toContain('custom-class');

      expect(element.classList).toContain('another-class');
    });

    it('should handle decorative state', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(element.getAttribute('aria-hidden')).toBe('true');

      expect(element.alt).toBe('');

      // Test non-decorative state
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(element.getAttribute('aria-hidden')).toBeNull();

      expect(element.alt).not.toBe('');
    });

    it('should apply custom aria-label when provided', () => {
      const customLabel = 'Custom logo description';
      fixture.componentRef.setInput('ariaLabel', customLabel);
      fixture.detectChanges();

      expect(element.getAttribute('aria-label')).toBe(customLabel);

      expect(element.alt).toBe(customLabel);
    });

    it('should not apply aria-label when decorative', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(element.getAttribute('aria-label')).toBeNull();

      expect(element.alt).toBe('');
    });
  });

  describe('Logo Source Computation', () => {
    it('should return correct logo source for full variant', () => {
      fixture.componentRef.setInput('variant', 'full' as LogoVariant);
      fixture.detectChanges();

      expect(component.logoSrc).toBe(MOCK_LOGOS.MAIN);
    });

    it('should return correct logo source for icon variant', () => {
      fixture.componentRef.setInput('variant', 'icon' as LogoVariant);
      fixture.detectChanges();

      expect(component.logoSrc).toBe(MOCK_LOGOS.ICON);
    });
  });

  describe('CSS Classes Computation', () => {
    it('should compute logo classes correctly with size only', () => {
      fixture.componentRef.setInput('size', 'md' as LogoSize);
      fixture.detectChanges();

      expect(component.logoClasses).toBe('w-32 h-auto');
    });

    it('should compute logo classes correctly with size and custom class', () => {
      fixture.componentRef.setInput('size', 'lg' as LogoSize);
      fixture.componentRef.setInput('className', 'custom-class');
      fixture.detectChanges();

      expect(component.logoClasses).toBe('w-42 h-auto custom-class');
    });

    it('should trim whitespace from logo classes', () => {
      fixture.componentRef.setInput('className', '   extra-spaces   ');
      fixture.detectChanges();

      const classes = component.logoClasses;

      expect(classes.startsWith(' ')).toBeFalsy();

      expect(classes.endsWith(' ')).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attribute', () => {
      expect(element.getAttribute('role')).toBe('img');
    });

    it('should provide descriptive alt text for full variant', () => {
      fixture.componentRef.setInput('variant', 'full' as LogoVariant);
      fixture.detectChanges();

      expect(element.alt).toBe('ByteBank Pro - Logo da plataforma de gestão financeira');
    });

    it('should provide descriptive alt text for icon variant', () => {
      fixture.componentRef.setInput('variant', 'icon' as LogoVariant);
      fixture.detectChanges();

      expect(element.alt).toBe('ByteBank Pro - Ícone da plataforma');
    });

    it('should use custom aria-label when provided', () => {
      const customLabel = 'Custom accessible label';
      fixture.componentRef.setInput('ariaLabel', customLabel);
      fixture.detectChanges();

      expect(element.alt).toBe(customLabel);

      expect(element.getAttribute('aria-label')).toBe(customLabel);
    });

    it('should hide from screen readers when decorative', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(element.getAttribute('aria-hidden')).toBe('true');

      expect(element.alt).toBe('');

      expect(element.getAttribute('aria-label')).toBeNull();
    });

    it('should not hide from screen readers when not decorative', () => {
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(element.getAttribute('aria-hidden')).toBeNull();

      expect(element.alt).not.toBe('');
    });

    it('should override decorative behavior with custom aria-label', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.componentRef.setInput('ariaLabel', 'Important logo');
      fixture.detectChanges();

      // Should still be decorative because isDecorative takes precedence
      expect(element.getAttribute('aria-hidden')).toBe('true');

      expect(element.alt).toBe('');

      expect(element.getAttribute('aria-label')).toBeNull();
    });
  });

  describe('Getter Methods', () => {
    it('should compute logoAltText correctly for non-decorative logo', () => {
      fixture.componentRef.setInput('variant', 'full' as LogoVariant);
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(component.logoAltText).toBe('ByteBank Pro - Logo da plataforma de gestão financeira');
    });

    it('should return empty alt text for decorative logo', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.logoAltText).toBe('');
    });

    it('should prioritize custom ariaLabel over default alt text', () => {
      const customLabel = 'Custom logo label';
      fixture.componentRef.setInput('ariaLabel', customLabel);
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(component.logoAltText).toBe(customLabel);
    });

    it('should return correct value for shouldHideFromScreenReaders', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.shouldHideFromScreenReaders).toBeTruthy();

      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(component.shouldHideFromScreenReaders).toBeFalsy();
    });
  });

  describe('Size Variants', () => {
    const sizeTestCases: Array<{ size: LogoSize; expectedClass: string }> = [
      { size: 'sm', expectedClass: 'w-16' },
      { size: 'md', expectedClass: 'w-32' },
      { size: 'lg', expectedClass: 'w-42' }
    ];

    sizeTestCases.forEach(({ size, expectedClass }) => {
      it(`should apply correct class for ${size} size`, () => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(element.classList).toContain(expectedClass);

        expect(element.classList).toContain('h-auto');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty className input', () => {
      fixture.componentRef.setInput('className', '');
      fixture.detectChanges();

      const classes = component.logoClasses;

      expect(classes.includes('undefined')).toBeFalsy();

      expect(classes.trim()).not.toBe('');
    });

    it('should handle undefined ariaLabel gracefully', () => {
      fixture.componentRef.setInput('ariaLabel', undefined);
      fixture.detectChanges();

      expect(element.getAttribute('aria-label')).toBeNull();

      expect(component.logoAltText).toContain('ByteBank Pro');
    });

    it('should maintain h-auto class across all size variants', () => {
      const sizes: LogoSize[] = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(element.classList).toContain('h-auto');
      });
    });
  });
});
