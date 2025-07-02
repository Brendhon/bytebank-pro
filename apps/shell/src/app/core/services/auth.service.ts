import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LOGIN_MUTATION, ME_QUERY, REGISTER_MUTATION } from '../graphql/auth.queries';
import { AuthPayload, LoginInput, RegisterInput } from '../models/auth.model';
import { StoredUser } from '../models/user.model';
import { IUser } from '@bytebank-pro/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'bytebank_auth_token';
  private readonly USER_KEY = 'bytebank_user';

  private apollo = inject(Apollo);

  // User state management with BehaviorSubject following project guidelines
  private _currentUser = new BehaviorSubject<StoredUser | null>(null);
  readonly currentUser$ = this._currentUser.asObservable(); // Public Observable

  constructor() {
    this.loadUserFromStorage();
  }

  /**
   * Gets the current user value
   */
  get user(): StoredUser | null {
    return this._currentUser.getValue();
  }

  /**
   * Checks if a user is logged in
   */
  get isLoggedIn(): boolean {
    return !!this._currentUser.getValue();
  }

  /**
   * Gets the current authentication token
   */
  get token(): string {
    return this._currentUser.getValue()?.token || '';
  }

  /**
   * Realiza login do usuário usando a API GraphQL
   * @returns Observable que emite o StoredUser em caso de sucesso
   */
  login(email: string, password: string): Observable<StoredUser> {
    if (!email || !password) {
      return throwError(() => new Error('Email e senha são obrigatórios'));
    }

    // Create login input
    const loginInput: LoginInput = { email, password };

    return this.apollo
      .mutate<{ login: AuthPayload }>({
        mutation: LOGIN_MUTATION,
        variables: {
          input: loginInput
        }
      })
      .pipe(
        map((result) => {
          const authPayload = result.data?.login;

          if (!authPayload) {
            throw new Error('Falha na autenticação');
          }

          const storedUser: StoredUser = {
            _id: authPayload.user._id,
            name: authPayload.user.name,
            email: authPayload.user.email,
            token: authPayload.token
          };

          this.setUser(storedUser);
          return storedUser;
        }),
        catchError((error) => {
          console.error('Erro ao fazer login:', error);
          return throwError(() => new Error(error.message || 'Erro na autenticação'));
        })
      );
  }

  /**
   * Registra um novo usuário usando a API GraphQL
   * @returns Observable que emite o StoredUser em caso de sucesso
   */
  register(name: string, email: string, password: string): Observable<StoredUser> {
    if (!name || !email || !password) {
      return throwError(() => new Error('Nome, email e senha são obrigatórios'));
    }

    // Create register input
    const registerInput: RegisterInput = {
      name,
      email,
      password,
      acceptPrivacy: true
    };

    return this.apollo
      .mutate<{ register: AuthPayload }>({
        mutation: REGISTER_MUTATION,
        variables: {
          input: registerInput
        }
      })
      .pipe(
        map((result) => {
          const authPayload = result.data?.register;

          if (!authPayload) {
            throw new Error('Falha no registro');
          }

          const storedUser: StoredUser = {
            _id: authPayload.user._id,
            name: authPayload.user.name,
            email: authPayload.user.email,
            token: authPayload.token
          };

          this.setUser(storedUser);
          return storedUser;
        }),
        catchError((error) => {
          console.error('Erro ao registrar usuário:', error);
          return throwError(() => new Error(error.message || 'Erro no registro'));
        })
      );
  }

  /**
   * Busca informações do usuário atual na API
   * @returns Observable que emite o User em caso de sucesso ou null se não estiver autenticado
   */
  getCurrentUser(): Observable<IUser | null> {
    return this.apollo
      .query<{ me: IUser }>({
        query: ME_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map((result) => result.data?.me || null),
        catchError((error) => {
          console.error('Erro ao buscar usuário atual:', error);
          // Se houver erro de autenticação, faz logout
          if (error.message.includes('não autenticado') || error.message.includes('unauthorized')) {
            this.logout();
          }
          return throwError(() => error);
        })
      );
  }

  /**
   * Encerra a sessão do usuário
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.next(null);

    // Limpa o cache do Apollo
    this.apollo.client.resetStore();
  }

  /**
   * Armazena os dados do usuário no localStorage e atualiza o BehaviorSubject
   */
  private setUser(user: StoredUser): void {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._currentUser.next(user);
  }

  /**
   * Carrega o usuário do localStorage
   */
  private loadUserFromStorage(): void {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    const storedUser = localStorage.getItem(this.USER_KEY);

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser) as StoredUser;
        this._currentUser.next(user);
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage', error);
        this.logout();
      }
    }
  }
}
