import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableColumn } from '@bytebank-pro/types';
import { GenericTableComponent } from './generic-table.component';

interface TestData {
  id: number;
  name: string;
  value: number;
}

describe('GenericTableComponent', () => {
  let component: GenericTableComponent<TestData>;
  let fixture: ComponentFixture<GenericTableComponent<TestData>>;
  let element: HTMLElement;

  const mockData: TestData[] = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Item 3', value: 300 }
  ];

  const mockColumns: TableColumn<TestData>[] = [
    { label: 'ID', accessor: 'id' },
    { label: 'Name', accessor: 'name' },
    { label: 'Value', accessor: 'value' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableComponent<TestData>);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(
      By.css('[data-testid="generic-table-container"]')
    ).nativeElement;

    // Set required inputs using signal inputs
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('pageSize', 10);

    fixture.detectChanges();
  });

  describe('Basic Functionality', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.currentPage()).toBe(1);

      expect(component.pageSize()).toBe(10);

      expect(component.data()).toEqual(mockData);

      expect(component.columns()).toEqual(mockColumns);
    });
  });

  describe('Input Properties', () => {
    it('should update data when input changes', () => {
      const newData: TestData[] = [{ id: 4, name: 'Item 4', value: 400 }];
      fixture.componentRef.setInput('data', newData);
      fixture.detectChanges();

      expect(component.data()).toEqual(newData);
    });

    it('should update columns when input changes', () => {
      const newColumns: TableColumn<TestData>[] = [{ label: 'Identifier', accessor: 'id' }];
      fixture.componentRef.setInput('columns', newColumns);
      fixture.detectChanges();

      expect(component.columns()).toEqual(newColumns);
    });

    it('should handle pageSize input correctly', () => {
      fixture.componentRef.setInput('pageSize', 5);
      fixture.detectChanges();

      expect(component.pageSize()).toBe(5);

      expect(component.totalPages()).toBe(1); // 3 items with pageSize 5
    });

    it('should handle undefined pageSize', () => {
      fixture.componentRef.setInput('pageSize', undefined);
      fixture.detectChanges();

      expect(component.pageSize()).toBeUndefined();

      expect(component.totalPages()).toBe(1);

      expect(component.pagedData()).toEqual(mockData);
    });
  });

  describe('Table Display', () => {
    it('should display table headers correctly', () => {
      const headerCells = fixture.debugElement.queryAll(By.css('[data-testid="table-header"] th'));

      expect(headerCells.length).toBe(mockColumns.length);

      headerCells.forEach((cell, index) => {
        expect(cell.nativeElement.textContent.trim()).toBe(mockColumns[index].label);
      });
    });

    it('should display table data correctly', () => {
      const tableRows = fixture.debugElement.queryAll(
        By.css('[data-testid="table-body"] tr:not([data-testid="no-data-row"])')
      );

      expect(tableRows.length).toBe(mockData.length);

      // Check first row data
      const firstRowCells = tableRows[0].queryAll(By.css('td'));

      expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1');

      expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Item 1');

      expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('100');
    });

    it('should display no data message when data array is empty', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      const noDataMessage = fixture.debugElement.query(By.css('[data-testid="no-data-message"]'));

      expect(noDataMessage).toBeTruthy();

      expect(noDataMessage.nativeElement.textContent.trim()).toBe('Nenhum dado encontrado');
    });

    it('should show correct colspan for no data message', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      const noDataRow = fixture.debugElement.query(By.css('[data-testid="no-data-row"] td'));

      expect(noDataRow.nativeElement.getAttribute('colspan')).toBe(mockColumns.length.toString());
    });
  });

  describe('Pagination', () => {
    it('should calculate total pages correctly', () => {
      fixture.componentRef.setInput('pageSize', 2);
      fixture.detectChanges();

      expect(component.totalPages()).toBe(2); // 3 items with pageSize 2
    });

    it('should return correct paged data', () => {
      fixture.componentRef.setInput('pageSize', 2);
      fixture.detectChanges();

      const firstPageData = component.pagedData();

      expect(firstPageData.length).toBe(2);

      expect(firstPageData).toEqual([mockData[0], mockData[1]]);

      // Navigate to second page
      component.onPageChange(2);

      const secondPageData = component.pagedData();

      expect(secondPageData.length).toBe(1);

      expect(secondPageData).toEqual([mockData[2]]);
    });

    it('should show paginator when pageSize is set and has multiple pages', () => {
      fixture.componentRef.setInput('pageSize', 2);
      fixture.detectChanges();

      const paginatorWrapper = fixture.debugElement.query(
        By.css('[data-testid="paginator-wrapper"]')
      );

      expect(paginatorWrapper).toBeTruthy();
    });

    it('should hide paginator when pageSize is undefined', () => {
      fixture.componentRef.setInput('pageSize', undefined);
      fixture.detectChanges();

      const paginatorWrapper = fixture.debugElement.query(
        By.css('[data-testid="paginator-wrapper"]')
      );

      expect(paginatorWrapper).toBeFalsy();
    });

    it('should hide paginator when only one page exists', () => {
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const paginatorWrapper = fixture.debugElement.query(
        By.css('[data-testid="paginator-wrapper"]')
      );

      expect(paginatorWrapper).toBeFalsy();
    });
  });

  describe('Events', () => {
    it('should handle page change correctly', () => {
      component.onPageChange(2);

      expect(component.currentPage()).toBe(2);
    });
  });

  describe('Utility Methods', () => {
    it('should combine CSS classes correctly', () => {
      const result = component.getCellClasses('base-class', 'additional-class');

      expect(result).toBe('base-class additional-class');
    });

    it('should handle empty additional classes', () => {
      const result = component.getCellClasses('base-class', '');

      expect(result).toBe('base-class');
    });

    it('should handle undefined additional classes', () => {
      const result = component.getCellClasses('base-class');

      expect(result).toBe('base-class');
    });
  });

  describe('Accessibility', () => {
    it('should have proper table roles', () => {
      const table = fixture.debugElement.query(By.css('table'));

      expect(table.nativeElement.getAttribute('role')).toBe('table');

      expect(table.nativeElement.getAttribute('aria-label')).toBe('Generic data table');
    });

    it('should have proper row roles', () => {
      const headerRow = fixture.debugElement.query(By.css('[data-testid="table-header"] tr'));

      expect(headerRow.nativeElement.getAttribute('role')).toBe('row');

      const dataRows = fixture.debugElement.queryAll(By.css('[data-testid="table-body"] tr'));
      dataRows.forEach((row) => {
        expect(row.nativeElement.getAttribute('role')).toBe('row');
      });
    });

    it('should have proper column headers with scope attribute', () => {
      const headerCells = fixture.debugElement.queryAll(By.css('[data-testid="table-header"] th'));

      headerCells.forEach((cell) => {
        expect(cell.nativeElement.getAttribute('scope')).toBe('col');
      });
    });
  });

  describe('Track Functions', () => {
    it('should return correct index for trackByRowIndex', () => {
      const result = component.trackByRowIndex(0, mockData[0]);

      expect(result).toBe(0);
    });

    it('should return correct index for trackByColumnIndex', () => {
      const result = component.trackByColumnIndex(1, mockColumns[1]);

      expect(result).toBe(1);
    });
  });
});
