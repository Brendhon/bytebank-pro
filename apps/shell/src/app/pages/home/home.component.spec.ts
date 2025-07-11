import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { AuthService } from '@/core/services/auth.service';
import { GuestLayoutComponent } from '@/guest-layout/guest-layout.component';
import { ImgComponent } from '@bytebank-pro/ui';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isLoggedIn: false
    });
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, GuestLayoutComponent, ImgComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="benefits-section"]'))?.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display benefits section', () => {
    expect(element).toBeTruthy();
  });

  it('should display benefits main title', () => {
    const titleElement = fixture.debugElement.query(By.css('[data-testid="benefits-main-title"]'));

    expect(titleElement).toBeTruthy();

    expect(titleElement.nativeElement.textContent).toContain(
      'Experimente mais liberdade no controle da sua vida financeira'
    );
  });

  it('should display benefits grid title', () => {
    const gridTitleElement = fixture.debugElement.query(
      By.css('[data-testid="benefits-grid-title"]')
    );

    expect(gridTitleElement).toBeTruthy();

    expect(gridTitleElement.nativeElement.textContent).toContain('Vantagens do nosso banco');
  });

  it('should display all benefit items', () => {
    const benefitItems = fixture.debugElement.queryAll(
      By.css('[data-testid="benefits-grid-section"] .grid > div')
    );

    expect(benefitItems.length).toBe(4);
  });

  it('should display correct benefit titles', () => {
    const benefitTitles = fixture.debugElement.queryAll(By.css('h4'));

    expect(benefitTitles[0].nativeElement.textContent).toContain('Conta e cartão gratuitos');

    expect(benefitTitles[1].nativeElement.textContent).toContain('Saques sem custo');

    expect(benefitTitles[2].nativeElement.textContent).toContain('Programa de pontos');

    expect(benefitTitles[3].nativeElement.textContent).toContain('Seguro Dispositivos');
  });

  it('should display correct benefit descriptions', () => {
    const benefitDescriptions = fixture.debugElement.queryAll(By.css('p'));

    expect(benefitDescriptions[0].nativeElement.textContent).toContain(
      'Nossa conta é digital, sem custo fixo'
    );

    expect(benefitDescriptions[1].nativeElement.textContent).toContain(
      'Você pode sacar gratuitamente 4x por mês'
    );

    expect(benefitDescriptions[2].nativeElement.textContent).toContain(
      'Acumule pontos com compras no crédito'
    );

    expect(benefitDescriptions[3].nativeElement.textContent).toContain(
      'Proteja seus dispositivos móveis'
    );
  });

  it('should display home illustration', () => {
    const illustrationWrapper = fixture.debugElement.query(
      By.css('[data-testid="benefits-main-illustration-wrapper"]')
    );

    expect(illustrationWrapper).toBeTruthy();

    const imgElement = illustrationWrapper.query(By.directive(ImgComponent));

    expect(imgElement).toBeTruthy();
  });

  it('should redirect to dashboard when user is logged in', () => {
    // Arrange
    Object.defineProperty(authServiceSpy, 'isLoggedIn', {
      get: () => true
    });

    // Act
    component.ngOnInit();

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not redirect when user is not logged in', () => {
    // Arrange
    Object.defineProperty(authServiceSpy, 'isLoggedIn', {
      get: () => false
    });

    // Act
    component.ngOnInit();

    // Assert
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should return correct index from trackByBenefitIndex', () => {
    const result = component.trackByBenefitIndex(2);

    expect(result).toBe(2);
  });

  it('should have correct benefits array structure', () => {
    expect(component.benefits.length).toBe(4);

    component.benefits.forEach((benefit) => {
      expect(benefit.iconSrc).toBeDefined();
      expect(benefit.iconAlt).toBeDefined();
      expect(benefit.iconWidth).toBeDefined();
      expect(benefit.title).toBeDefined();
      expect(benefit.description).toBeDefined();
    });
  });

  it('should have homeIllustrationSrc property', () => {
    expect(component.homeIllustrationSrc).toBeDefined();
  });
});
