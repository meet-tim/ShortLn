import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { environment } from '../environments/environment';
import { ThemeProviderComponent } from './core/components/theme-provider/theme-provider.component';
import { HlmButtonDirective } from './core/components/ui-button-helm/src/lib/hlm-button.directive';
import { ThemeStore } from './core/store/theme/theme.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HlmButtonDirective,
    ThemeProviderComponent,
    AngularQueryDevtools,
    ...(environment.enableAngularQueryDevtools ? [AngularQueryDevtools] : []),
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  themeStore = inject(ThemeStore);
  environment = environment;

  onBtnClick() {
    console.log('Button clicked');
    this.themeStore.setTheme(
      this.themeStore.currentTheme() === 'light' ? 'dark' : 'light'
    );
  }
}
