import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
  input
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getAssetContent } from '@bytebank-pro/shared-assets';
import { ImageOff, Loader2, LucideAngularModule } from 'lucide-angular';

/**
 * Defines the possible size variants for the Image component.
 */
export type ImgSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Image component for the ByteBank Pro application.
 * Displays images from shared assets or external sources with customizable size and classes.
 * Supports both SVG and regular image formats with loading states and error handling.
 * Follows accessibility best practices with proper ARIA attributes and alt text.
 *
 * @example
 * ```html
 * <bb-img src="path/to/image.svg" alt="Description" size="md"></bb-img>
 * <bb-img src="external-url.jpg" alt="External image" size="lg" className="rounded-lg"></bb-img>
 * <bb-img src="path/to/icon.svg" size="sm" isDecorative="true"></bb-img>
 * ```
 */
@Component({
  selector: 'bb-img', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule], // Required imports for Angular and Lucide icons
  templateUrl: './img.component.html', // Separated template for clarity
  styleUrls: ['./img.component.css'], // Separated styles for better organization
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush for better performance
})
export class ImgComponent implements OnInit {
  /**
   * The source path or URL of the image.
   * Can be a path to shared assets or an external URL.
   */
  src = input.required<string>();

  /**
   * Alternative text for the image. Required for accessibility unless isDecorative is true.
   */
  alt = input<string>('');

  /**
   * The size of the image. Determines width and height classes.
   * @default 'md'
   */
  @Input() size: ImgSize = 'md';

  /**
   * Additional CSS classes to apply to the image element.
   * @default ''
   */
  @Input() className: string = '';

  /**
   * Indicates if the image is purely decorative and should be hidden from screen readers.
   * When true, aria-hidden="true" and alt="" will be applied.
   * @default false
   */
  @Input() isDecorative: boolean = false;

  /**
   * Custom loading text for screen readers.
   * @default 'Carregando imagem...'
   */
  @Input() loadingText: string = 'Carregando imagem...';

  /**
   * Custom error text for screen readers when image fails to load.
   * @default 'Erro ao carregar imagem'
   */
  @Input() errorText: string = 'Erro ao carregar imagem';

  // Internal map for size classes
  private sizeClasses: Record<ImgSize, string> = {
    xs: 'w-4 h-4',
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    full: 'w-full h-auto'
  };

  // Injecting dependencies
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);

  /**
   * Icons for different states, using Lucide icons.
   */
  public loadingIcon = Loader2;
  public errorIcon = ImageOff;

  /**
   * Stores the loaded and sanitized image content.
   */
  public imageContent: SafeHtml | string = '';

  /**
   * Indicates if the image is currently loading
   */
  public isLoading: boolean = true;

  /**
   * Indicates if there was an error loading the image
   */
  public hasError: boolean = false;

  /**
   * Indicates if the loaded content is SVG
   */
  public isSvg: boolean = false;

  /**
   * Initializes the component and loads the image.
   */
  ngOnInit(): void {
    this.loadImage();
  }

  /**
   * Loads the image asset asynchronously and updates the component state
   */
  private async loadImage(): Promise<void> {
    try {
      this.isLoading = true;
      this.hasError = false;

      const srcValue = this.src();

      // Check if it's an external URL or asset path
      if (this.isExternalUrl(srcValue)) {
        // For external URLs, use standard img src
        this.imageContent = srcValue;
        this.isSvg = false;
      } else {
        // For internal assets, use getAssetContent
        const asset = await getAssetContent(srcValue);

        if (asset.type === 'svg') {
          this.imageContent = this.sanitizer.bypassSecurityTrustHtml(asset.content);
          this.isSvg = true;
        } else {
          this.imageContent = srcValue;
          this.isSvg = false;
        }
      }
    } catch (error: unknown) {
      console.error('Error loading image:', error);
      this.hasError = true;
      this.imageContent = '';
    } finally {
      this.isLoading = false;
      // Trigger change detection since we're using OnPush
      this.cdr.markForCheck();
    }
  }

  /**
   * Checks if the provided source is an external URL
   */
  private isExternalUrl(src: string): boolean {
    return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//');
  }

  /**
   * Handles image load error for standard img elements
   */
  onImageError(): void {
    this.hasError = true;
    this.isLoading = false;
    this.cdr.markForCheck();
  }

  /**
   * Handles image load success for standard img elements
   */
  onImageLoad(): void {
    this.isLoading = false;
    this.hasError = false;
    this.cdr.markForCheck();
  }

  /**
   * Computes the appropriate alt text for the image based on accessibility settings.
   */
  get imageAltText(): string {
    if (this.isDecorative) {
      return '';
    }

    if (this.hasError) {
      return this.errorText;
    }

    return this.alt() || '';
  }

  /**
   * Determines if the image should be hidden from screen readers.
   */
  get shouldHideFromScreenReaders(): boolean {
    return this.isDecorative;
  }

  /**
   * Computes the combined CSS classes for the image element.
   */
  get imageClasses(): string {
    const sizeClass = this.sizeClasses[this.size];
    return `${sizeClass} ${this.className}`.trim();
  }

  /**
   * Gets the appropriate ARIA attributes for the current state
   */
  get ariaAttributes(): Record<string, string | boolean> {
    const attributes: Record<string, string | boolean> = {};

    if (this.shouldHideFromScreenReaders) {
      attributes['aria-hidden'] = true;
    }

    if (this.isLoading) {
      attributes['aria-busy'] = true;
      attributes['aria-label'] = this.loadingText;
    }

    return attributes;
  }
}
