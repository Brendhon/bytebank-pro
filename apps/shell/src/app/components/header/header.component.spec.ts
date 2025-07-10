import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render guest variant correctly', () => {
    fixture.componentRef.setInput('variant', 'guest');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const header = compiled.querySelector('[data-testid="bb-header"]');

    expect(header).toBeTruthy();
    expect(header.classList.contains('justify-center')).toBe(true);
  });

  it('should render user variant correctly', () => {
    fixture.componentRef.setInput('variant', 'user');
    fixture.componentRef.setInput('userName', 'Test User');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const header = compiled.querySelector('[data-testid="bb-header"]');

    expect(header).toBeTruthy();
    expect(header.classList.contains('justify-between')).toBe(true);
  });
});
