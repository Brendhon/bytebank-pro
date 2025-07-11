import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPageComponent } from './dashboard.component';
import { WelcomeCardComponent } from '@/components/welcome-card/welcome-card.component';
import { MovementsSectionComponent } from '@/components/movements-section/movements-section.component';
import { CardProps } from '@bytebank-pro/types';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent, WelcomeCardComponent, MovementsSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial user data', () => {
    expect(component.userName()).toBe('João Silva');
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
    const welcomeCard = fixture.nativeElement.querySelector('bb-welcome-card');

    expect(welcomeCard).toBeTruthy();
  });

  it('should render movements section component', () => {
    const movementsSection = fixture.nativeElement.querySelector('bb-movements-section');

    expect(movementsSection).toBeTruthy();
  });

  it('should have proper accessibility attributes', () => {
    const mainElement = fixture.nativeElement.querySelector('main');

    expect(mainElement).toBeTruthy();
    expect(mainElement.getAttribute('role')).toBe('main');
    expect(mainElement.getAttribute('aria-label')).toBe('Dashboard principal do ByteBank');
  });

  it('should have test data attributes', () => {
    const dashboardSection = fixture.nativeElement.querySelector(
      '[data-testid="dashboard-section"]'
    );
    const welcomeCard = fixture.nativeElement.querySelector(
      '[data-testid="dashboard-welcome-card"]'
    );
    const movementsSection = fixture.nativeElement.querySelector(
      '[data-testid="dashboard-movements-section"]'
    );

    expect(dashboardSection).toBeTruthy();
    expect(welcomeCard).toBeTruthy();
    expect(movementsSection).toBeTruthy();
  });
});
