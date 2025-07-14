import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent] // For standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="footer-component"]')).nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render footer element', () => {
      expect(element).toBeTruthy();

      expect(element.tagName.toLowerCase()).toBe('footer');
    });
  });

  describe('Contact Information', () => {
    it('should display contact title', () => {
      const contactTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"] strong')
      ).nativeElement;

      expect(contactTitle).toBeTruthy();

      expect(contactTitle.textContent).toBe('Contato');

      expect(contactTitle.tagName.toLowerCase()).toBe('strong');
    });

    it('should display phone number', () => {
      const phoneSpan = fixture.debugElement.query(
        By.css('[data-testid="contact-phone"]')
      ).nativeElement;

      expect(phoneSpan).toBeTruthy();

      expect(phoneSpan.textContent).toBe('0800 004 250 08');
    });

    it('should display email address', () => {
      const emailSpan = fixture.debugElement.query(
        By.css('[data-testid="contact-email"]')
      ).nativeElement;

      expect(emailSpan).toBeTruthy();

      expect(emailSpan.textContent).toBe('meajuda@bytebank.com.br');
    });
  });

  describe('Logo Section', () => {
    it('should have logo section with proper accessibility', () => {
      const logoSection = fixture.debugElement.query(
        By.css('[data-testid="footer-logo-section"]')
      ).nativeElement;

      expect(logoSection).toBeTruthy();

      const logoTitle = fixture.debugElement.query(By.css('#logo-section-title')).nativeElement;

      expect(logoTitle).toBeTruthy();

      expect(logoTitle.textContent).toBe('Logo do ByteBank');

      expect(logoTitle.classList).toContain('sr-only');
    });
  });

  describe('Layout and Styling', () => {
    it('should have properly structured sections', () => {
      const contactSection = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"]')
      ).nativeElement;
      const logoSection = fixture.debugElement.query(
        By.css('[data-testid="footer-logo-section"]')
      ).nativeElement;

      expect(contactSection.classList).toContain('footer-contact-section');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      expect(element.tagName.toLowerCase()).toBe('footer');
    });

    it('should have proper ARIA labels and relationships', () => {
      const contactTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"] strong')
      ).nativeElement;

      expect(contactTitle.id).toBe('contact-info-title');

      const logoSection = fixture.debugElement.query(
        By.css('[data-testid="footer-logo-section"]')
      ).nativeElement;

      expect(logoSection.getAttribute('aria-labelledby')).toBe('logo-section-title');
    });

    it('should have screen reader accessible logo description', () => {
      const logoTitle = fixture.debugElement.query(By.css('#logo-section-title')).nativeElement;

      expect(logoTitle.classList).toContain('sr-only');

      expect(logoTitle.textContent).toBe('Logo do ByteBank');
    });
  });

  describe('Content Structure', () => {
    it('should display contact information in correct order', () => {
      const contactSection = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"]')
      ).nativeElement;

      expect(contactSection).toBeTruthy();

      const contactTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"] strong')
      ).nativeElement;
      const phoneNumber = fixture.debugElement.query(
        By.css('[data-testid="contact-phone"]')
      ).nativeElement;
      const emailAddress = fixture.debugElement.query(
        By.css('[data-testid="contact-email"]')
      ).nativeElement;

      expect(contactTitle.textContent).toBe('Contato');

      expect(phoneNumber.textContent).toBe('0800 004 250 08');

      expect(emailAddress.textContent).toBe('meajuda@bytebank.com.br');
    });

    it('should have logo section as second element', () => {
      const logoSection = fixture.debugElement.query(
        By.css('[data-testid="footer-logo-section"]')
      ).nativeElement;

      expect(logoSection).toBeTruthy();

      expect(logoSection.getAttribute('aria-labelledby')).toBe('logo-section-title');
    });
  });

  describe('Typography and Styling', () => {
    it('should have correct text sizes and colors', () => {
      const contactTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"] strong')
      ).nativeElement;

      expect(contactTitle.classList).toContain('contact-info-title');

      const phoneNumber = fixture.debugElement.query(
        By.css('[data-testid="contact-phone"]')
      ).nativeElement;
      const emailAddress = fixture.debugElement.query(
        By.css('[data-testid="contact-email"]')
      ).nativeElement;

      expect(phoneNumber.classList).toContain('contact-info-text');

      expect(emailAddress.classList).toContain('contact-info-text');
    });
  });
});
