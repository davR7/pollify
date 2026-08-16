export type MeResponse = {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}

export interface SignUpRequest {
  fullname: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
