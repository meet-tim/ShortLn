export interface UserProfileResponse {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface UserProfileResponseError {
  message: string;
  statusCode: number;
}
