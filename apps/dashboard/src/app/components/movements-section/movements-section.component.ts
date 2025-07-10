import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardProps, CardVariant } from '@bytebank-pro/types';
import { CardComponent } from './components/card/card.component';

/**
 * MovementsSection component displays a titled section containing a grid of cards
 * that represent financial movements or key metrics.
 *
 * @example
 * ```html
 * <bb-movements-section [data]="myMovementCards"></bb-movements-section>
 * ```
 */
@Component({
  selector: 'bb-movements-section', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [
    CommonModule,
    CardComponent // Required child component
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './movements-section.component.html', // Separated template for clarity
  styleUrls: ['./movements-section.component.css'] // Component-specific styles
})
export class MovementsSectionComponent {
  /**
   * The array of CardProps to be displayed as cards in the section.
   */
  data = input.required<CardProps[]>();

  /**
   * Valid card variants for type safety.
   */
  private readonly validVariants: CardVariant[] = ['dark', 'blue', 'green', 'orange'];

  /**
   * Casts the variant string to CardVariant type with improved type safety.
   * This helper is used in the template to ensure type safety.
   * @param variant The variant string from CardProps.
   * @returns The CardVariant type or undefined if invalid.
   */
  asCardVariant(variant: string | undefined): CardVariant | undefined {
    return this.validVariants.includes(variant as CardVariant)
      ? (variant as CardVariant)
      : undefined;
  }

  /**
   * Tracks cards in the ngFor loop by their `key` property for better performance.
   * @param index The index of the item.
   * @param item The CardProps item itself.
   * @returns A unique identifier for the item (its `key`).
   */
  trackByCardKey(index: number, item: CardProps): string | number {
    return item.key;
  }
}
