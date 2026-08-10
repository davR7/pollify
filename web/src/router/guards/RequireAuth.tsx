import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/Loading";

export function RequireAuth() {
  const { isLoggedIn, loading } = useAuth();

  const isAuthenticated = isLoggedIn();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
