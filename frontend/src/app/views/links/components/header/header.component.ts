import { CommonModule } from '@angular/common';
import { Component, NgZone, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import {
  injectQuery
} from '@tanstack/angular-query-experimental';
import { HlmAvatarComponent } from '../../../../core/components/ui-avatar-helm/src/lib/hlm-avatar.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { UserStore } from '../../../../core/store/user/user.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HlmButtonDirective,
    CommonModule,
    HlmAvatarComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    RouterLink
  ],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userService = inject(UserService);
  userStore = inject(UserStore);
  ngZone = inject(NgZone);
  authService = inject(AuthService);

  profileQuery = this.ngZone.runOutsideAngular(() =>
    injectQuery(() => ({
      queryKey: ['user-profile'],
      queryFn: async () => {
        try {
          const data = await this.userService.fetchUserProfile();
          return this.ngZone.run(() => {
            this.userStore.setUserNameAndEmail({
              email: data.email,
              name: data.sub,
            });
            return data;
          });
        } catch (error: unknown) {
          throw new Error('Failed to fetch user profile');
        }
      },
    })),
  );

  onSignOutButtonClick() {
    this.authService.singOut();
  }
}
