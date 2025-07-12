import { AccountFormComponent } from '@/components/account-form/account-form.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@bytebank-pro/types';
import { first } from 'rxjs';
import { MfeToastService } from '../../core/services/mfe-toast.service';
import { SettingsService, UserUpdateInput } from '../../core/services/settings.service';

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
   * @param userData - The user data to update
   * @param password - The password to validate
   */
  handleAccountUpdate(userData: Partial<IUser>, password: string): void {
    this.validatePassword(password, () => this.updateUserData(userData));
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
        next: (isValid: boolean) =>
          isValid ? callback() : this.toastService.showError('Senha inválida. Tente novamente.'),
        error: (error: Error) => {
          console.error('Erro ao validar senha:', error);
          this.toastService.showError('Erro ao validar senha. Tente novamente.');
        }
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
