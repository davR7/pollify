import { Container } from "@/components/layout/container";
import { AppNavigation } from "./components/app-navigation";

export function Header() {
  return (
    <header className="border-b border-primary-100 mb-6 py-6">
      <Container>
        <div className="flex items-center justify-center md:justify-between h-16 px-4 sm:px-6 lg:px-8">
          <img src="/pollify-logo.png" className="h-16 w-17 md:h-13 md:w-14" alt="Pollify" />
          <AppNavigation />
        </div>
      </Container>
    </header>
  );
}
