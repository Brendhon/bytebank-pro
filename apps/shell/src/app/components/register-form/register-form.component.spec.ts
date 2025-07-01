import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial form state', () => {
    expect(component.formData().name).toBe('');
    expect(component.formData().email).toBe('');
    expect(component.formData().password).toBe('');
    expect(component.formData().acceptPrivacy).toBe(false);
    expect(component.passwordConfirmation()).toBe('');
  });

  it('should validate required fields', () => {
    expect(component.isFormValid()).toBe(false);
  });
});
