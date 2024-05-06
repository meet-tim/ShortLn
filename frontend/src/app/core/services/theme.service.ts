import { inject, Injectable } from '@angular/core';
import { ThemeStore } from '../store/theme/theme.store';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeStore = inject(ThemeStore);

  changeTheme(theme?: 'light' | 'dark') {
    console.log(theme);
    const currentTheme = this.themeStore.currentTheme();
    const newTheme = theme || (currentTheme === 'light' ? 'dark' : 'light');
    console.log('Changing theme to', newTheme);
    this.themeStore.setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  }
}
