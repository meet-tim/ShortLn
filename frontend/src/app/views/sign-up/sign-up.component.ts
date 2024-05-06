import { Component, inject } from '@angular/core';
import { ThemeStore } from '../../core/store/theme/theme.store';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  themeStore = inject(ThemeStore);
}
