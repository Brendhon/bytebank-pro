import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent, SelectOption } from './select.component';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;

    // Set default options for testing
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display placeholder when no value is selected', () => {
    fixture.componentRef.setInput('placeholder', 'Choose an option');
    fixture.detectChanges();

    const triggerElement = fixture.debugElement.query(By.css('[data-testid="select-trigger"]'));

    expect(triggerElement.nativeElement.textContent.trim()).toContain('Choose an option');
  });

  it('should open dropdown when clicked', () => {
    const triggerElement = fixture.debugElement.query(By.css('[data-testid="select-trigger"]'));

    expect(component.isOpen()).toBeFalsy();

    triggerElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBeTruthy();

    const dropdown = fixture.debugElement.query(By.css('[data-testid="select-dropdown"]'));

    expect(dropdown).toBeTruthy();
  });

  it('should emit valueChange when option is selected', () => {
    spyOn(component.valueChange, 'emit');

    // Open dropdown
    const triggerElement = fixture.debugElement.query(By.css('[data-testid="select-trigger"]'));
    triggerElement.nativeElement.click();
    fixture.detectChanges();

    // Click first option
    const firstOption = fixture.debugElement.query(By.css('[data-testid="select-option-0"]'));
    firstOption.nativeElement.click();
    fixture.detectChanges();

    expect(component.valueChange.emit).toHaveBeenCalledWith('option1');
  });

  it('should show clear button when clearable and has value', () => {
    fixture.componentRef.setInput('clearable', true);
    fixture.componentRef.setInput('value', 'option1');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('[data-testid="clear-button"]'));

    expect(clearButton).toBeTruthy();
  });

  it('should handle keyboard navigation', () => {
    const hostElement = fixture.nativeElement;

    // Open with Enter key
    hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.isOpen()).toBeTruthy();

    // Navigate with Arrow Down
    hostElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    expect(component.focusedOptionIndex()).toBe(0);
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const triggerElement = fixture.debugElement.query(By.css('[data-testid="select-trigger"]'));

    expect(triggerElement.nativeElement.getAttribute('tabindex')).toBe('-1');

    triggerElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBeFalsy();
  });
});
