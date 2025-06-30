import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('current', 'Dashboard');
    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="nav-menu-component"]')
    )?.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.className()).toBe('');
    });

    it('should have navigation items defined', () => {
      expect(component.navItems.length).toBe(3);
      expect(component.navItems[0].label).toBe('Dashboard');
      expect(component.navItems[1].label).toBe('Transações');
      expect(component.navItems[2].label).toBe('Configurações');
    });
  });

  describe('Input Properties', () => {
    it('should apply current input correctly', () => {
      fixture.componentRef.setInput('current', 'Transações');
      fixture.detectChanges();

      expect(component.current()).toBe('Transações');
    });

    it('should apply className input correctly', () => {
      fixture.componentRef.setInput('className', 'custom-nav-class');
      fixture.detectChanges();

      expect(element.classList).toContain('custom-nav-class');
    });

    it('should highlight active navigation item', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      const dashboardButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Dashboard"]')
      ).nativeElement;

      expect(dashboardButton.classList).toContain('text-orange');
      expect(dashboardButton.classList).toContain('font-bold');
      expect(dashboardButton.getAttribute('aria-current')).toBe('page');
    });
  });

  describe('Events', () => {
    it('should emit onNavigate when navigation item is clicked', () => {
      spyOn(component.onNavigate, 'emit');

      const transactionsButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Transações"]')
      ).nativeElement;
      transactionsButton.click();
      fixture.detectChanges();

      expect(component.onNavigate.emit).toHaveBeenCalledWith('/transactions');
    });

    it('should show loading indicator during navigation', () => {
      const dashboardButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Dashboard"]')
      ).nativeElement;
      dashboardButton.click();
      fixture.detectChanges();

      const loadingIcon = fixture.debugElement.query(By.css('.animate-spin'));

      expect(loadingIcon).not.toBeNull();
      expect(component.isPending).toBeTruthy();
      expect(component.pendingHref).toBe('/dashboard');
    });
  });

  describe('State Management', () => {
    it('should update active state when current changes', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      expect(component.isActive('Dashboard')).toBeTruthy();
      expect(component.isActive('Transações')).toBeFalsy();

      fixture.componentRef.setInput('current', 'Transações');
      fixture.detectChanges();

      expect(component.isActive('Dashboard')).toBeFalsy();
      expect(component.isActive('Transações')).toBeTruthy();
    });

    it('should return correct color classes for active item', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      expect(component.getColorClasses('Dashboard')).toBe('text-orange font-bold');
      expect(component.getColorClasses('Transações')).toBe('text-dark-gray');
    });

    it('should return correct button classes', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      const buttonClasses = component.getButtonClasses('Dashboard');

      expect(buttonClasses).toContain(
        'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer'
      );
      expect(buttonClasses).toContain('text-orange font-bold');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      const dashboardButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Dashboard"]')
      ).nativeElement;

      expect(dashboardButton.getAttribute('aria-label')).toBe('Navigate to Dashboard');
      expect(dashboardButton.getAttribute('aria-current')).toBe('page');
    });

    it('should have proper role attributes for list structure', () => {
      const listElement = fixture.debugElement.query(By.css('ul[role="list"]'));
      const listItems = fixture.debugElement.queryAll(By.css('li[role="listitem"]'));

      expect(listElement).not.toBeNull();
      expect(listItems.length).toBe(3);
    });

    it('should have loading status with proper aria attributes', () => {
      const dashboardButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Dashboard"]')
      ).nativeElement;
      dashboardButton.click();
      fixture.detectChanges();

      const loadingStatus = fixture.debugElement.query(By.css('[role="status"]'));

      expect(loadingStatus).not.toBeNull();
      expect(loadingStatus.nativeElement.getAttribute('aria-live')).toBe('polite');
      expect(loadingStatus.nativeElement.getAttribute('aria-label')).toBe('Loading');
    });

    it('should have icons with aria-hidden attribute', () => {
      const icons = fixture.debugElement.queryAll(By.css('i-lucide[aria-hidden="true"]'));

      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Conditional Rendering', () => {
    it('should show loading icon when navigation is pending', () => {
      const settingsButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Configurações"]')
      ).nativeElement;
      settingsButton.click();
      fixture.detectChanges();

      const loadingIcon = fixture.debugElement.query(By.css('.animate-spin'));
      const regularIcon = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Configurações"] i-lucide:not(.animate-spin)')
      );

      expect(loadingIcon).not.toBeNull();
      expect(regularIcon).toBeNull();
    });

    it('should show regular icon when navigation is not pending', () => {
      const transactionsButton = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Transações"]')
      ).nativeElement;

      // Initially not pending
      const regularIcon = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Transações"] i-lucide:not(.animate-spin)')
      );
      const loadingIcon = fixture.debugElement.query(
        By.css('button[aria-label="Navigate to Transações"] .animate-spin')
      );

      expect(regularIcon).not.toBeNull();
      expect(loadingIcon).toBeNull();
    });
  });
});
