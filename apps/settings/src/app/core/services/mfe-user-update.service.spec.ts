import { TestBed } from '@angular/core/testing';
import { IUser } from '@bytebank-pro/types';
import { MfeUserUpdateService } from './mfe-user-update.service';

describe('MfeUserUpdateService', () => {
  let service: MfeUserUpdateService;
  let dispatchEventSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MfeUserUpdateService]
    });
    service = TestBed.inject(MfeUserUpdateService);

    // Spy on window.dispatchEvent
    dispatchEventSpy = spyOn(window, 'dispatchEvent');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('notifyUserUpdated', () => {
    it('should dispatch userUpdated event with user data', () => {
      const mockUser: IUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        acceptPrivacy: true
      };

      service.notifyUserUpdated(mockUser);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:user-update',
          detail: {
            type: 'userUpdated',
            user: mockUser
          }
        })
      );
    });
  });

  describe('notifyUserDeleted', () => {
    it('should dispatch userDeleted event with null user', () => {
      service.notifyUserDeleted();

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'bytebank:user-update',
          detail: {
            type: 'userDeleted',
            user: null
          }
        })
      );
    });
  });

  describe('event structure', () => {
    it('should create CustomEvent with correct structure for user update', () => {
      const mockUser: IUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        acceptPrivacy: true
      };

      service.notifyUserUpdated(mockUser);

      const callArgs = dispatchEventSpy.calls.mostRecent().args[0];

      expect(callArgs).toBeInstanceOf(CustomEvent);
      expect(callArgs.type).toBe('bytebank:user-update');
      expect(callArgs.detail).toEqual({
        type: 'userUpdated',
        user: mockUser
      });
    });

    it('should create CustomEvent with correct structure for user deletion', () => {
      service.notifyUserDeleted();

      const callArgs = dispatchEventSpy.calls.mostRecent().args[0];

      expect(callArgs).toBeInstanceOf(CustomEvent);
      expect(callArgs.type).toBe('bytebank:user-update');
      expect(callArgs.detail).toEqual({
        type: 'userDeleted',
        user: null
      });
    });
  });
});
