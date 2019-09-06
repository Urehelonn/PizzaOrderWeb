import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  authForm: FormGroup;
  @Output() submitAuthFormEvent = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        // passCon: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  get passwordRequired() {
    const control = this.authForm.get('password');
    return control.hasError('required') && control.touched;
  }


  get usernameRequired() {
    const control = this.authForm.get('username');
    return control.hasError('required') && control.touched;
  }

  get passwordMinLength() {
    const control = this.authForm.get('password');
    return control.hasError('minlength') && control.touched;
  }

  onSubmit() {
    console.log('sub');
    if (this.authForm.valid) {
      console.log('emit');
      this.submitAuthFormEvent.emit(this.authForm);
    }
  }
}
