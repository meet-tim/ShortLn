import { HttpHeaders } from '@angular/common/http';

export interface ILoginResponse {
  access_token: string;
}

export interface IUserLogInDetails {
  email: string;
  password: string;
}

export interface IUserSignUpDetails {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface IUserSignUpErrorResponse {
  headers: HttpHeaders;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: {
    message: string;
    error: string;
    statusCode: number;
  };
}

export interface decodedJwt {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
