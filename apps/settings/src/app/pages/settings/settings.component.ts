import { Component, OnInit, signal, inject } from '@angular/core';
import { AccountFormComponent } from '@/components/account-form/account-form.component';
import { IUser } from '@bytebank-pro/types';
import { SettingsService, UserUpdateInput } from '../../core/services/settings.service';
import { MfeToastService } from '../../core/services/mfe-toast.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'bb-settings-page',
  standalone: true,
  imports: [AccountFormComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsPageComponent implements OnInit {
  // Inject dependencies
  private readonly settingsService = inject(SettingsService);
  private readonly toastService = inject(MfeToastService);
  private readonly router = inject(Router);

  // User data from service
  currentUser = signal<IUser | null>(null);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Loads user data from the service
   */
  private loadUserData(): void {
    this.loading.set(true);

    this.settingsService
      .loadUserData()
      .pipe(first())
      .subscribe({
        next: (user: IUser) => {
          this.currentUser.set(user);
          this.loading.set(false);
        },
        error: (error: Error) => {
          console.error('Error loading user data:', error);
          this.loading.set(false);
          this.toastService.showError('Erro ao carregar dados do usuário. Tente novamente.');
        }
      });
  }

  /**
   * Handles account update from the form
   */
  handleAccountUpdate(userData: Partial<IUser>): void {
    this.updateUserData(userData);
  }

  /**
   * Handles account deletion from the form
   */
  handleAccountDelete(password: string): void {
    this.validatePassword(password, () => this.deleteAccount());
  }

  /**
   * Validates the password
   * @param password - The password to validate
   * @param callback - The callback to call when the password is valid
   */
  private validatePassword(password: string | undefined, callback: () => void): void {
    if (!password) {
      this.toastService.showError('Nenhuma senha informada.');
      return;
    }

    this.settingsService
      .validatePassword(password)
      .pipe(first())
      .subscribe({
        next: (isValid: boolean) => isValid && callback(),
        error: () => this.toastService.showError('Senha inválida. Tente novamente.')
      });
  }

  /**
   * Handles account deletion from the form
   */
  private deleteAccount(): void {
    this.loading.set(true);

    this.settingsService
      .deleteUser()
      .pipe(first())
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.currentUser.set(null);
            this.toastService.showSuccess('Conta excluída com sucesso!');
            this.router.navigate(['/login']);
          }
        },
        error: (error: Error) => {
          console.error('Erro ao excluir conta:', error);
          this.toastService.showError('Falha ao excluir conta. Tente novamente.');
        },
        complete: () => this.loading.set(false)
      });
  }

  /**
   * Updates the user data
   * @param userData - The user data to update
   */
  private updateUserData(userData: Partial<IUser>): void {
    const updates: UserUpdateInput = {
      acceptPrivacy: true
    };

    if (userData.name) updates.name = userData.name;
    if (userData.email) updates.email = userData.email;
    if (userData.password) updates.password = userData.password;

    this.settingsService
      .updateUser(userData)
      .pipe(first())
      .subscribe({
        next: (updatedUser: IUser) => {
          this.currentUser.set(updatedUser);
          this.toastService.showSuccess('Dados da conta atualizados com sucesso!');
        },
        error: (error: Error) => {
          console.error('Erro ao atualizar dados da conta:', error);
          this.toastService.showError('Falha ao atualizar dados da conta. Tente novamente.');
        }
      });
  }
}
