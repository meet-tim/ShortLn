import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  IUserLogInDetails,
  ILoginResponse,
  IUserSignUpDetails,
  decodedJwt,
} from './auth.interface';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  platformId = inject(PLATFORM_ID);

  signIn(logInDetails: IUserLogInDetails): Promise<ILoginResponse> {
    return lastValueFrom<ILoginResponse>(
      this.http.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, {
        email: logInDetails.email,
        password: logInDetails.password,
      })
    );
  }

  signUp(signUpDetails: IUserSignUpDetails): Promise<unknown> {
    return lastValueFrom(
      this.http.post(`${environment.apiUrl}/auth/signup`, {
        email: signUpDetails.email,
        password: signUpDetails.password,
        firstname: signUpDetails.firstname,
        lastname: signUpDetails.lastname,
      })
    );
  }

  setToken(token: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const decodedToken = jwtDecode<decodedJwt | null>(token);
    if (decodedToken) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 2); // add 2 minutes to the current time
      document.cookie = `access_token=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure;`;
    } else {
      console.error('Token not set - Invalid token');
    }
  }

  isTokenExpired(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;

    const cookies = document.cookie.split(';');
    const token = cookies
      .find((cookie) => cookie.includes('access_token'))
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
