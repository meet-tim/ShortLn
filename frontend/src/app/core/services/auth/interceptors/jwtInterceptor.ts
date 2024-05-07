import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log(req.url);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer `,
    },
  });
  return next(authReq);
}
