import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('[data-testid="dialog-close-button"]');
    closeButton?.click();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should display title when provided', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('title', 'Test Dialog');
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('[data-testid="dialog-title"]');
    expect(titleElement?.textContent?.trim()).toBe('Test Dialog');
  });

  it('should hide dialog when isOpen is false', () => {
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.bb-dialog-overlay');
    expect(getComputedStyle(overlay).display).toBe('none');
  });

  it('should show dialog when isOpen is true', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.bb-dialog-overlay');
    expect(getComputedStyle(overlay).display).toBe('flex');
  });
});
