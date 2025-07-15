import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ASSETS } from '@/assets/assets.config';
import { ImgSize } from '@bytebank-pro/types';
import { ImgComponent } from '../img/img.component';

/**
 * Defines the possible visual variants for the Logo component.
 * 'full' displays the full ByteBank logo, 'icon' displays only the icon part.
 */
export type LogoVariant = 'full' | 'icon';

/**
 * Logo component for the ByteBank Pro application.
 * Displays either the full logo or just the icon, with customizable size and additional classes.
 * Follows accessibility best practices with proper ARIA attributes and alt text.
 *
 * @example
 * ```html
 * <bb-logo variant="full" size="md" className="my-custom-class"></bb-logo>
 * <bb-logo variant="icon" size="sm" ariaLabel="ByteBank icon"></bb-logo>
 * <bb-logo variant="full" size="lg" isDecorative="true"></bb-logo>
 * ```
 */
@Component({
  selector: 'bb-logo', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, ImgComponent], // Required imports
  templateUrl: './logo.component.html', // Separated template for clarity
  styleUrls: ['./logo.component.css'], // Separated styles for better organization
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush for better performance
})
export class LogoComponent {
  /**
   * The visual variant of the logo. 'full' for the complete logo, 'icon' for just the icon.
   * @default 'full'
   */
  variant = input<LogoVariant>('full');

  /**
   * The size of the logo. 'sm', 'md', or 'lg'.
   * @default 'md'
   */
  size = input<ImgSize>('md');

  /**
   * Additional CSS classes to apply to the logo SVG element.
   * @default ''
   */
  className = input<string>('');

  /**
   * Custom aria-label for the logo. If not provided, a default descriptive label will be used.
   * @default undefined
   */
  ariaLabel = input<string>();

  /**
   * Indicates if the logo is purely decorative and should be hidden from screen readers.
   * When true, aria-hidden="true" and alt="" will be applied.
   * @default false
   */
  isDecorative = input<boolean>(false);

  /**
   * Computes the source URL for the logo based on the variant.
   * Uses the LOGOS constant from shared assets with direct imports.
   */
  logoSrc = computed(() => (this.variant() === 'full' ? ASSETS.LOGOS.MAIN : ASSETS.LOGOS.ICON));

  /**
   * Computes the appropriate alt text for the logo based on variant and accessibility settings.
   * Returns empty string if logo is decorative, otherwise provides descriptive alt text.
   */
  logoAltText = computed((): string => {
    switch (true) {
      // If the logo is decorative, return empty string for alt text
      case this.isDecorative():
        return '';

      // If there is a custom aria-label, use it as alt text
      case this.variant() === 'full':
        return 'ByteBank Pro - Logo da plataforma de gestão financeira';

      // Icon variant with custom aria-label
      case !!this.ariaLabel():
        return this.ariaLabel()!;

      // Default case for icon variant
      default:
        return 'ByteBank Pro - Ícone da plataforma';
    }
  });

  /**
   * Computes the combined CSS classes for the SVG element, including size and any custom classes.
   */
  logoClasses = computed((): string => `${this.className()}`.trim());
}
