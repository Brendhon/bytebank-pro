import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    // Set required input before calling detectChanges to avoid NG0950 error
    fixture.componentRef.setInput('current', 'Dashboard');
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up if necessary
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the navigation menu', () => {
      const element = fixture.debugElement.query(
        By.css('[data-testid="nav-menu-component"]')
      )?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.current()).toBe('Dashboard');

      expect(component.className()).toBe('');

      expect(component.navItems).toBeDefined();

      expect(component.navItems.length).toBe(3);
    });
  });

  describe('Input Properties', () => {
    it('should apply custom className to nav element', () => {
      fixture.componentRef.setInput('className', 'custom-nav-class');
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('[data-testid="nav-menu-component"]')
      )?.nativeElement;

      expect(element.classList).toContain('custom-nav-class');
    });

    it('should update current active item when input changes', () => {
      fixture.componentRef.setInput('current', 'Transações');
      fixture.detectChanges();

      expect(component.current()).toBe('Transações');

      expect(component.isActive()('Transações')).toBe(true);

      expect(component.isActive()('Dashboard')).toBe(false);
    });
  });

  describe('Navigation Items', () => {
    it('should render all navigation items', () => {
      const navItems = fixture.debugElement.queryAll(By.css('li'));

      expect(navItems.length).toBe(3);
    });

    it('should render navigation items with correct labels', () => {
      const expectedLabels = ['Dashboard', 'Transações', 'Configurações'];
      const navButtons = fixture.debugElement.queryAll(By.css('button'));

      navButtons.forEach((button, index) => {
        expect(button.nativeElement.textContent).toContain(expectedLabels[index]);
      });
    });

    it('should render navigation items with correct hrefs', () => {
      const expectedHrefs = ['/dashboard', '/transactions', '/settings'];

      expectedHrefs.forEach((href, index) => {
        expect(component.navItems[index].href).toBe(href);
      });
    });

    it('should render icons for each navigation item', () => {
      const icons = fixture.debugElement.queryAll(By.css('i-lucide'));

      expect(icons.length).toBe(3);
    });
  });

  describe('Active State Management', () => {
    it('should mark current item as active', () => {
      fixture.componentRef.setInput('current', 'Transações');
      fixture.detectChanges();

      const activeButton = fixture.debugElement.query(By.css('button[aria-current="page"]'));

      expect(activeButton).toBeTruthy();

      expect(activeButton.nativeElement.textContent).toContain('Transações');
    });

    it('should apply correct color classes for active item', () => {
      fixture.componentRef.setInput('current', 'Configurações');
      fixture.detectChanges();

      const configButton = fixture.debugElement.queryAll(By.css('button'))[2];

      expect(configButton.nativeElement.classList).toContain('text-bytebank-orange');

      expect(configButton.nativeElement.classList).toContain('font-bold');
    });

    it('should apply correct color classes for inactive items', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      const transacoesButton = fixture.debugElement.queryAll(By.css('button'))[1];

      expect(transacoesButton.nativeElement.classList).toContain('text-bytebank-dark-gray');
    });

    it('should return false for isActive when current is null', () => {
      fixture.componentRef.setInput('current', null);
      fixture.detectChanges();

      expect(component.isActive()('Dashboard')).toBe(false);
    });

    it('should return false for isActive when label is empty', () => {
      expect(component.isActive()('')).toBe(false);
    });
  });

  describe('Navigation Events', () => {
    it('should emit onNavigate when navigation item is clicked', () => {
      spyOn(component.onNavigate, 'emit');

      const dashboardButton = fixture.debugElement.queryAll(By.css('button'))[0];
      dashboardButton.nativeElement.click();

      expect(component.onNavigate.emit).toHaveBeenCalledWith('/dashboard');
    });

    it('should emit correct href for each navigation item', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const expectedHrefs = ['/dashboard', '/transactions', '/settings'];

      buttons.forEach((button, index) => {
        // Reset the spy for each iteration to avoid "already spied upon" error
        jasmine.getEnv().allowRespy(true);
        const emitSpy = spyOn(component.onNavigate, 'emit');
        button.nativeElement.click();

        expect(emitSpy).toHaveBeenCalledWith(expectedHrefs[index]);
      });
    });
  });

  describe('Pending State Management', () => {
    it('should set pending state when navigation is triggered', fakeAsync(() => {
      const dashboardButton = fixture.debugElement.queryAll(By.css('button'))[0];
      dashboardButton.nativeElement.click();

      expect(component.isPendingComputed()).toBe(true);

      expect(component.pendingHrefComputed()).toBe('/dashboard');

      tick(200);

      expect(component.isPendingComputed()).toBe(false);

      expect(component.pendingHrefComputed()).toBe(null);
    }));

    it('should show loading indicator for pending item', fakeAsync(() => {
      const dashboardButton = fixture.debugElement.queryAll(By.css('button'))[0];
      dashboardButton.nativeElement.click();

      // Force change detection to update the DOM
      fixture.detectChanges();

      // Check if pending state is set correctly
      expect(component.isPendingComputed()).toBe(true);
      expect(component.pendingHrefComputed()).toBe('/dashboard');

      // Look for the loading icon with a more specific selector
      const loadingIcon = fixture.debugElement.query(By.css('i-lucide[img="Loader2"]'));

      // If not found, try alternative selectors
      const alternativeLoadingIcon =
        loadingIcon ||
        fixture.debugElement.query(By.css('.animate-spin')) ||
        fixture.debugElement.query(By.css('[aria-label="Loading"]'));

      expect(alternativeLoadingIcon).toBeTruthy();

      if (alternativeLoadingIcon) {
        expect(alternativeLoadingIcon.nativeElement.classList).toContain('animate-spin');
      }

      tick(200);
    }));

    it('should check if specific href is pending', () => {
      const dashboardButton = fixture.debugElement.queryAll(By.css('button'))[0];
      dashboardButton.nativeElement.click();

      expect(component.isPendingForHref()('/dashboard')).toBe(true);

      expect(component.isPendingForHref()('/transactions')).toBe(false);
    });
  });

  describe('Button Classes', () => {
    it('should apply base button classes to all navigation items', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));

      buttons.forEach((button) => {
        expect(button.nativeElement.classList).toContain('flex');

        expect(button.nativeElement.classList).toContain('items-center');

        expect(button.nativeElement.classList).toContain('w-full');

        expect(button.nativeElement.classList).toContain('gap-2');

        expect(button.nativeElement.classList).toContain('px-2');

        expect(button.nativeElement.classList).toContain('py-2');

        expect(button.nativeElement.classList).toContain('rounded-md');

        expect(button.nativeElement.classList).toContain('text-left');

        expect(button.nativeElement.classList).toContain('transition-colors');

        expect(button.nativeElement.classList).toContain('cursor-pointer');

        expect(button.nativeElement.classList).toContain('hover:opacity-70');
      });
    });

    it('should combine base classes with color classes', () => {
      const buttonClasses = component.getButtonClasses()('Dashboard');

      expect(buttonClasses).toContain(
        'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer hover:opacity-70'
      );

      expect(buttonClasses).toContain('text-bytebank-orange');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for active item', () => {
      fixture.componentRef.setInput('current', 'Transações');
      fixture.detectChanges();

      const activeButton = fixture.debugElement.query(By.css('button[aria-current="page"]'));

      expect(activeButton).toBeTruthy();

      expect(activeButton.nativeElement.getAttribute('aria-label')).toBe('Navigate to Transações');
    });

    it('should have proper ARIA attributes for inactive items', () => {
      const inactiveButton = fixture.debugElement.queryAll(By.css('button'))[1];

      expect(inactiveButton.nativeElement.getAttribute('aria-current')).toBeNull();

      expect(inactiveButton.nativeElement.getAttribute('aria-label')).toBe(
        'Navigate to Transações'
      );
    });

    it('should have proper role attributes', () => {
      const navElement = fixture.debugElement.query(By.css('nav'));

      expect(navElement).toBeTruthy();

      const listElement = fixture.debugElement.query(By.css('ul[role="list"]'));

      expect(listElement).toBeTruthy();

      const listItems = fixture.debugElement.queryAll(By.css('li[role="listitem"]'));

      expect(listItems.length).toBe(3);
    });

    it('should have loading status for pending navigation', fakeAsync(() => {
      const dashboardButton = fixture.debugElement.queryAll(By.css('button'))[0];
      dashboardButton.nativeElement.click();

      // Force change detection to update the DOM
      fixture.detectChanges();

      // Check if pending state is set correctly
      expect(component.isPendingComputed()).toBe(true);
      expect(component.pendingHrefComputed()).toBe('/dashboard');

      const loadingStatus = fixture.debugElement.query(
        By.css('div[role="status"][aria-live="polite"]')
      );

      // If not found, try alternative selectors
      const alternativeLoadingStatus =
        loadingStatus ||
        fixture.debugElement.query(By.css('[aria-label="Loading"]')) ||
        fixture.debugElement.query(By.css('[role="status"]'));

      expect(alternativeLoadingStatus).toBeTruthy();

      if (alternativeLoadingStatus) {
        expect(alternativeLoadingStatus.nativeElement.getAttribute('aria-label')).toBe('Loading');
      }

      tick(200);
    }));

    it('should hide icons from screen readers', () => {
      const icons = fixture.debugElement.queryAll(By.css('i-lucide'));

      icons.forEach((icon) => {
        expect(icon.nativeElement.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Template Structure', () => {
    it('should render navigation container with correct structure', () => {
      const navElement = fixture.debugElement.query(By.css('nav'));

      expect(navElement).toBeTruthy();

      const ulElement = fixture.debugElement.query(By.css('nav > ul'));

      expect(ulElement).toBeTruthy();

      expect(ulElement.nativeElement.classList).toContain('flex');

      expect(ulElement.nativeElement.classList).toContain('flex-col');

      expect(ulElement.nativeElement.classList).toContain('gap-3');
    });

    it('should render list items with correct structure', () => {
      const listItems = fixture.debugElement.queryAll(By.css('li'));

      listItems.forEach((item) => {
        expect(item.nativeElement.classList).toContain('hover:opacity-70');

        const button = item.query(By.css('button'));

        expect(button).toBeTruthy();

        expect(button.nativeElement.getAttribute('type')).toBe('button');
      });
    });

    it('should render button content with icon and text', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));

      buttons.forEach((button) => {
        const icon = button.query(By.css('i-lucide'));

        expect(icon).toBeTruthy();

        const span = button.query(By.css('span'));

        expect(span).toBeTruthy();
      });
    });
  });

  describe('Icon References', () => {
    it('should have icon references defined', () => {
      expect(component.LayoutDashboard).toBeDefined();

      expect(component.BadgeDollarSign).toBeDefined();

      expect(component.Settings).toBeDefined();

      expect(component.Loader2).toBeDefined();
    });

    it('should use correct icons for each navigation item', () => {
      expect(component.navItems[0].icon).toBe(component.LayoutDashboard);

      expect(component.navItems[1].icon).toBe(component.BadgeDollarSign);

      expect(component.navItems[2].icon).toBe(component.Settings);
    });
  });

  describe('Computed Signals', () => {
    it('should compute color classes correctly', () => {
      fixture.componentRef.setInput('current', 'Dashboard');
      fixture.detectChanges();

      const activeColorClasses = component.getColorClasses()('Dashboard');

      expect(activeColorClasses).toBe('text-bytebank-orange font-bold');

      const inactiveColorClasses = component.getColorClasses()('Transações');

      expect(inactiveColorClasses).toBe('text-bytebank-dark-gray');
    });

    it('should compute button classes correctly', () => {
      const buttonClasses = component.getButtonClasses()('Dashboard');

      expect(buttonClasses).toContain(
        'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer hover:opacity-70'
      );

      expect(buttonClasses).toContain('text-bytebank-orange font-bold');
    });
  });

  describe('Deprecated Method', () => {
    it('should maintain compatibility with deprecated isActiveMethod', () => {
      fixture.componentRef.setInput('current', 'Configurações');
      fixture.detectChanges();

      expect(component.isActiveMethod('Configurações')).toBe(true);

      expect(component.isActiveMethod('Dashboard')).toBe(false);
    });
  });
});
