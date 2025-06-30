import { AuthService } from '@/core/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@bytebank-pro/ui';

@Component({
  selector: 'bb-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  returnUrl = '/dashboard';

  constructor() {}

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

    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate([this.returnUrl]);
      })
      .catch((error) => {
        this.errorMessage = error.message || 'Erro ao fazer login, verifique suas credenciais';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
