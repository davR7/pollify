import { z } from "zod";
import { PollStatus } from "@/entities/poll/poll-status";

export const updatePollSchema = z
  .object({
    status: z.nativeEnum(PollStatus).optional(),

    startsAt: z.coerce
      .date({
        error: "Invalid start date.",
      })
      .optional(),

    endsAt: z.coerce
      .date({
        error: "Invalid end date.",
      })
      .optional(),
  })
  .refine(
    (data) => data.status !== undefined || data.startsAt !== undefined || data.endsAt !== undefined,
    {
      message: "At least one field must be provided.",
    },
  );
