import { createContext } from "react";
import type { AuthContextProps } from "./auth-context.types";

export const AuthContext = createContext<AuthContextProps | null>(null);
