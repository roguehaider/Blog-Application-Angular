import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../../../store/actions/user.action';
import { selectAuthError, selectAuthLoading } from '../../../store/selectors/user.selectors';
import { AppState } from '../../../store/app.state';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private store: Store<AppState>
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);

  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['category/all-blogs']);
    }
    this.error$.subscribe((error) => {
      if (error) {
        Swal.fire('Error', error, 'error');
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(login({ email: username, password }));
    }
  }




  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;

  //     this.authService.login(username, password).subscribe(
  //       (user) => {
  //         Swal.fire('Success', 'Login Successful!', 'success');
  //         console.log('Login Successful!');
  //         localStorage.setItem('isLoggedIn', 'true');
  //         localStorage.setItem('userId', user.id);
  //         localStorage.setItem('user', JSON.stringify(user));
  //         this.router.navigate(['category/all-blogs']).then(() => {
  //           this.location.replaceState('category/all-blogs');
  //         });
  //       },
  //       (error) => {
  //         Swal.fire('Error', 'Invalid Email or Password! Try Again', 'error');
  //         console.log('Login Failed!', error);
  //       }
  //     );
  //   }
  // }
}
