import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ASSETS } from '@/assets/assets.config';
import { ImgComponent } from '../img/img.component';
import { LogoComponent } from './logo.component';
const { LOGOS } = ASSETS;

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent, ImgComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.variant()).toBe('full');
    expect(component.size()).toBe('md');
    expect(component.className()).toBe('');
    expect(component.isDecorative()).toBe(false);
  });

  it('should update logo source based on variant', () => {
    fixture.componentRef.setInput('variant', 'full');
    fixture.detectChanges();

    expect(component.logoSrc()).toBe(LOGOS.MAIN);

    fixture.componentRef.setInput('variant', 'icon');
    fixture.detectChanges();

    expect(component.logoSrc()).toBe(LOGOS.ICON);
  });

  describe('alt text', () => {
    it('should use empty alt text when isDecorative is true', () => {
      fixture.componentRef.setInput('isDecorative', true);
      fixture.detectChanges();

      expect(component.logoAltText()).toBe('');
    });

    it('should use custom aria-label when provided', () => {
      const customLabel = 'Custom Logo Label';
      fixture.componentRef.setInput('ariaLabel', customLabel);
      fixture.componentRef.setInput('variant', 'icon');
      fixture.detectChanges();

      expect(component.logoAltText()).toBe(customLabel);
    });

    it('should use default full logo alt text', () => {
      fixture.componentRef.setInput('variant', 'full');
      fixture.detectChanges();

      expect(component.logoAltText()).toBe(
        'ByteBank Pro - Logo da plataforma de gestão financeira'
      );
    });

    it('should use default icon alt text', () => {
      fixture.componentRef.setInput('variant', 'icon');
      fixture.detectChanges();

      expect(component.logoAltText()).toBe('ByteBank Pro - Ícone da plataforma');
    });
  });
});
