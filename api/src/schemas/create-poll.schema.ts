import { z } from "zod";

export const createPollSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Title must be at least 10 characters long.")
    .max(255, "Title must be at most 255 characters long."),

  options: z
    .array(
      z.object({
        text: z
          .string()
          .trim()
          .min(1, "Option text is required.")
          .max(100, "Option text must be at most 100 characters long."),
      }),
    )
    .min(3, "A poll must have at least 3 options.")
    .max(5, "A poll can have at most 5 options."),
});
