import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

/**
 * Footer component for the ByteBank Pro application.
 * Displays contact information, ByteBank logo, and navigation links.
 *
 * @example
 * ```html
 * <bb-footer></bb-footer>
 * ```
 */
@Component({
  selector: 'bb-footer', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LogoComponent], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './footer.component.html', // Separated template for clarity
  styleUrls: ['../styles/index.css']
})
export class FooterComponent {
  // The content structure is now directly in the template.
}
