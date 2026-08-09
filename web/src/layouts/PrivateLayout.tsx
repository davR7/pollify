import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export function PrivateLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
