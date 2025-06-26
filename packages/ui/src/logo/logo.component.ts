import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LOGOS, getAssetContent } from '@bytebank-pro/shared-assets';
import { Loader2, LucideAngularModule } from 'lucide-angular';
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
  imports: [CommonModule, LucideAngularModule], // Required imports for Angular and Lucide icons
  templateUrl: './logo.component.html', // Separated template for clarity
  styleUrls: ['../styles/index.css'], // Shared styles for consistency
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush for better performance
})
export class LogoComponent implements OnInit {
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

  // Injecting DomSanitizer to handle any potential HTML content safely
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);

  /**
   * Icon for loading state, using Lucide icons.
   * This will be displayed while the logo is being loaded.
   */
  public loadingIcon = Loader2;

  /**
   * Stores the loaded and sanitized logo HTML or image path.
   */
  public logoHtml: SafeHtml | string = '';

  /**
   * Indicates if the logo is currently loading
   */
  public isLoading: boolean = true;

  /**
   * Initializes the component and performs any necessary setup.
   * Loads and sanitizes the logo asset.
   */
  ngOnInit(): void {
    this.loadLogoAsset();
  }

  /**
   * Loads the logo asset asynchronously and updates the component state
   */
  private async loadLogoAsset(): Promise<void> {
    try {
      this.isLoading = true;
      const asset = await getAssetContent(this.logoSrc);

      // Depending on the asset type, set the logoHtml property
      if (asset.type === 'svg') {
        this.logoHtml = this.sanitizer.bypassSecurityTrustHtml(asset.content);
      } else {
        this.logoHtml = asset.content; // This will be the image path
      }

      console.log('Logo asset loaded:', asset.content);
    } catch (error: unknown) {
      console.error('Error loading logo asset:', error);
      // Fallback to direct logoSrc if loading fails
      this.logoHtml = '';
    } finally {
      this.isLoading = false;
      // Trigger change detection since we're using OnPush
      this.cdr.markForCheck();
    }
  }

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
