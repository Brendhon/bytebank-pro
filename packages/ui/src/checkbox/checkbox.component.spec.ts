import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit checkedChange when clicked', () => {
    spyOn(component.checkedChange, 'emit');

    const checkboxElement = fixture.nativeElement.querySelector('[data-testid="checkbox-wrapper"]');
    checkboxElement.click();

    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });

  it('should toggle on space key press', () => {
    spyOn(component.checkedChange, 'emit');

    const event = new KeyboardEvent('keydown', { key: ' ' });
    component.handleKeydown(event);

    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    spyOn(component.checkedChange, 'emit');

    const checkboxElement = fixture.nativeElement.querySelector('[data-testid="checkbox-wrapper"]');
    checkboxElement.click();

    expect(component.checkedChange.emit).not.toHaveBeenCalled();
  });

  it('should display label when provided', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('[data-testid="checkbox-label"]');
    expect(labelElement.textContent.trim()).toBe('Test Label');
  });

  it('should show error message when variant is error', () => {
    fixture.componentRef.setInput('variant', 'error');
    fixture.componentRef.setInput('errorMessage', 'Error message');
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector(
      '[data-testid="checkbox-error-message"]'
    );
    expect(errorElement.textContent.trim()).toBe('Error message');
  });
});
