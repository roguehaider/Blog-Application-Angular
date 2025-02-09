import { createReducer, on } from '@ngrx/store';
import * as BlogActions from '../actions/blog.action';
import { Blog } from '../../app/models/blog.model';

export interface BlogState {
  blogs: Blog[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  error: any;
  isExpanded: boolean;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  categoryFilter: string | null;
  blogDetail: any | null;

}

export const initialState: BlogState = {
  blogs: [],
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
  isExpanded: false,
  showLeftArrow: false,
  showRightArrow: true,
  categoryFilter:null,
  blogDetail: null
};

export const blogReducer = createReducer(
  initialState,
  // on(BlogActions.loadBlogs, (state) => ({ ...state, loading: true })),
  // on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({
  //   ...state,
  //   blogs,
  //   loading: false,
  //   error: null
  // })),
  // on(BlogActions.loadBlogsFailure, (state, { error }) => ({
  //   ...state,
  //   loading: false,
  //   error
  // })),

  on(BlogActions.loadBlogs, state => ({ ...state, loading: true })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({ ...state, blogs, loading: false })),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(BlogActions.setSelectedCategory, (state, { category }) => ({ ...state, selectedCategory: category })),
  on(BlogActions.setSearchQuery, (state, { query }) => ({ ...state, searchQuery: query })),





  // Create Blog Reducer
  on(BlogActions.createBlogSuccess, (state, { blog }) => ({
    ...state,
    blogs: [...state.blogs, blog],
  })),

  on(BlogActions.createBlogFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update Blog Reducer
  on(BlogActions.updateBlogSuccess, (state, { blog }) => ({
    ...state,
    blogs: state.blogs.map((b) => (b.id === blog.id ? blog : b)),
  })),

  on(BlogActions.updateBlogFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Delete Blog
  on(BlogActions.deleteBlog, (state, { blogId }) => ({
    ...state,
    blogs: state.blogs.filter((blog) => blog.id!== blogId),
  })),

  //Detail Blog Reducer
  on(BlogActions.loadBlogDetail, (state) => ({
    ...state,
    blogDetail: null,
    error: null,
  })),

  on(BlogActions.loadBlogDetailSuccess, (state, { blog }) => ({
    ...state,
    blogDetail: blog,
  })),

  on(BlogActions.loadBlogDetailFailure, (state, { error }) => ({
    ...state,
    error,
  }))




);
