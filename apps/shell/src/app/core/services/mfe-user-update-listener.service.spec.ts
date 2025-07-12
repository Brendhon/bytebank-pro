import { TestBed } from '@angular/core/testing';
import { IUser, StoredUser } from '@bytebank-pro/types';
import { AuthService } from './auth.service';
import { MfeUserUpdateListenerService } from './mfe-user-update-listener.service';

describe('MfeUserUpdateListenerService', () => {
  let service: MfeUserUpdateListenerService;
  let authService: jasmine.SpyObj<AuthService>;
  let addEventListenerSpy: jasmine.Spy;
  let removeEventListenerSpy: jasmine.Spy;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['updateStoredUser', 'logout', 'user'],
      {
        user: {
          _id: '123',
          name: 'Current User',
          email: 'current@example.com',
          token: 'current-token'
        }
      }
    );

    TestBed.configureTestingModule({
      providers: [MfeUserUpdateListenerService, { provide: AuthService, useValue: authServiceSpy }]
    });

    service = TestBed.inject(MfeUserUpdateListenerService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Spy on window event listeners
    addEventListenerSpy = spyOn(window, 'addEventListener');
    removeEventListenerSpy = spyOn(window, 'removeEventListener');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeEventListener', () => {
    it('should add event listener for bytebank:user-update events', () => {
      service.initializeEventListener();

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'bytebank:user-update',
        jasmine.any(Function)
      );
    });
  });

  describe('event handling', () => {
    let eventListener: (event: CustomEvent) => void;

    beforeEach(() => {
      service.initializeEventListener();
      eventListener = addEventListenerSpy.calls.mostRecent().args[1];
    });

    it('should handle userUpdated event correctly', () => {
      const mockUser: IUser = {
        _id: '123',
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'password',
        acceptPrivacy: true
      };

      const mockEvent = new CustomEvent('bytebank:user-update', {
        detail: {
          type: 'userUpdated',
          user: mockUser
        }
      });

      eventListener(mockEvent);

      expect(authService.updateStoredUser).toHaveBeenCalledWith({
        _id: '123',
        name: 'Updated User',
        email: 'updated@example.com',
        token: 'current-token' // Should preserve the current token
      });
    });

    it('should handle userDeleted event correctly', () => {
      const mockEvent = new CustomEvent('bytebank:user-update', {
        detail: {
          type: 'userDeleted',
          user: null
        }
      });

      eventListener(mockEvent);

      expect(authService.logout).toHaveBeenCalled();
    });

    it('should warn for unknown event types', () => {
      const consoleSpy = spyOn(console, 'warn');

      const mockEvent = new CustomEvent('bytebank:user-update', {
        detail: {
          type: 'unknownType',
          user: null
        }
      });

      eventListener(mockEvent);

      expect(consoleSpy).toHaveBeenCalledWith('Unknown user update type: unknownType');
    });

    it('should not update user if current user is null', () => {
      // Mock AuthService to return null user
      (authService.user as any) = null;

      const mockUser: IUser = {
        _id: '123',
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'password',
        acceptPrivacy: true
      };

      const mockEvent = new CustomEvent('bytebank:user-update', {
        detail: {
          type: 'userUpdated',
          user: mockUser
        }
      });

      eventListener(mockEvent);

      expect(authService.updateStoredUser).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should remove event listener on destroy', () => {
      service.initializeEventListener();
      service.ngOnDestroy();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'bytebank:user-update',
        jasmine.any(Function)
      );
    });

    it('should not remove event listener if not initialized', () => {
      service.ngOnDestroy();

      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });
});
