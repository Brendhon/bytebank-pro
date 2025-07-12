import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { IUser } from '@bytebank-pro/types';
import {
  GET_USER_QUERY,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  VALIDATE_PASSWORD_MUTATION
} from '../graphql/settings.queries';

describe('SettingsService', () => {
  let service: SettingsService;
  let apolloSpy: jasmine.SpyObj<Apollo>;

  const mockUser: IUser = {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    acceptPrivacy: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    const apolloSpyObj = jasmine.createSpyObj('Apollo', ['query', 'mutate', 'create']);

    TestBed.configureTestingModule({
      providers: [SettingsService, { provide: Apollo, useValue: apolloSpyObj }]
    });

    service = TestBed.inject(SettingsService);
    apolloSpy = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial loading state as false', () => {
    expect(service.loading).toBeFalse();
  });

  it('should have initial user state as null', () => {
    expect(service.user).toBeNull();
  });

  describe('loadUserData', () => {
    it('should load user data successfully', (done) => {
      const mockResponse = {
        data: {
          me: mockUser
        },
        loading: false,
        networkStatus: 7
      };

      apolloSpy.query.and.returnValue(of(mockResponse));

      service.loadUserData().subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          expect(service.user).toEqual(mockUser);
          done();
        },
        error: done.fail
      });
    });

    it('should use the correct GraphQL query', () => {
      apolloSpy.query.and.returnValue(
        of({
          data: { me: mockUser },
          loading: false,
          networkStatus: 7
        })
      );

      service.loadUserData().subscribe();

      expect(apolloSpy.query).toHaveBeenCalledWith({
        query: GET_USER_QUERY,
        fetchPolicy: 'network-only'
      });
    });

    it('should handle error when loading user data fails', (done) => {
      apolloSpy.query.and.returnValue(
        of({
          data: null,
          loading: false,
          networkStatus: 7
        })
      );

      service.loadUserData().subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('Failed to load user data');
          done();
        }
      });
    });
  });

  describe('updateUser', () => {
    it('should update user data successfully', (done) => {
      const updates = { name: 'Updated Name' };
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const mockResponse = {
        data: {
          updateUser: updatedUser
        }
      };

      apolloSpy.mutate.and.returnValue(of(mockResponse));

      service.updateUser(updates).subscribe({
        next: (user) => {
          expect(user).toEqual(updatedUser);
          expect(service.user).toEqual(updatedUser);
          done();
        },
        error: done.fail
      });
    });

    it('should use the correct GraphQL mutation', () => {
      const updates = { name: 'Updated Name' };
      apolloSpy.mutate.and.returnValue(
        of({
          data: { updateUser: mockUser }
        })
      );

      service.updateUser(updates).subscribe();

      expect(apolloSpy.mutate).toHaveBeenCalledWith({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          input: updates
        }
      });
    });
  });

  describe('validatePassword', () => {
    it('should validate password successfully', (done) => {
      const password = 'testpassword';
      const mockResponse = {
        data: {
          validatePassword: true
        }
      };

      apolloSpy.mutate.and.returnValue(of(mockResponse));

      service.validatePassword(password).subscribe({
        next: (isValid) => {
          expect(isValid).toBeTrue();
          done();
        },
        error: done.fail
      });
    });

    it('should use the correct GraphQL mutation', () => {
      const password = 'testpassword';
      apolloSpy.mutate.and.returnValue(
        of({
          data: { validatePassword: true }
        })
      );

      service.validatePassword(password).subscribe();

      expect(apolloSpy.mutate).toHaveBeenCalledWith({
        mutation: VALIDATE_PASSWORD_MUTATION,
        variables: { password }
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', (done) => {
      const mockResponse = {
        data: {
          deleteUser: true
        }
      };

      apolloSpy.mutate.and.returnValue(of(mockResponse));

      service.deleteUser().subscribe({
        next: (success) => {
          expect(success).toBeTrue();
          expect(service.user).toBeNull();
          done();
        },
        error: done.fail
      });
    });

    it('should use the correct GraphQL mutation', () => {
      apolloSpy.mutate.and.returnValue(
        of({
          data: { deleteUser: true }
        })
      );

      service.deleteUser().subscribe();

      expect(apolloSpy.mutate).toHaveBeenCalledWith({
        mutation: DELETE_USER_MUTATION
      });
    });
  });
});
