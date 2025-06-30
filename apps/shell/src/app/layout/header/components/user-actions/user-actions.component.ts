import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { User } from 'lucide-angular'; // Import specific Lucide icons
import { ICONS, getAssetContent } from '@bytebank-pro/shared-assets';
import { PopoverComponent } from '@bytebank-pro/ui';

/**
 * UserActions component provides a dropdown menu with navigation links to external resources
 * and a logout option for authenticated users.
 *
 * @example
 * ```html
 * <bb-user-actions (onNavigate)="handleNavigation($event)" (onLogout)="handleLogout()"></bb-user-actions>
 * ```
 */
@Component({
  selector: 'bb-user-actions', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule, PopoverComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './user-actions.component.html' // Separated template for clarity
})
export class UserActionsComponent {
  /**
   * Event emitted when a navigation link (Github, Figma, Storybook) is clicked.
   * Emits the URL to navigate to.
   */
  @Output() onNavigate = new EventEmitter<string>();

  /**
   * Event emitted when the "Sair" (Logout) button is clicked.
   */
  @Output() onLogout = new EventEmitter<void>();

  // Assuming these URLs would be provided via environment variables or a configuration service in Angular
  // For this example, hardcoding them for direct conversion. In a real app, use environment.ts or similar.
  githubUrl: string = 'https://github.com/Brendhon/bytebank-pro';
  figmaUrl: string =
    'https://www.figma.com/design/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264';

  /**
   * Handles the click on a navigation link.
   * @param url The URL to navigate to.
   */
  handleNavigate(url: string): void {
    this.onNavigate.emit(url);
  }

  /**
   * Handles the click on the logout button.
   */
  handleLogout(): void {
    this.onLogout.emit();
  }
}
