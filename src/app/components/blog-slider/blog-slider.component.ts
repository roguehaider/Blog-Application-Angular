import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { BlogService } from '../../services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { Blog } from '../../models/blog.model';
import * as BlogActions from '../../../store/actions/blog.action';
import { selectAllBlogs } from '../../../store/selectors/blog.selectors';
import * as BlogSelectors from '../../../store/selectors/blog.selectors';
import { selectFilteredBlogs } from '../../../store/selectors/blog.selectors';

@Component({
  selector: 'app-blog-slider',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    SharedModuleModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers:[MatDatepickerModule,MatNativeDateModule],
  templateUrl: './blog-slider.component.html',
  styleUrl: './blog-slider.component.scss',
})
export class BlogSliderComponent implements OnInit {
  @Input() showCategory: boolean = false;
  @Input() categoryFilter: string = 'all';
  blogs: any[] = [];
  filteredBlogs: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';
  isExpanded = false;
  showLeftArrow = false;
  showRightArrow = true;

  filteredBlogs$: Observable<Blog[]>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;
  searchQuery$: Observable<string>;
  isExpanded$: Observable<boolean>;
  showLeftArrow$: Observable<boolean>;
  showRightArrow$: Observable<boolean>;
  blogs$: Observable<Blog[]>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.blogs$ = this.store.pipe(select(selectAllBlogs));
    this.filteredBlogs$ = this.store.select(selectFilteredBlogs);
    this.filteredBlogs$ = this.store.select(BlogSelectors.selectFilteredBlogs);
    this.categories$ = this.store.select(BlogSelectors.selectCategories);
    this.selectedCategory$ = this.store.select(BlogSelectors.selectSelectedCategory);
    this.searchQuery$ = this.store.select(BlogSelectors.selectSearchQuery);
    this.isExpanded$ = this.store.select(BlogSelectors.selectIsExpanded);
    this.showLeftArrow$ = this.store.select(BlogSelectors.selectShowLeftArrow);
    this.showRightArrow$ = this.store.select(BlogSelectors.selectShowRightArrow);
  }

  ngOnInit(): void {


    // this.store.dispatch(BlogActions.loadBlogs());
    // this.route.params.subscribe(params => {
    //   const category = params['category'] || 'all';
    //   this.store.dispatch(BlogActions.setSelectedCategory({ category }));
    // });


    this.blogService.getBlogs().subscribe((data: any[]) => {
      this.blogs = data.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      this.extractCategories();
      this.applyFilter();
    });

    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'] || this.categoryFilter || 'all';
      this.applyFilter();
    });
  }




  extractCategories(): void {
    const categorySet = new Set(this.blogs.map((blog) => blog.category));
    this.categories = Array.from(categorySet);
  }
  openEditDialog(blog: any): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '500px',
      data: { blog, isEdit: true },
    });
  }
  deleteBlog(blogId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(BlogActions.deleteBlog({ blogId }));
      }
    });
  }

  navigateToBlogDetail(blogId: string): void {
    this.router.navigate(['/blog', blogId]);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  scrollSlider(direction: number): void {
    const container = document.querySelector(
      '.slider-container'
    ) as HTMLElement;
    const scrollAmount = container.clientWidth * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => {
      this.showLeftArrow = container.scrollLeft > 0;
      this.showRightArrow = container.scrollLeft + container.clientWidth < container.scrollWidth;
    }, 300);
  }



  applyFilter(): void {
    let filtered = this.blogs;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(
        (blog) =>
          blog.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchQuery.trim()) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          blog.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          blog.category
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          blog.createdBy.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredBlogs = filtered;
  }


  // deleteBlog(blogId: string): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Do you want to delete this blog?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.blogService.deleteBlog(blogId).subscribe({
  //         next: () => {
  //           this.blogs = this.blogs.filter((blog) => blog.id !== blogId);
  //           this.applyFilter();
  //           Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
  //         },
  //         error: () => {
  //           Swal.fire('Error!', 'There was an error deleting the blog.', 'error');
  //         }
  //       });
  //     }
  //   });
  // }

   // toggleExpand() {
  //   this.store.dispatch(BlogActions.toggleExpand());
  // }

  // scrollSlider(direction: number) {
    //   this.store.dispatch(BlogActions.scrollSlider({ direction }));
    // }


  // onCategoryChange(category: string) {
  //   this.store.dispatch(BlogActions.setSelectedCategory({ category }));
  // }

  // onSearch(query: string) {
  //   this.store.dispatch(BlogActions.setSearchQuery({ query }));
  // }

   // onCategoryChange(category: string) {
  //   this.store.dispatch(BlogActions.setSelectedCategory({ category }));
  // }

  // onSearchQueryChange(query: string) {
  //   this.store.dispatch(BlogActions.setSearchQuery({ query }));
  // }

}
