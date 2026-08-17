import { z } from "zod";

export const createPollSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "O título é obrigatório.")
      .max(200, "O título deve ter no máximo 200 caracteres."),
    options: z
      .array(
        z.object({
          text: z
            .string()
            .trim()
            .min(1, "A opção é obrigatória.")
            .max(100, "A opção deve ter no máximo 100 caracteres."),
        }),
      )
      .min(2, "Adicione pelo menos 2 opções.")
      .max(4, "Você pode adicionar no máximo 4 opções."),
    startsAt: z.string().min(1, "A data de início é obrigatória."),
    endsAt: z.string().min(1, "A data de término é obrigatória."),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "A data de encerramento deve ser posterior ao início.",
    path: ["endsAt"],
  });

export type CreatePollFormData = z.infer<typeof createPollSchema>;
