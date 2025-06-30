import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let element: HTMLElement;
  let mockRouter: jasmine.SpyObj<Router>;
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    routerEventsSubject = new Subject();
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'], {
      events: routerEventsSubject.asObservable(),
      url: '/'
    });

    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
    element =
      fixture.debugElement.query(By.css('[data-testid="layout"]'))?.nativeElement ||
      fixture.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.pathname$).toBeDefined();

      expect(component.userName$).toBeDefined();
    });
  });

  describe('Lifecycle Methods', () => {
    it('should initialize observables on ngOnInit', fakeAsync(() => {
      component.ngOnInit();

      expect(component.pathname$).toBeDefined();

      expect(component.userName$).toBeDefined();
    }));

    it('should handle initial pathname from router url', () => {
      // Create a new router spy with the desired URL
      const routerWithCustomUrl = jasmine.createSpyObj('Router', ['navigateByUrl'], {
        events: routerEventsSubject.asObservable(),
        url: '/dashboard'
      });
      (component as any).router = routerWithCustomUrl;

      const initialPathname = component['getInitialPathname']();

      expect(initialPathname).toBeDefined();
    });

    it('should create pathname observable on navigation events', () => {
      component.ngOnInit();

      const navigationEvent = new NavigationEnd(1, '/transactions', '/transactions');
      routerEventsSubject.next(navigationEvent);

      expect(component.pathname$).toBeDefined();
    });
  });

  describe('Navigation Methods', () => {
    it('should handle navigation to external links', () => {
      spyOn(window, 'open');

      component.handleNavigation('https://example.com');

      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('should handle navigation to internal links', () => {
      component.handleNavigation('/dashboard');

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });

    it('should handle navigation with empty link', () => {
      component.handleNavigation('');

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should handle navigation with null link', () => {
      component.handleNavigation(null as any);

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });

  describe('User Actions', () => {
    it('should handle logout action', () => {
      spyOn(console, 'log');

      component.handleLogout();

      expect(console.log).toHaveBeenCalledWith('Logout clicked!');
    });

    it('should handle login action', () => {
      spyOn(console, 'log');

      component.handleLogin();

      expect(console.log).toHaveBeenCalledWith('Login clicked!');
    });

    it('should handle open account action', () => {
      spyOn(console, 'log');

      component.handleOpenAccount();

      expect(console.log).toHaveBeenCalledWith('Open Account clicked!');
    });
  });

  describe('Async Operations', () => {
    it('should emit user name after delay', fakeAsync(() => {
      component.ngOnInit();
      let emittedUserName: string | undefined;

      component.userName$.subscribe((userName) => {
        emittedUserName = userName;
      });

      // Initially should be empty string
      tick(0);

      expect(emittedUserName).toBe('');

      // After delay should be the actual name
      tick(1000);

      expect(emittedUserName).toBe('Jane Doe');
    }));
  });

  describe('Error Handling', () => {
    it('should handle invalid navigation links gracefully', () => {
      spyOn(window, 'open');
      spyOn(console, 'error');

      // Should not throw errors for various invalid inputs
      component.handleNavigation(undefined as any);

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
