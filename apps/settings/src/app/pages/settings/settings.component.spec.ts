import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SettingsPageComponent } from './settings.component';
import { SettingsService } from '../../core/services/settings.service';
import { MfeToastService } from '../../core/services/mfe-toast.service';
import { MfeUserUpdateService } from '../../core/services/mfe-user-update.service';
import { IUser } from '@bytebank-pro/types';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let settingsService: jasmine.SpyObj<SettingsService>;
  let toastService: jasmine.SpyObj<MfeToastService>;
  let userUpdateService: jasmine.SpyObj<MfeUserUpdateService>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: IUser = {
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'hashedPassword',
    acceptPrivacy: true
  };

  beforeEach(async () => {
    const settingsServiceSpy = jasmine.createSpyObj('SettingsService', [
      'loadUserData',
      'validatePassword',
      'updateUser',
      'deleteUser'
    ]);
    const toastServiceSpy = jasmine.createSpyObj('MfeToastService', ['showSuccess', 'showError']);
    const userUpdateServiceSpy = jasmine.createSpyObj('MfeUserUpdateService', [
      'notifyUserUpdated',
      'notifyUserDeleted'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SettingsPageComponent],
      providers: [
        { provide: SettingsService, useValue: settingsServiceSpy },
        { provide: MfeToastService, useValue: toastServiceSpy },
        { provide: MfeUserUpdateService, useValue: userUpdateServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
    toastService = TestBed.inject(MfeToastService) as jasmine.SpyObj<MfeToastService>;
    userUpdateService = TestBed.inject(
      MfeUserUpdateService
    ) as jasmine.SpyObj<MfeUserUpdateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.currentUser()).toBeNull();
      expect(component.loading()).toBe(false);
    });

    it('should load user data on init', () => {
      settingsService.loadUserData.and.returnValue(of(mockUser));

      component.ngOnInit();

      expect(settingsService.loadUserData).toHaveBeenCalled();
    });
  });

  describe('loadUserData', () => {
    it('should load user data successfully', () => {
      settingsService.loadUserData.and.returnValue(of(mockUser));

      component.ngOnInit();

      expect(component.currentUser()).toEqual(mockUser);
      expect(component.loading()).toBe(false);
    });

    it('should handle error when loading user data', () => {
      const error = new Error('Failed to load user data');
      settingsService.loadUserData.and.returnValue(throwError(() => error));

      component.ngOnInit();

      expect(component.loading()).toBe(false);
      expect(toastService.showError).toHaveBeenCalledWith(
        'Erro ao carregar dados do usuário. Tente novamente.'
      );
    });
  });

  describe('handleAccountUpdate', () => {
    it('should validate password before updating account', () => {
      const userData = { name: 'New Name' };
      const password = 'validPassword';

      settingsService.validatePassword.and.returnValue(of(true));
      settingsService.updateUser.and.returnValue(of(mockUser));

      component.handleAccountUpdate(userData, password);

      expect(settingsService.validatePassword).toHaveBeenCalledWith(password);
    });

    it('should show error when no password is provided', () => {
      const userData = { name: 'New Name' };

      component.handleAccountUpdate(userData, '');

      expect(toastService.showError).toHaveBeenCalledWith('Nenhuma senha informada.');
      expect(settingsService.validatePassword).not.toHaveBeenCalled();
    });
  });

  describe('handleAccountDelete', () => {
    it('should validate password before deleting account', () => {
      const password = 'validPassword';

      settingsService.validatePassword.and.returnValue(of(true));
      settingsService.deleteUser.and.returnValue(of(true));

      component.handleAccountDelete(password);

      expect(settingsService.validatePassword).toHaveBeenCalledWith(password);
    });

    it('should show error when no password is provided for deletion', () => {
      component.handleAccountDelete('');

      expect(toastService.showError).toHaveBeenCalledWith('Nenhuma senha informada.');
      expect(settingsService.validatePassword).not.toHaveBeenCalled();
    });
  });

  describe('validatePassword', () => {
    it('should call callback when password is valid', () => {
      const password = 'validPassword';
      const callback = jasmine.createSpy('callback');

      settingsService.validatePassword.and.returnValue(of(true));

      component['validatePassword'](password, callback);

      expect(callback).toHaveBeenCalled();
    });

    it('should show error when password is invalid', () => {
      const password = 'invalidPassword';
      const callback = jasmine.createSpy('callback');

      settingsService.validatePassword.and.returnValue(of(false));

      component['validatePassword'](password, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(toastService.showError).toHaveBeenCalledWith('Senha inválida. Tente novamente.');
    });

    it('should handle error during password validation', () => {
      const password = 'validPassword';
      const callback = jasmine.createSpy('callback');
      const error = new Error('Validation error');

      settingsService.validatePassword.and.returnValue(throwError(() => error));

      component['validatePassword'](password, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(toastService.showError).toHaveBeenCalledWith(
        'Erro ao validar senha. Tente novamente.'
      );
    });
  });

  describe('deleteAccount', () => {
    it('should delete account successfully', () => {
      settingsService.deleteUser.and.returnValue(of(true));

      component['deleteAccount']();

      expect(settingsService.deleteUser).toHaveBeenCalled();
      expect(component.currentUser()).toBeNull();
      expect(toastService.showSuccess).toHaveBeenCalledWith('Conta excluída com sucesso!');
      expect(userUpdateService.notifyUserDeleted).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should handle error during account deletion', () => {
      const error = new Error('Deletion error');
      settingsService.deleteUser.and.returnValue(throwError(() => error));

      component['deleteAccount']();

      expect(toastService.showError).toHaveBeenCalledWith(
        'Falha ao excluir conta. Tente novamente.'
      );
    });
  });

  describe('updateUserData', () => {
    it('should update user data successfully', () => {
      const userData = { name: 'New Name', email: 'new@example.com' };
      const updatedUser = { ...mockUser, ...userData };

      settingsService.updateUser.and.returnValue(of(updatedUser));

      component['updateUserData'](userData);

      expect(settingsService.updateUser).toHaveBeenCalledWith(userData);
      expect(component.currentUser()).toEqual(updatedUser);
      expect(toastService.showSuccess).toHaveBeenCalledWith(
        'Dados da conta atualizados com sucesso!'
      );
      expect(userUpdateService.notifyUserUpdated).toHaveBeenCalledWith(updatedUser);
    });

    it('should handle error during user data update', () => {
      const userData = { name: 'New Name' };
      const error = new Error('Update error');

      settingsService.updateUser.and.returnValue(throwError(() => error));

      component['updateUserData'](userData);

      expect(toastService.showError).toHaveBeenCalledWith(
        'Falha ao atualizar dados da conta. Tente novamente.'
      );
    });
  });
});
