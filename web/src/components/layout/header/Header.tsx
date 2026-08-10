import { Menu } from "./components/Menu";

export function Header() {
  return (
    <header className="border-b border-primary-100">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <img src="/pollify-logo.png" className="h-14 w-14" alt="Pollify" />
        <Menu />
      </div>
    </header>
  );
}
