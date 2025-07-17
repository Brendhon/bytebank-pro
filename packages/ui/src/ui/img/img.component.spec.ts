import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ImgComponent } from './img.component';
import { ImgSize } from '@bytebank-pro/types';

describe('ImgComponent', () => {
  let component: ImgComponent;
  let fixture: ComponentFixture<ImgComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);

    await TestBed.configureTestingModule({
      imports: [ImgComponent],
      providers: [{ provide: DomSanitizer, useValue: sanitizerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.size()).toBe('md');
      expect(component.className()).toBe('');
      expect(component.isDecorative()).toBe(false);
      expect(component.loadingText()).toBe('Carregando imagem...');
      expect(component.errorText()).toBe('Erro ao carregar imagem');
    });

    it('should start in loading state', () => {
      expect(component.isLoading).toBe(true);
      expect(component.hasError).toBe(false);
      expect(component.isSvg).toBe(false);
    });
  });

  describe('Input Properties', () => {
    it('should accept src input', () => {
      const testSrc = 'test-image.jpg';
      fixture.componentRef.setInput('src', testSrc);

      expect(component.src()).toBe(testSrc);
    });

    it('should accept alt input', () => {
      const testAlt = 'Test alt text';
      fixture.componentRef.setInput('alt', testAlt);

      expect(component.alt()).toBe(testAlt);
    });

    it('should accept size input', () => {
      fixture.componentRef.setInput('size', 'lg');

      expect(component.size()).toBe('lg');
    });

    it('should accept className input', () => {
      const testClass = 'custom-class';
      fixture.componentRef.setInput('className', testClass);

      expect(component.className()).toBe(testClass);
    });

    it('should accept isDecorative input', () => {
      fixture.componentRef.setInput('isDecorative', true);

      expect(component.isDecorative()).toBe(true);
    });

    it('should accept custom loading text', () => {
      const customLoadingText = 'Custom loading...';
      fixture.componentRef.setInput('loadingText', customLoadingText);

      expect(component.loadingText()).toBe(customLoadingText);
    });

    it('should accept custom error text', () => {
      const customErrorText = 'Custom error message';
      fixture.componentRef.setInput('errorText', customErrorText);

      expect(component.errorText()).toBe(customErrorText);
    });
  });

  describe('Computed Properties', () => {
    it('should compute image classes with size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.imageClasses()).toContain('w-32 h-auto');
    });

    it('should compute image classes with custom className', () => {
      fixture.componentRef.setInput('className', 'rounded-lg');
      fixture.detectChanges();

      expect(component.imageClasses()).toContain('rounded-lg');
    });

    it('should compute image classes with both size and className', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('className', 'border-2');
      fixture.detectChanges();

      const classes = component.imageClasses();

      expect(classes).toContain('w-8 h-auto');
      expect(classes).toContain('border-2');
    });

    it('should compute alt text for decorative images', () => {
      fixture.componentRef.setInput('isDecorative', true);

      expect(component.imageAltText()).toBe('');
    });

    it('should compute alt text for regular images', () => {
      fixture.componentRef.setInput('alt', 'Test image');

      expect(component.imageAltText()).toBe('Test image');
    });

    it('should compute alt text for error state', () => {
      component.hasError = true;
      fixture.componentRef.setInput('errorText', 'Custom error');

      expect(component.imageAltText()).toBe('Custom error');
    });

    it('should determine screen reader visibility for decorative images', () => {
      fixture.componentRef.setInput('isDecorative', true);

      expect(component.shouldHideFromScreenReaders()).toBe(true);
    });

    it('should determine screen reader visibility for regular images', () => {
      fixture.componentRef.setInput('isDecorative', false);

      expect(component.shouldHideFromScreenReaders()).toBe(false);
    });
  });

  describe('Standard Image Display', () => {
    it('should display standard image when loaded successfully', fakeAsync(() => {
      fixture.componentRef.setInput('src', 'test-image.jpg');
      component.isLoading = false;
      component.hasError = false;
      component.isSvg = false;
      fixture.detectChanges();

      const imgElement = element.querySelector('[data-testid="img-standard"]');

      expect(imgElement).toBeTruthy();
      expect(imgElement!.getAttribute('src')).toBe('test-image.jpg');
    }));

    it('should apply proper attributes to standard image', fakeAsync(() => {
      fixture.componentRef.setInput('src', 'test-image.jpg');
      fixture.componentRef.setInput('alt', 'Test image');
      component.isLoading = false;
      component.hasError = false;
      component.isSvg = false;
      fixture.detectChanges();

      const imgElement = element.querySelector('[data-testid="img-standard"]');

      expect(imgElement!.getAttribute('alt')).toBe('Test image');
      expect(imgElement!.getAttribute('loading')).toBe('lazy');
      expect(imgElement!.getAttribute('aria-hidden')).toBe('false');
    }));

    it('should hide standard image from screen readers when decorative', fakeAsync(() => {
      fixture.componentRef.setInput('src', 'test-image.jpg');
      fixture.componentRef.setInput('isDecorative', true);
      component.isLoading = false;
      component.hasError = false;
      component.isSvg = false;
      fixture.detectChanges();

      const imgElement = element.querySelector('[data-testid="img-standard"]');

      expect(imgElement!.getAttribute('aria-hidden')).toBe('true');
      expect(imgElement!.getAttribute('alt')).toBe('');
    }));
  });

  describe('Event Handlers', () => {
    it('should handle image load success', () => {
      spyOn(component['cdr'], 'markForCheck');

      component.onImageLoad();

      expect(component.isLoading).toBe(false);
      expect(component.hasError).toBe(false);
      expect(component['cdr'].markForCheck).toHaveBeenCalled();
    });

    it('should handle image load error', () => {
      spyOn(component['cdr'], 'markForCheck');

      component.onImageError();

      expect(component.hasError).toBe(true);
      expect(component.isLoading).toBe(false);
      expect(component['cdr'].markForCheck).toHaveBeenCalled();
    });
  });

  describe('Size Classes', () => {
    it('should apply correct size classes for all sizes', () => {
      const sizeTests = [
        { size: 'xs', expectedClass: 'w-4 h-auto' },
        { size: 'xsl', expectedClass: 'w-6 h-auto' },
        { size: 'sm', expectedClass: 'w-8 h-auto' },
        { size: 'md', expectedClass: 'w-16 h-auto' },
        { size: 'lg', expectedClass: 'w-32 h-auto' },
        { size: 'xl', expectedClass: 'w-48 h-auto' },
        { size: '2xl', expectedClass: 'w-64 h-auto' },
        { size: '3xl', expectedClass: 'w-96 h-auto' },
        { size: '4xl', expectedClass: 'w-128 h-auto' },
        { size: '5xl', expectedClass: 'w-160 h-auto' },
        { size: 'full', expectedClass: 'w-full h-auto' }
      ];

      sizeTests.forEach(({ size, expectedClass }) => {
        fixture.componentRef.setInput('size', size as ImgSize);
        fixture.detectChanges();

        expect(component.imageClasses()).toContain(expectedClass);
      });
    });
  });

  describe('Accessibility Features', () => {
    it('should compute ARIA attributes for loading state', () => {
      component.isLoading = true;
      fixture.componentRef.setInput('loadingText', 'Custom loading...');

      const ariaAttrs = component.ariaAttributes();

      expect(ariaAttrs['aria-busy']).toBe(true);
      expect(ariaAttrs['aria-label']).toBe('Custom loading...');
    });

    it('should compute ARIA attributes for decorative images', () => {
      fixture.componentRef.setInput('isDecorative', true);
      component.isLoading = false;

      const ariaAttrs = component.ariaAttributes();

      expect(ariaAttrs['aria-hidden']).toBe(true);
    });

    it('should compute ARIA attributes for regular images', () => {
      fixture.componentRef.setInput('isDecorative', false);
      component.isLoading = false;

      const ariaAttrs = component.ariaAttributes();

      expect(ariaAttrs['aria-hidden']).toBeUndefined();
      expect(ariaAttrs['aria-busy']).toBeUndefined();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
