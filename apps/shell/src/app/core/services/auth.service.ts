import { Injectable, signal } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'bytebank_auth_token';
  private readonly USER_KEY = 'bytebank_user';

  private userSignal = signal<User | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  get user() {
    return this.userSignal();
  }

  get isLoggedIn() {
    return !!this.userSignal();
  }

  get token() {
    return this.userSignal()?.token || '';
  }

  login(email: string, password: string): Promise<User> {
    // Simular autenticação - Substitua por chamada real à API
    return new Promise((resolve, reject) => {
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'Usuário Demo',
          email,
          token: 'mock-jwt-token'
        };

        this.setUser(mockUser);
        resolve(mockUser);
      } else {
        reject(new Error('Email e senha são obrigatórios'));
      }
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.userSignal.set(null);
  }

  private setUser(user: User) {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSignal.set(user);
  }

  private loadUserFromStorage() {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        this.userSignal.set(user);
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage', error);
        this.logout();
      }
    }
  }
}
