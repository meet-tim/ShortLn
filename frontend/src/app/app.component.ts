import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from './core/components/ui-button-helm/src/lib/hlm-button.directive';
import { ThemeStore } from './core/store/theme/theme.store';
import { ThemeProviderComponent } from './core/components/theme-provider/theme-provider.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HlmButtonDirective,
    ThemeProviderComponent,
    AngularQueryDevtools,
  ],
  providers: [],
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
