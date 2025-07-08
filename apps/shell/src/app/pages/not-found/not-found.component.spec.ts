import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { NotFoundComponent } from './not-found.component';
import { GuestLayoutComponent } from '@/guest-layout/guest-layout.component';
import { ImgComponent } from '@bytebank-pro/ui';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';
import { AuthService } from '@/core/services/auth.service';
import { ToastService } from '@/core/services/toast.service';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let element: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Create spies for services
    authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['login', 'register', 'getCurrentUser', 'logout'],
      {
        currentUser$: of(null),
        user: null,
        isLoggedIn: false,
        token: ''
      }
    );

    toastServiceSpy = jasmine.createSpyObj('ToastService', [
      'showSuccess',
      'showError',
      'showInfo'
    ]);

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterModule.forRoot([]), GuestLayoutComponent, ImgComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="not-found-illustration"]')
    )?.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct error message', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    const descriptionElement = fixture.debugElement.query(By.css('p'));

    expect(titleElement.nativeElement.textContent).toContain('Ops! Não encontramos a página…');

    expect(descriptionElement.nativeElement.textContent).toContain(
      'E olha que exploramos o universo procurando por ela!'
    );
  });

  it('should display the back to home button with correct attributes', () => {
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="back-to-home-button"]'));

    expect(buttonElement.nativeElement.textContent).toContain('Voltar ao início');

    expect(buttonElement.nativeElement.getAttribute('role')).toBe('button');

    expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe(
      'Voltar para a página inicial'
    );
  });

  it('should display the 404 illustration with correct attributes', () => {
    const illustrationElement = fixture.debugElement.query(
      By.css('[data-testid="not-found-illustration"]')
    );

    expect(illustrationElement.nativeElement.getAttribute('alt')).toBe(
      'Ilustração de erro 404 - página não encontrada'
    );

    expect(illustrationElement.nativeElement.getAttribute('size')).toBe('full');
  });

  it('should have the correct image source', () => {
    expect(component.imageSrc).toBe(ILLUSTRATIONS.ERROR_404);
  });

  it('should have router link to home page', () => {
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="back-to-home-button"]'));

    expect(buttonElement.nativeElement.getAttribute('routerlink')).toBe('/home');
  });
});
