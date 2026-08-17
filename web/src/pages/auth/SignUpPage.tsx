import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { LuLogIn } from "react-icons/lu";
import { toast } from "sonner";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { InputGroup } from "@/components/ui/InputGroup";
import { useAuth } from "@/hooks/useAuth";
import { AuthHeader } from "@/pages/auth/components/AuthHeader";
import { type SignupFormData, signupSchema } from "@/schemas/sign-up.schema";
import { ActionPrompt } from "./components/ActionPrompt";

export function SignUpPage() {
  const {
    register,
    reset,
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
      reset();
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
    <Container className="min-h-screen lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-md">
        <AuthHeader description="Junte-se à comunidade e dê voz às suas opiniões." />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputGroup
            label="Nome completo"
            input="fullname"
            type="text"
            autoComplete="fullname"
            placeholder="Seu nome completo"
            error={errors.fullname?.message}
            {...register("fullname")}
          />
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
            Quero me cadastrar
          </Button>
          <ActionPrompt
            title="Já possui uma conta?"
            description="Entre na plataforma"
            to="/signin"
            icon={<LuLogIn />}
          />
        </form>
      </div>
    </Container>
  );
}
