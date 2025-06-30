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

  describe('Navigation Section', () => {
    it('should display navigation title', () => {
      const navTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] strong')
      ).nativeElement;

      expect(navTitle).toBeTruthy();

      expect(navTitle.textContent).toBe('Navegação');

      expect(navTitle.tagName.toLowerCase()).toBe('strong');
    });

    it('should have navigation with proper accessibility', () => {
      const nav = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] nav')
      ).nativeElement;

      expect(nav).toBeTruthy();

      expect(nav.getAttribute('aria-labelledby')).toBe('navigation-title');
    });

    it('should display all navigation links', () => {
      const aboutLink = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"] a[href="/about"]')
      ).nativeElement;
      const privacyLink = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"] a[href="/privacy"]')
      ).nativeElement;
      const termsLink = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"] a[href="/terms"]')
      ).nativeElement;

      expect(aboutLink.textContent).toBe('Sobre Nós');

      expect(aboutLink.getAttribute('href')).toBe('/about');

      expect(privacyLink.textContent).toBe('Política de Privacidade');

      expect(privacyLink.getAttribute('href')).toBe('/privacy');

      expect(termsLink.textContent).toBe('Termos de Uso');

      expect(termsLink.getAttribute('href')).toBe('/terms');
    });

    it('should have hover effects on navigation links', () => {
      const links = fixture.debugElement.queryAll(
        By.css('[data-testid="navigation-links-list"] a')
      );

      links.forEach((link) => {
        expect(link.nativeElement.classList).toContain('hover:underline');
      });
    });
  });

  describe('Layout and Styling', () => {
    it('should have correct CSS classes for responsive layout', () => {
      expect(element.classList).toContain('p-6');

      expect(element.classList).toContain('bg-bytebank-dark');

      expect(element.classList).toContain('text-white');

      expect(element.classList).toContain('flex');

      expect(element.classList).toContain('flex-col');

      expect(element.classList).toContain('sm:flex-row');

      expect(element.classList).toContain('sm:items-center');

      expect(element.classList).toContain('gap-6');

      expect(element.classList).toContain('justify-between');

      expect(element.classList).toContain('items-start');
    });

    it('should have properly structured sections', () => {
      const contactSection = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"]')
      ).nativeElement;
      const logoSection = fixture.debugElement.query(
        By.css('[data-testid="footer-logo-section"]')
      ).nativeElement;
      const navigationSection = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"]')
      ).nativeElement;

      expect(contactSection.classList).toContain('flex');

      expect(contactSection.classList).toContain('flex-col');

      expect(contactSection.classList).toContain('gap-2');

      expect(logoSection.classList).toContain('flex');

      expect(logoSection.classList).toContain('flex-col');

      expect(logoSection.classList).toContain('gap-2');

      expect(navigationSection.classList).toContain('flex');

      expect(navigationSection.classList).toContain('flex-col');

      expect(navigationSection.classList).toContain('gap-2');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      expect(element.tagName.toLowerCase()).toBe('footer');

      const nav = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] nav')
      ).nativeElement;

      expect(nav).toBeTruthy();

      const list = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"]')
      ).nativeElement;

      expect(list).toBeTruthy();
    });

    it('should have proper ARIA labels and relationships', () => {
      const contactTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"] strong')
      ).nativeElement;

      expect(contactTitle.id).toBe('contact-info-title');

      const navigationTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] strong')
      ).nativeElement;

      expect(navigationTitle.id).toBe('navigation-title');

      const nav = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] nav')
      ).nativeElement;

      expect(nav.getAttribute('aria-labelledby')).toBe('navigation-title');

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

    it('should have keyboard navigable links', () => {
      const aboutLink = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"] a[href="/about"]')
      ).nativeElement;
      const privacyLink = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"] a[href="/privacy"]')
      ).nativeElement;
      const termsLink = fixture.debugElement.query(
        By.css('[data-testid="navigation-links-list"] a[href="/terms"]')
      ).nativeElement;

      aboutLink.focus();

      expect(document.activeElement).toBe(aboutLink);

      privacyLink.focus();

      expect(document.activeElement).toBe(privacyLink);

      termsLink.focus();

      expect(document.activeElement).toBe(termsLink);
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

    it('should have logo section as middle element', () => {
      const logoSection = fixture.debugElement.query(
        By.css('[data-testid="footer-logo-section"]')
      ).nativeElement;

      expect(logoSection).toBeTruthy();

      expect(logoSection.getAttribute('aria-labelledby')).toBe('logo-section-title');
    });

    it('should have navigation as last section', () => {
      const navSection = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"]')
      ).nativeElement;

      expect(navSection).toBeTruthy();

      const nav = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] nav')
      ).nativeElement;

      expect(nav).toBeTruthy();
    });
  });

  describe('Typography and Styling', () => {
    it('should have correct text sizes and colors', () => {
      const contactTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-contact-section"] strong')
      ).nativeElement;
      const navigationTitle = fixture.debugElement.query(
        By.css('[data-testid="footer-navigation-section"] strong')
      ).nativeElement;

      expect(contactTitle.classList).toContain('text-base');

      expect(navigationTitle.classList).toContain('text-base');

      const phoneNumber = fixture.debugElement.query(
        By.css('[data-testid="contact-phone"]')
      ).nativeElement;
      const emailAddress = fixture.debugElement.query(
        By.css('[data-testid="contact-email"]')
      ).nativeElement;

      expect(phoneNumber.classList).toContain('text-sm');

      expect(emailAddress.classList).toContain('text-sm');
    });
  });
});
