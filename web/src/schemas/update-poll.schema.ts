import { z } from "zod";

export const updatePollSchema = z
  .object({
    status: z.enum(["DRAFT", "OPEN"], {
      error: "Selecione um status válido.",
    }),
    startsAt: z
      .string()
      .min(1, "A data de início é obrigatória.")
      .refine((value) => {
        const todayString = new Date().toISOString().split("T")[0];
        return value === todayString;
      }, "A data de início deve ser hoje."),
    endsAt: z.string().min(1, "A data de término é obrigatória."),
  })
  .refine((data) => data.status !== "DRAFT", {
    error: "Não é possível salvar como rascunho.",
    path: ["status"],
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "A data de término deve ser posterior ao início.",
    path: ["endsAt"],
  });

export type UpdatePollFormData = z.infer<typeof updatePollSchema>;
