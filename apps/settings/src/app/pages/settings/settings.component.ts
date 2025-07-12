import { Component, OnInit, signal } from '@angular/core';
import { AccountFormComponent } from '@/components/account-form/account-form.component';
import { IUser } from '@bytebank-pro/types';

@Component({
  selector: 'bb-settings-page',
  standalone: true,
  imports: [AccountFormComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsPageComponent implements OnInit {
  // Dialog state
  isAccountFormOpen = signal(false);

  // Mock user data for demonstration
  currentUser = signal<IUser | null>({
    _id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'password123',
    acceptPrivacy: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  constructor() {}

  ngOnInit(): void {
    console.log('settings page initialized');
  }

  /**
   * Opens the account form dialog
   */
  openAccountForm(): void {
    this.isAccountFormOpen.set(true);
  }

  /**
   * Handles account update from the form
   */
  handleAccountUpdate(userData: Partial<IUser>): void {
    console.log('Atualizando dados da conta:', userData);
    // Here you would typically call a service to update the user data
    // For now, we'll just update the local state
    if (this.currentUser()) {
      this.currentUser.set({
        ...this.currentUser()!,
        ...userData
      });
    }
  }

  /**
   * Handles account deletion from the form
   */
  handleAccountDelete(password: string): void {
    console.log('Excluindo conta com senha:', password);
    // Here you would typically call a service to delete the account
    // For now, we'll just log the action
  }

  /**
   * Handles dialog close
   */
  handleDialogClose(): void {
    this.isAccountFormOpen.set(false);
  }
}
