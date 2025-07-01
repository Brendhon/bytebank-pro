import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent] // For standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('bb-dialog'))?.nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.formData().email).toBe('');

      expect(component.formData().password).toBe('');

      expect(component.isLoading()).toBe(false);

      expect(component.emailError()).toBe('');

      expect(component.passwordError()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should handle isOpen input correctly', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);

      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should validate email correctly', () => {
      // Test invalid email
      component.onEmailChange('invalid-email');

      expect(component.emailError()).toBeTruthy();

      expect(component.emailError()).toBe('Digite um email válido');

      // Test empty email
      component.onEmailChange('');

      expect(component.emailError()).toBe('Email é obrigatório');

      // Test valid email
      component.onEmailChange('test@example.com');

      expect(component.emailError()).toBe('');
    });

    it('should validate password correctly', () => {
      // Test empty password
      component.onPasswordChange('');

      expect(component.passwordError()).toBe('Senha é obrigatória');

      // Test short password
      component.onPasswordChange('123');

      expect(component.passwordError()).toBe('Senha deve ter pelo menos 6 caracteres');

      // Test valid password
      component.onPasswordChange('password123');

      expect(component.passwordError()).toBe('');
    });

    it('should update form validation computed properties', () => {
      // Initially invalid form
      expect(component.isFormValid()).toBe(false);

      expect(component.emailVariant()).toBe('default');

      expect(component.passwordVariant()).toBe('default');

      // Set invalid email
      component.onEmailChange('invalid-email');

      expect(component.emailVariant()).toBe('error');

      // Set invalid password
      component.onPasswordChange('123');

      expect(component.passwordVariant()).toBe('error');

      // Set valid data
      component.onEmailChange('test@example.com');
      component.onPasswordChange('password123');

      expect(component.isFormValid()).toBe(true);

      expect(component.emailVariant()).toBe('default');

      expect(component.passwordVariant()).toBe('default');
    });
  });

  describe('Events', () => {
    it('should emit loginSubmit when form is submitted with valid data', () => {
      spyOn(component.loginSubmit, 'emit');

      // Set valid form data
      component.onEmailChange('test@example.com');
      component.onPasswordChange('password123');

      component.onSubmit();

      expect(component.loginSubmit.emit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should not emit loginSubmit when form is invalid', () => {
      spyOn(component.loginSubmit, 'emit');

      // Set invalid form data
      component.onEmailChange('invalid-email');
      component.onPasswordChange('123');

      component.onSubmit();

      expect(component.loginSubmit.emit).not.toHaveBeenCalled();
    });

    it('should emit dialogClose when dialog is closed', () => {
      spyOn(component.dialogClose, 'emit');

      component.onDialogClose();

      expect(component.dialogClose.emit).toHaveBeenCalled();
    });
  });

  describe('Form State Management', () => {
    it('should update formData when email changes', () => {
      component.onEmailChange('new@email.com');

      expect(component.formData().email).toBe('new@email.com');
    });

    it('should update formData when password changes', () => {
      component.onPasswordChange('newpassword');

      expect(component.formData().password).toBe('newpassword');
    });

    it('should reset form when dialog is closed', () => {
      // Set some data
      component.onEmailChange('test@example.com');
      component.onPasswordChange('password123');

      component.onDialogClose();

      expect(component.formData().email).toBe('');

      expect(component.formData().password).toBe('');

      expect(component.emailError()).toBe('');

      expect(component.passwordError()).toBe('');

      expect(component.isLoading()).toBe(false);
    });
  });

  describe('Loading State', () => {
    it('should set loading state during form submission', () => {
      // Set valid form data
      component.onEmailChange('test@example.com');
      component.onPasswordChange('password123');

      expect(component.isLoading()).toBe(false);

      component.onSubmit();

      expect(component.isLoading()).toBe(true);
    });
  });
});
