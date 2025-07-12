import { Component, OnInit, signal } from '@angular/core';
import { AccountFormComponent } from '@/components/account-form/account-form.component';
import { IUser } from '@bytebank-pro/types';
import { SettingsService, UserUpdateInput } from '../../core/services/settings.service';
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
  // User data from service
  currentUser = signal<IUser | null>(null);
  loading = signal<boolean>(false);

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('settings page initialized');
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
        }
      });
  }

  /**
   * Handles account update from the form
   */
  handleAccountUpdate(userData: Partial<IUser>): void {
    console.log('Atualizando dados da conta:', userData);

    const updates: UserUpdateInput = {
      acceptPrivacy: true
    };

    // Map the user data to the expected input format
    if (userData.name) updates.name = userData.name;
    if (userData.email) updates.email = userData.email;
    if (userData.password) updates.password = userData.password;

    this.settingsService
      .updateUser(updates)
      .pipe(first())
      .subscribe({
        next: (updatedUser: IUser) => {
          console.log('Dados da conta atualizados com sucesso:', updatedUser);
          this.currentUser.set(updatedUser);
        },
        error: (error: Error) => {
          console.error('Erro ao atualizar dados da conta:', error);
        }
      });
  }

  /**
   * Handles account deletion from the form
   */
  handleAccountDelete(password: string): void {
    console.log('Excluindo conta com senha:', password);

    // First validate the password
    this.settingsService
      .validatePassword(password)
      .pipe(first())
      .subscribe({
        next: (isValid: boolean) => {
          if (isValid) this.deleteAccount();
          else console.error('Senha inválida');
        },
        error: (error: Error) => {
          console.error('Erro ao validar senha:', error);
        }
      });
  }

  /**
   * Handles account deletion from the form
   */
  deleteAccount(): void {
    this.loading.set(true);

    this.settingsService
      .deleteUser()
      .pipe(first())
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            console.log('Conta excluída com sucesso');
            this.currentUser.set(null);
            this.router.navigate(['/login']);
          }
        },
        error: (error: Error) => {
          console.error('Erro ao excluir conta:', error);
        },
        complete: () => this.loading.set(false)
      });
  }
}
