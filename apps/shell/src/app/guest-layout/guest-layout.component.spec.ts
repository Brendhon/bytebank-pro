import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { GuestLayoutComponent } from './guest-layout.component';
import { AuthService } from '@/core/services/auth.service';
import { ToastService } from '@/core/services/toast.service';
import { HeaderComponent } from '@/components/header/header.component';
import { FooterComponent } from '@/components/footer/footer.component';
import { LoginFormComponent } from '@/components/login-form/login-form.component';
import { RegisterFormComponent } from '@/components/register-form/register-form.component';
import { StoredUser } from '@/core/models/user.model';
import { LoginFormData, RegisterFormData } from '@/core/types/form';

describe('GuestLayoutComponent', () => {
  let component: GuestLayoutComponent;
  let fixture: ComponentFixture<GuestLayoutComponent>;
  let element: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for dependencies
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        GuestLayoutComponent,
        HeaderComponent,
        FooterComponent,
        LoginFormComponent,
        RegisterFormComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="guest-layout-container"]')
    )?.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial modal states closed', () => {
    expect(component.isLoginOpen()).toBe(false);

    expect(component.isRegisterOpen()).toBe(false);
  });

  it('should open login modal when openLoginModal is called', () => {
    component.openLoginModal();
    fixture.detectChanges();

    expect(component.isLoginOpen()).toBe(true);
  });

  it('should close login modal when closeLoginModal is called', () => {
    component.openLoginModal();
    component.closeLoginModal();
    fixture.detectChanges();

    expect(component.isLoginOpen()).toBe(false);
  });

  it('should open register modal when openRegisterModal is called', () => {
    component.openRegisterModal();
    fixture.detectChanges();

    expect(component.isRegisterOpen()).toBe(true);
  });

  it('should close register modal when closeRegisterModal is called', () => {
    component.openRegisterModal();
    component.closeRegisterModal();
    fixture.detectChanges();

    expect(component.isRegisterOpen()).toBe(false);
  });

  it('should handle successful login submission', () => {
    const mockUser: StoredUser = {
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      token: 'test-token'
    };
    const loginData: LoginFormData = { email: 'test@example.com', password: 'password' };

    authServiceSpy.login.and.returnValue(of(mockUser));

    component.onLoginSubmit(loginData);

    expect(authServiceSpy.login).toHaveBeenCalledWith(loginData.email, loginData.password);

    expect(toastServiceSpy.showSuccess).toHaveBeenCalledWith('Login realizado com sucesso!');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);

    expect(component.isLoginOpen()).toBe(false);
  });

  it('should handle successful register submission', () => {
    const mockUser: StoredUser = {
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      token: 'test-token'
    };
    const registerData: RegisterFormData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      acceptPrivacy: true
    };

    authServiceSpy.register.and.returnValue(of(mockUser));

    component.onRegisterSubmit(registerData);

    expect(authServiceSpy.register).toHaveBeenCalledWith(
      registerData.name,
      registerData.email,
      registerData.password
    );

    expect(toastServiceSpy.showSuccess).toHaveBeenCalledWith('Usuário registrado com sucesso!');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);

    expect(component.isRegisterOpen()).toBe(false);
  });

  it('should handle login error', () => {
    const loginData: LoginFormData = { email: 'test@example.com', password: 'wrong' };
    const error = new Error('Invalid credentials');

    authServiceSpy.login.and.returnValue(throwError(() => error));

    component.onLoginSubmit(loginData);

    expect(authServiceSpy.login).toHaveBeenCalledWith(loginData.email, loginData.password);

    expect(toastServiceSpy.showError).toHaveBeenCalledWith('Credenciais inválidas.');
  });

  it('should handle register error', () => {
    const registerData: RegisterFormData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      acceptPrivacy: true
    };
    const error = new Error('Registration failed');

    authServiceSpy.register.and.returnValue(throwError(() => error));

    component.onRegisterSubmit(registerData);

    expect(authServiceSpy.register).toHaveBeenCalledWith(
      registerData.name,
      registerData.email,
      registerData.password
    );

    expect(toastServiceSpy.showError).toHaveBeenCalledWith('Erro ao registrar usuário.');
  });

  it('should not navigate when login returns null user', () => {
    const loginData: LoginFormData = { email: 'test@example.com', password: 'password' };

    authServiceSpy.login.and.returnValue(of(null as any));

    component.onLoginSubmit(loginData);

    expect(authServiceSpy.login).toHaveBeenCalledWith(loginData.email, loginData.password);

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate when register returns null user', () => {
    const registerData: RegisterFormData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      acceptPrivacy: true
    };

    authServiceSpy.register.and.returnValue(of(null as any));

    component.onRegisterSubmit(registerData);

    expect(authServiceSpy.register).toHaveBeenCalledWith(
      registerData.name,
      registerData.email,
      registerData.password
    );

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should render header component', () => {
    const headerElement = fixture.debugElement.query(By.css('[data-testid="guest-layout-header"]'));
    expect(headerElement).toBeTruthy();
  });

  it('should render footer component', () => {
    const footerElement = fixture.debugElement.query(By.css('[data-testid="guest-layout-footer"]'));
    expect(footerElement).toBeTruthy();
  });

  it('should render main content area', () => {
    const mainElement = fixture.debugElement.query(
      By.css('[data-testid="guest-layout-main-content"]')
    );
    expect(mainElement).toBeTruthy();
  });

  it('should render login form component', () => {
    const loginFormElement = fixture.debugElement.query(
      By.css('[data-testid="guest-layout-login-form"]')
    );
    expect(loginFormElement).toBeTruthy();
  });

  it('should render register form component', () => {
    const registerFormElement = fixture.debugElement.query(
      By.css('[data-testid="guest-layout-register-form"]')
    );
    expect(registerFormElement).toBeTruthy();
  });
});
