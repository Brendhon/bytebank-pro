import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticatedUserHeaderComponent } from './authenticated-user-header.component';
import { UserActionsComponent } from '../user-actions/user-actions.component';

describe('AuthenticatedUserHeaderComponent', () => {
  let component: AuthenticatedUserHeaderComponent;
  let fixture: ComponentFixture<AuthenticatedUserHeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedUserHeaderComponent, UserActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedUserHeaderComponent);
    component = fixture.componentInstance;

    // Set required input before detecting changes
    fixture.componentRef.setInput('userName', 'Test User');
    fixture.detectChanges();

    element = fixture.debugElement.query(
      By.css('[data-testid="authenticated-user-header-container"]')
    )?.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user name when provided', () => {
    const testUserName = 'John Doe';
    fixture.componentRef.setInput('userName', testUserName);
    fixture.detectChanges();

    const userNameElement = fixture.debugElement.query(By.css('[data-testid="user-name-display"]'));

    expect(userNameElement.nativeElement.textContent).toContain(testUserName);
  });

  it('should emit onNavigate event when UserActionsComponent emits', () => {
    const testUrl = 'https://example.com';
    spyOn(component.onNavigate, 'emit');

    const userActionsComponent = fixture.debugElement.query(
      By.directive(UserActionsComponent)
    ).componentInstance;
    userActionsComponent.onNavigate.emit(testUrl);

    expect(component.onNavigate.emit).toHaveBeenCalledWith(testUrl);
  });

  it('should emit onLogout event when UserActionsComponent emits', () => {
    spyOn(component.onLogout, 'emit');

    const userActionsComponent = fixture.debugElement.query(
      By.directive(UserActionsComponent)
    ).componentInstance;
    userActionsComponent.onLogout.emit();

    expect(component.onLogout.emit).toHaveBeenCalled();
  });

  it('should render UserActionsComponent', () => {
    const userActionsElement = fixture.debugElement.query(By.css('[data-testid="avatar-popover"]'));

    expect(userActionsElement).toBeTruthy();
  });

  it('should have the correct container structure', () => {
    expect(element).toBeTruthy();

    expect(element.classList.contains('flex')).toBeTruthy();

    expect(element.classList.contains('items-center')).toBeTruthy();

    expect(element.classList.contains('gap-6')).toBeTruthy();
  });
});
