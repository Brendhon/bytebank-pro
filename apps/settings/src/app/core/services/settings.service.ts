import { Injectable, inject } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IUser } from '@bytebank-pro/types';
import {
  GET_USER_QUERY,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  VALIDATE_PASSWORD_MUTATION
} from '../graphql/settings.queries';

// Input types for mutations
export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  acceptPrivacy?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apollo = inject(Apollo);

  // State management with BehaviorSubject following project guidelines
  private _user = new BehaviorSubject<IUser | null>(null);
  readonly user$ = this._user.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  /**
   * Gets the current user value
   */
  get user(): IUser | null {
    return this._user.getValue();
  }

  /**
   * Gets the current loading state
   */
  get loading(): boolean {
    return this._loading.getValue();
  }

  /**
   * Loads the current user data
   * @returns Observable that emits the current user data
   */
  loadUserData(): Observable<IUser> {
    this._loading.next(true);

    return this.apollo
      .query<{ me: IUser }>({
        query: GET_USER_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map((result: ApolloQueryResult<{ me: IUser }>) => {
          const user = result.data?.me;

          if (!user) {
            throw new Error('Failed to load user data');
          }

          this._user.next(user);
          this._loading.next(false);
          return user;
        }),
        catchError((error: Error) => {
          console.error('Error loading user data:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error loading user data'));
        })
      );
  }

  /**
   * Updates the current user data
   * @param updates User data to update
   * @returns Observable that emits the updated IUser
   */
  updateUser(updates: UserUpdateInput): Observable<IUser> {
    this._loading.next(true);

    return this.apollo
      .mutate<{ updateUser: IUser }>({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          input: updates
        }
      })
      .pipe(
        map((result: MutationResult<{ updateUser: IUser }>) => {
          const updatedUser = result.data?.updateUser;
          if (!updatedUser) {
            throw new Error('Failed to update user data');
          }

          // Update local state
          this._user.next(updatedUser);
          this._loading.next(false);

          return updatedUser;
        }),
        catchError((error: Error) => {
          console.error('Error updating user data:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error updating user data'));
        })
      );
  }

  /**
   * Validates the user's password
   * @param password Password to validate
   * @returns Observable that emits boolean indicating if password is valid
   */
  validatePassword(password: string): Observable<boolean> {
    this._loading.next(true);

    return this.apollo
      .mutate<{ validatePassword: boolean }>({
        mutation: VALIDATE_PASSWORD_MUTATION,
        variables: { password }
      })
      .pipe(
        map((result: MutationResult<{ validatePassword: boolean }>) => {
          const isValid = result.data?.validatePassword;
          this._loading.next(false);
          return isValid || false;
        }),
        catchError((error: Error) => {
          console.error('Error validating password:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error validating password'));
        })
      );
  }

  /**
   * Deletes the current user account
   * @returns Observable that emits boolean indicating success
   */
  deleteUser(): Observable<boolean> {
    this._loading.next(true);

    return this.apollo
      .mutate<{ deleteUser: boolean }>({
        mutation: DELETE_USER_MUTATION
      })
      .pipe(
        map((result: MutationResult<{ deleteUser: boolean }>) => {
          const success = result.data?.deleteUser;
          if (!success) {
            throw new Error('Failed to delete user account');
          }

          // Clear local state after successful deletion
          this._user.next(null);
          this._loading.next(false);

          return success;
        }),
        catchError((error: Error) => {
          console.error('Error deleting user account:', error);
          this._loading.next(false);
          return throwError(() => new Error(error.message || 'Error deleting user account'));
        })
      );
  }

  /**
   * Loads settings data (legacy method for backward compatibility)
   * @deprecated Use loadUserData() instead
   */
  loadSettingsData(): void {
    console.warn('loadSettingsData() is deprecated. Use loadUserData() instead.');
    this.loadUserData().subscribe();
  }
}
