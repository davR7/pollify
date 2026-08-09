import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth() {
  const { isLoggedIn } = useAuth();

  const isAuthenticated = isLoggedIn();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
