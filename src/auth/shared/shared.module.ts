import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AuthFormComponent],
  exports: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]

})
export class SharedModule {
}
