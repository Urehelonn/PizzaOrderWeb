import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  authForm: FormGroup;
  @Input() usernameChecking;
  @Input() usernameInUse;
  @ViewChild('usernameInput', {static: true}) usernameIn: ElementRef;
  @Output() submitAuthFormEvent = new EventEmitter<FormGroup>();
  @Output() nameCheck = new EventEmitter<string>();


  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        // passCon: ['', Validators.required]
      }
    );
  }

  get inputControl() {
    return this.usernameIn.nativeElement;
  }

  ngOnInit() {
    fromEvent(this.usernameIn.nativeElement, 'keyup')
      .pipe(debounceTime(800),
        filter(obj =>
          this.inputControl.value.length >= 4
        ),
        distinctUntilChanged()
      )
      .subscribe(obj => {
        this.nameCheck.emit(this.usernameIn.nativeElement.value);
      });
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

  get usernameMinLength() {
    const control = this.authForm.get('username');
    return control.hasError('minlength') && control.touched;
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.submitAuthFormEvent.emit(this.authForm);
    }
  }
}
