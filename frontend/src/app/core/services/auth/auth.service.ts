import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { environment } from '../../../../environments/environment';
import { ILoginResponse } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  signIn({ email, password }: { email: string; password: string }) {
    return injectQuery(() => ({
      queryKey: ['signIn'],
      queryFn: () =>
        this.http.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, {
          email: email,
          password: password,
        }),
    }));
  }
}
