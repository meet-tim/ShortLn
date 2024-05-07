import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { ThemeStore } from '../../store/theme/theme.store';

@Component({
  selector: 'app-theme-provider',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './theme-provider.component.html',
  styleUrl: './theme-provider.component.css',
})
export class ThemeProviderComponent {
  readonly themeStore = inject(ThemeStore);
  changeDetectionRef = inject(ChangeDetectorRef);
  themeService = inject(ThemeService);
  platformId = inject(PLATFORM_ID);
  isBrowser: boolean;
  color = '';

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    afterNextRender(() => {
      const theme = window.localStorage.getItem('theme');
      if (theme) {
        this.themeService.changeTheme(theme as 'light' | 'dark');
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.themeService.changeTheme('dark');
          return;
        }
        this.themeService.changeTheme('light');
      }
    });
  }

  onThemeToggleClick() {
    console.log('Theme toggle clicked');
    this.themeService.changeTheme();
  }
}
