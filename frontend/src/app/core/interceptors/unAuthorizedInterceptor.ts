import { Location } from '@angular/common';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export function unAuthorizedInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const router = inject(Router);
  const location = inject(Location);
  if (location.path().includes('sign-in')) return next(req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/sign-in']);
      }
      return next(req);
    })
  );
}
