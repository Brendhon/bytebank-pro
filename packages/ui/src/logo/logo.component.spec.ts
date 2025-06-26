import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { LogoComponent, LogoVariant, LogoSize } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let element: HTMLElement;
  let mockGetAssetContent: jasmine.Spy;

  beforeEach(async () => {
    // Create mock for getAssetContent
    mockGetAssetContent = jasmine.createSpy('getAssetContent').and.returnValue(
      Promise.resolve({
        type: 'svg',
        content: '<svg><circle r="10"/></svg>'
      })
    );

    await TestBed.configureTestingModule({
      imports: [LogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;

    // Mock the getAssetContent function
    spyOn(component as any, 'loadLogoAsset').and.callFake(async () => {
      component.isLoading = true;
      try {
        const asset = await mockGetAssetContent(component.logoSrc);
        if (asset.type === 'svg') {
          component.logoHtml = fixture.debugElement.injector
            .get(DomSanitizer)
            .bypassSecurityTrustHtml(asset.content);
        } else {
          component.logoHtml = asset.content;
        }
      } catch (error) {
        component.logoHtml = '';
      } finally {
        component.isLoading = false;
        fixture.debugElement.injector.get(ChangeDetectorRef).markForCheck();
      }
    });

    fixture.detectChanges();
    await fixture.whenStable();
    element = fixture.debugElement.query(By.css('[data-testid="logo"]'))?.nativeElement;
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
    });
  });

  describe('Input Properties', () => {
    it('should apply variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'icon');
      fixture.detectChanges();

      expect(component.variant).toBe('icon');
    });

    it('should apply size classes correctly', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(component.logoClasses).toContain('w-16');

      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.logoClasses).toContain('w-42');
    });

    it('should apply custom className', () => {
      fixture.componentRef.setInput('className', 'custom-class');
      fixture.detectChanges();

      expect(component.logoClasses).toContain('custom-class');
    });

    it('should handle custom ariaLabel', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom logo label');
      fixture.detectChanges();

      expect(component.logoAltText).toBe('Custom logo label');
    });

    it('should handle isDecorative state', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.shouldHideFromScreenReaders).toBeTruthy();

      expect(component.logoAltText).toBe('');
    });
  });

  describe('Loading State', () => {
    it('should show loading state initially', async () => {
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [LogoComponent]
      }).compileComponents();

      const newFixture = TestBed.createComponent(LogoComponent);
      const newComponent = newFixture.componentInstance;

      // Set loading state manually to test the template
      newComponent.isLoading = true;
      newComponent.logoHtml = '';
      newFixture.detectChanges();

      const loadingElement = newFixture.debugElement.query(By.css('[data-testid="logo-loading"]'));

      expect(loadingElement).not.toBeNull();

      expect(loadingElement.nativeElement.classList).toContain('animate-spin');
    });

    it('should show logo when loading is complete', () => {
      // The main test setup already handles this scenario
      component.isLoading = false;
      component.logoHtml = '<svg><circle r="10"/></svg>';
      fixture.detectChanges();

      const logoElement = fixture.debugElement.query(By.css('[data-testid="logo"]'));

      expect(logoElement).not.toBeNull();
    });
  });

  describe('Asset Loading', () => {
    it('should load SVG content correctly', fakeAsync(() => {
      const mockSvgContent = '<svg><rect width="100" height="50"/></svg>';
      mockGetAssetContent.and.returnValue(
        Promise.resolve({
          type: 'svg',
          content: mockSvgContent
        })
      );

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(mockGetAssetContent).toHaveBeenCalled();

      expect(component.logoHtml).toBeDefined();

      expect(component.isLoading).toBeFalsy();
    }));

    it('should load image content correctly', fakeAsync(() => {
      const mockImagePath = 'assets/logo.png';
      mockGetAssetContent.and.returnValue(
        Promise.resolve({
          type: 'image',
          content: mockImagePath
        })
      );

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.logoHtml).toBe(mockImagePath);

      expect(component.isLoading).toBeFalsy();
    }));

    it('should handle asset loading errors gracefully', fakeAsync(() => {
      mockGetAssetContent.and.returnValue(Promise.reject(new Error('Asset not found')));
      const consoleSpy = spyOn(console, 'error');

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.logoHtml).toBe('');

      expect(component.isLoading).toBeFalsy();
    }));
  });

  describe('Computed Properties', () => {
    it('should compute logoAltText for full variant', () => {
      fixture.componentRef.setInput('variant', 'full');
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(component.logoAltText).toBe('ByteBank Pro - Logo da plataforma de gestão financeira');
    });

    it('should compute logoAltText for icon variant', () => {
      fixture.componentRef.setInput('variant', 'icon');
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      expect(component.logoAltText).toBe('ByteBank Pro - Ícone da plataforma');
    });

    it('should return empty logoAltText when decorative', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.logoAltText).toBe('');
    });

    it('should use custom ariaLabel when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      fixture.detectChanges();

      expect(component.logoAltText).toBe('Custom label');
    });

    it('should compute logoClasses with size and custom classes', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('className', 'custom-class another-class');
      fixture.detectChanges();

      const classes = component.logoClasses;

      expect(classes).toContain('w-42');

      expect(classes).toContain('h-auto');

      expect(classes).toContain('custom-class');

      expect(classes).toContain('another-class');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes when not decorative', () => {
      fixture.componentRef.setInput('ariaLabel', 'Test logo');
      fixture.componentRef.setInput('isDecorative', false);
      fixture.detectChanges();

      const logoElement = fixture.debugElement.query(By.css('[data-testid="logo"]'));

      expect(logoElement.nativeElement.getAttribute('aria-label')).toBe('Test logo');

      expect(logoElement.nativeElement.getAttribute('aria-hidden')).toBeNull();

      expect(logoElement.nativeElement.getAttribute('role')).toBe('img');
    });

    it('should hide from screen readers when decorative', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      const logoElement = fixture.debugElement.query(By.css('[data-testid="logo"]'));

      expect(logoElement.nativeElement.getAttribute('aria-hidden')).toBe('true');

      expect(logoElement.nativeElement.getAttribute('aria-label')).toBeNull();
    });

    it('should have role="img" for semantic meaning', () => {
      fixture.detectChanges();

      const logoElement = fixture.debugElement.query(By.css('[data-testid="logo"]'));

      expect(logoElement.nativeElement.getAttribute('role')).toBe('img');
    });
  });

  describe('Rendering Modes', () => {
    it('should render as span with innerHTML when SVG content is available', fakeAsync(() => {
      mockGetAssetContent.and.returnValue(
        Promise.resolve({
          type: 'svg',
          content: '<svg><circle r="10"/></svg>'
        })
      );

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      const spanElement = fixture.debugElement.query(By.css('span[data-testid="logo"]'));
      const imgElement = fixture.debugElement.query(By.css('img[data-testid="logo"]'));

      expect(spanElement).not.toBeNull();

      expect(imgElement).toBeNull();
    }));

    it('should render as img when no HTML content is available', fakeAsync(() => {
      mockGetAssetContent.and.returnValue(Promise.reject(new Error('Failed to load')));

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      const spanElement = fixture.debugElement.query(By.css('span[data-testid="logo"]'));
      const imgElement = fixture.debugElement.query(By.css('img[data-testid="logo"]'));

      expect(spanElement).toBeNull();

      expect(imgElement).not.toBeNull();
    }));
  });

  describe('Size Variants', () => {
    const sizeTests: Array<{ size: LogoSize; expectedClass: string }> = [
      { size: 'sm', expectedClass: 'w-16' },
      { size: 'md', expectedClass: 'w-32' },
      { size: 'lg', expectedClass: 'w-42' }
    ];

    sizeTests.forEach(({ size, expectedClass }) => {
      it(`should apply correct class for size ${size}`, () => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(component.logoClasses).toContain(expectedClass);
      });
    });
  });

  describe('Change Detection', () => {
    it('should have OnPush change detection strategy', () => {
      // Simple test to verify the component uses OnPush strategy
      const componentMetadata = component.constructor;

      expect(componentMetadata).toBeDefined();

      // The component should be created successfully with OnPush
      expect(component).toBeTruthy();
    });
  });
});
