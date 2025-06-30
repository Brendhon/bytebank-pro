import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy object for Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent], // Import standalone component
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with closed modals', () => {
    expect(component.isRegisterOpen()).toBeFalsy();
    expect(component.isLoginOpen()).toBeFalsy();
  });

  it('should handle login form submission', () => {
    const loginData = { email: 'test@test.com', password: 'password123' };

    spyOn(console, 'log');
    component.onLoginSubmit(loginData);

    expect(console.log).toHaveBeenCalledWith('Logging in user:', loginData);
  });

  it('should handle register form submission', () => {
    const registerData = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
      acceptPrivacy: true
    };

    spyOn(console, 'log');
    component.onRegisterSubmit(registerData);

    expect(console.log).toHaveBeenCalledWith('Registering user:', registerData);
  });
});
