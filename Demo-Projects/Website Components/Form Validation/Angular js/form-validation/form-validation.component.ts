import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

const NAME_REGEX = /^[a-zA-Z\s]+$/;
const PHONE_REGEX = /^\d{10,}$/;
const PASS_REGEX  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('pass')?.value ?? '';
  const pass_c = group.get('pass_c')?.value ?? '';
  return pass && pass_c && pass !== pass_c ? { passwordsDontMatch: true } : null;
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent {
  submitted = false;

  form: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      pass: ['', [Validators.required, Validators.pattern(PASS_REGEX)]],
      pass_c: ['', [Validators.required]]
    },
    { validators: matchPasswords }
  );

  constructor(private fb: FormBuilder) {}

  get f() { return this.form.controls; }

  send(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitted = true;
  }

  closeMessage(): void {
    this.submitted = false;
    this.form.reset();
  }
}
