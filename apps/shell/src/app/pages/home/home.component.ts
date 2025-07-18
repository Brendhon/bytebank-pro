import { AuthService } from '@/core/services/auth.service';
import { GuestLayoutComponent } from '@/guest-layout/guest-layout.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ASSETS } from '@/assets/assets.config';
import { ImgComponent } from '@bytebank-pro/ui';

/**
 * Defines the structure for a single benefit item.
 */
interface BenefitItem {
  iconSrc: string; // Changed from ReactNode to string for image source
  iconAlt: string; // Alt text for the icon illustration
  iconWidth: number;
  title: string;
  description: string;
}

/**
 * Home component provides the layout for non-authenticated users
 * including a header, main content area, footer, and modals for login and registration.
 *
 * @example
 * ```html
 * <!-- In your app.component.html or a specific route's component -->
 * <bb-home>
 * <router-outlet></router-outlet>
 * </bb-home>
 * ```
 */
@Component({
  selector: 'bb-home', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [
    CommonModule,
    ImgComponent, // Import ImgComponent for image handling
    GuestLayoutComponent // Use GuestLayoutComponent for layout
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './home.component.html', // Separated template for clarity
  styleUrls: ['./home.component.css'] // Use CSS specific to component
})
export class HomeComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * Array defining the individual benefit items to be displayed.
   */
  benefits: BenefitItem[] = [
    {
      iconSrc: ASSETS.IMAGES.BOX,
      iconAlt: 'Gift box icon',
      iconWidth: 60,
      title: 'Conta e cartão gratuitos',
      description: 'Nossa conta é digital, sem custo fixo e sem tarifa de manutenção.'
    },
    {
      iconSrc: ASSETS.IMAGES.WITHDRAWAL,
      iconAlt: 'Hand withdrawing money icon',
      iconWidth: 60,
      title: 'Saques sem custo',
      description: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.'
    },
    {
      iconSrc: ASSETS.IMAGES.STAR,
      iconAlt: 'Star icon',
      iconWidth: 60,
      title: 'Programa de pontos',
      description: 'Acumule pontos com compras no crédito sem pagar mensalidade!'
    },
    {
      iconSrc: ASSETS.IMAGES.DEVICES,
      iconAlt: 'Mobile devices icon',
      iconWidth: 60,
      title: 'Seguro Dispositivos',
      description: 'Proteja seus dispositivos móveis por uma mensalidade simbólica.'
    }
  ];

  /**
   * Icon to home page illustration.
   * This image is displayed on the home page.
   */
  readonly homeIllustrationSrc = ASSETS.ILLUSTRATIONS.HOME;

  ngOnInit(): void {
    // Redirect to dashboard if user is already logged in
    if (this.authService.isLoggedIn) this.router.navigate(['/dashboard']);
  }

  /**
   * Tracks benefit items in the ngFor loop for better performance.
   * @param index The index of the item.
   * @returns A unique identifier for the item (its index).
   */
  trackByBenefitIndex(index: number): number {
    return index;
  }
}
