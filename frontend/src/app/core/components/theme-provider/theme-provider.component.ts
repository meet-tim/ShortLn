import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { ThemeStore } from '../../store/theme/theme.store';

@Component({
  selector: 'app-theme-provider',
  standalone: true,
  imports: [],
  templateUrl: './theme-provider.component.html',
  styleUrl: './theme-provider.component.css',
})
export class ThemeProviderComponent {
  themeStore = inject(ThemeStore);
  platformId = inject(PLATFORM_ID);
  isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    afterNextRender(() => {
      const theme = window.localStorage.getItem('theme');
      if (theme) {
        this.themeStore.setTheme(
          theme === 'light' || theme === 'dark' ? theme : 'light'
        );
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.themeStore.setTheme('dark');
          return;
        }
        this.themeStore.setTheme('light');
      }
    });
  }
}
