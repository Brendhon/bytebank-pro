import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { DashboardPageComponent } from './dashboard.component';
import { WelcomeCardComponent } from '@/components/welcome-card/welcome-card.component';
import { MovementsSectionComponent } from '@/components/movements-section/movements-section.component';
import { CardProps } from '@bytebank-pro/types';
import { DashboardService } from '@/core/services/dashboard.service';
import { TransactionSummary } from '@bytebank-pro/types';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let element: HTMLElement;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;

  const mockTransactionSummary: TransactionSummary = {
    balance: 15750.0,
    breakdown: {
      payment: 2500,
      deposit: 8000,
      transfer: 3000,
      withdrawal: 2250
    }
  };

  beforeEach(async () => {
    // Create Apollo mock
    const apolloSpy = jasmine.createSpyObj('Apollo', ['mutate', 'query']);

    // Create DashboardService mock
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['loadTransactionSummary']);
    dashboardServiceSpy.loadTransactionSummary.and.returnValue(of(mockTransactionSummary));

    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent, WelcomeCardComponent, MovementsSectionComponent],
      providers: [
        { provide: Apollo, useValue: apolloSpy },
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial user data', () => {
    expect(component.userName).toBe('Desconhecido');

    expect(component.balance()).toBe(15750.0);

    expect(component.currentDate()).toBeInstanceOf(Date);
  });

  it('should have movements data with correct structure', () => {
    const movements = component.movements();

    expect(movements).toBeInstanceOf(Array);

    expect(movements.length).toBe(4);

    movements.forEach((movement: CardProps) => {
      expect(movement.key).toBeDefined();

      expect(movement.label).toBeDefined();

      expect(movement.value).toBeDefined();

      expect(movement.variant).toBeDefined();

      expect(typeof movement.value).toBe('number');

      expect(typeof movement.label).toBe('string');
    });
  });

  it('should render welcome card component', () => {
    const welcomeCard = element.querySelector('bb-welcome-card');

    expect(welcomeCard).toBeTruthy();
  });

  it('should render movements section component', () => {
    const movementsSection = element.querySelector('bb-movements-section');

    expect(movementsSection).toBeTruthy();
  });

  it('should have test data attributes', () => {
    const dashboardSection = element.querySelector('[data-testid="dashboard-section"]');
    const welcomeCard = element.querySelector('[data-testid="dashboard-welcome-card"]');
    const movementsSection = element.querySelector('[data-testid="dashboard-movements-section"]');

    expect(dashboardSection).toBeTruthy();

    expect(welcomeCard).toBeTruthy();

    expect(movementsSection).toBeTruthy();
  });
});
