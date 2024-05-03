import { afterNextRender, Component, inject } from '@angular/core';
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
  globalWindow!: Window;

  constructor() {
    afterNextRender(() => {
      this.globalWindow = window;
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
