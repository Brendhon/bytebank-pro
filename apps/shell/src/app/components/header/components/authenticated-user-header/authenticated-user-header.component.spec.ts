import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticatedUserHeaderComponent } from './authenticated-user-header.component';

describe('AuthenticatedUserHeaderComponent', () => {
  let component: AuthenticatedUserHeaderComponent;
  let fixture: ComponentFixture<AuthenticatedUserHeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedUserHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedUserHeaderComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('userName', 'Test User');
    fixture.detectChanges();

    element = fixture.debugElement.query(
      By.css('[data-testid="authenticated-user-header-container"]')
    )?.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default container element', () => {
      expect(element).toBeTruthy();
    });
  });

  describe('Input Properties', () => {
    it('should set userName input correctly', () => {
      fixture.componentRef.setInput('userName', 'John Doe');
      fixture.detectChanges();

      expect(component.userName()).toBe('John Doe');
    });

    it('should display user name in template', () => {
      fixture.componentRef.setInput('userName', 'Jane Smith');
      fixture.detectChanges();

      const userNameElement = fixture.debugElement.query(
        By.css('[data-testid="user-name-display"]')
      );

      expect(userNameElement).toBeTruthy();
      expect(userNameElement.nativeElement.textContent).toContain('Jane Smith');
    });
  });

  describe('Events', () => {
    it('should emit onNavigate when user actions component emits onNavigate', () => {
      spyOn(component.onNavigate, 'emit');
      const userActionsComponent = fixture.debugElement.query(By.css('bb-user-actions'));

      userActionsComponent.triggerEventHandler('onNavigate', 'https://github.com');

      expect(component.onNavigate.emit).toHaveBeenCalledWith('https://github.com');
    });

    it('should emit onLogout when user actions component emits onLogout', () => {
      spyOn(component.onLogout, 'emit');
      const userActionsComponent = fixture.debugElement.query(By.css('bb-user-actions'));

      userActionsComponent.triggerEventHandler('onLogout');

      expect(component.onLogout.emit).toHaveBeenCalled();
    });
  });

  describe('Template Structure', () => {
    it('should render the main container with correct attributes', () => {
      expect(element.classList).toContain('flex');
      expect(element.classList).toContain('items-center');
      expect(element.classList).toContain('gap-6');
    });

    it('should render user name display element', () => {
      const userNameElement = fixture.debugElement.query(
        By.css('[data-testid="user-name-display"]')
      );

      expect(userNameElement).toBeTruthy();
      expect(userNameElement.nativeElement.classList).toContain('text-white');
    });

    it('should render user actions component', () => {
      const userActionsElement = fixture.debugElement.query(
        By.css('[data-testid="avatar-popover"]')
      );

      expect(userActionsElement).toBeTruthy();
      expect(userActionsElement.nativeElement.tagName.toLowerCase()).toBe('bb-user-actions');
    });
  });
});
