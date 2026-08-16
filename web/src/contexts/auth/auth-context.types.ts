import type { Dispatch, SetStateAction } from "react";
import type { MeResponse } from "@/types/auth.types";

export type AuthProps = MeResponse | null;

export type AuthInterceptorProps = {
  onUserChange: (user: AuthProps | null) => void;
  onLoadingChange: (value: boolean) => void;
};

export type SetUser = Dispatch<SetStateAction<AuthProps>>;

export type AuthContextProps = {
  user: AuthProps;
  loading: boolean;
  setUser: SetUser;
};
