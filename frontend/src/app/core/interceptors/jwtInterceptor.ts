import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  //   If auth token is expired, return a 404 error
  if (authService.isTokenExpired()) return next(req);

  const cookies = document.cookie.split(';');
  const token = cookies
    .find((cookie) => cookie.includes('access_token='))
    ?.split('=')[1];
  console.log(cookies);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
}
