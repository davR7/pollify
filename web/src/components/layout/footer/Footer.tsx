import { Container } from "@/components/layout/container";
import { SocialSection } from "./SocialSection";

export function Footer() {
  return (
    <div className="pb-20 md:pb-0">
      <footer className="border-t border-slate-200 bg-[#3E3835] hidden md:block">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-white sm:flex-row px-4 py-6  sm:px-6 lg:px-8">
            <div>
              <p className="text-base font-semibold">
                © {new Date().getFullYear()} Pollify. Todos os direitos reservados.
              </p>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
                Criado para tornar mais simples compartilhar perguntas, descobrir opiniões e
                participar de enquetes com a comunidade.
              </p>
            </div>
            <SocialSection />
          </div>
        </Container>
      </footer>
    </div>
  );
}
