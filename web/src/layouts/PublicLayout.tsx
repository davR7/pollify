import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <>
      <img src="pollify-logo.png" alt="logo" />
      <Outlet />
    </>
  );
}
