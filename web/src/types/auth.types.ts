import type { User } from "../models/user.model";

export type MeResponse = User;

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
