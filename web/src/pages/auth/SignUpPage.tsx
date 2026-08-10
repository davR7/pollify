import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { LuLogIn } from "react-icons/lu";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { AuthHeader } from "@/pages/auth/components/AuthHeader";
import { type SignupFormData, signupSchema } from "@/schemas/sign-up.schema";
import { ActionPrompt } from "./components/ActionPrompt";

export function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { signup } = useAuth();

  const onSubmit = async (input: SignupFormData) => {
    try {
      await signup(input);
      toast.success("Conta criada com sucesso!", {
        description: "Participe das enquetes da comunidade.",
      });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError("root", {
          message: err.response?.data.message,
        });
      }
    }
  };
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-md">
        <AuthHeader description="Junte-se à comunidade e dê voz às suas opiniões." />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              id="fullname"
              type="text"
              autoComplete="name"
              placeholder="Seu nome completo"
              {...register("fullname")}
              className={`h-14 w-full rounded-lg border border-[#d9e1e8]
                    bg-white px-4 text-sm text-[#24344d]
                    outline-none transition
                    placeholder:text-[#a0adbd]
                    hover:border-[#bfcbd5]
                    focus:border-primary-500
                    focus:ring-4 focus:ring-[#3eb4c1]/10"
            ${
              errors.fullname
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:border-primary-500 focus:ring-[#3eb4c1]/10"
            }`}
            />
            {errors.fullname && (
              <p className="mt-2 text-sm text-red-500">{errors.fullname.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Seu e-mail"
              {...register("email")}
              className={`h-14 w-full rounded-lg border border-[#d9e1e8]
                    bg-white px-4 text-sm text-[#24344d]
                    outline-none transition
                    placeholder:text-[#a0adbd]
                    hover:border-[#bfcbd5]
                    focus:border-primary-500
                    focus:ring-4 focus:ring-[#3eb4c1]/10"
            ${
              errors.email
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:border-primary-500 focus:ring-[#3eb4c1]/10"
            }`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              {...register("password")}
              className={`h-14 w-full rounded-lg border border-[#d9e1e8]
                    bg-white px-4 text-sm text-[#24344d]
                    outline-none transition
                    placeholder:text-[#a0adbd]
                    hover:border-[#bfcbd5]
                    focus:border-primary-500
                    focus:ring-4 focus:ring-[#3eb4c1]/10"
            ${
              errors.password
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:border-primary-500 focus:ring-[#3eb4c1]/10"
            }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {errors.root && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}
          <button
            type="submit"
            className="
                flex h-14 w-full items-center justify-center gap-3
                rounded-lg bg-primary-600
                text-sm font-semibold text-white
                shadow-sm transition
                hover:bg-primary-700
                focus:outline-none
                focus:ring-4 focus:ring-[#27aabd]/20
                active:scale-[0.99]
                cursor-pointer
              "
          >
            Quero me cadastrar
          </button>
          <ActionPrompt
            title="Já possui conta?"
            description="Entre na plataforma"
            to="/signin"
            icon={<LuLogIn />}
          />
        </form>
      </div>
    </main>
  );
}
