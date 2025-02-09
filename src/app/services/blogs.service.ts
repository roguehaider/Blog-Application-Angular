import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) {}

  // getBlogs(): Observable<Blog[]> {
  //   return this.http.get<Blog[]>(this.apiUrl);
  // }

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBlogsByCategory(category: string) {
    if (category === 'all') {
      return this.getBlogs();
    }
    return this.http.get(`${this.apiUrl}?category=${category}`);
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBlog(blogData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blogData);
  }

  updateBlog(id: string, blogData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, blogData);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
