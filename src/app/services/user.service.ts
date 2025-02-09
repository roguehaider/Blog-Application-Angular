import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

import { User } from '../models/user.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // signup(userData: any): Observable<any> {
  //   return this.http.get<any[]>(`${this.apiUrl}/users?email=${userData.email}`).pipe(
  //     map(users => {
  //       if (users.length > 0) {
  //         throw new Error('User with this email already exists');
  //       }
  //       return this.http.post<any>(`${this.apiUrl}/users`, userData);
  //     }),
  //     catchError(error => {
  //       if (error.message === 'User with this email already exists') {
  //         return throwError('User with this email already exists');
  //       }
  //       return throwError('An error occurred. Please try again later.');
  //     })
  //   );
  // }

  signup(userData: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${userData.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return throwError('User with this email already exists');
        }
        return this.http.post<any>(`${this.apiUrl}/users`, userData);
      }),
      catchError(error => {
        if (typeof error === 'string') {
          return throwError(error);
        }
        return throwError('An error occurred. Please try again later.');
      })
    );
  }

  editProfile(userId: string, userData: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${userData.email}`).pipe(
      switchMap(users => {
        const existingUser = users.find(user => user.id !== userId);
        if (existingUser) {
          return throwError('Email already exists');
        }
        return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData);
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
    } else {
      throw new Error('User not authenticated');
    }
  }

  updatePassword(userId: string, updatedUserData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, updatedUserData).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
}
