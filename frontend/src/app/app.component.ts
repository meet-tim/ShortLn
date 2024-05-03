import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from './core/components/ui-button-helm/src/lib/hlm-button.directive';
import { ThemeStore } from './core/store/theme/theme.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HlmButtonDirective],
  providers: [ThemeStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  themeStore = inject(ThemeStore);

  onBtnClick() {
    console.log('Button clicked');
    this.themeStore.setTheme(
      this.themeStore.currentTheme() === 'light' ? 'dark' : 'light'
    );
  }
}
