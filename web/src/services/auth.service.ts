import { api, apiPrivate } from "@/libs/api";
import type {
  MeResponse,
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
} from "@/types/auth.types";

export async function signIn(input: SignInRequest): Promise<SignInResponse> {
  const response = await api.post("/auth/signin", input);
  return response.data;
}

export async function getProfile(): Promise<MeResponse> {
  const response = await apiPrivate.get("/auth/me");
  return response.data;
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  const output = await api.post("/auth/refresh");
  return output.data;
}

export async function signOut() {
  await apiPrivate.post("/auth/signout");
}
