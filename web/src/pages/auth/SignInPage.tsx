import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { InputGroup } from "@/components/ui/InputGroup";
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
      if (isAxiosError(err)) {
        if (err.status === 401) {
          setError("root", {
            message: "E-mail ou senha incorretos.",
          });
        } else {
          setError("root", {
            message: "Oops, erro desconhecido.",
          });
        }
      }
    }
  };
  return (
    <Container className="min-h-screen lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-md">
        <AuthHeader description="Descubra o que a comunidade está perguntando." />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputGroup
            label="Email"
            input="email"
            type="email"
            autoComplete="email"
            placeholder="Seu e-mail"
            error={errors.email?.message}
            {...register("email")}
          />
          <InputGroup
            label="Senha"
            input="password"
            type="password"
            autoComplete="email"
            placeholder="Sua senha"
            error={errors.password?.message}
            {...register("password")}
          />
          {errors.root && <FormError message={errors.root?.message} />}
          <Button type="submit" size="block">
            Entrar
          </Button>
          <ActionPrompt
            title="Não tem conta?"
            description="Crie uma gratis"
            to="/signup"
            icon={<FiUserPlus />}
          />
        </form>
      </div>
    </Container>
  );
}
