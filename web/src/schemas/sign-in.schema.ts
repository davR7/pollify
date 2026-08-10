import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .email({ error: "Digite um e-mail válido." }).toLowerCase(),
  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 8 caracteres."),
});

export type SigninFormData = z.infer<typeof signinSchema>;
