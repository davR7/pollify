import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "@/components/ui/Loading";
import { useAuth } from "@/hooks/useAuth";

export function PublicOnly() {
  const { isLoggedIn, loading } = useAuth();

  const isAuthenticated = isLoggedIn();

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
