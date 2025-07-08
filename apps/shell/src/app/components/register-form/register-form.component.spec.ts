import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RegisterFormComponent } from './register-form.component';
import { RegisterFormData } from '@/core/types/form';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('[data-testid="register-dialog"]'))?.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial form state', () => {
    expect(component.formData().name).toBe('');

    expect(component.formData().email).toBe('');

    expect(component.formData().password).toBe('');

    expect(component.formData().acceptPrivacy).toBe(false);

    expect(component.formData().passwordConfirmation).toBe('');
  });

  it('should have initial error state', () => {
    expect(component.formErrors().name).toBe('');

    expect(component.formErrors().email).toBe('');

    expect(component.formErrors().password).toBe('');

    expect(component.formErrors().acceptPrivacy).toBe('');

    expect(component.formErrors().passwordConfirmation).toBe('');
  });

  it('should have initial loading state', () => {
    expect(component.isLoading()).toBe(false);
  });

  it('should validate form as invalid initially', () => {
    expect(component.isFormValid()).toBe(false);
  });

  it('should update name and validate', () => {
    component.onNameChange('João Silva');

    expect(component.formData().name).toBe('João Silva');

    expect(component.formErrors().name).toBe('');
  });

  it('should validate name as required', () => {
    component.onNameChange('');

    expect(component.formErrors().name).toBe('Nome é obrigatório');
  });

  it('should validate name minimum length', () => {
    component.onNameChange('João');

    expect(component.formErrors().name).toBe('Nome deve ter pelo menos 6 caracteres');
  });

  it('should validate name maximum length', () => {
    component.onNameChange('João Silva Santos Oliveira Costa Pereira Rodrigues da Silva');

    expect(component.formErrors().name).toBe('Nome deve ter no máximo 50 caracteres');
  });

  it('should validate name format', () => {
    component.onNameChange('João123');

    expect(component.formErrors().name).toBe('Nome deve conter apenas letras e espaços');
  });

  it('should update email and validate', () => {
    component.onEmailChange('joao@example.com');

    expect(component.formData().email).toBe('joao@example.com');

    expect(component.formErrors().email).toBe('');
  });

  it('should validate email as required', () => {
    component.onEmailChange('');

    expect(component.formErrors().email).toBe('Email é obrigatório');
  });

  it('should validate email format', () => {
    component.onEmailChange('invalid-email');

    expect(component.formErrors().email).toBe('Digite um email válido');
  });

  it('should update password and validate', () => {
    component.onPasswordChange('password123');

    expect(component.formData().password).toBe('password123');

    expect(component.formErrors().password).toBe('');
  });

  it('should validate password as required', () => {
    component.onPasswordChange('');

    expect(component.formErrors().password).toBe('Senha é obrigatória');
  });

  it('should validate password minimum length', () => {
    component.onPasswordChange('12345');

    expect(component.formErrors().password).toBe('Senha deve ter pelo menos 6 caracteres');
  });

  it('should update password confirmation and validate', () => {
    component.onPasswordChange('password123');
    component.onPasswordConfirmationChange('password123');

    expect(component.formData().passwordConfirmation).toBe('password123');

    expect(component.formErrors().passwordConfirmation).toBe('');
  });

  it('should validate password confirmation as required', () => {
    component.onPasswordConfirmationChange('');

    expect(component.formErrors().passwordConfirmation).toBe('Confirmação de senha é obrigatória');
  });

  it('should validate password confirmation match', () => {
    component.onPasswordChange('password123');
    component.onPasswordConfirmationChange('different');

    expect(component.formErrors().passwordConfirmation).toBe('As senhas não coincidem');
  });

  it('should update privacy acceptance and validate', () => {
    component.onPrivacyChange(true);

    expect(component.formData().acceptPrivacy).toBe(true);

    expect(component.formErrors().acceptPrivacy).toBe('');
  });

  it('should validate privacy acceptance as required', () => {
    component.onPrivacyChange(false);

    expect(component.formErrors().acceptPrivacy).toBe(
      'Você deve aceitar a Política de Privacidade para continuar'
    );
  });

  it('should validate complete form successfully', () => {
    component.onNameChange('João Silva');
    component.onEmailChange('joao@example.com');
    component.onPasswordChange('password123');
    component.onPasswordConfirmationChange('password123');
    component.onPrivacyChange(true);

    expect(component.isFormValid()).toBe(true);
  });

  it('should emit registerSubmit with correct data', () => {
    spyOn(component.registerSubmit, 'emit');

    component.onNameChange('João Silva');
    component.onEmailChange('joao@example.com');
    component.onPasswordChange('password123');
    component.onPasswordConfirmationChange('password123');
    component.onPrivacyChange(true);

    component.onSubmit();

    const expectedData: RegisterFormData = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: 'password123',
      acceptPrivacy: true
    };

    expect(component.registerSubmit.emit).toHaveBeenCalledWith(expectedData);
  });

  it('should not emit registerSubmit when form is invalid', () => {
    spyOn(component.registerSubmit, 'emit');

    component.onSubmit();

    expect(component.registerSubmit.emit).not.toHaveBeenCalled();
  });

  it('should set loading state during submission', () => {
    component.onNameChange('João Silva');
    component.onEmailChange('joao@example.com');
    component.onPasswordChange('password123');
    component.onPasswordConfirmationChange('password123');
    component.onPrivacyChange(true);

    component.onSubmit();

    expect(component.isLoading()).toBe(true);
  });

  it('should emit dialogClose and reset form', () => {
    spyOn(component.dialogClose, 'emit');

    component.onNameChange('João Silva');
    component.onEmailChange('joao@example.com');

    component.onDialogClose();

    expect(component.dialogClose.emit).toHaveBeenCalled();

    expect(component.formData().name).toBe('');

    expect(component.formData().email).toBe('');

    expect(component.isLoading()).toBe(false);
  });

  it('should compute correct variants based on errors', () => {
    expect(component.nameVariant()).toBe('default');

    expect(component.emailVariant()).toBe('default');

    expect(component.passwordVariant()).toBe('default');

    expect(component.passwordConfirmationVariant()).toBe('default');

    expect(component.privacyVariant()).toBe('success');

    // Test error variants
    component.onNameChange('');

    expect(component.nameVariant()).toBe('error');

    component.onEmailChange('invalid');

    expect(component.emailVariant()).toBe('error');

    component.onPasswordChange('');

    expect(component.passwordVariant()).toBe('error');

    component.onPasswordConfirmationChange('');

    expect(component.passwordConfirmationVariant()).toBe('error');

    component.onPrivacyChange(false);

    expect(component.privacyVariant()).toBe('error');
  });

  it('should re-validate password confirmation when password changes', () => {
    component.onPasswordChange('password123');
    component.onPasswordConfirmationChange('password123');

    expect(component.formErrors().passwordConfirmation).toBe('');

    component.onPasswordChange('newpassword');

    expect(component.formErrors().passwordConfirmation).toBe('As senhas não coincidem');
  });
});
