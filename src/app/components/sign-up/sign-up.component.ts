import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/actions/user.action';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        dateOfBirth: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }


  onSubmit() {
    if (this.signupForm.valid) {
      const userData = { ...this.signupForm.value };
      delete userData.confirmPassword;

      this.store.dispatch(AuthActions.signup({ userData }));
    } else {
      console.log('Form is invalid');
    }
  }

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     const userData = { ...this.signupForm.value };
  //     delete userData.confirmPassword;

  //     this.userService.signup(userData).subscribe({
  //       next: (response: any) => {
  //         console.log('Signup successful!');
  //         Swal.fire('Success', 'User Created successfully!', 'success');
  //         this.router.navigate(['/login']);
  //       },
  //       error: (error: any) => {
  //         console.error('Signup failed:', error);
  //         Swal.fire('Error', 'Error Creating User! Try Again!', 'error');
  //       }
  //     });
  //   } else{console.log('Form is invalid');
  //   }
  // }
}
