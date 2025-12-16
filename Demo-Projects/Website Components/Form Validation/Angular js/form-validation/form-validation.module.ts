import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationComponent } from './form-validation.component';

@NgModule({
  declarations: [FormValidationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormValidationComponent]
})
export class FormValidationModule {}
