import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { toast } from 'ngx-sonner';

export const checkAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isTokenExpired()) {
    router.navigate(['/sign-in']);
    toast('Session expired', {
      description: 'Try logging in again to continue',
      action: {
        label: 'Close',
        onClick: () => null,
      },
    });
    return false;
  }
  return true;
};
