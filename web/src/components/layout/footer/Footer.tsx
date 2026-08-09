import { SocialSection } from "./SocialSection";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#3E3835]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-white sm:flex-row sm:px-6 lg:px-8">
        <div>
          <p className="text-base font-semibold">
            © {new Date().getFullYear()} Pollify. Todos os direitos reservados.
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
            Criado para tornar mais simples compartilhar perguntas, descobrir opiniões e participar
            de enquetes com a comunidade.
          </p>
        </div>
        <SocialSection />
      </div>
    </footer>
  );
}
