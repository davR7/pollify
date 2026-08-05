import { Navigate, Outlet } from "react-router-dom";

export function RequireAuth() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
