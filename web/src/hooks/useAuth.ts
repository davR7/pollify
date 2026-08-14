import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { setAccessToken } from "@/services/access-token.store";
import * as authService from "@/services/auth.service";
import type { SignInRequest, SignUpRequest } from "@/types/auth.types";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  function isLoggedIn(): boolean {
    return context?.user !== null;
  }

  async function login(input: SignInRequest) {
    const response = await authService.signIn(input);
    setAccessToken(response.accessToken);
    const user = await authService.getProfile();
    context?.setUser(user);
  }

  async function signup(input: SignUpRequest) {
    return authService.signUp(input);
  }

  async function signout() {
    await authService.signOut();
    context?.setUser(null);
  }

  return {
    login,
    isLoggedIn,
    signout,
    signup,
    loading: context.loading,
  };
}
