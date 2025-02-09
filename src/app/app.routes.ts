import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Protect main layout routes
    children: [
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
      },
      { path: '', redirectTo: 'category', pathMatch: 'full' }, // Default to category
    ],
  },
  // 🔹 Move Blog Detail Route Outside AuthGuard
  { path: 'blog/:id', component: BlogDetailComponent },

  { path: '**', redirectTo: 'login' } // Wildcard route for unknown paths
];
