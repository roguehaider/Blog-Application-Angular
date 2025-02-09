import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blogs.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Store,select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loadBlogDetail } from '../../../store/actions/blog.action';
import { selectBlogDetail } from '../../../store/selectors/blog.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule,NavbarComponent,SidebarComponent,MatIconModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blog: any;
  blog$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location
  ) {this.blog$ = this.store.pipe(select(selectBlogDetail));}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const blogId = params.get('id');
      if (blogId) {
        this.store.dispatch(loadBlogDetail({ blogId }));
      }
    });
    // this.blog$ = this.store.pipe(select(selectBlogDetail));

    // this.route.paramMap.subscribe((params) => {
    //   const blogId = params.get('id'); // No need to convert to number
    //   if (blogId) {
    //     this.getBlogDetails(blogId);
    //   }
    // });


  }

  goBack() {
    this.location.back();
  }
  }
  // getBlogDetails(id: string): void {
  //   // Change parameter type to string
  //   console.log('Fetching Blog Details for ID:', id);
  //   this.blogService.getBlogById(id).subscribe({
  //     next: (data) => {
  //       console.log('Blog Data:', data); // Log the data to verify it's being fetched
  //       this.blog = data;
  //     },
  //     error: (error) => console.error('Error fetching blog details:', error),
  //   });
  // }
