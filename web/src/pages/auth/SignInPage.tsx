import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthHeader } from "@/pages/auth/components/AuthHeader";
import { type SigninFormData, signinSchema } from "@/schemas/sign-in.schema";
import { ActionPrompt } from "./components/ActionPrompt";

export function SignInPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (input: SigninFormData) => {
    try {
      await login(input);
      return navigate("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("root", {
          message: err.response?.data.message,
        });
      }
    }
  };
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-md">
        <AuthHeader description="Faça login e descubra o que a comunidade está perguntando." />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            Entrar
          </button>
          <ActionPrompt
            title="Não tem conta?"
            description="Crie uma gratis"
            to="/signup"
            icon={<FiUserPlus />}
          />
        </form>
      </div>
    </main>
  );
}
