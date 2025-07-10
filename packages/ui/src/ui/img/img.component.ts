import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  inject,
  input
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getAssetContent } from '@bytebank-pro/shared-assets';
import { ImgSize } from '@bytebank-pro/types';
import { ImageOff, Loader2, LucideAngularModule } from 'lucide-angular';

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
  size = input<ImgSize>('md');

  /**
   * Additional CSS classes to apply to the image element.
   * @default ''
   */
  className = input<string>('');

  /**
   * Indicates if the image is purely decorative and should be hidden from screen readers.
   * When true, aria-hidden="true" and alt="" will be applied.
   * @default false
   */
  isDecorative = input<boolean>(false);

  /**
   * Custom loading text for screen readers.
   * @default 'Carregando imagem...'
   */
  loadingText = input<string>('Carregando imagem...');

  /**
   * Custom error text for screen readers when image fails to load.
   * @default 'Erro ao carregar imagem'
   */
  errorText = input<string>('Erro ao carregar imagem');

  // Internal map for size classes
  private sizeClasses: Record<ImgSize, string> = {
    xs: 'w-4 h-auto',
    xsl: 'w-6 h-auto',
    sm: 'w-8 h-auto',
    md: 'w-16 h-auto',
    lg: 'w-32 h-auto',
    xl: 'w-48 h-auto',
    '2xl': 'w-64 h-auto',
    '3xl': 'w-96 h-auto',
    '4xl': 'w-128 h-auto',
    '5xl': 'w-160 h-auto',
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
  imageAltText = computed(() => {
    switch (true) {
      case this.isDecorative():
        return '';
      case this.hasError:
        return this.errorText();
      default:
        return this.alt() || '';
    }
  });

  /**
   * Determines if the image should be hidden from screen readers.
   */
  shouldHideFromScreenReaders = computed(() => this.isDecorative());

  /**
   * Computes the combined CSS classes for the image element.
   */
  imageClasses = computed(() => {
    const sizeClass = this.sizeClasses[this.size()];
    return `${sizeClass} ${this.className()}`.trim();
  });

  /**
   * Gets the appropriate ARIA attributes for the current state
   */
  ariaAttributes = computed(() => {
    const attributes: Record<string, string | boolean> = {};

    if (this.shouldHideFromScreenReaders()) {
      attributes['aria-hidden'] = true;
    }

    if (this.isLoading) {
      attributes['aria-busy'] = true;
      attributes['aria-label'] = this.loadingText();
    }

    return attributes;
  });
}
