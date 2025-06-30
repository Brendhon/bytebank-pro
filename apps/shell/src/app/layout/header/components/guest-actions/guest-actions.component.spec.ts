import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GuestActionsComponent } from './guest-actions.component';

describe('GuestActionsComponent', () => {
  let component: GuestActionsComponent;
  let fixture: ComponentFixture<GuestActionsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="guest-actions-container"]')
    )?.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the guest actions container', () => {
      expect(element).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should emit onOpenAccount when open account button is clicked', () => {
      spyOn(component.onOpenAccount, 'emit');

      const openAccountButton = fixture.debugElement.query(
        By.css('[data-testid="open-account-button"] button')
      ).nativeElement;
      openAccountButton.click();
      fixture.detectChanges();

      expect(component.onOpenAccount.emit).toHaveBeenCalled();
    });

    it('should emit onLogin when login button is clicked', () => {
      spyOn(component.onLogin, 'emit');

      const loginButton = fixture.debugElement.query(
        By.css('[data-testid="login-button"] button')
      ).nativeElement;
      loginButton.click();
      fixture.detectChanges();

      expect(component.onLogin.emit).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper data-testid attributes for buttons', () => {
      const openAccountButton = fixture.debugElement.query(
        By.css('[data-testid="open-account-button"]')
      );
      const loginButton = fixture.debugElement.query(By.css('[data-testid="login-button"]'));

      expect(openAccountButton).toBeTruthy();

      expect(loginButton).toBeTruthy();
    });

    it('should have accessible button text content', () => {
      const openAccountButton = fixture.debugElement.query(
        By.css('[data-testid="open-account-button"]')
      ).nativeElement;
      const loginButton = fixture.debugElement.query(
        By.css('[data-testid="login-button"]')
      ).nativeElement;

      expect(openAccountButton.textContent?.trim()).toBe('Abrir conta');

      expect(loginButton.textContent?.trim()).toBe('Já tenho conta');
    });
  });
});
