import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const cookies = document.cookie.split(';');
  const token = cookies
    .find((cookie) => cookie.includes('access_token'))
    ?.split('=')[1];

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
}
