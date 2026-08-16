import type { PropsWithChildren } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthInterceptor } from "./AuthInterceptor";
import type { AuthContextProps } from "./auth-context.types";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthContextProps["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <AuthInterceptor onUserChange={setUser} onLoadingChange={setLoading} />
      {children}
    </AuthContext.Provider>
  );
}
