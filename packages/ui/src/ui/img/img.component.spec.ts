import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgComponent } from './img.component';

describe('ImgComponent', () => {
  let component: ImgComponent;
  let fixture: ComponentFixture<ImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgComponent);
    component = fixture.componentInstance;
    // Set required input before calling detectChanges to avoid NG0950 error
    fixture.componentRef.setInput('src', 'test-image.jpg');
    fixture.detectChanges();
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.size()).toBe('md');

      expect(component.className()).toBe('');

      expect(component.isDecorative()).toBeFalsy();
      // Note: Component may have finished loading the test image and be in error state
      // This is expected behavior for a non-existent test image
    });
  });

  describe('Input Properties', () => {
    it('should display initial loading state when manually set', () => {
      // Reset component to loading state manually to test
      component.isLoading = true;
      component.hasError = false;
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(By.css('[data-testid="img-loading"]'));

      expect(loadingElement).toBeTruthy();

      expect(component.isLoading).toBe(true);
    });

    it('should apply correct size classes', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.imageClasses()).toContain('w-32 h-auto');
    });

    it('should handle decorative images correctly', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.shouldHideFromScreenReaders()).toBe(true);

      expect(component.imageAltText()).toBe('');
    });

    it('should apply custom className', () => {
      fixture.componentRef.setInput('className', 'custom-class');
      fixture.detectChanges();

      expect(component.imageClasses()).toContain('custom-class');
    });

    it('should set alt text correctly when component is not in error state', () => {
      // Reset component state
      component.hasError = false;
      fixture.componentRef.setInput('alt', 'Test alt text');
      fixture.detectChanges();

      expect(component.imageAltText()).toBe('Test alt text');
    });

    it('should apply different size variants correctly', () => {
      const sizes: Array<{ size: string; expectedClass: string }> = [
        { size: 'xs', expectedClass: 'w-4 h-auto' },
        { size: 'sm', expectedClass: 'w-8 h-auto' },
        { size: 'md', expectedClass: 'w-16 h-auto' },
        { size: 'xl', expectedClass: 'w-48 h-auto' },
        { size: 'full', expectedClass: 'w-full h-auto' }
      ];

      sizes.forEach(({ size, expectedClass }) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(component.imageClasses()).toContain(expectedClass);
      });
    });

    it('should handle custom loading and error text', () => {
      fixture.componentRef.setInput('loadingText', 'Custom loading...');
      fixture.componentRef.setInput('errorText', 'Custom error message');
      fixture.detectChanges();

      expect(component.loadingText()).toBe('Custom loading...');

      expect(component.errorText()).toBe('Custom error message');
    });
  });

  describe('State Management', () => {
    it('should update loading state correctly', () => {
      // Test setting loading state manually
      component.isLoading = true;
      component.hasError = false;
      fixture.detectChanges();

      expect(component.isLoading).toBe(true);

      // Test setting loaded state
      component.isLoading = false;
      fixture.detectChanges();

      expect(component.isLoading).toBe(false);
    });

    it('should show error state when image fails to load', () => {
      // Simulate error
      component.onImageError();
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('[data-testid="img-error"]'));

      expect(errorElement).toBeTruthy();

      expect(component.hasError).toBe(true);

      expect(component.isLoading).toBe(false);
    });

    it('should show success state when image loads successfully', () => {
      // Simulate successful load
      component.onImageLoad();
      fixture.detectChanges();

      expect(component.isLoading).toBe(false);

      expect(component.hasError).toBe(false);
    });
  });

  describe('Events', () => {
    it('should handle image load event correctly', () => {
      // Reset component to show image element
      component.isLoading = false;
      component.hasError = false;
      component.isSvg = false;
      component.imageContent = 'test-image.jpg';
      fixture.detectChanges();

      spyOn(component, 'onImageLoad').and.callThrough();

      const imgElement = fixture.debugElement.query(By.css('img'));
      if (imgElement) {
        imgElement.triggerEventHandler('load', null);
      }

      expect(component.onImageLoad).toHaveBeenCalled();
    });

    it('should handle image error event correctly', () => {
      // Reset component to show image element
      component.isLoading = false;
      component.hasError = false;
      component.isSvg = false;
      component.imageContent = 'test-image.jpg';
      fixture.detectChanges();

      spyOn(component, 'onImageError').and.callThrough();

      const imgElement = fixture.debugElement.query(By.css('img'));
      if (imgElement) {
        imgElement.triggerEventHandler('error', null);
      }

      expect(component.onImageError).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes when loading', () => {
      component.isLoading = true;
      component.hasError = false;
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(By.css('[data-testid="img-loading"]'));

      expect(loadingElement).toBeTruthy();

      expect(loadingElement.nativeElement.getAttribute('aria-busy')).toBe('true');

      expect(loadingElement.nativeElement.getAttribute('aria-label')).toBe('Carregando imagem...');
    });

    it('should have proper aria attributes for decorative images', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.shouldHideFromScreenReaders()).toBe(true);

      expect(component.imageAltText()).toBe('');
    });

    it('should have proper aria attributes for error state', () => {
      component.hasError = true;
      component.isLoading = false;
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('[data-testid="img-error"]'));

      expect(errorElement.nativeElement.getAttribute('role')).toBe('img');

      expect(errorElement.nativeElement.getAttribute('aria-label')).toBe('Erro ao carregar imagem');
    });

    it('should provide proper alt text for non-decorative images when not in error state', () => {
      component.hasError = false;
      fixture.componentRef.setInput('alt', 'Descriptive alt text');
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(component.imageAltText()).toBe('Descriptive alt text');
    });
  });

  describe('Conditional Rendering', () => {
    it('should show loading state by default for any image', () => {
      // Component loads with a test image and starts in loading state
      const loadingElement = fixture.debugElement.query(By.css('[data-testid="img-loading"]'));
      const errorElement = fixture.debugElement.query(By.css('[data-testid="img-error"]'));

      expect(loadingElement).toBeTruthy();

      expect(errorElement).toBeFalsy();
    });

    it('should show loading state when isLoading is true', () => {
      component.isLoading = true;
      component.hasError = false;
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(By.css('[data-testid="img-loading"]'));
      const errorElement = fixture.debugElement.query(By.css('[data-testid="img-error"]'));

      expect(loadingElement).toBeTruthy();

      expect(errorElement).toBeFalsy();
    });

    it('should show SVG content when isSvg is true', () => {
      component.isSvg = true;
      component.isLoading = false;
      component.hasError = false;
      component.imageContent = '<svg></svg>';
      fixture.detectChanges();

      const svgElement = fixture.debugElement.query(By.css('[data-testid="img-svg"]'));

      expect(svgElement).toBeTruthy();
    });

    it('should show standard image when not SVG and not in error/loading state', () => {
      component.isSvg = false;
      component.isLoading = false;
      component.hasError = false;
      component.imageContent = 'test-image.jpg';
      fixture.detectChanges();

      const imgElement = fixture.debugElement.query(By.css('[data-testid="img-standard"]'));

      expect(imgElement).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should handle image loading errors gracefully', () => {
      component.onImageError();

      expect(component.hasError).toBe(true);

      expect(component.isLoading).toBe(false);
    });

    it('should show error text in alt when image fails', () => {
      fixture.componentRef.setInput('errorText', 'Custom error message');
      component.hasError = true;
      fixture.detectChanges();

      expect(component.imageAltText()).toBe('Custom error message');
    });

    it('should handle successful image load', () => {
      component.onImageLoad();

      expect(component.isLoading).toBe(false);

      expect(component.hasError).toBe(false);
    });
  });
});
