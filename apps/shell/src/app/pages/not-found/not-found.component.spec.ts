import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.imageSrc).toBe(ILLUSTRATIONS.ERROR_404);
    });
  });

  describe('UI Rendering', () => {
    it('should render the 404 error message', () => {
      const headingElement = fixture.debugElement.query(By.css('h1'));

      expect(headingElement).toBeTruthy();
      expect(headingElement.nativeElement.textContent).toContain('Ops! Não encontramos a página…');
    });

    it('should render the error description', () => {
      const descriptionElement = fixture.debugElement.query(By.css('p'));

      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.nativeElement.textContent).toContain(
        'E olha que exploramos o universo procurando por ela!'
      );
    });

    it('should render the 404 illustration', () => {
      const illustrationElement = fixture.debugElement.query(
        By.css('[data-testid="not-found-illustration"]')
      );

      expect(illustrationElement).toBeTruthy();
      expect(illustrationElement.nativeElement.getAttribute('alt')).toBe(
        'Ilustração de erro 404 - página não encontrada'
      );
    });
  });

  describe('Navigation', () => {
    it('should have back to home button with correct attributes', () => {
      const backButton = fixture.debugElement.query(By.css('[data-testid="back-to-home-button"]'));

      expect(backButton).toBeTruthy();
      expect(backButton.nativeElement.getAttribute('routerLink')).toBe('/home');
      expect(backButton.nativeElement.textContent?.trim()).toBe('Voltar ao início');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes on back button', () => {
      const backButton = fixture.debugElement.query(By.css('[data-testid="back-to-home-button"]'));

      expect(backButton.nativeElement.getAttribute('aria-label')).toBe(
        'Voltar para a página inicial'
      );
      expect(backButton.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should have proper alt text for illustration', () => {
      const illustration = fixture.debugElement.query(
        By.css('[data-testid="not-found-illustration"]')
      );

      expect(illustration.nativeElement.getAttribute('alt')).toBe(
        'Ilustração de erro 404 - página não encontrada'
      );
    });
  });
});
