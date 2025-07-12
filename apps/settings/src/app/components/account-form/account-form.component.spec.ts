import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountFormComponent } from './account-form.component';
import { IUser } from '@bytebank-pro/types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock jest for testing
declare const jest: any;

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  const mockUser: IUser = {
    _id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'password123',
    acceptPrivacy: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFormComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should have optional user input', () => {
      expect(component.user).toBeDefined();
    });
  });

  describe('Output Events', () => {
    it('should have accountUpdate output', () => {
      expect(component.accountUpdate).toBeDefined();
    });

    it('should have accountDelete output', () => {
      expect(component.accountDelete).toBeDefined();
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      // Set required input through component initialization
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should validate name field', () => {
      // Test empty name
      component.onNameChange('');
      expect(component.formErrors().name).toBe('Nome é obrigatório');

      // Test short name
      component.onNameChange('a');
      expect(component.formErrors().name).toBe('Nome deve ter pelo menos 2 caracteres');

      // Test valid name
      component.onNameChange('João Silva');
      expect(component.formErrors().name).toBe('');
    });

    it('should validate email field', () => {
      // Test empty email
      component.onEmailChange('');
      expect(component.formErrors().email).toBe('Email é obrigatório');

      // Test invalid email
      component.onEmailChange('invalid-email');
      expect(component.formErrors().email).toBe('Email inválido');

      // Test valid email
      component.onEmailChange('joao@example.com');
      expect(component.formErrors().email).toBe('');
    });

    it('should validate password fields', () => {
      // Test short password
      component.onNewPasswordChange('123');
      expect(component.formErrors().newPassword).toBe(
        'Nova senha deve ter pelo menos 6 caracteres'
      );

      // Test valid password
      component.onNewPasswordChange('password123');
      expect(component.formErrors().newPassword).toBe('');
    });

    it('should validate password confirmation', () => {
      component.onNewPasswordChange('password123');
      component.onConfirmPasswordChange('different');
      expect(component.formErrors().confirmPassword).toBe('Senhas não coincidem');

      component.onConfirmPasswordChange('password123');
      expect(component.formErrors().confirmPassword).toBe('');
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should emit accountUpdate when form is valid', () => {
      const spy = jest.spyOn(component.accountUpdate, 'emit');

      // Set valid form data
      component.onNameChange('João Silva');
      component.onEmailChange('joao@example.com');
      component.onNewPasswordChange('newpassword123');
      component.onConfirmPasswordChange('newpassword123');

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'newpassword123'
      });
    });

    it('should not emit when form is invalid', () => {
      const spy = jest.spyOn(component.accountUpdate, 'emit');

      component.onSubmit();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Delete Account', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should open delete modal', () => {
      component.openDeleteModal();
      expect(component.isDeleteModalOpen()).toBe(true);
    });

    it('should close delete modal', () => {
      component.openDeleteModal();
      component.closeDeleteModal();
      expect(component.isDeleteModalOpen()).toBe(false);
      expect(component.deletePassword()).toBe('');
    });

    it('should emit accountDelete with password', () => {
      const spy = jest.spyOn(component.accountDelete, 'emit');

      component.openDeleteModal();
      component.onDeletePasswordChange('password123');
      component.onDeleteAccount();

      expect(spy).toHaveBeenCalledWith('password123');
    });

    it('should not emit when password is too short', () => {
      const spy = jest.spyOn(component.accountDelete, 'emit');

      component.openDeleteModal();
      component.onDeletePasswordChange('123');
      component.onDeleteAccount();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Computed Properties', () => {
    it('should compute form validity correctly', () => {
      expect(component.isFormValid()).toBe(false);

      component.onNameChange('João Silva');
      component.onEmailChange('joao@example.com');

      expect(component.isFormValid()).toBe(true);
    });

    it('should compute password form validity correctly', () => {
      expect(component.isPasswordFormValid()).toBe(false);

      component.onNewPasswordChange('password123');
      component.onConfirmPasswordChange('password123');

      expect(component.isPasswordFormValid()).toBe(true);
    });

    it('should compute input variants correctly', () => {
      expect(component.nameVariant()).toBe('default');

      component.onNameChange('');
      expect(component.nameVariant()).toBe('error');
    });
  });

  describe('Form Reset', () => {
    it('should reset form when user input changes', () => {
      fixture.componentRef.setInput('user', mockUser);
      fixture.detectChanges();

      expect(component.formData().name).toBe('João Silva');
      expect(component.formData().email).toBe('joao@example.com');
    });

    it('should reset form to empty state when no user', () => {
      fixture.componentRef.setInput('user', null);
      fixture.detectChanges();

      expect(component.formData().name).toBe('');
      expect(component.formData().email).toBe('');
    });
  });

  describe('Loading States', () => {
    it('should set loading state during submission', () => {
      component.onNameChange('João Silva');
      component.onEmailChange('joao@example.com');
      component.onSubmit();

      expect(component.isLoading()).toBe(true);
    });

    it('should set loading state during deletion', () => {
      component.openDeleteModal();
      component.onDeletePasswordChange('password123');
      component.onDeleteAccount();

      expect(component.isLoading()).toBe(true);
    });
  });
});
