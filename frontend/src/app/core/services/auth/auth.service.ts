import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  IUserLogInDetails,
  ILoginResponse,
  IUserSignUpDetails,
} from './auth.interface';
import { lastValueFrom } from 'rxjs';

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

  // setToken(token: string) {
  //   // set token in cookies, and make it httpOnly cookie
  //   document.cookie = 'token';
  // }
}
