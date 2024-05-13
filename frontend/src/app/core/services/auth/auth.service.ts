import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ILoginResponse,
  IUserLogInDetails,
  IUserSignUpDetails,
  decodedJwt,
} from './auth.interface';
import { Router } from '@angular/router';
import { injectQueryClient } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  platformId = inject(PLATFORM_ID);
  router = inject(Router);
  queryClient = injectQueryClient();

  signIn(logInDetails: IUserLogInDetails): Promise<ILoginResponse> {
    return lastValueFrom<ILoginResponse>(
      this.http.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, {
        email: logInDetails.email,
        password: logInDetails.password,
      }),
    );
  }

  signUp(signUpDetails: IUserSignUpDetails): Promise<unknown> {
    return lastValueFrom(
      this.http.post(`${environment.apiUrl}/auth/signup`, {
        email: signUpDetails.email,
        password: signUpDetails.password,
        firstname: signUpDetails.firstname,
        lastname: signUpDetails.lastname,
      }),
    );
  }

  singOut() {
    if (!isPlatformBrowser(this.platformId)) return;
    document.cookie =
      'shortln_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.queryClient.removeQueries();
    this.router.navigate(['/sign-in']);
  }

  setToken(token: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const decodedToken = jwtDecode<decodedJwt | null>(token);
    if (decodedToken) {
      document.cookie = `shortln_access_token=${token}; expires=${new Date(
        decodedToken.exp * 1000,
      )}; path=/; SameSite=Strict; Secure;`;
    } else {
      console.log('Token not set - Invalid token');
    }
  }

  isTokenExpired(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;

    const cookies = document.cookie.split(';');
    const token = cookies
      .find((cookie) => cookie.includes('shortln_access_token'))
      ?.split('=')[1];
    if (!token) {
      return true;
    }
    const decodedToken = jwtDecode<decodedJwt | null>(token);
    if (!decodedToken) {
      return true;
    }
    return decodedToken.exp * 1000 < Date.now();
  }
}
