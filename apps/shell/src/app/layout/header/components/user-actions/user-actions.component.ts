import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ICONS } from '@bytebank-pro/shared-assets';
import { ImgComponent, PopoverComponent } from '@bytebank-pro/ui';
import { LucideAngularModule, User } from 'lucide-angular';

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
  imports: [CommonModule, LucideAngularModule, PopoverComponent, ImgComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './user-actions.component.html', // Separated template for clarity
  styleUrls: ['./user-actions.component.css'] // Always include CSS file
})
export class UserActionsComponent {
  /**
   * Event emitted when a navigation link (Github, Figma, Storybook) is clicked.
   * Emits the URL to navigate to.
   */
  onNavigate = output<string>();

  /**
   * Event emitted when the "Sair" (Logout) button is clicked.
   */
  onLogout = output<void>();

  // Assuming these URLs would be provided via environment variables or a configuration service in Angular
  // For this example, hardcoding them for direct conversion. In a real app, use environment.ts or similar.
  githubUrl: string = 'https://github.com/Brendhon/bytebank-pro';
  figmaUrl: string =
    'https://www.figma.com/design/E9UFSc9LUXlL88hIvIcuLd/Modelo-Fase-1---P%C3%93S-FIAP?node-id=503-4264';

  // Icons used in the component, imported from shared assets
  icons = {
    user: User,
    github: ICONS.GITHUB,
    figma: ICONS.FIGMA
  };

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
