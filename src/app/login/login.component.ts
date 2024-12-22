import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { useUserStore } from '../core/stores/user';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly userStore = inject(useUserStore);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  matcher = new LoginFormErrorStateMatcher();

  get showValidEmailError() {
    const emailControl = this.loginForm.controls.email;
    return emailControl.hasError('email') && !emailControl.hasError('required');
  }

  onSubmit() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) return;

    this.userStore.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.reset();
  }
}
