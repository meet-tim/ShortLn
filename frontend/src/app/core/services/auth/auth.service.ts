import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  IUserLogInDetails,
  ILoginResponse,
  IUserSignUpDetails,
} from './auth.interface';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface decodedJwt {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

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
    const decodedToken = jwtDecode<decodedJwt | null>(token);
    if (decodedToken) {
      document.cookie = `access_token=${token}; expires=${new Date(
        decodedToken.exp * 1000
      ).toUTCString()}; path=/; SameSite=Strict; Secure;`;
    } else {
      console.error('Token not set - Invalid token');
    }
  }
}
