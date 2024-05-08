import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [HlmButtonDirective, CommonModule],
  providers: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
  userService = inject(UserService);

  profileQuery =
    isPlatformBrowser(inject(PLATFORM_ID)) &&
    injectQuery(() => ({
      queryKey: ['user-profile'],
      queryFn: async () => {
        try {
          return await this.userService.fetchUserProfile();
        } catch (error: unknown) {
          throw new Error('Failed to fetch user profile');
        }
      },
    }));
}
