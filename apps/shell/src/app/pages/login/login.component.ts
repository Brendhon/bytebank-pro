import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">Login - Bytebank Pro</h1>
        <form (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
              Email
            </label>
            <input
              [(ngModel)]="email"
              name="email"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              required
            >
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
              Senha
            </label>
            <input
              [(ngModel)]="password"
              name="password"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              required
            >
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            [disabled]="isLoading"
          >
            {{ isLoading ? 'Carregando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  returnUrl = '/dashboard';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Verificar se há um returnUrl na query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    // Redirecionar se já estiver autenticado
    if (this.authService.isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(error => {
        this.errorMessage = error.message || 'Erro ao fazer login, verifique suas credenciais';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
