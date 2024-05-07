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
export interface decodedJwt {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
