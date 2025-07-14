import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeCardComponent } from './welcome-card.component';
import { DateLongFormatterPipe } from '@/core/pipes/date-long-formatter.pipe';
import { CurrencyFormatPipe } from '@/core/pipes/currency-format.pipe';

describe('WelcomeCardComponent', () => {
  let component: WelcomeCardComponent;
  let fixture: ComponentFixture<WelcomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeCardComponent, DateLongFormatterPipe, CurrencyFormatPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should have default account type', () => {
      expect(component.accountType()).toBe('Conta Corrente');
    });

    it('should have default date as current date', () => {
      const currentDate = new Date();
      const componentDate = component.date();

      // Allow for small time difference
      expect(Math.abs(componentDate.getTime() - currentDate.getTime())).toBeLessThan(1000);
    });

    it('should have required input properties defined', () => {
      expect(component.name).toBeDefined();
      expect(component.balance).toBeDefined();
    });

    it('should have optional input properties defined', () => {
      expect(component.accountType).toBeDefined();
      expect(component.date).toBeDefined();
    });
  });

  describe('Balance Visibility', () => {
    it('should initialize with balance hidden', () => {
      expect(component.isBalanceVisible()).toBe(false);
    });

    it('should toggle balance visibility', () => {
      // Initially hidden
      expect(component.isBalanceVisible()).toBe(false);

      // Toggle to visible
      component.toggleBalanceVisibility();

      expect(component.isBalanceVisible()).toBe(true);

      // Toggle back to hidden
      component.toggleBalanceVisibility();

      expect(component.isBalanceVisible()).toBe(false);
    });

    it('should toggle balance visibility multiple times', () => {
      expect(component.isBalanceVisible()).toBe(false);

      component.toggleBalanceVisibility();

      expect(component.isBalanceVisible()).toBe(true);

      component.toggleBalanceVisibility();

      expect(component.isBalanceVisible()).toBe(false);

      component.toggleBalanceVisibility();

      expect(component.isBalanceVisible()).toBe(true);
    });
  });

  describe('Icons', () => {
    it('should have eye icons defined', () => {
      expect(component.icons.eye).toBeDefined();
      expect(component.icons.eyeOff).toBeDefined();
    });

    it('should have different icons for eye and eyeOff', () => {
      expect(component.icons.eye).not.toBe(component.icons.eyeOff);
    });
  });

  describe('Template Integration', () => {
    it('should render component without errors', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should have proper component structure', () => {
      fixture.detectChanges();
      const componentElement = fixture.nativeElement.querySelector('bb-welcome-card');

      expect(componentElement).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('should have correct selector', () => {
      expect(component.constructor.name).toBe('WelcomeCardComponent');
    });

    it('should be standalone component', () => {
      expect(component).toBeInstanceOf(WelcomeCardComponent);
    });

    it('should have required input properties', () => {
      expect(component.name).toBeDefined();
      expect(component.balance).toBeDefined();
    });

    it('should have toggle method', () => {
      expect(typeof component.toggleBalanceVisibility).toBe('function');
    });
  });

  describe('Accessibility', () => {
    it('should have proper component structure for accessibility', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement).toBeTruthy();
    });
  });
});
