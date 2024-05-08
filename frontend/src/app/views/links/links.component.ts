import { CommonModule } from '@angular/common';
import { Component, NgZone, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';
import { UserService } from '../../core/services/user/user.service';
import { UserStore } from '../../core/store/user/user.store';
import { HlmAvatarComponent } from '../../core/components/ui-avatar-helm/src/lib/hlm-avatar.component';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    HlmButtonDirective,
    CommonModule,
    HlmAvatarComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    // HlmSubMenuComponent,
    HlmMenuItemDirective,
    // HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    // HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    // HlmMenuItemIconDirective,
    // HlmMenuItemCheckComponent,
    // HlmMenuItemRadioComponent,
    HlmMenuGroupComponent,
    // HlmMenuItemRadioDirective,
    // HlmMenuItemCheckboxDirective,

    // HlmButtonDirective,
    // HlmIconComponent,
  ],
  providers: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
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
    }))
  );

  onSignOutButtonClick() {
    this.authService.singOut();
    
  }
}
