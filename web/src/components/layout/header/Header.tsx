import { Container } from "@/components/ui/Container";
import { Menu } from "./components/Menu";

export function Header() {
  return (
    <header className="border-b border-primary-100 mb-6 py-6">
      <Container>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <img src="/pollify-logo.png" className="h-14 w-14" alt="Pollify" />
          <Menu />
        </div>
      </Container>
    </header>
  );
}
