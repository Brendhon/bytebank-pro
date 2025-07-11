import { AuthService } from '@/core/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { IUser } from '@bytebank-pro/types';
import { of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for dependencies
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    // Mock router events and URL
    const mockNavigationEnd = new NavigationEnd(1, '/dashboard', '/dashboard');
    Object.defineProperty(routerSpy, 'events', {
      value: of(mockNavigationEnd),
      writable: false
    });
    Object.defineProperty(routerSpy, 'url', {
      value: '/dashboard',
      writable: false
    });

    // Mock auth service with complete IUser object
    const mockUser: IUser = {
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      acceptPrivacy: true
    };
    authServiceSpy.getCurrentUser.and.returnValue(of(mockUser));

    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterOutlet],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up if necessary
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the layout structure', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="bb-header"]'));
      const mainContent = fixture.debugElement.query(By.css('[data-testid="main-content-outlet"]'));

      expect(header).toBeTruthy();

      expect(mainContent).toBeTruthy();
    });
  });

  describe('Observables Initialization', () => {
    it('should initialize pathname$ observable', (done) => {
      component.pathname$.pipe(take(1)).subscribe((pathname) => {
        expect(pathname).toBeDefined();

        expect(typeof pathname).toBe('string');
        done();
      });
    });

    it('should initialize userName$ observable', (done) => {
      component.userName$.pipe(skip(1), take(1)).subscribe((userName) => {
        expect(userName).toBe('Test User');
        done();
      });
    });

    it('should handle empty user name', (done) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(null));

      // Recreate component to test with null user
      fixture = TestBed.createComponent(LayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.userName$.pipe(skip(1), take(1)).subscribe((userName) => {
        expect(userName).toBe('');
        done();
      });
    });
  });

  describe('Navigation Handling', () => {
    it('should handle navigation to valid route', () => {
      const testRoute = '/dashboard';
      component.handleNavigation(testRoute);

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(testRoute);
    });

    it('should handle navigation to empty route', () => {
      component.handleNavigation('');

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should handle navigation to null route', () => {
      component.handleNavigation(null);

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });

  describe('Logout Handling', () => {
    it('should call auth service logout method', () => {
      component.handleLogout();

      expect(authServiceSpy.logout).toHaveBeenCalled();
    });
  });

  describe('Template Rendering', () => {
    it('should render header component with correct inputs', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="bb-header"]'));

      expect(header).toBeTruthy();

      // Check if header component is rendered
      expect(header.componentInstance).toBeDefined();
    });

    it('should render sidebar when pathname is available', () => {
      const sidebar = fixture.debugElement.query(By.css('[data-testid="bb-sidebar"]'));

      expect(sidebar).toBeTruthy();
    });

    it('should render main content area', () => {
      const mainContent = fixture.debugElement.query(By.css('[data-testid="main-content-outlet"]'));

      expect(mainContent).toBeTruthy();

      expect(mainContent.nativeElement.getAttribute('role')).toBe('main');
    });

    it('should render footer component', () => {
      const footer = fixture.debugElement.query(By.css('bb-footer'));

      expect(footer).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('should have correct CSS classes for layout', () => {
      const rootElement = fixture.debugElement.query(By.css('.flex.flex-col.min-h-screen'));

      expect(rootElement).toBeTruthy();
    });

    it('should have correct CSS classes for main content area', () => {
      const mainContent = fixture.debugElement.query(By.css('[data-testid="main-content-outlet"]'));

      expect(mainContent.nativeElement.classList).toContain('overflow-x-auto');

      expect(mainContent.nativeElement.classList).toContain('w-auto');

      expect(mainContent.nativeElement.classList).toContain('mx-auto');
    });

    it('should have correct CSS classes for sidebar', () => {
      const sidebar = fixture.debugElement.query(By.css('aside'));

      expect(sidebar.nativeElement.classList).toContain('hidden');

      expect(sidebar.nativeElement.classList).toContain('md:flex');

      expect(sidebar.nativeElement.classList).toContain('bg-white');

      expect(sidebar.nativeElement.classList).toContain('p-4');

      expect(sidebar.nativeElement.classList).toContain('w-48');
    });
  });

  describe('Dependency Injection', () => {
    it('should inject AuthService correctly', () => {
      expect(component['authService']).toBe(authServiceSpy);
    });

    it('should inject Router correctly', () => {
      expect(component['router']).toBe(routerSpy);
    });

    it('should inject DestroyRef correctly', () => {
      expect(component['destroyRef']).toBeDefined();
    });
  });

  describe('Lifecycle', () => {
    it('should initialize observables in ngOnInit', () => {
      expect(component.pathname$).toBeDefined();

      expect(component.userName$).toBeDefined();
    });

    it('should call auth service getCurrentUser on initialization', () => {
      expect(authServiceSpy.getCurrentUser).toHaveBeenCalled();
    });
  });
});
