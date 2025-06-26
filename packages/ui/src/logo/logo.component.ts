import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOGOS } from '@bytebank-pro/shared-assets';

/**
 * Defines the possible visual variants for the Logo component.
 * 'full' displays the full ByteBank logo, 'icon' displays only the icon part.
 */
export type LogoVariant = 'full' | 'icon';

/**
 * Defines the possible size variants for the Logo component.
 */
export type LogoSize = 'sm' | 'md' | 'lg';

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
  imports: [CommonModule], // Required imports
  templateUrl: './logo.component.html', // Separated template for clarity
  styleUrls: ['../styles/index.css'], // Shared styles for consistency
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush for better performance
})
export class LogoComponent {
  /**
   * The visual variant of the logo. 'full' for the complete logo, 'icon' for just the icon.
   * @default 'full'
   */
  @Input() variant: LogoVariant = 'full';

  /**
   * The size of the logo. 'sm', 'md', or 'lg'.
   * @default 'md'
   */
  @Input() size: LogoSize = 'md';

  /**
   * Additional CSS classes to apply to the logo SVG element.
   * @default ''
   */
  @Input() className: string = '';

  /**
   * Custom aria-label for the logo. If not provided, a default descriptive label will be used.
   * @default undefined
   */
  @Input() ariaLabel?: string;

  /**
   * Indicates if the logo is purely decorative and should be hidden from screen readers.
   * When true, aria-hidden="true" and alt="" will be applied.
   * @default false
   */
  @Input() isDecorative: boolean = false;

  // Internal map for size classes, similar to the original React component
  private sizeClasses: Record<LogoSize, string> = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-42'
  };

  /**
   * Computes the appropriate alt text for the logo based on variant and accessibility settings.
   * Returns empty string if logo is decorative, otherwise provides descriptive alt text.
   */
  get logoAltText(): string {
    if (this.isDecorative) {
      return '';
    }

    if (this.ariaLabel) {
      return this.ariaLabel;
    }

    return this.variant === 'full'
      ? 'ByteBank Pro - Logo da plataforma de gestão financeira'
      : 'ByteBank Pro - Ícone da plataforma';
  }

  /**
   * Determines if the logo should be hidden from screen readers.
   * Returns true if the logo is decorative or has explicit aria-label.
   */
  get shouldHideFromScreenReaders(): boolean {
    return this.isDecorative;
  }

  /**
   * Computes the combined CSS classes for the SVG element, including size and any custom classes.
   */
  get logoClasses(): string {
    const sizeClass = this.sizeClasses[this.size];
    return `${sizeClass} h-auto ${this.className}`.trim();
  }

  /**
   * Computes the source URL for the logo based on the variant.
   * Uses the LOGOS constant from shared assets with direct imports.
   */
  get logoSrc(): string {
    return this.variant === 'full' ? LOGOS.MAIN : LOGOS.ICON;
  }
}
