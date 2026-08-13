import { z } from "zod";

export const updatePollSchema = z
  .object({
    status: z.enum(["DRAFT", "OPEN"], {
      error: "Selecione um status válido.",
    }),
    startsAt: z.string().min(1, "A data de início é obrigatória."),
    endsAt: z.string().min(1, "A data de encerramento é obrigatória."),
  })
  .refine((data) => data.status !== "DRAFT", {
    error: "É permitido salvar a enquete como rascunho.",
    path: ["status"],
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "A data de encerramento deve ser posterior ao início.",
    path: ["endsAt"],
  });

export type UpdatePollFormData = z.infer<typeof updatePollSchema>;
