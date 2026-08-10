import z from "zod";

export const signupSchema = z.object({
  fullname: z
    .string({ error: "O nome completo é obrigatório." }),
  email: z.email({ error: "O e-mail é inválido." }).toLowerCase(),
  password: z
    .string({ error: "A senha é obrigatória." })
    .min(8, "A senha deve conter pelo menos 8 caracteres."),
});

export type SignupFormData = z.infer<typeof signupSchema>;
