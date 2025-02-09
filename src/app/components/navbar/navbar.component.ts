import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';
import { Router } from '@angular/router';

import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/actions/user.action';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private dialog: MatDialog,
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  openCreateBlogDialog() {
    this.dialog.open(BlogDialogComponent, {
      width: '400px',
      data: { isEdit: false },
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
  editProfile() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: { userId: userId },
    });
  }

  changePassword() {
    this.dialog.open(EditPasswordComponent, {
      width: '400px',
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.snackBar.open('Logout Successful!', 'Close', {
      duration: 3000,
    });
  }



  // logout() {
  //   this.authService.logout();
  //   this.snackBar.open('Logout Successful!', 'Close', {
  //     duration: 3000,
  //   });

  //   console.log('Logout Successful!');
  //   this.router.navigate(['/login']);
  //   localStorage.setItem('isLoggedIn', 'false');
  // }
}
