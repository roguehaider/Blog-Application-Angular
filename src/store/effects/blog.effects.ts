import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogService } from '../../app/services/blogs.service';
import * as BlogActions from '../actions/blog.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class BlogEffects {
  constructor(private actions$: Actions, private blogService: BlogService) {}

  // loadBlogs$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BlogActions.loadBlogs),
  //     mergeMap(() =>
  //       this.blogService.getBlogs().pipe(
  //         map((blogs) => BlogActions.loadBlogsSuccess({ blogs })),
  //         catchError((error) => of(BlogActions.loadBlogsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() =>
        this.blogService.getBlogs().pipe(
          map(blogs => BlogActions.loadBlogsSuccess({ blogs })),
          catchError(error => of(BlogActions.loadBlogsFailure({ error })))
        )
      )
    )
  );




  createBlog$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BlogActions.createBlog),
    mergeMap((action) =>
      this.blogService.createBlog(action.blog).pipe(
        map((blog) => {
          Swal.fire('Created!', 'The blog has been created successfully.', 'success');
          window.location.reload();
          return BlogActions.createBlogSuccess({ blog });
        }),
        catchError((error) => {
          Swal.fire('Error!', 'There was an error creating the blog.', 'error');
          return of(BlogActions.createBlogFailure({ error: error.message }));
        })
      )
    )
  )
);

  updateBlog$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BlogActions.updateBlog),
    mergeMap((action) =>
      this.blogService.updateBlog(action.blog.id, action.blog).pipe(
        map((blog) => {
          Swal.fire('Updated!', 'The blog has been updated.', 'success');
          window.location.reload();
          return BlogActions.updateBlogSuccess({ blog });
        }),
        catchError((error) => {
          Swal.fire('Error!', 'There was an error updating the blog.', 'error');
          return of(BlogActions.updateBlogFailure({ error: error.message }));
        })
      )
    )
  )
);

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlog),
      mergeMap((action) =>
        this.blogService.deleteBlog(action.blogId).pipe(
          map(() => {
            Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
            window.location.reload();
            return { type: '[Blog] Delete Blog Success', blogId: action.blogId };
          }),
          catchError(() => {
            Swal.fire('Error!', 'There was an error deleting the blog.', 'error');
            return of({ type: '[Blog] Delete Blog Failure' });
          })
        )
      )
    )
  );

  loadBlogDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogDetail),
      mergeMap((action) =>
        this.blogService.getBlogById(action.blogId).pipe(
          map((blog) => BlogActions.loadBlogDetailSuccess({ blog })),
          catchError((error) => of(BlogActions.loadBlogDetailFailure({ error: error.message })))
        )
      )
    )
  );


}
