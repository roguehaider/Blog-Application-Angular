import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { BlogService } from '../../services/blogs.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    CommonModule,
    MatIconModule,
    NgFor,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private isDarkTheme = false;
  constructor(private router: Router, private blogService: BlogService) {}

  menuItems = [
    { name: 'All Blogs', icon: 'article', link: '/category/all-blogs' },
    { name: 'Fashion', icon: 'checkroom', link: '/category/fashion' },
    { name: 'Sports', icon: 'sports_soccer', link: '/category/sports' },
    { name: 'Games', icon: 'sports_esports', link: '/category/games' },
    { name: 'News', icon: 'newspaper', link: '/category/news' },
    { name: 'Food', icon: 'restaurant', link: '/category/food' },
    { name: 'Movies', icon: 'movie', link: '/category/movies' },
  ];

  filterByCategory(category: string) {
    const categoryParam = category.toLowerCase().replace(' ', '-');
    this.router.navigate(['/category', categoryParam]);
  }

  isDarkMode(): boolean {
    return this.isDarkTheme;
  }
}
