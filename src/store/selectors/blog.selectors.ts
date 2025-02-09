import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BlogState } from '../reducers/blog.reducer';
import { Blog } from '../../app/models/blog.model';

export const selectBlogState = createFeatureSelector<BlogState>('blog');

// export const selectAllBlogs = createSelector(
//   selectBlogState,
//   (state) => state.blogs
// );
// export const selectBlogsLoading = createSelector(
//   selectBlogState,
//   (state) => state.loading
// );
// export const selectBlogsError = createSelector(
//   selectBlogState,
//   (state) => state.error
// );

export interface HighlightedBlog extends Blog {
  highlightedTitle: string;
  highlightedDescription: string;
  highlightedCategory: string;
  highlightedCreatedBy: string;
}

export const selectAllBlogs = createSelector(
  selectBlogState,
  (state: BlogState) => state.blogs
);

export const selectCategoryFilter = createSelector(
  selectBlogState,
  (state) => state.categoryFilter
);

export const selectFilteredBlogs = createSelector(
  selectAllBlogs,
  selectBlogState,
  (blogs, state): HighlightedBlog[] => {
    let filtered = blogs;
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category.toLowerCase() === state.selectedCategory.toLowerCase());
    }

    const highlightText = (text: string, query: string): string => {
      if (!query.trim()) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    };

    if (state.searchQuery.trim()) {
      return filtered
        .filter(blog =>
          blog.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          blog.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          blog.createdBy.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
        .map(blog => ({
          ...blog,
          highlightedTitle: highlightText(blog.title, state.searchQuery),
          highlightedDescription: highlightText(blog.description, state.searchQuery),
          highlightedCategory: highlightText(blog.category, state.searchQuery),
          highlightedCreatedBy: highlightText(blog.createdBy, state.searchQuery)
        }));
    }

    return filtered.map(blog => ({
      ...blog,
      highlightedTitle: blog.title,
      highlightedDescription: blog.description,
      highlightedCategory: blog.category,
      highlightedCreatedBy: blog.createdBy
    }));
  }
);

export const selectCategories = createSelector(
  selectAllBlogs,
  (blogs) => Array.from(new Set(blogs.map(blog => blog.category)))
);

export const selectSelectedCategory = createSelector(
  selectBlogState,
  (state: BlogState) => state.selectedCategory
);

export const selectSearchQuery = createSelector(
  selectBlogState,
  (state: BlogState) => state.searchQuery
);

export const selectIsExpanded = createSelector(
  selectBlogState,
  (state: BlogState) => state.isExpanded
);

export const selectShowLeftArrow = createSelector(
  selectBlogState,
  (state: BlogState) => state.showLeftArrow
);

export const selectShowRightArrow = createSelector(
  selectBlogState,
  (state: BlogState) => state.showRightArrow
);
export const selectBlogDetail = createSelector(
  selectBlogState,
  (state) => state.blogDetail
);
