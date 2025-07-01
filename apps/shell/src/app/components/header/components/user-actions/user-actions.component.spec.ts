import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserActionsComponent } from './user-actions.component';

describe('UserActionsComponent', () => {
  let component: UserActionsComponent;
  let fixture: ComponentFixture<UserActionsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="user-actions-popover"]')
    )?.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.githubUrl).toBeTruthy();

      expect(component.figmaUrl).toBeTruthy();

      expect(component.icons).toBeDefined();

      expect(component.icons.user).toBeDefined();

      expect(component.icons.github).toBeDefined();

      expect(component.icons.figma).toBeDefined();
    });
  });

  describe('Events', () => {
    it('should emit onNavigate when handleNavigate is called', () => {
      const testUrl = 'https://example.com';
      spyOn(component.onNavigate, 'emit');

      component.handleNavigate(testUrl);

      expect(component.onNavigate.emit).toHaveBeenCalledWith(testUrl);
    });

    it('should emit onLogout when handleLogout is called', () => {
      spyOn(component.onLogout, 'emit');

      component.handleLogout();

      expect(component.onLogout.emit).toHaveBeenCalled();
    });
  });

  describe('DOM Structure', () => {
    it('should render user icon button with proper attributes', () => {
      const userButton = fixture.debugElement.query(By.css('[data-testid="user-icon-button"]'));

      expect(userButton).toBeTruthy();

      expect(userButton.nativeElement.getAttribute('aria-label')).toBe('User menu');

      expect(userButton.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should render popover container', () => {
      const popover = fixture.debugElement.query(By.css('[data-testid="user-actions-popover"]'));

      expect(popover).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes on user button', () => {
      const userButton = fixture.debugElement.query(By.css('[data-testid="user-icon-button"]'));

      expect(userButton.nativeElement.getAttribute('aria-label')).toBe('User menu');
    });

    it('should have proper button type on user button', () => {
      const userButton = fixture.debugElement.query(By.css('[data-testid="user-icon-button"]'));

      expect(userButton.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should have lucide icon with aria-hidden attribute', () => {
      const lucideIcon = fixture.debugElement.query(By.css('i-lucide'));

      expect(lucideIcon.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Component Methods', () => {
    it('should call handleNavigate with github URL when called', () => {
      const spy = spyOn(component.onNavigate, 'emit');

      component.handleNavigate(component.githubUrl);

      expect(spy).toHaveBeenCalledWith(component.githubUrl);
    });

    it('should call handleNavigate with figma URL when called', () => {
      const spy = spyOn(component.onNavigate, 'emit');

      component.handleNavigate(component.figmaUrl);

      expect(spy).toHaveBeenCalledWith(component.figmaUrl);
    });

    it('should call handleLogout when called', () => {
      const spy = spyOn(component.onLogout, 'emit');

      component.handleLogout();

      expect(spy).toHaveBeenCalled();
    });
  });
});
