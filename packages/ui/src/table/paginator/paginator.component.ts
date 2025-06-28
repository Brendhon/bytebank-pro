import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { isNumber } from '@bytebank-pro/utils';

/**
 * Paginator component for navigating through pages of content.
 * Displays page numbers with ellipses for large page counts and navigation arrows.
 *
 * @example
 * ```html
 * <bb-paginator
 *   [currentPage]="currentPage"
 *   [totalPages]="totalPages"
 *   (onPageChange)="handlePageChange($event)"
 * ></bb-paginator>
 * ```
 */
@Component({
  selector: 'bb-paginator', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './paginator.component.html', // Template file
  styleUrls: ['./paginator.component.css'] // CSS file reference
})
export class PaginatorComponent {
  /**
   * The current active page number.
   */
  currentPage = input.required<number>();

  /**
   * The total number of available pages.
   */
  totalPages = input.required<number>();

  /**
   * Event emitted when the page changes.
   * Emits the new page number.
   */
  onPageChange = output<number>();

  /**
   * Provides the `isNumber` utility function to the template.
   */
  protected isNumber = isNumber;

  /**
   * Generates an array of page numbers or ellipses for display in the paginator.
   * Implements a logic to show a limited set of pages around the current page, with ellipses.
   * @returns An array of numbers (page numbers) or strings ("...") representing the paginator sequence.
   */
  generatePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const currentPage = this.currentPage();
    const totalPages = this.totalPages();

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) pages.push(i);
    };

    if (totalPages <= 5) {
      addRange(1, totalPages);
    } else {
      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      pages.push(1);

      if (showLeftEllipsis) pages.push('...');

      addRange(Math.max(2, currentPage - 1), Math.min(totalPages - 1, currentPage + 1));

      if (showRightEllipsis) pages.push('...');

      if (totalPages > 1) {
        // Ensure last page is added only if there's more than one page
        pages.push(totalPages);
      }
    }
    // Filter out duplicate page numbers in case of edge cases
    return pages.filter((value, index, self) => self.indexOf(value) === index);
  }

  /**
   * Handles the click event on a page button.
   * Emits the new page number if it's a valid number and different from the current page.
   * @param page The page number or ellipsis string that was clicked.
   */
  handlePageClick(page: number | string): void {
    const currentPage = this.currentPage();
    if (this.isNumber(page) && page !== currentPage) {
      this.onPageChange.emit(page as number);
    }
  }

  /**
   * Returns the CSS classes for a specific page button.
   * Highlights the current page and applies disabled styles when necessary.
   * @param page The page number or ellipsis string.
   * @returns A string of CSS classes.
   */
  getPageButtonClasses(page: number | string): string {
    const currentPage = this.currentPage();
    let classes = 'page-button';
    if (currentPage === page) {
      classes += ' page-button--active';
    }
    return classes;
  }

  /**
   * Returns the CSS classes for the navigation arrow buttons.
   * @returns A string of CSS classes.
   */
  getArrowButtonClasses(): string {
    return 'arrow-button';
  }
}
