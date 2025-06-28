import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginatorComponent } from './paginator.component';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent, LucideAngularModule.pick({ ArrowLeft, ArrowRight })]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 10);

    fixture.detectChanges();
    element = fixture.debugElement.query(
      By.css('[data-testid="paginator-component"]')
    ).nativeElement;
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.currentPage()).toBe(1);

      expect(component.totalPages()).toBe(10);
    });
  });

  describe('Input Properties', () => {
    it('should update currentPage when input changes', () => {
      fixture.componentRef.setInput('currentPage', 5);
      fixture.detectChanges();

      expect(component.currentPage()).toBe(5);
    });

    it('should update totalPages when input changes', () => {
      fixture.componentRef.setInput('totalPages', 20);
      fixture.detectChanges();

      expect(component.totalPages()).toBe(20);
    });

    it('should apply active class to current page button', () => {
      fixture.componentRef.setInput('currentPage', 3);
      fixture.detectChanges();

      const activeButton = fixture.debugElement.query(By.css('[data-testid="page-button-3"]'));

      expect(activeButton.nativeElement.classList).toContain('page-button--active');
    });

    it('should disable previous button when on first page', () => {
      fixture.componentRef.setInput('currentPage', 1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(
        By.css('[data-testid="previous-page-button"]')
      );

      expect(previousButton.nativeElement.disabled).toBeTruthy();
    });

    it('should disable next button when on last page', () => {
      fixture.componentRef.setInput('currentPage', 10);
      fixture.componentRef.setInput('totalPages', 10);
      fixture.detectChanges();

      const nextButton = fixture.debugElement.query(By.css('[data-testid="next-page-button"]'));

      expect(nextButton.nativeElement.disabled).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should emit onPageChange when handlePageClick is called with valid page', () => {
      spyOn(component.onPageChange, 'emit');

      component.handlePageClick(3);

      expect(component.onPageChange.emit).toHaveBeenCalledWith(3);
    });

    it('should not emit onPageChange when handlePageClick is called with ellipsis', () => {
      spyOn(component.onPageChange, 'emit');

      component.handlePageClick('...');

      expect(component.onPageChange.emit).not.toHaveBeenCalled();
    });

    it('should not emit onPageChange when clicking current page', () => {
      spyOn(component.onPageChange, 'emit');

      component.handlePageClick(1);

      expect(component.onPageChange.emit).not.toHaveBeenCalled();
    });

    it('should emit onPageChange when previous button is clicked', () => {
      fixture.componentRef.setInput('currentPage', 3);
      fixture.detectChanges();
      spyOn(component.onPageChange, 'emit');

      const previousButton = fixture.debugElement.query(
        By.css('[data-testid="previous-page-button"]')
      );
      previousButton.nativeElement.click();

      expect(component.onPageChange.emit).toHaveBeenCalledWith(2);
    });

    it('should emit onPageChange when next button is clicked', () => {
      fixture.componentRef.setInput('currentPage', 3);
      fixture.detectChanges();
      spyOn(component.onPageChange, 'emit');

      const nextButton = fixture.debugElement.query(By.css('[data-testid="next-page-button"]'));
      nextButton.nativeElement.click();

      expect(component.onPageChange.emit).toHaveBeenCalledWith(4);
    });

    it('should emit onPageChange when page button is clicked', () => {
      spyOn(component.onPageChange, 'emit');

      const pageButton = fixture.debugElement.query(By.css('[data-testid="page-button-2"]'));
      pageButton.nativeElement.click();

      expect(component.onPageChange.emit).toHaveBeenCalledWith(2);
    });
  });

  describe('Page Generation Logic', () => {
    it('should generate correct pages for small total pages', () => {
      fixture.componentRef.setInput('totalPages', 3);
      fixture.detectChanges();

      const pages = component.generatePages();

      expect(pages).toEqual([1, 2, 3]);
    });

    it('should generate pages with ellipses for large total pages', () => {
      fixture.componentRef.setInput('currentPage', 10);
      fixture.componentRef.setInput('totalPages', 20);
      fixture.detectChanges();

      const pages = component.generatePages();

      expect(pages).toContain('...');

      expect(pages).toContain(1);

      expect(pages).toContain(20);

      expect(pages).toContain(10);
    });

    it('should generate pages without left ellipsis when current page is near start', () => {
      fixture.componentRef.setInput('currentPage', 2);
      fixture.componentRef.setInput('totalPages', 10);
      fixture.detectChanges();

      const pages = component.generatePages();

      expect(pages[0]).toBe(1);

      expect(pages[1]).toBe(2);

      // For page 2 out of 10, expect: [1, 2, 3, ..., 10]
      expect(pages).toEqual([1, 2, 3, '...', 10]);
    });

    it('should generate pages without right ellipsis when current page is near end', () => {
      fixture.componentRef.setInput('currentPage', 9);
      fixture.componentRef.setInput('totalPages', 10);
      fixture.detectChanges();

      const pages = component.generatePages();

      expect(pages).toContain(10);

      expect(pages).toContain(9);
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes on previous button', () => {
      const previousButton = fixture.debugElement.query(
        By.css('[data-testid="previous-page-button"]')
      );

      expect(previousButton.nativeElement.getAttribute('aria-label')).toBe('Previous page');

      expect(previousButton.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have proper aria attributes on next button', () => {
      const nextButton = fixture.debugElement.query(By.css('[data-testid="next-page-button"]'));

      expect(nextButton.nativeElement.getAttribute('aria-label')).toBe('Next page');

      expect(nextButton.nativeElement.getAttribute('aria-disabled')).toBe('false');
    });

    it('should have proper aria attributes on page buttons', () => {
      const pageButton = fixture.debugElement.query(By.css('[data-testid="page-button-1"]'));

      expect(pageButton.nativeElement.getAttribute('aria-label')).toBe('Page 1');

      expect(pageButton.nativeElement.getAttribute('aria-current')).toBe('page');
    });

    it('should have proper aria attributes on ellipsis buttons', () => {
      fixture.componentRef.setInput('currentPage', 10);
      fixture.componentRef.setInput('totalPages', 20);
      fixture.detectChanges();

      const ellipsisButton = fixture.debugElement.query(By.css('[data-testid="ellipsis-button"]'));

      expect(ellipsisButton.nativeElement.getAttribute('aria-label')).toBe('More pages');

      expect(ellipsisButton.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('UI State Management', () => {
    it('should show correct number of page buttons for small pagination', () => {
      fixture.componentRef.setInput('totalPages', 5);
      fixture.detectChanges();

      const pageButtons = fixture.debugElement.queryAll(
        By.css('button[data-testid^="page-button-"]')
      );

      expect(pageButtons.length).toBe(5);
    });

    it('should show ellipsis buttons for large pagination', () => {
      fixture.componentRef.setInput('currentPage', 10);
      fixture.componentRef.setInput('totalPages', 20);
      fixture.detectChanges();

      const ellipsisButtons = fixture.debugElement.queryAll(
        By.css('[data-testid="ellipsis-button"]')
      );

      expect(ellipsisButtons.length).toBeGreaterThan(0);
    });

    it('should disable ellipsis buttons', () => {
      fixture.componentRef.setInput('currentPage', 10);
      fixture.componentRef.setInput('totalPages', 20);
      fixture.detectChanges();

      const ellipsisButton = fixture.debugElement.query(By.css('[data-testid="ellipsis-button"]'));

      expect(ellipsisButton.nativeElement.disabled).toBeTruthy();
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct classes to page buttons', () => {
      const pageButton = fixture.debugElement.query(By.css('[data-testid="page-button-1"]'));

      expect(pageButton.nativeElement.classList).toContain('page-button');

      expect(pageButton.nativeElement.classList).toContain('page-button--active');
    });

    it('should apply correct classes to arrow buttons', () => {
      const previousButton = fixture.debugElement.query(
        By.css('[data-testid="previous-page-button"]')
      );

      expect(previousButton.nativeElement.classList).toContain('arrow-button');
    });

    it('should update active class when current page changes', () => {
      const oldActiveButton = fixture.debugElement.query(By.css('[data-testid="page-button-1"]'));

      expect(oldActiveButton.nativeElement.classList).toContain('page-button--active');

      fixture.componentRef.setInput('currentPage', 3);
      fixture.detectChanges();

      const newActiveButton = fixture.debugElement.query(By.css('[data-testid="page-button-3"]'));

      expect(newActiveButton.nativeElement.classList).toContain('page-button--active');

      expect(oldActiveButton.nativeElement.classList).not.toContain('page-button--active');
    });
  });
});
