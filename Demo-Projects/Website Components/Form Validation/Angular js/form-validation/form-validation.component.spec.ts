import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationComponent } from './form-validation.component';

describe('FormValidationComponent', () => {
  let component: FormValidationComponent;
  let fixture: ComponentFixture<FormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormValidationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should not submit when invalid and mark controls as touched', () => {
    component.send();
    expect(component.submitted).toBeFalse();
    const touched = Object.values(component.form.controls).some(c => c.touched);
    expect(touched).toBeTrue();
  });

  it('should set a form error when passwords do not match', () => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      number: '1234567890',
      pass: 'abc12345',
      pass_c: 'abc1234X'
    });
    expect(component.form.errors?.['passwordsDontMatch']).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

  it('should submit when form is valid', () => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      number: '1234567890',
      pass: 'abc12345',
      pass_c: 'abc12345'
    });
    expect(component.form.valid).toBeTrue();
    component.send();
    expect(component.submitted).toBeTrue();
  });

  it('closeMessage should reset submitted flag and form', () => {
    component.submitted = true;
    component.closeMessage();
    expect(component.submitted).toBeFalse();
    expect(component.form.pristine).toBeTrue();
  });
});
